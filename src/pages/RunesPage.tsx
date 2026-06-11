import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/button";
import { FlipCard } from "@/components/FlipCard";
import {
  InterpretationModal,
  type InterpretationPayload,
} from "@/components/InterpretationModal";
import {
  RUNES,
  RUNES_THREE_POSITIONS,
  UNIQUE_RUNE_NAMES,
} from "@/data/runes";
import type { DrawnRune, Rune, RunePosition } from "@/types/runes";
import { shuffle } from "@/lib/utils";

type Mode = "single" | "three";

/** Tire une rune : choisit un nom unique puis tire sa position au sort.
 *  Si la rune n'existe qu'en "Droite", on prend ce qu'on a. */
function drawRune(excludeNames: Set<string>): Rune {
  const candidates = UNIQUE_RUNE_NAMES.filter((n) => !excludeNames.has(n));
  const name = shuffle(candidates)[0];
  const variants = RUNES.filter((r) => r.nom === name);
  const positions: RunePosition[] = ["Droite", "Renversée"];
  const wanted = positions[Math.floor(Math.random() * positions.length)];
  return variants.find((r) => r.position === wanted) ?? variants[0];
}

function drawSingle(): DrawnRune[] {
  return [{ rune: drawRune(new Set()), isRevealed: false }];
}

function drawThree(): DrawnRune[] {
  const used = new Set<string>();
  return RUNES_THREE_POSITIONS.map((slot) => {
    const rune = drawRune(used);
    used.add(rune.nom);
    return { rune, slot, isRevealed: false };
  });
}

export function RunesPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [draw, setDraw] = useState<DrawnRune[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [payload, setPayload] = useState<InterpretationPayload | null>(null);

  const allRevealed = useMemo(
    () => draw.length > 0 && draw.every((d) => d.isRevealed),
    [draw]
  );

  const startMode = (m: Mode) => {
    setMode(m);
    setDraw(m === "single" ? drawSingle() : drawThree());
  };

  const resetDraw = () => {
    if (!mode) return;
    setDraw(mode === "single" ? drawSingle() : drawThree());
  };

  const backToModeSelect = () => {
    setMode(null);
    setDraw([]);
  };

  const handleClick = (idx: number) => {
    const item = draw[idx];
    if (!item) return;

    if (item.isRevealed) {
      setPayload({
        title: item.rune.nom,
        meta: `Position : ${item.rune.position}${item.slot ? ` · ${item.slot.label}` : ""}`,
        image: item.rune.image,
        interpretation: item.rune.interpretation,
        imageRotated: false, // image fichier inclut déjà l'orientation
      });
      setModalOpen(true);
      return;
    }

    setDraw((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, isRevealed: true } : d))
    );
  };

  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader title="Les Runes" />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-12">
        <AnimatePresence mode="wait">
          {mode === null && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl w-full mt-6"
            >
              <ModeButton
                title="Une Rune"
                desc="Tirage simple et direct"
                onClick={() => startMode("single")}
              />
              <ModeButton
                title="Trois Runes"
                desc="Passé — Présent — Avenir"
                onClick={() => startMode("three")}
              />
            </motion.div>
          )}

          {mode !== null && (
            <motion.div
              key="board"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-10 mt-8 w-full"
            >
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                {draw.map((d, i) => (
                  <FlipCard
                    key={d.slot?.key ?? i}
                    variant="rune"
                    isRevealed={d.isRevealed}
                    isActive={!d.isRevealed}
                    frontImage={d.rune.image}
                    frontAlt={`${d.rune.nom} ${d.rune.position}`}
                    onClick={() => handleClick(i)}
                    caption={d.slot?.label}
                  />
                ))}
              </div>

              <p className="font-body italic text-sepia text-center max-w-md">
                {allRevealed
                  ? "Cliquez sur un galet pour en lire le sens."
                  : "Cliquez sur les galets pour les retourner."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {mode !== null && (
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {allRevealed && (
              <Button variant="gold" onClick={resetDraw}>
                Nouveau tirage
              </Button>
            )}
            <Button variant="ghost" onClick={backToModeSelect}>
              Changer de mode
            </Button>
          </div>
        )}
      </div>

      <InterpretationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        payload={payload}
      />
    </section>
  );
}

function ModeButton({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onClick}
      className="bg-wood-gradient gold-border rounded-xl px-7 py-8 text-center hover:shadow-[0_18px_50px_rgba(243,217,133,0.25)] transition-shadow no-tap"
    >
      <span className="block font-display text-xl sm:text-2xl tracking-wider text-gold-gradient">
        {title}
      </span>
      <span className="mt-2 block font-body italic text-sm text-parchment/70">
        {desc}
      </span>
    </motion.button>
  );
}

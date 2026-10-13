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
  TAROT_CARDS,
  TAROT_CROSS_POSITIONS,
  TAROT_THREE_POSITIONS,
} from "@/data/tarotCards";
import type {
  DrawnTarotCard,
  TarotCrossPosition,
} from "@/types/tarot";
import { shuffle } from "@/lib/utils";

type Mode = "single" | "three" | "cross";

function drawSingle(): DrawnTarotCard {
  return {
    card: shuffle(TAROT_CARDS)[0],
    isRevealed: false,
  };
}

function drawFromPositions(positions: TarotCrossPosition[]): DrawnTarotCard[] {
  const cards = shuffle(TAROT_CARDS).slice(0, positions.length);
  return positions.map((position, i) => ({
    card: cards[i],
    position,
    isRevealed: false,
  }));
}

const GRID_AREA_CLASS: Record<NonNullable<TarotCrossPosition["gridArea"]>, string> = {
  top: "[grid-area:top]",
  left: "[grid-area:left]",
  center: "[grid-area:center]",
  right: "[grid-area:right]",
  bottom: "[grid-area:bottom]",
};

export function TarotPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [draw, setDraw] = useState<DrawnTarotCard[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [payload, setPayload] = useState<InterpretationPayload | null>(null);

  const allRevealed = useMemo(
    () => draw.length > 0 && draw.every((d) => d.isRevealed),
    [draw]
  );

  const makeDraw = (m: Mode): DrawnTarotCard[] => {
    if (m === "single") return [drawSingle()];
    if (m === "three") return drawFromPositions(TAROT_THREE_POSITIONS);
    return drawFromPositions(TAROT_CROSS_POSITIONS);
  };

  const startMode = (m: Mode) => {
    setMode(m);
    setDraw(makeDraw(m));
    setActiveIdx(0);
  };

  const resetDraw = () => {
    if (!mode) return;
    setDraw(makeDraw(mode));
    setActiveIdx(0);
  };

  const backToModeSelect = () => {
    setMode(null);
    setDraw([]);
    setActiveIdx(0);
  };

  const handleCardClick = (idx: number) => {
    const item = draw[idx];
    if (!item) return;

    if (item.isRevealed) {
      // 2e clic → modale
      setPayload({
        title: `${item.card.roman} — ${item.card.name}`,
        meta: item.position
          ? `Position : ${item.position.label} · ${item.position.role}`
          : "Carte unique — Guidance",
        image: item.card.image,
        interpretation: item.card.meaning,
      });
      setModalOpen(true);
      return;
    }

    // 1er clic — uniquement permis sur la carte active (séquentiel) ou direct (single)
    const sequential = mode === "cross" || mode === "three";
    if (sequential && idx !== activeIdx) return;

    setDraw((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, isRevealed: true } : d))
    );

    if (sequential && activeIdx < draw.length - 1) {
      setActiveIdx((i) => i + 1);
    }
  };

  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader title="Oracle Ombrum" />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-6 md:pb-4">
        <AnimatePresence mode="wait">
          {mode === null && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl w-full mt-6"
            >
              <ModeButton
                title="La Carte Unique"
                desc="Une guidance brève et immédiate"
                onClick={() => startMode("single")}
              />
              <ModeButton
                title="Passé — Présent — Futur"
                desc="Trois cartes pour lire le fil du temps"
                onClick={() => startMode("three")}
              />
              <ModeButton
                title="Le Tirage en Croix"
                desc="Analyse complète en cinq cartes"
                onClick={() => startMode("cross")}
              />
            </motion.div>
          )}

          {mode === "single" && draw[0] && (
            <motion.div
              key="single"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-10 mt-8"
            >
              <FlipCard
                isRevealed={draw[0].isRevealed}
                isActive={!draw[0].isRevealed}
                frontImage={draw[0].card.image}
                frontAlt={draw[0].card.name}
                onClick={() => handleCardClick(0)}
              />
              <p className="font-body italic text-sepia text-center max-w-md">
                {draw[0].isRevealed
                  ? "Cliquez à nouveau sur la carte pour révéler son interprétation."
                  : "Concentrez-vous sur votre question, puis cliquez sur la carte."}
              </p>
            </motion.div>
          )}

          {mode === "three" && (
            <motion.div
              key="three"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 md:gap-3 mt-2 w-full"
            >
              <div className="flex flex-wrap justify-center items-end gap-4 sm:gap-6 md:gap-8">
                {draw.map((d, i) => (
                  <FlipCard
                    key={d.position?.key ?? i}
                    isRevealed={d.isRevealed}
                    isActive={i === activeIdx && !d.isRevealed}
                    frontImage={d.card.image}
                    frontAlt={d.card.name}
                    onClick={() => handleCardClick(i)}
                    caption={d.position?.label}
                    buttonClassName="h-48 sm:h-64 md:h-[clamp(14rem,60svh,26rem)]"
                  />
                ))}
              </div>

              {!allRevealed && (
                <p className="font-body italic text-sepia text-center max-w-md">
                  Cliquez sur la carte cerclée d'or pour la retourner.
                </p>
              )}
              {allRevealed && (
                <p className="font-body italic text-sepia text-center max-w-md">
                  Cliquez sur n'importe quelle carte pour révéler son interprétation.
                </p>
              )}
            </motion.div>
          )}

          {mode === "cross" && (
            <motion.div
              key="cross"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 md:gap-3 mt-2 w-full"
            >
              <div
                className="grid gap-2 sm:gap-3 md:gap-4"
                style={{
                  gridTemplateAreas: `". top ." "left center right" ". bottom ."`,
                  gridTemplateColumns: "auto auto auto",
                  gridTemplateRows: "auto auto auto",
                }}
              >
                {draw.map((d, i) => (
                  <div
                    key={d.position?.key ?? i}
                    className={GRID_AREA_CLASS[d.position!.gridArea!]}
                  >
                    <FlipCard
                      isRevealed={d.isRevealed}
                      isActive={i === activeIdx && !d.isRevealed}
                      frontImage={d.card.image}
                      frontAlt={d.card.name}
                      onClick={() => handleCardClick(i)}
                      caption={d.position?.label}
                      buttonClassName="h-40 sm:h-48 md:h-[clamp(12rem,calc((100svh-200px)/3),22rem)]"
                    />
                  </div>
                ))}
              </div>

              {!allRevealed && (
                <p className="font-body italic text-sepia text-center max-w-md">
                  Cliquez sur la carte cerclée d'or pour la retourner.
                </p>
              )}
              {allRevealed && (
                <p className="font-body italic text-sepia text-center max-w-md">
                  Cliquez sur n'importe quelle carte pour révéler son interprétation.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {mode !== null && (
          <div className="mt-4 md:mt-3 flex flex-wrap gap-3 justify-center">
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

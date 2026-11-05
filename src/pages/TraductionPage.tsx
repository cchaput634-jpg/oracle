import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X, Copy, Trash2 } from "lucide-react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/button";
import { RUNES_ALPHABET, type RuneLetter } from "@/data/runesAlphabet";
import { cn } from "@/lib/utils";

type Token =
  | { kind: "rune"; rune: RuneLetter; chosen: string }
  | { kind: "space" };

export function TraductionPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const translation = useMemo(
    () => tokens.map((t) => (t.kind === "space" ? " " : t.chosen)).join(""),
    [tokens]
  );

  const addRune = (rune: RuneLetter) => {
    setTokens((prev) => [
      ...prev,
      { kind: "rune", rune, chosen: rune.letters[0] },
    ]);
    setPickerOpen(false);
  };

  const addSpace = () => {
    setTokens((prev) => [...prev, { kind: "space" }]);
    setPickerOpen(false);
  };

  const removeAt = (i: number) =>
    setTokens((prev) => prev.filter((_, idx) => idx !== i));

  const chooseLetter = (i: number, letter: string) =>
    setTokens((prev) =>
      prev.map((t, idx) =>
        idx === i && t.kind === "rune" ? { ...t, chosen: letter } : t
      )
    );

  const clearAll = () => setTokens([]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(translation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader title="Traduction de Runes" />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-10 w-full">
        <div className="w-full max-w-5xl flex flex-col gap-6 mt-2">
          <p className="font-body italic text-sepia text-center max-w-2xl mx-auto">
            Composez votre inscription en runes. Chaque rune pose une lettre —
            certaines en portent plusieurs, choisissez la bonne.
          </p>

          {/* COMPOSITION */}
          <div className="bg-wood-gradient gold-border rounded-xl p-4 sm:p-6">
            <div className="flex flex-wrap items-start gap-2 sm:gap-3 justify-center min-h-[6rem]">
              {tokens.map((t, i) => (
                <TokenSlot
                  key={i}
                  token={t}
                  onRemove={() => removeAt(i)}
                  onChooseLetter={(l) => chooseLetter(i, l)}
                />
              ))}
              <button
                type="button"
                onClick={() => setPickerOpen((v) => !v)}
                className={cn(
                  "flex-shrink-0 w-14 h-20 sm:w-16 sm:h-24 rounded-md border-2 border-dashed",
                  "grid place-items-center text-gold hover:text-gold-bright",
                  "transition-colors no-tap",
                  pickerOpen
                    ? "border-gold bg-gold/15"
                    : "border-gold/50 hover:border-gold hover:bg-gold/10"
                )}
                aria-label="Ajouter une rune ou un espace"
              >
                <Plus className="w-7 h-7" />
              </button>
            </div>
          </div>

          {/* PICKER */}
          <AnimatePresence>
            {pickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-wood-gradient gold-border rounded-xl p-4 sm:p-5"
              >
                <header className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-sm sm:text-base tracking-wider text-gold-gradient">
                    Choisir une rune
                  </h4>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(false)}
                    aria-label="Fermer le choix"
                    className="h-8 w-8 grid place-items-center rounded-full border border-gold/60 text-gold hover:bg-gold/15"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </header>

                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
                  {RUNES_ALPHABET.map((r) => (
                    <button
                      key={r.rune}
                      type="button"
                      onClick={() => addRune(r)}
                      className="group flex flex-col items-center gap-1 rounded-md p-2 border border-gold/30 bg-wood-deep/40 hover:border-gold hover:bg-gold/10 transition-colors no-tap"
                      aria-label={`Ajouter la rune ${r.name}`}
                      title={r.name}
                    >
                      <span className="font-rune text-2xl sm:text-3xl text-ivory group-hover:text-gold-bright leading-none">
                        {r.rune}
                      </span>
                      <span className="font-display text-[0.6rem] sm:text-xs text-gold/70 tracking-widest">
                        {r.letters.join(" ")}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={addSpace}
                    className="group col-span-2 flex flex-col items-center justify-center gap-1 rounded-md p-2 border border-gold/30 bg-wood-deep/40 hover:border-gold hover:bg-gold/10 transition-colors no-tap"
                    aria-label="Ajouter un espace"
                  >
                    <span className="block w-10 h-px bg-gold/70" />
                    <span className="font-display text-[0.6rem] sm:text-xs text-gold/70 tracking-widest">
                      ESPACE
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OUTPUT */}
          <div className="bg-parchment text-ink gold-border rounded-xl p-5 sm:p-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
            <p className="font-display text-xs sm:text-sm tracking-widest uppercase text-sepia mb-2">
              Lecture
            </p>
            {translation.trim() ? (
              <p className="font-body text-2xl sm:text-3xl md:text-4xl text-wood-deep leading-snug break-words italic">
                {translation}
              </p>
            ) : (
              <p className="font-body italic text-sepia/70 text-base sm:text-lg">
                — en attente de runes —
              </p>
            )}
          </div>

          {tokens.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="gold" onClick={copy}>
                <Copy className="w-4 h-4" />
                {copied ? "Copié" : "Copier la lecture"}
              </Button>
              <Button variant="ghost" onClick={clearAll}>
                <Trash2 className="w-4 h-4" />
                Tout effacer
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Un slot : rune cliquable + choix de lettre + suppression ---------- */

function TokenSlot({
  token,
  onRemove,
  onChooseLetter,
}: {
  token: Token;
  onRemove: () => void;
  onChooseLetter: (letter: string) => void;
}) {
  if (token.kind === "space") {
    return (
      <div className="relative flex flex-col items-center gap-1 pt-1">
        <div className="w-14 h-20 sm:w-16 sm:h-24 rounded-md border border-gold/30 bg-wood-deep/30 grid place-items-center">
          <span className="block w-6 h-px bg-gold/60" />
        </div>
        <span className="font-display text-[0.6rem] sm:text-xs text-gold/60 tracking-widest">
          ESPACE
        </span>
        <RemoveButton onClick={onRemove} />
      </div>
    );
  }

  const { rune, chosen } = token;
  const hasMultiple = rune.letters.length > 1;

  return (
    <div className="relative flex flex-col items-center gap-1 pt-1">
      <div className="w-14 h-20 sm:w-16 sm:h-24 rounded-md border border-gold/60 bg-wood-deep/60 grid place-items-center">
        <span className="font-rune text-3xl sm:text-4xl text-gold-bright leading-none">
          {rune.rune}
        </span>
      </div>
      {hasMultiple ? (
        <div className="flex gap-1">
          {rune.letters.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onChooseLetter(l)}
              className={cn(
                "font-display text-xs sm:text-sm px-2 py-0.5 rounded border transition-colors no-tap",
                l === chosen
                  ? "border-gold bg-gold/25 text-gold-bright"
                  : "border-gold/30 text-gold/60 hover:border-gold hover:text-gold-bright"
              )}
              aria-pressed={l === chosen}
            >
              {l}
            </button>
          ))}
        </div>
      ) : (
        <span className="font-display text-sm sm:text-base text-gold-bright tracking-wider">
          {chosen}
        </span>
      )}
      <RemoveButton onClick={onRemove} />
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Retirer"
      className="absolute -top-2 -right-2 h-5 w-5 grid place-items-center rounded-full border border-gold/60 bg-wood-deep/80 text-gold hover:bg-destructive/60 hover:border-destructive-foreground transition-colors no-tap"
    >
      <X className="w-3 h-3" />
    </button>
  );
}

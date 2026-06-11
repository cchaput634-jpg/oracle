import { cn } from "@/lib/utils";

interface Props {
  isRevealed: boolean;
  isActive?: boolean;
  frontImage?: string;
  frontAlt?: string;
  /** Visuel face avant rotaté (rune renversée) */
  frontRotated?: boolean;
  onClick?: () => void;
  className?: string;
  /** Variante : "tarot" carte rectangulaire / "rune" galet ovale */
  variant?: "tarot" | "rune";
  /** Texte en pied (label de position p.ex.) */
  caption?: string;
  /** Override des classes de taille appliquées au bouton (utile p.ex. en tirage en croix) */
  buttonClassName?: string;
}

export function FlipCard({
  isRevealed,
  isActive,
  frontImage,
  frontAlt,
  frontRotated,
  onClick,
  className,
  variant = "tarot",
  caption,
  buttonClassName,
}: Props) {
  const isRune = variant === "rune";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flip-perspective relative no-tap inline-block align-top",
          buttonClassName ??
            (isRune
              ? "w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36"
              : "h-40 sm:h-56 md:h-72"),
          "transition-transform hover:scale-[1.03] active:scale-[0.97]",
          isActive && !isRevealed && (isRune ? "rounded-[50%/35%] halo-gold" : "rounded-lg halo-gold")
        )}
        aria-label={
          isRevealed
            ? `Voir l'interprétation${frontAlt ? ` de ${frontAlt}` : ""}`
            : "Révéler"
        }
      >
        {isRune ? (
          // ---------------- Variante RUNE (galet ovale, taille fixe) ----------------
          <div className={cn("flip-inner w-full h-full", isRevealed && "is-flipped")}>
            <div
              className="flip-face w-full h-full rune-back-art"
              aria-hidden={isRevealed}
            />
            <div
              className="flip-face flip-back w-full h-full overflow-hidden rounded-[50%/35%] bg-stone-700 shadow-[inset_-6px_-8px_18px_rgba(0,0,0,0.5),inset_6px_6px_14px_rgba(255,255,255,0.12)]"
              aria-hidden={!isRevealed}
            >
              {frontImage ? (
                <img
                  src={frontImage}
                  alt={frontAlt ?? ""}
                  className="w-full h-full object-cover"
                  style={frontRotated ? { transform: "rotate(180deg)" } : undefined}
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-gold-bright font-display">?</div>
              )}
            </div>
          </div>
        ) : (
          // ---------------- Variante TAROT (carte épouse le ratio de l'image) ----------------
          <div className={cn("flip-inner relative h-full", isRevealed && "is-flipped")}>
            {/* FACE : img en flux normal — c'est elle qui dicte la largeur du conteneur */}
            {frontImage ? (
              <img
                src={frontImage}
                alt={frontAlt ?? ""}
                draggable={false}
                className="block h-full w-auto rounded-lg gold-border select-none"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              />
            ) : (
              <div
                className="h-full aspect-[3/5] rounded-lg gold-border bg-wood-deep grid place-items-center text-gold-bright font-display"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                ?
              </div>
            )}

            {/* DOS : image, overlay absolu qui épouse exactement la taille de la face */}
            <img
              src="/images/tarot/Dos 1.png"
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover rounded-lg gold-border select-none"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              aria-hidden={isRevealed}
            />
          </div>
        )}
      </button>

      {caption && (
        <span className="font-display text-[0.65rem] sm:text-xs uppercase tracking-widest text-sepia/80">
          {caption}
        </span>
      )}
    </div>
  );
}

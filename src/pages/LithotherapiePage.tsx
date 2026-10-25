import { motion } from "motion/react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { LITHO_FAMILIES, STONE_BY_NAME } from "@/data/lithotherapieStones";
import type { LithoStone } from "@/types/lithotherapie";

export function LithotherapiePage() {
  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader title="Lithothérapie" />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-10 w-full">
        <div className="w-full max-w-6xl flex flex-col gap-8 md:gap-10 mt-2">
          {LITHO_FAMILIES.map((family, idx) => (
            <motion.section
              key={family.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="w-full"
            >
              <header className="flex items-center gap-4 mb-4">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl tracking-widest text-gold-gradient whitespace-nowrap">
                  {family.label}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {family.stones.map((name) => {
                  const stone = STONE_BY_NAME[name];
                  if (!stone) return null;
                  return <StoneCard key={`${family.key}-${name}`} stone={stone} />;
                })}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoneCard({ stone }: { stone: LithoStone }) {
  return (
    <article className="bg-wood-gradient gold-border rounded-xl p-4 sm:p-5 flex gap-4 items-start">
      <div
        className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-[50%/40%] shadow-[inset_-6px_-8px_18px_rgba(0,0,0,0.55),inset_6px_6px_14px_rgba(255,255,255,0.18),0_6px_18px_rgba(0,0,0,0.5)]"
        style={{ background: stone.visual }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-lg sm:text-xl text-gold-bright leading-tight">
          {stone.nom}
        </h4>
        <p className="font-body text-xs sm:text-sm italic text-moonlight/90 mt-0.5">
          {stone.couleur}
        </p>
        <p className="font-body text-sm sm:text-base text-ivory mt-2 leading-snug">
          {stone.proprietes}
        </p>
        <p className="font-body text-xs sm:text-sm text-gold mt-2 leading-snug">
          <span className="uppercase tracking-wider text-[0.65rem] text-gold-deep mr-1">
            Intention —
          </span>
          {stone.intention}
        </p>
      </div>
    </article>
  );
}

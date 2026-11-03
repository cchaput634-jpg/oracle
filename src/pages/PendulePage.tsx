import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/button";
import { PenduleArt } from "@/components/PenduleArt";
import { PENDULES } from "@/data/pendules";
import type { Pendule, PenduleResult } from "@/types/pendule";
import { cn, pickOne } from "@/lib/utils";

type Phase = "ready" | "consulting" | "revealed";

const RESULT_LABEL: Record<PenduleResult, string> = {
  oui: "Oui",
  non: "Non",
  neutre: "Les astres hésitent",
};

const RESULT_HINT: Record<PenduleResult, string> = {
  oui: "Le pendule tourne dans le sens des aiguilles — il affirme.",
  non: "Le pendule tourne à contresens — il nie.",
  neutre: "Le pendule reste stable — la réponse ne vient pas.",
};

const ANIM_CLASS: Record<PenduleResult, string> = {
  oui: "pendule-oui",
  non: "pendule-non",
  neutre: "pendule-neutre",
};

export function PendulePage() {
  const [pendule, setPendule] = useState<Pendule | null>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [result, setResult] = useState<PenduleResult | null>(null);

  const consulter = () => {
    const r = pickOne(["oui", "non", "neutre"] as const);
    setResult(r);
    setPhase("consulting");
    window.setTimeout(() => setPhase("revealed"), 5200);
  };

  const nouvelleQuestion = () => {
    setResult(null);
    setPhase("ready");
  };

  const changerPendule = () => {
    setPendule(null);
    setResult(null);
    setPhase("ready");
  };

  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader title="Pendule" />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-10 w-full">
        <AnimatePresence mode="wait">
          {!pendule ? (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-6xl mt-4"
            >
              <p className="font-body italic text-sepia text-center max-w-xl mx-auto mb-6">
                Choisissez le pendule selon ce que vous cherchez.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                {PENDULES.map((p, i) => (
                  <PenduleCard
                    key={p.key}
                    pendule={p}
                    index={i}
                    onPick={() => setPendule(p)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="consult"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center gap-4 mt-2"
            >
              <h3 className="font-display text-lg sm:text-xl tracking-wider text-gold-gradient text-center">
                {pendule.name}
              </h3>

              <PenduleStage
                pendule={pendule}
                animClass={result ? ANIM_CLASS[result] : null}
              />

              <div className="min-h-[5rem] flex flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  {phase === "ready" && (
                    <motion.p
                      key="ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-body italic text-sepia max-w-md"
                    >
                      Formulez votre question dans votre esprit, puis interrogez le pendule.
                    </motion.p>
                  )}
                  {phase === "consulting" && (
                    <motion.p
                      key="consulting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-body italic text-moonlight"
                    >
                      Le pendule entend votre question…
                    </motion.p>
                  )}
                  {phase === "revealed" && result && (
                    <motion.div
                      key={result}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <p className="font-display text-3xl sm:text-4xl tracking-wider text-gold-gradient">
                        {RESULT_LABEL[result]}
                      </p>
                      <p className="font-body italic text-sepia text-sm sm:text-base max-w-md">
                        {RESULT_HINT[result]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {phase === "ready" && (
                  <Button variant="gold" size="lg" onClick={consulter}>
                    Interroger le pendule
                  </Button>
                )}
                {phase === "revealed" && (
                  <Button variant="gold" onClick={nouvelleQuestion}>
                    Nouvelle question
                  </Button>
                )}
                <Button variant="ghost" onClick={changerPendule}>
                  Changer de pendule
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function PenduleStage({
  pendule,
  animClass,
}: {
  pendule: Pendule;
  animClass: string | null;
}) {
  return (
    <div className="pendule-stage w-full flex justify-center py-4">
      <div
        className={cn(
          "pendule-pivot h-[18rem] sm:h-[22rem] md:h-[26rem]",
          animClass
        )}
      >
        <PenduleArt type={pendule.key} />
      </div>
    </div>
  );
}

function PenduleCard({
  pendule,
  index,
  onPick,
}: {
  pendule: Pendule;
  index: number;
  onPick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onPick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="bg-wood-gradient gold-border rounded-xl p-5 flex flex-col items-center gap-3 text-center no-tap hover:shadow-[0_18px_50px_rgba(243,217,133,0.22)] transition-shadow"
      aria-label={`Choisir : ${pendule.name}`}
    >
      <div className="h-32 sm:h-36">
        <PenduleArt type={pendule.key} />
      </div>
      <h3 className="font-display text-base sm:text-lg tracking-wider text-gold-gradient leading-tight">
        {pendule.name}
      </h3>
      <p className="font-body italic text-xs text-moonlight/80">
        {pendule.materiau}
      </p>
      <p className="font-body text-sm text-ivory leading-snug">
        {pendule.usage}
      </p>
    </motion.button>
  );
}

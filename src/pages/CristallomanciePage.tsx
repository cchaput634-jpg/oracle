import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/button";
import {
  InterpretationModal,
  type InterpretationPayload,
} from "@/components/InterpretationModal";
import { CRYSTALLOMANCY_SYMBOLS } from "@/data/crystallomancySymbols";
import type { CrystallomancySymbol } from "@/types/crystallomancy";
import { pickOne } from "@/lib/utils";

export function CristallomanciePage() {
  const [vision, setVision] = useState<CrystallomancySymbol | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [payload, setPayload] = useState<InterpretationPayload | null>(null);

  const reveal = () => setVision(pickOne(CRYSTALLOMANCY_SYMBOLS));
  const reset = () => setVision(null);

  const openModal = () => {
    if (!vision) return;
    setPayload({
      title: vision.symbole,
      meta: "Vision dans la sphère",
      image: vision.image,
      interpretation: vision.interpretation,
    });
    setModalOpen(true);
  };

  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader
        title="La Cristallomancie"
        tagline="Que la sphère vous livre sa vision"
      />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-12">
        <div className="my-6 grid place-items-center min-h-[300px] sm:min-h-[420px]">
          <AnimatePresence mode="wait">
            {vision ? (
              <motion.button
                key={vision.id}
                type="button"
                onClick={openModal}
                initial={{ opacity: 0, scale: 0.6, filter: "blur(18px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
                transition={{ duration: 0.9 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Voir l'interprétation : ${vision.symbole}`}
                className="no-tap"
              >
                <img
                  src={vision.image}
                  alt={vision.symbole}
                  draggable={false}
                  className="block w-[20rem] sm:w-[28rem] md:w-[34rem] max-w-[90vw] h-auto drop-shadow-[0_0_60px_rgba(243,217,133,0.45)]"
                />
              </motion.button>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-body italic text-sepia/80 text-center max-w-md"
              >
                Posez votre question à la sphère et consultez-la.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex flex-wrap gap-3 justify-center">
          {!vision && (
            <Button variant="gold" size="lg" onClick={reveal}>
              Consulter le cristal
            </Button>
          )}
          {vision && (
            <>
              <Button variant="gold" onClick={reset}>
                Nouveau tirage
              </Button>
              <p className="w-full text-center mt-3 font-body italic text-sepia">
                Cliquez sur la sphère pour révéler l'interprétation.
              </p>
            </>
          )}
        </div>
      </div>

      <InterpretationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        payload={payload}
      />
    </section>
  );
}

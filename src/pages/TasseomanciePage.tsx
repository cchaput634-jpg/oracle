import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/button";
import {
  InterpretationModal,
  type InterpretationPayload,
} from "@/components/InterpretationModal";
import { TASSEOMANCY_SYMBOLS } from "@/data/tasseomancySymbols";
import type { TasseomancySymbol } from "@/types/tasseomancy";
import { pickOne } from "@/lib/utils";

export function TasseomanciePage() {
  const [symbol, setSymbol] = useState<TasseomancySymbol | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [payload, setPayload] = useState<InterpretationPayload | null>(null);

  const reveal = () => setSymbol(pickOne(TASSEOMANCY_SYMBOLS));
  const reset = () => setSymbol(null);

  const openModal = () => {
    if (!symbol) return;
    setPayload({
      title: symbol.symbole,
      meta: "Au fond de la tasse",
      image: symbol.image,
      interpretation: symbol.interpretation,
    });
    setModalOpen(true);
  };

  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader
        title="La Tassomancie"
        tagline="Au fond de la tasse, les feuilles parlent"
      />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-12">
        <div className="my-6 grid place-items-center min-h-[300px] sm:min-h-[420px]">
          <AnimatePresence mode="wait">
            {symbol ? (
              <motion.button
                key={symbol.id}
                type="button"
                onClick={openModal}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Voir l'interprétation : ${symbol.symbole}`}
                className="no-tap"
              >
                <img
                  src={symbol.image}
                  alt={symbol.symbole}
                  draggable={false}
                  className="block w-[20rem] sm:w-[28rem] md:w-[34rem] max-w-[90vw] h-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
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
                Concentrez-vous sur votre question, puis mélangez les feuilles.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex flex-wrap gap-3 justify-center">
          {!symbol && (
            <Button variant="gold" size="lg" onClick={reveal}>
              Mélanger et lire les feuilles
            </Button>
          )}
          {symbol && (
            <>
              <Button variant="gold" onClick={reset}>
                Nouveau tirage
              </Button>
              <p className="w-full text-center mt-3 font-body italic text-sepia">
                Cliquez sur la tasse pour révéler l'interprétation.
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

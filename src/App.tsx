import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { BackHomeButton } from "@/components/BackHomeButton";
import { HomePage } from "@/pages/HomePage";
import { TarotPage } from "@/pages/TarotPage";
import { RunesPage } from "@/pages/RunesPage";
import { TasseomanciePage } from "@/pages/TasseomanciePage";
import { CristallomanciePage } from "@/pages/CristallomanciePage";
import { LithotherapiePage } from "@/pages/LithotherapiePage";
import { BibliothequePage } from "@/pages/BibliothequePage";

export default function App() {
  const location = useLocation();

  return (
    <div className="relative flex flex-col min-h-svh">
      <BackHomeButton />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="flex-1 flex flex-col"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tarot" element={<TarotPage />} />
            <Route path="/runes" element={<RunesPage />} />
            <Route path="/tasseomancie" element={<TasseomanciePage />} />
            <Route path="/cristallomancie" element={<CristallomanciePage />} />
            <Route path="/lithotherapie" element={<LithotherapiePage />} />
            <Route path="/bibliotheque" element={<BibliothequePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

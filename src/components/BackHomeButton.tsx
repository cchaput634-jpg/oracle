import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";

export function BackHomeButton() {
  const { pathname } = useLocation();
  const visible = pathname !== "/";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="back"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed left-4 top-4 z-40 sm:left-6 sm:top-6"
        >
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border border-gold/60 bg-wood-deep/70 backdrop-blur px-4 py-2 font-display text-xs uppercase tracking-widest text-gold hover:bg-gold/15 hover:text-gold-bright transition-colors no-tap"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Retour à l'accueil</span>
            <span className="sm:hidden">Accueil</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from "motion/react";

interface Props {
  title: string;
  tagline?: string;
}

export function ModuleHeader({ title, tagline }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center pt-12 pb-3 sm:pt-14 sm:pb-4 md:pt-6 md:pb-2 px-6"
    >
      <h2 className="font-display text-4xl sm:text-5xl md:text-4xl lg:text-5xl tracking-widest text-gold-gradient leading-none">
        {title}
      </h2>
      {tagline && (
        <p className="mt-2 font-body italic text-base sm:text-lg text-sepia/80">
          {tagline}
        </p>
      )}
      <div className="mt-2 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </motion.header>
  );
}

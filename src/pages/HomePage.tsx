import { Link } from "react-router-dom";
import { motion } from "motion/react";

const MODULES = [
  {
    to: "/tarot",
    symbol: "✦",
    name: "Le Tarot",
    desc: "Tirage en croix ou carte unique",
  },
  {
    to: "/runes",
    symbol: "ᚠ",
    name: "Les Runes",
    desc: "Tirage à trois runes ou à une seule",
  },
  {
    to: "/tasseomancie",
    symbol: "☕",
    name: "La Tassomancie",
    desc: "Lecture des feuilles de thé",
  },
  {
    to: "/cristallomancie",
    symbol: "🔮",
    name: "La Cristallomancie",
    desc: "Visions dans la sphère",
  },
];

export function HomePage() {
  return (
    <section className="flex-1 flex flex-col items-center px-6 py-16 sm:py-24">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h1 className="home-title font-display text-6xl sm:text-7xl md:text-8xl tracking-[0.25em] text-gold-gradient">
          Oracle
        </h1>
        <div className="mt-6 mx-auto h-px w-48 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-6 max-w-xl mx-auto font-body text-base sm:text-lg text-ink/80">
          Choisissez la voie par laquelle l'invisible vous parlera ce jour.
        </p>
      </motion.header>

      <nav
        aria-label="Modules de divination"
        className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7"
      >
        {MODULES.map((m, i) => (
          <motion.div
            key={m.to}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Link
              to={m.to}
              className="group block bg-wood-gradient gold-border rounded-xl px-7 py-8 sm:py-10 text-center hover:shadow-[0_20px_60px_rgba(243,217,133,0.25)] transition-shadow no-tap"
            >
              <span className="block text-5xl mb-3 text-gold-gradient font-display group-hover:scale-110 transition-transform">
                {m.symbol}
              </span>
              <span className="block font-display text-2xl sm:text-3xl tracking-wider text-gold-gradient">
                {m.name}
              </span>
              <span className="mt-2 block font-body italic text-sm sm:text-base text-parchment/70">
                {m.desc}
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="mt-16 text-center font-body italic text-sepia/70"
      >
        <p>« Ce que l'œil ne voit pas, les symboles le murmurent. »</p>
      </motion.footer>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { BookReader } from "@/components/BookReader";
import { BOOKS } from "@/data/books";
import type { Book } from "@/types/bibliotheque";

export function BibliothequePage() {
  const [openBook, setOpenBook] = useState<Book | null>(null);

  return (
    <section className="flex-1 flex flex-col">
      <ModuleHeader title="Bibliothèque" />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-10 w-full">
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 mt-4">
          {BOOKS.map((book, idx) => (
            <motion.button
              key={book.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              whileHover={{ y: -4, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpenBook(book)}
              className="group flex flex-col items-center gap-3 no-tap"
              aria-label={`Ouvrir : ${book.title}`}
            >
              <BookCover book={book} />
              <div className="text-center">
                <h3 className="font-display text-base sm:text-lg tracking-wider text-gold-gradient">
                  {book.title}
                </h3>
                <p className="font-body italic text-xs sm:text-sm text-moonlight/80 mt-0.5">
                  {book.author ? `par ${book.author}` : "Auteur inconnu"}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openBook && (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex flex-col items-stretch bg-night-deep/95 backdrop-blur-md"
            onClick={() => setOpenBook(null)}
          >
            <header className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-gold/30 bg-wood-gradient">
              <div className="min-w-0">
                <h3 className="font-display text-lg sm:text-2xl tracking-wider text-gold-gradient truncate">
                  {openBook.title}
                </h3>
                <p className="font-body italic text-xs sm:text-sm text-moonlight/80 truncate">
                  {openBook.author ? `écrit par ${openBook.author}` : "Auteur inconnu"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenBook(null)}
                aria-label="Fermer le livre"
                className="shrink-0 grid h-10 w-10 place-items-center rounded-full border border-gold/60 bg-wood-deep/70 text-gold hover:bg-gold/20 hover:border-gold transition-colors no-tap"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div
              className="flex-1 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              <BookReader book={openBook} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function BookCover({ book }: { book: Book }) {
  return (
    <div
      className="relative w-32 sm:w-40 md:w-44 aspect-[3/4] rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.6)] group-hover:shadow-[0_18px_45px_rgba(243,217,133,0.3)] transition-shadow overflow-hidden"
      style={{
        background: `
          linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.5) 100%),
          radial-gradient(ellipse at 50% 50%, ${book.coverColor ?? "#3a230f"} 0%, #15080a 100%)
        `,
      }}
    >
      {/* Spine shadow */}
      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/70 to-transparent" />
      {/* Gold frame */}
      <div className="absolute inset-3 border border-gold/70 rounded-[2px]" />
      <div className="absolute inset-4 border border-gold/40 rounded-[1px]" />
      {/* Corner ornaments */}
      <span className="absolute top-2 left-2 text-gold text-xs">✦</span>
      <span className="absolute top-2 right-2 text-gold text-xs">✦</span>
      <span className="absolute bottom-2 left-2 text-gold text-xs">✦</span>
      <span className="absolute bottom-2 right-2 text-gold text-xs">✦</span>
      {/* Title block */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 py-6">
        <span className="font-display text-xs sm:text-sm md:text-base tracking-wider text-gold-gradient leading-tight break-words [text-wrap:balance] max-w-full">
          {book.title}
        </span>
        <div className="mt-3 h-px w-10 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span className="mt-2 font-body italic text-[0.65rem] sm:text-xs text-gold/80">
          {book.author ?? "Auteur inconnu"}
        </span>
      </div>
    </div>
  );
}

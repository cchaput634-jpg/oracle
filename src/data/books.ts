import type { Book } from "@/types/bibliotheque";

export const BOOKS: Book[] = [
  {
    id: "grimoire-runes",
    title: "Grimoire des Runes",
    author: "Alice Hecalys",
    source: "/bibliotheque/grimoire-rune.html",
    format: "html",
    summary: "Traduction et lecture des runes anciennes",
    coverColor: "#2a1a0a",
  },
  {
    id: "oracle-ombrum",
    title: "Oracle Ombrum",
    author: "Alice Hecalys",
    source: "/bibliotheque/oracle-ombrum.html",
    format: "html",
    summary: "Grimoire d'interprétation du jeu Ombrum",
    coverColor: "#1b1848",
  },
];

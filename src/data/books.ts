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
  {
    id: "runes-divination",
    title: "Les Runes de Divination",
    author: "Alice Hecalys",
    source: "/bibliotheque/runes-divination.html",
    format: "html",
    summary: "Interprétation des runes et tirages",
    coverColor: "#132a19",
  },
  {
    id: "cristallomancie",
    title: "Cristallomancie",
    author: "Alice Hecalys",
    source: "/bibliotheque/cristallomancie.html",
    format: "html",
    summary: "Lecture et interprétation de la boule de cristal",
    coverColor: "#0e1a33",
  },
  {
    id: "livre-des-rituels",
    title: "Livre des Rituels de Skylis",
    author: "Skylis",
    source: "/bibliotheque/livre-des-rituels.html",
    format: "html",
    summary: "Rituels de la nation du vent",
    coverColor: "#1f4673",
  },
];

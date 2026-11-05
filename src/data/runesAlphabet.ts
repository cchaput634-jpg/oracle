/** Alphabet runique utilisé par le Grimoire de Traduction d'Alice Hecalys.
 *  Certaines runes portent plusieurs lettres — la lettre finale sera choisie
 *  par le lecteur dans la page Traduction. */
export interface RuneLetter {
  /** Caractère(s) Unicode de la rune gravée */
  rune: string;
  /** Lettres latines possibles pour cette rune */
  letters: string[];
  /** Nom de la rune */
  name: string;
}

export const RUNES_ALPHABET: RuneLetter[] = [
  { rune: "ᚨ",  letters: ["A"],           name: "Ansuz"   },
  { rune: "ᛒ",  letters: ["B"],           name: "Berkano" },
  { rune: "ᚲ",  letters: ["C", "K", "Q"], name: "Kaunan"  },
  { rune: "ᛞ",  letters: ["D"],           name: "Dagaz"   },
  { rune: "ᛖ",  letters: ["E"],           name: "Ehwaz"   },
  { rune: "ᚠ",  letters: ["F"],           name: "Fehu"    },
  { rune: "ᚷ",  letters: ["G"],           name: "Gebo"    },
  { rune: "ᚺ",  letters: ["H"],           name: "Hagalaz" },
  { rune: "ᛁ",  letters: ["I"],           name: "Isa"     },
  { rune: "ᛃ",  letters: ["J", "Y"],      name: "Jera"    },
  { rune: "ᛚ",  letters: ["L"],           name: "Laguz"   },
  { rune: "ᛗ",  letters: ["M"],           name: "Mannaz"  },
  { rune: "ᚾ",  letters: ["N"],           name: "Naudiz"  },
  { rune: "ᛟ",  letters: ["O"],           name: "Othala"  },
  { rune: "ᛈ",  letters: ["P"],           name: "Perthro" },
  { rune: "ᚱ",  letters: ["R"],           name: "Raidō"   },
  { rune: "ᛋ",  letters: ["S"],           name: "Sowilo"  },
  { rune: "ᛏ",  letters: ["T"],           name: "Tiwaz"   },
  { rune: "ᚢ",  letters: ["U"],           name: "Uruz"    },
  { rune: "ᚹ",  letters: ["V", "W"],      name: "Wunjo"   },
  { rune: "ᚲᛋ", letters: ["X"],           name: "Kaunan et Sowilo, liées" },
  { rune: "ᛉ",  letters: ["Z"],           name: "Algiz"   },
];

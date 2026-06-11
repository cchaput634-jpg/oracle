export type RunePosition = "Droite" | "Renversée";

export interface Rune {
  numero: number;
  nom: string;
  position: RunePosition;
  interpretation: string;
  image: string;
}

export interface RunesSlotPosition {
  key: string;
  label: string;
}

export interface DrawnRune {
  rune: Rune;
  slot?: RunesSlotPosition;
  isRevealed: boolean;
}

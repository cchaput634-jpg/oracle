export interface TarotCard {
  id: number;
  roman: string;
  name: string;
  meaning: string;
  image: string;
}

export interface TarotCrossPosition {
  key: string;
  label: string;
  role: string;
  /** Zone CSS grid pour le tirage en croix uniquement */
  gridArea?: "top" | "left" | "center" | "right" | "bottom";
}

export interface DrawnTarotCard {
  card: TarotCard;
  position?: TarotCrossPosition;
  isRevealed: boolean;
}

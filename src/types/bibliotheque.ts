export interface Book {
  id: string;
  title: string;
  author: string;
  /** Chemin public vers le PDF (sous /public) */
  pdf: string;
  /** Court résumé optionnel affiché sous la couverture */
  summary?: string;
  /** Couleur dominante CSS de la couverture (dégradés) */
  coverColor?: string;
}

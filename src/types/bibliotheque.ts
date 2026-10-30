export interface Book {
  id: string;
  title: string;
  /** Nom d'auteur ; absent = "Auteur inconnu" */
  author?: string;
  /** Chemin public vers la source du livre (sous /public) */
  source: string;
  /** Format du livre à charger dans le lecteur */
  format: "html" | "pdf";
  /** Court résumé optionnel affiché sous la couverture */
  summary?: string;
  /** Couleur dominante CSS de la couverture (dégradés) */
  coverColor?: string;
}

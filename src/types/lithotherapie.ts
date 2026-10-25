export interface LithoStone {
  id: number;
  nom: string;
  couleur: string;
  proprietes: string;
  intention: string;
  /** Dégradé CSS pour le visuel du galet (background CSS complet) */
  visual: string;
}

export interface LithoFamily {
  key: string;
  label: string;
  /** Noms de pierres (clé = `nom` du LithoStone) composant la famille */
  stones: string[];
}

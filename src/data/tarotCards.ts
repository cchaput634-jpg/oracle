import type { TarotCard, TarotCrossPosition } from "@/types/tarot";

export const TAROT_CARDS: TarotCard[] = [
  { id: 1,  roman: "I",     name: "L'Apprenti",       meaning: "Curiosité, potentiel, apprentissage des bases, spontanéité",                                                                 image: "/images/tarot/apprenti.png" },
  { id: 2,  roman: "II",    name: "L'Érudit",         meaning: "Savoir sur vous et vos secrets, connaissances profondes et inaccessibles",                                                   image: "/images/tarot/erudit.png" },
  { id: 3,  roman: "III",   name: "La Matrice",       meaning: "Créativité, fertilité, prospérité, puissance créatrice originelle, abondance",                                                image: "/images/tarot/matrice.png" },
  { id: 4,  roman: "IV",    name: "Le Chancelier",    meaning: "Structure, discipline, maîtrise, autorité, rigueur",                                                                         image: "/images/tarot/chancelier.png" },
  { id: 5,  roman: "V",     name: "L'Oracle",         meaning: "Tradition, guide, rituels sacrés, règles ancestrales, mariage",                                                              image: "/images/tarot/oracle.png" },
  { id: 6,  roman: "VI",    name: "Le Choix",         meaning: "Dilemme crucial, décision importante",                                                                                       image: "/images/tarot/choix.png" },
  { id: 7,  roman: "VII",   name: "L'Envol",          meaning: "Progression rapide, maîtrise des compétences, voyage vers un objectif, parfois œillères",                                     image: "/images/tarot/envol.png" },
  { id: 8,  roman: "VIII",  name: "Le Procès",        meaning: "Équité, punition, ordre et rigueur",                                                                                         image: "/images/tarot/proces.png" },
  { id: 9,  roman: "IX",    name: "Le Chercheur",     meaning: "L'introspection, quête de connaissance, prudence, recherche de secrets",                                                     image: "/images/tarot/chercheur.png" },
  { id: 10, roman: "X",     name: "Le Destin",        meaning: "Le cycle, événements imprévus, changements",                                                                                 image: "/images/tarot/destin.png" },
  { id: 11, roman: "XI",    name: "Le Rocher",        meaning: "Le courage, maîtrise de ses propres pouvoirs, résilience",                                                                   image: "/images/tarot/rocher.png" },
  { id: 12, roman: "XII",   name: "L'Entrave",        meaning: "Impasse, sacrifice nécessaire, nouvelle perspective obtenue par la contrainte",                                              image: "/images/tarot/entrave.png" },
  { id: 13, roman: "XIII",  name: "Le Dernier Rêve",  meaning: "La mort, la transformation, fin d'une ère, renouveau radical",                                                               image: "/images/tarot/dernier-reve.png" },
  { id: 14, roman: "XIV",   name: "L'Unisson",        meaning: "L'équilibre, harmonie, modération",                                                                                          image: "/images/tarot/unisson.png" },
  { id: 15, roman: "XV",    name: "Le Maléfice",      meaning: "La tentation, pactes dangereux, magie noire, vices",                                                                         image: "/images/tarot/malefice.png" },
  { id: 16, roman: "XVI",   name: "Le Donjon",        meaning: "La destruction soudaine, révélation choquante, effondrement, traumatismes passés",                                           image: "/images/tarot/donjon.png" },
  { id: 17, roman: "XVII",  name: "L'Astre",          meaning: "L'espoir, inspiration, guidance divine, clarté après la tempête",                                                            image: "/images/tarot/astre.png" },
  { id: 18, roman: "XVIII", name: "Le Miroir",        meaning: "L'illusion, mensonges, intuition, dangers de l'inconnu",                                                                     image: "/images/tarot/miroir.png" },
  { id: 19, roman: "XIX",   name: "Le Soleil",        meaning: "La joie, succès éclatant, vérité révélée, épanouissement total",                                                             image: "/images/tarot/soleil.png" },
  { id: 20, roman: "XX",    name: "Le Conseiller",    meaning: "L'éveil, rédemption, conséquences des actions, appel à l'action",                                                            image: "/images/tarot/conseiller.png" },
  { id: 21, roman: "XXI",   name: "Le Sanctuaire",    meaning: "L'accomplissement, plénitude, harmonie parfaite, maîtrise totale",                                                           image: "/images/tarot/sanctuaire.png" },
  { id: 22, roman: "XXII",  name: "Le Vagabond",      meaning: "L'aventure, insouciance, saut dans l'inconnu, début d'un nouveau voyage",                                                    image: "/images/tarot/vagabond.png" },
  { id: 23, roman: "XXIII", name: "L'Altérité",       meaning: "Créature magique, rapport aux autres cartes du tirage",                                                                      image: "/images/tarot/alterite.png" },
];

export const TAROT_CROSS_POSITIONS: TarotCrossPosition[] = [
  { key: "positif",    label: "Le Positif",    role: "Influences favorables",       gridArea: "left"   },
  { key: "negatif",    label: "Le Négatif",    role: "Obstacles & ombres",          gridArea: "right"  },
  { key: "synthese",   label: "La Synthèse",   role: "Ce qui résume le tirage",     gridArea: "top"    },
  { key: "consultant", label: "Le Consultant", role: "Vous, ici et maintenant",     gridArea: "center" },
  { key: "issue",      label: "L'Issue",       role: "Ce vers quoi tout tend",      gridArea: "bottom" },
];

export const TAROT_THREE_POSITIONS: TarotCrossPosition[] = [
  { key: "passe",   label: "Le Passé",   role: "Ce qui a été" },
  { key: "present", label: "Le Présent", role: "Ce qui est maintenant" },
  { key: "futur",   label: "Le Futur",   role: "Ce qui vient" },
];

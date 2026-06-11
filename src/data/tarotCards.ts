import type { TarotCard, TarotCrossPosition } from "@/types/tarot";

export const TAROT_CARDS: TarotCard[] = [
  { id: 1,  roman: "I",     name: "L'apprenti",         meaning: "Curiosité, potentiel, apprentissage des bases, spontanéité",                                       image: "/images/tarot/apprenti.png" },
  { id: 2,  roman: "II",    name: "La Bibliothécaire",  meaning: "Sagesse académique, connaissances profondes et inaccessibles, des informations connues de la personne seule ou de très peu d'autres", image: "/images/tarot/bibliothecaire.png" },
  { id: 3,  roman: "III",   name: "La Directrice",      meaning: "Créativité, fertilité, prospérité, autorité bienveillante, puissance créatrice",                   image: "/images/tarot/directrice.png" },
  { id: 4,  roman: "IV",    name: "Le Maître",          meaning: "Structure, discipline, maîtrise, autorité, rigueur",                                               image: "/images/tarot/maitre.png" },
  { id: 5,  roman: "V",     name: "Le Sage",            meaning: "Tradition, guidance, rituels sacrés, règles ancestrales, un chemin déjà parcouru par d'autres mais qui est difficile", image: "/images/tarot/sage.png" },
  { id: 6,  roman: "VI",    name: "Le Choix",           meaning: "Dilemme crucial, décision importante",                                                             image: "/images/tarot/choix.png" },
  { id: 7,  roman: "VII",   name: "Le Vol",             meaning: "Progression rapide, victoire, maîtrise des compétences, voyage vers un objectif",                  image: "/images/tarot/vol.png" },
  { id: 8,  roman: "VIII",  name: "La Discipline",      meaning: "L'équité, conséquences des actes, ordre et rigueur, punition", image: "/images/tarot/discipline.png" },
  { id: 9,  roman: "IX",    name: "Le Chercheur",       meaning: "L'introspection, quête de connaissance, prudence, recherche de secrets sur soi", image: "/images/tarot/chercheur.png" },
  { id: 10, roman: "X",     name: "Le Destin",          meaning: "Le cycle, événements imprévus, changements, quelque chose qu'on ne peut fuir — Carte Forte", image: "/images/tarot/destin.png" },
  { id: 11, roman: "XI",    name: "La Force",           meaning: "Le courage, maîtrise de ses propres pouvoirs, résilience",                                         image: "/images/tarot/force.png" },
  { id: 12, roman: "XII",   name: "Le Bloqué",          meaning: "Impasse, sacrifice nécessaire, nouvelle perspective obtenue par la contrainte",                    image: "/images/tarot/bloque.png" },
  { id: 13, roman: "XIII",  name: "La Transfiguration", meaning: "La transformation, fin d'une ère, renouveau radical, par extension la mort", image: "/images/tarot/transfiguration.png" },
  { id: 14, roman: "XIV",   name: "L'Elixir",           meaning: "L'équilibre, harmonie, modération",                                                                image: "/images/tarot/elixir.png" },
  { id: 15, roman: "XV",    name: "Le Maléfice",        meaning: "La tentation, pactes dangereux, magie noire, vices, créatures magiques — par extension un pouvoir fort à double tranchant (mancie)", image: "/images/tarot/malefice.png" },
  { id: 16, roman: "XVI",   name: "Le Donjon",          meaning: "La destruction soudaine, révélation choquante, effondrement, traumatisme passé ou à venir", image: "/images/tarot/donjon.png" },
  { id: 17, roman: "XVII",  name: "L'Astre",            meaning: "L'espoir, inspiration, guidance divine, clarté après la tempête",                                  image: "/images/tarot/astre.png" },
  { id: 18, roman: "XVIII", name: "Le Miroir",          meaning: "L'illusion, les secrets, intuition, dangers de l'inconnu, confusion, mensonge", image: "/images/tarot/miroir.png" },
  { id: 19, roman: "XIX",   name: "La Lumière",         meaning: "La joie, succès éclatant, vérité révélée, épanouissement total",                                    image: "/images/tarot/lumiere.png" },
  { id: 20, roman: "XX",    name: "Le Conseil",         meaning: "L'éveil, rédemption, conséquences des actions, appel à l'action — dans le négatif, peut parler de culpabilité", image: "/images/tarot/conseil.png" },
  { id: 21, roman: "XXI",   name: "Le Sanctuaire",      meaning: "L'accomplissement, plénitude, harmonie parfaite, maîtrise totale, en accord avec soi-même", image: "/images/tarot/sanctuaire.png" },
  { id: 22, roman: "XXII",  name: "Le Vagabond",        meaning: "L'aventure, insouciance, saut dans l'inconnu, début d'un nouveau voyage",                          image: "/images/tarot/vagabond.png" },
];

export const TAROT_CROSS_POSITIONS: TarotCrossPosition[] = [
  { key: "positif",    label: "Le Positif",    role: "Influences favorables",       gridArea: "left"   },
  { key: "negatif",    label: "Le Négatif",    role: "Obstacles & ombres",          gridArea: "right"  },
  { key: "synthese",   label: "La Synthèse",   role: "Ce qui résume le tirage",     gridArea: "top"    },
  { key: "consultant", label: "Le Consultant", role: "Vous, ici et maintenant",     gridArea: "center" },
  { key: "issue",      label: "L'Issue",       role: "Ce vers quoi tout tend",      gridArea: "bottom" },
];

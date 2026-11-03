import type { Pendule } from "@/types/pendule";

export const PENDULES: Pendule[] = [
  {
    key: "cristal",
    name: "Pendule de Cristal de Roche",
    materiau: "Quartz clair, chaînette d'argent",
    forme: "Pointe hexagonale taillée à facettes",
    usage:
      "Clarté et neutralité. Pour les questions simples du quotidien, les réponses oui / non.",
  },
  {
    key: "mermet",
    name: "Pendule Mermet",
    materiau: "Laiton massif, chaînette métallique",
    forme: "Goutte allongée à cavité dévissable (témoin)",
    usage:
      "Pour les questions liées à un être ou un objet perdus, pour la recherche.",
  },
  {
    key: "egyptien",
    name: "Pendule Égyptien",
    materiau: "Bois de hêtre ou buis, cordon de coton",
    forme: "Empilement de disques et de sphères sculptés",
    usage:
      "Questionnement sur soi, sur la santé énergétique, le bien-être.",
  },
];

import type { Rune, RunesSlotPosition } from "@/types/runes";

const runeImg = (nom: string, position: "Droite" | "Renversée"): string => {
  if (position === "Droite") return `/images/runes/${nom}.png`;
  if (nom === "Fehu" || nom === "Uruz") return `/images/runes/${nom} renversée.png`;
  return `/images/runes/${nom} Renversée.png`;
};

const raw: Omit<Rune, "image">[] = [
  { numero: 1,  nom: "Fehu",     position: "Droite",    interpretation: "Succès, Richesse, Biens Acquis. Abondance matérielle et spirituelle, énergie, espoir." },
  { numero: 2,  nom: "Fehu",     position: "Renversée", interpretation: "Perte, Déception, Frustration. Échec, aliénation, richesse perdue, cupidité." },
  { numero: 3,  nom: "Uruz",     position: "Droite",    interpretation: "Force, Santé, Vitalité. Changement positif, courage, désir, instinct, potentiel inexploité." },
  { numero: 4,  nom: "Uruz",     position: "Renversée", interpretation: "Faiblesse, Manque de Volonté, Maladie. Opportunités manquées, incapacité à s'adapter, force mal dirigée." },
  { numero: 5,  nom: "Thurisaz", position: "Droite",    interpretation: "Protection, Force Destructrice (Mjolnir). Conflit, défense, régénération, besoin d'agir avec prudence, force brute." },
  { numero: 6,  nom: "Thurisaz", position: "Renversée", interpretation: "Vulnérabilité, Impuissance, Mauvais Jugement. Trahison, danger non perçu, besoin d'auto-réflexion, force opposée." },
  { numero: 7,  nom: "Ansuz",    position: "Droite",    interpretation: "Sagesse, Communication, Inspiration Divine. Messages, apprentissage, vérité, bénédictions, conseils." },
  { numero: 8,  nom: "Ansuz",    position: "Renversée", interpretation: "Malentendu, Illusion, Manipulation. Pièges, échec de communication, tromperie, conseils non fiables." },
  { numero: 9,  nom: "Raido",    position: "Droite",    interpretation: "Voyage, Chemin, Évolution. Mouvement, rythme, quête personnelle, réunions, voyage intérieur/extérieur." },
  { numero: 10, nom: "Raido",    position: "Renversée", interpretation: "Crise, Mauvaise Direction, Retard. Rupture, voyage annulé, frustration, stagnation, perte de contrôle." },
  { numero: 11, nom: "Kenaz",    position: "Droite",    interpretation: "Lumière, Créativité, Révélation. Connaissance, inspiration, passion, feu intérieur, nouvelle idée." },
  { numero: 12, nom: "Kenaz",    position: "Renversée", interpretation: "Extinction, Obscurité, Maladie. Fin d'une relation/phase, manque d'inspiration, perte de clarté." },
  { numero: 13, nom: "Gebo",     position: "Droite",    interpretation: "Don, Partenariat, Échange. Relations équilibrées, générosité, unions sacrées, cadeaux." },
  { numero: 14, nom: "Wunjo",    position: "Droite",    interpretation: "Joie, Harmonie, Félicité. Succès, contentement, paix intérieure, communauté, réalisation." },
  { numero: 15, nom: "Wunjo",    position: "Renversée", interpretation: "Souffrance, Dispute, Stagnation. Crise, aliénation, euphorie mal placée, blocage de la joie." },
  { numero: 16, nom: "Hagalaz",  position: "Droite",    interpretation: "Catastrophe, Perturbation Subite. Force incontrôlable, destruction nécessaire, crise, lâcher-prise." },
  { numero: 17, nom: "Naudhiz",  position: "Droite",    interpretation: "Contrainte, Besoin, Restriction. Patience, résistance, épreuve, détresse, se serrer la ceinture." },
  { numero: 18, nom: "Is",       position: "Droite",    interpretation: "Glace, Arrêt, Immobilité. Blocage, attente, suspension d'activité, introspection forcée, gel." },
  { numero: 19, nom: "Jera",     position: "Droite",    interpretation: "Récolte, Cycle, Temps. Récompense des efforts, succès progressif, année fertile, justice divine." },
  { numero: 20, nom: "Eihwaz",   position: "Droite",    interpretation: "Défense, Transformation, Persévérance. Connexion vie/mort, initiation, force du destin, protection magique." },
  { numero: 21, nom: "Perthro",  position: "Droite",    interpretation: "Mystère, Destinée, Secret. Hasard, initiation, révélation de l'inconnu, gain inattendu." },
  { numero: 22, nom: "Perthro",  position: "Renversée", interpretation: "Stagnation, Confusion, Déception. Peur de l'inconnu, perte, manque de clarté, secrets non révélés." },
  { numero: 23, nom: "Algiz",    position: "Droite",    interpretation: "Protection, Instinct, Sanctuaire. Défense, connexion spirituelle, bouclier, aide divine, instinct de survie." },
  { numero: 24, nom: "Algiz",    position: "Renversée", interpretation: "Vulnérabilité, Défense Brisée, Cachette. Manque de protection, sacrifice, faiblesse non reconnue, danger." },
  { numero: 25, nom: "Sowilo",   position: "Droite",    interpretation: "Soleil, Énergie Vitale, Succès. Clarté, honneur, force solaire, objectifs atteints, vision." },
  { numero: 26, nom: "Tiwaz",    position: "Droite",    interpretation: "Justice, Victoire, Courage. Discipline, sacrifice personnel, chef, autorité, analyse logique." },
  { numero: 27, nom: "Tiwaz",    position: "Renversée", interpretation: "Perte d'Énergie, Injustice, Échec. Blocage créatif, manque de passion, perte de foi, sacrifice vain." },
  { numero: 28, nom: "Berkano",  position: "Droite",    interpretation: "Croissance, Fertilité, Renaissance. Famille, nouveau départ, guérison, développement, amour maternel." },
  { numero: 29, nom: "Berkano",  position: "Renversée", interpretation: "Stérilité, Problèmes Domestiques, Anxiété. Blocage de la croissance, négligence, perte de contrôle, stagnation." },
  { numero: 30, nom: "Ehwaz",    position: "Droite",    interpretation: "Mouvement, Transport, Partenariat. Confiance, travail d'équipe, progrès, déménagement, cheval." },
  { numero: 31, nom: "Ehwaz",    position: "Renversée", interpretation: "Stagnation, Méfiance, Retards. Incapacité à bouger, manque d'harmonie, voyage interrompu, discorde." },
  { numero: 32, nom: "Mannaz",   position: "Droite",    interpretation: "L'Humanité, Soi, Intelligence. Conscience collective, perspective, aide mutuelle, le rôle de l'individu." },
  { numero: 33, nom: "Mannaz",   position: "Renversée", interpretation: "Auto-Sabotage, Cécité, Ennemi Intérieur. Illusion, absence d'aide, hostilité envers soi-même ou les autres." },
  { numero: 34, nom: "Laguz",    position: "Droite",    interpretation: "Eau, Flux, Intuition. Émotions, inconscient, vie, imagination, rêve, nettoyage." },
  { numero: 35, nom: "Laguz",    position: "Renversée", interpretation: "Peur, Blocage Émotionnel, Mauvais Jugement. Fuite de la réalité, manque d'intuition, toxicité, perte d'énergie." },
  { numero: 36, nom: "Ingwaz",   position: "Droite",    interpretation: "Achèvement, Incubation, Potentiel. Fin d'une phase, fertilité masculine, libération d'énergie, attente paisible." },
  { numero: 37, nom: "Othala",   position: "Droite",    interpretation: "Héritage, Foyer, Biens Ancestaux. Patrie, séparation nécessaire, valeurs fondamentales, sécurité matérielle." },
  { numero: 38, nom: "Othala",   position: "Renversée", interpretation: "Perte, Sans Abri, Pauvreté. Manque d'ordre, obstacles bureaucratiques, préjugés, manque de fondations." },
  { numero: 39, nom: "Dagaz",    position: "Droite",    interpretation: "Jour, Éveil, Percée. Transformation radicale, espoir, clarté soudaine, réussite d'un nouveau départ." },
  { numero: 40, nom: "Wyrd",     position: "Droite",    interpretation: "Destin, L'Inconnu, Potentiel Pur. Ce qui n'est pas encore manifesté, karma, secret caché, besoin d'accepter le destin." },
];

export const RUNES: Rune[] = raw.map((r) => ({ ...r, image: runeImg(r.nom, r.position) }));

/** Pour les tirages à 3 runes (un nom seulement par nom de rune — la position est tirée au sort) */
export const UNIQUE_RUNE_NAMES: string[] = Array.from(new Set(RUNES.map((r) => r.nom)));

export const RUNES_THREE_POSITIONS: RunesSlotPosition[] = [
  { key: "passe",   label: "Le Passé"   },
  { key: "present", label: "Le Présent" },
  { key: "avenir",  label: "L'Avenir"   },
];

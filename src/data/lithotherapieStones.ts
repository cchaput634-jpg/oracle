import type { LithoFamily, LithoStone } from "@/types/lithotherapie";

/** Dégradés CSS stylisés — galet poli, lumière en haut-gauche, ombre en bas-droit */
const stone = (base: string, hi: string, lo: string, extra = ""): string =>
  [
    `radial-gradient(circle at 30% 25%, ${hi} 0%, transparent 55%)`,
    `radial-gradient(circle at 70% 80%, ${lo} 0%, transparent 60%)`,
    extra,
    `linear-gradient(135deg, ${base} 0%, ${lo} 100%)`,
  ]
    .filter(Boolean)
    .join(", ");

export const LITHO_STONES: LithoStone[] = [
  { id: 1,  nom: "Améthyste",         couleur: "Violet",                  proprietes: "Apaise l'esprit, favorise le sommeil et l'intuition",   intention: "Trouver le calme intérieur",         visual: stone("#6b2fb3", "#c99af5", "#2b0f4d") },
  { id: 2,  nom: "Quartz rose",       couleur: "Rose pâle",               proprietes: "Douceur, amour, bienveillance envers soi",              intention: "Apaiser un lien, s'aimer soi-même",  visual: stone("#f2b6c0", "#ffe3ea", "#8f4555") },
  { id: 3,  nom: "Cristal de roche",  couleur: "Incolore",                proprietes: "Clarté, amplifie les autres énergies",                  intention: "Voir clair dans une décision",       visual: stone("#e8ecf3", "#ffffff", "#8ea0b5") },
  { id: 4,  nom: "Tourmaline noire",  couleur: "Noir",                    proprietes: "Bouclier contre les énergies négatives",                intention: "Se protéger",                        visual: stone("#1a1a1f", "#4a4a55", "#000000") },
  { id: 5,  nom: "Œil de tigre",      couleur: "Brun doré",               proprietes: "Confiance, courage, volonté",                           intention: "Oser, affronter une peur",           visual: stone("#8a5a1e", "#f6c858", "#2a1708", "repeating-linear-gradient(118deg, rgba(0,0,0,0.25) 0 2px, transparent 2px 7px)") },
  { id: 6,  nom: "Citrine",           couleur: "Jaune",                   proprietes: "Joie, réussite, abondance",                             intention: "Réussir un projet",                  visual: stone("#f0c13a", "#fff2a8", "#8c6a10") },
  { id: 7,  nom: "Labradorite",       couleur: "Gris à reflets bleus",    proprietes: "Protège l'aura, renforce la magie",                     intention: "Protéger sa magie",                  visual: stone("#4a556b", "#9ec5e8", "#1b1f2a", "radial-gradient(circle at 60% 40%, rgba(140,220,255,0.5), transparent 40%)") },
  { id: 8,  nom: "Lapis-lazuli",      couleur: "Bleu nuit pailleté d'or", proprietes: "Sagesse, vérité, communication",                        intention: "Gagner en sagesse",                  visual: stone("#1e3a8a", "#4f7bd8", "#0a1b4e", "radial-gradient(1px 1px at 25% 30%, rgba(255,215,120,0.95), transparent 60%), radial-gradient(1px 1px at 65% 60%, rgba(255,215,120,0.9), transparent 60%), radial-gradient(1.2px 1.2px at 45% 75%, rgba(255,215,120,0.95), transparent 60%), radial-gradient(0.8px 0.8px at 80% 25%, rgba(255,215,120,0.8), transparent 60%)") },
  { id: 9,  nom: "Aventurine verte",  couleur: "Vert",                    proprietes: "Chance, nouvelles opportunités",                        intention: "Attirer la chance",                  visual: stone("#4b9755", "#a8e6b1", "#1d3f23") },
  { id: 10, nom: "Cornaline",         couleur: "Orange",                  proprietes: "Vitalité, créativité, motivation",                      intention: "Retrouver de l'énergie",             visual: stone("#d8641e", "#ffb080", "#5c2409") },
  { id: 11, nom: "Obsidienne",        couleur: "Noir brillant",           proprietes: "Libère les blocages, révèle les ombres",                intention: "Se libérer du passé",                visual: stone("#0a0a0f", "#6a6a7a", "#000000", "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.35), transparent 25%)") },
  { id: 12, nom: "Hématite",          couleur: "Gris métallique",         proprietes: "Ancrage, stabilité, concentration",                     intention: "Rester stable",                      visual: stone("#4a4e55", "#c5cad3", "#1a1c20", "radial-gradient(circle at 55% 40%, rgba(220,225,235,0.4), transparent 35%)") },
  { id: 13, nom: "Aigue-marine",      couleur: "Bleu clair",              proprietes: "Sérénité, fluidité, expression libre",                  intention: "S'adapter au changement",            visual: stone("#6cc3d4", "#c7eef5", "#1e5c6e") },
  { id: 14, nom: "Sodalite",          couleur: "Bleu profond veiné de blanc", proprietes: "Logique, apprentissage, mémoire",                   intention: "Réussir ses études",                 visual: stone("#1f3e8a", "#5f7fcf", "#0a1b4e", "radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.35), transparent 25%), radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.25), transparent 20%)") },
  { id: 15, nom: "Jaspe rouge",       couleur: "Rouge brique",            proprietes: "Endurance, force physique",                             intention: "Tenir sur la durée",                 visual: stone("#9c3827", "#e07d6a", "#3b1109") },
  { id: 16, nom: "Malachite",         couleur: "Vert à bandes",           proprietes: "Transformation, renouveau",                             intention: "Changer de vie",                     visual: stone("#1f6f4b", "#4fc38a", "#0a2a1b", "repeating-radial-gradient(ellipse at 50% 50%, rgba(5,30,20,0.55) 0 6px, rgba(80,180,120,0.3) 6px 14px)") },
  { id: 17, nom: "Turquoise",         couleur: "Bleu-vert",               proprietes: "Protège les voyageurs",                                 intention: "Voyager en sécurité",                visual: stone("#2fb8b1", "#90e8e0", "#0d4a46", "radial-gradient(ellipse at 35% 55%, rgba(40,30,15,0.35), transparent 20%)") },
  { id: 18, nom: "Pierre de soleil",  couleur: "Orangé scintillant",      proprietes: "Optimisme, rayonnement, leadership",                    intention: "Guider les autres",                  visual: stone("#dc7a1e", "#ffdc8a", "#5a2409", "radial-gradient(1px 1px at 30% 40%, rgba(255,240,180,0.95), transparent 60%), radial-gradient(1.2px 1.2px at 60% 65%, rgba(255,240,180,0.9), transparent 60%), radial-gradient(0.8px 0.8px at 75% 35%, rgba(255,240,180,0.85), transparent 60%)") },
  { id: 19, nom: "Fluorite",          couleur: "Violet et vert",          proprietes: "Concentration, ordre dans les pensées",                 intention: "Organiser son esprit",               visual: stone("#5e3a9b", "#b096e8", "#1e1148", "radial-gradient(ellipse at 65% 70%, rgba(90,210,140,0.55), transparent 40%), radial-gradient(ellipse at 30% 30%, rgba(180,120,230,0.5), transparent 35%)") },
  { id: 20, nom: "Sélénite",          couleur: "Blanc nacré",             proprietes: "Purification, élévation spirituelle",                   intention: "S'élever spirituellement",           visual: stone("#f0ecd8", "#ffffff", "#b8b2a0", "repeating-linear-gradient(100deg, rgba(255,255,255,0.3) 0 3px, transparent 3px 9px)") },
  { id: 21, nom: "Amazonite",         couleur: "Vert d'eau",              proprietes: "Harmonie, apaise les émotions",                         intention: "Trouver l'équilibre",                visual: stone("#6ac5a5", "#c3ebd9", "#1f5a46", "radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.25), transparent 25%)") },
  { id: 22, nom: "Grenat",            couleur: "Rouge sombre",            proprietes: "Passion, détermination",                                intention: "Aller au bout d'un but",             visual: stone("#6b1518", "#c04248", "#2a0509") },
  { id: 23, nom: "Calcédoine bleue",  couleur: "Bleu pâle",               proprietes: "Douceur des paroles, écoute",                           intention: "Mieux communiquer",                  visual: stone("#9bc5d6", "#dcefef", "#3e6878") },
  { id: 24, nom: "Angélite",          couleur: "Bleu ciel",               proprietes: "Lien avec les guides, sérénité",                        intention: "Se relier aux esprits du ciel",      visual: stone("#a9c7e4", "#e4eff8", "#4d6b8a") },
  { id: 25, nom: "Onyx",              couleur: "Noir mat",                proprietes: "Maîtrise de soi, discipline",                           intention: "Garder le contrôle de soi",          visual: stone("#141418", "#3a3a40", "#000000") },
];

export const LITHO_FAMILIES: LithoFamily[] = [
  { key: "protection",  label: "Protection",                 stones: ["Tourmaline noire", "Labradorite", "Turquoise"] },
  { key: "apaisement",  label: "Apaisement et équilibre",    stones: ["Améthyste", "Amazonite", "Quartz rose", "Hématite"] },
  { key: "courage",     label: "Courage et force",           stones: ["Œil de tigre", "Jaspe rouge", "Grenat", "Cornaline"] },
  { key: "esprit",      label: "Esprit et savoir",           stones: ["Cristal de roche", "Lapis-lazuli", "Sodalite", "Fluorite"] },
  { key: "reussite",    label: "Réussite et chance",         stones: ["Citrine", "Aventurine verte", "Pierre de soleil"] },
  { key: "changement",  label: "Changement et libération",   stones: ["Malachite", "Obsidienne", "Aigue-marine"] },
  { key: "elevation",   label: "Élévation et lien spirituel", stones: ["Sélénite", "Angélite"] },
  { key: "relations",   label: "Relations et parole",        stones: ["Calcédoine bleue", "Quartz rose"] },
  { key: "maitrise",    label: "Maîtrise de soi",            stones: ["Onyx"] },
];

/** Lookup rapide par nom pour reconstituer une famille */
export const STONE_BY_NAME: Record<string, LithoStone> = Object.fromEntries(
  LITHO_STONES.map((s) => [s.nom, s])
);

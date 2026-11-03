import type { PenduleKey } from "@/types/pendule";
import { cn } from "@/lib/utils";

interface Props {
  type: PenduleKey;
  className?: string;
  /** Longueur de la chaîne en unités SVG (défaut 130) */
  chainLength?: number;
}

/**
 * SVG du pendule complet (chaîne + corps).
 * Point d'attache = (50, 0) tout en haut du viewBox — c'est le pivot naturel
 * pour l'animation de balancement.
 */
export function PenduleArt({ type, className, chainLength = 130 }: Props) {
  return (
    <svg
      viewBox="0 0 100 220"
      className={cn("block h-full w-auto", className)}
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        {/* Cristal : translucide bleuté avec reflets */}
        <linearGradient id="grad-crystal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.95)" />
          <stop offset="40%"  stopColor="rgba(200,220,240,0.7)" />
          <stop offset="70%"  stopColor="rgba(140,170,200,0.55)" />
          <stop offset="100%" stopColor="rgba(80,100,130,0.65)" />
        </linearGradient>
        {/* Laiton : doré chaud avec patine */}
        <linearGradient id="grad-brass" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%"   stopColor="#fbe99a" />
          <stop offset="35%"  stopColor="#d9a84a" />
          <stop offset="70%"  stopColor="#8a5f1a" />
          <stop offset="100%" stopColor="#5a3b0d" />
        </linearGradient>
        {/* Bois : hêtre miel, grain visible */}
        <linearGradient id="grad-wood" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%"   stopColor="#dfb47a" />
          <stop offset="55%"  stopColor="#a67238" />
          <stop offset="100%" stopColor="#5e3d17" />
        </linearGradient>
        {/* Reflet métallique sur laiton */}
        <radialGradient id="shine-brass" cx="0.3" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="rgba(255,250,210,0.75)" />
          <stop offset="60%" stopColor="rgba(255,250,210,0)" />
        </radialGradient>
      </defs>

      {/* Attache au sommet */}
      <circle cx="50" cy="2" r="2.5" fill="rgba(240,220,140,0.8)" />

      {/* Chaîne / cordon selon le type */}
      {type === "cristal" && (
        <line
          x1="50" y1="4" x2="50" y2={chainLength}
          stroke="rgba(220,225,235,0.75)" strokeWidth="1"
          strokeDasharray="1 1.4"
        />
      )}
      {type === "mermet" && (
        <line
          x1="50" y1="4" x2="50" y2={chainLength}
          stroke="rgba(210,180,100,0.85)" strokeWidth="1"
          strokeDasharray="1.2 1.6"
        />
      )}
      {type === "egyptien" && (
        <line
          x1="50" y1="4" x2="50" y2={chainLength}
          stroke="#c7a874" strokeWidth="1.2"
        />
      )}

      {/* Corps du pendule */}
      {type === "cristal" && <Cristal cy={chainLength} />}
      {type === "mermet" && <Mermet cy={chainLength} />}
      {type === "egyptien" && <Egyptien cy={chainLength} />}
    </svg>
  );
}

/* ---------- Corps ---------- */

function Cristal({ cy }: { cy: number }) {
  // Hexagone pointu : attache haute à cy, pointe en bas
  const top = cy;
  const mid1 = cy + 12;
  const mid2 = cy + 40;
  const bot = cy + 72;
  return (
    <g>
      <polygon
        points={`50,${top} 68,${mid1} 68,${mid2} 50,${bot} 32,${mid2} 32,${mid1}`}
        fill="url(#grad-crystal)"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="0.6"
      />
      {/* arêtes : facettes centrale et transversale */}
      <line x1="50" y1={top} x2="50" y2={bot} stroke="rgba(255,255,255,0.45)" strokeWidth="0.6" />
      <line x1="32" y1={mid1} x2="68" y2={mid1} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <line x1="32" y1={mid2} x2="68" y2={mid2} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      {/* reflet diagonal */}
      <polygon
        points={`45,${top + 4} 55,${top + 4} 48,${bot - 8}`}
        fill="rgba(255,255,255,0.25)"
      />
    </g>
  );
}

function Mermet({ cy }: { cy: number }) {
  // Goutte : ronde en haut, effilée en bas
  const d = `
    M 50 ${cy}
    L 70 ${cy + 22}
    A 20 20 0 1 0 30 ${cy + 22}
    L 50 ${cy}
    Z
  `;
  // Alternative plus naturelle : partie supérieure ronde et pointe vers le bas
  const dropD = `
    M 50 ${cy + 82}
    Q 74 ${cy + 60} 72 ${cy + 30}
    A 22 22 0 1 0 28 ${cy + 30}
    Q 26 ${cy + 60} 50 ${cy + 82}
    Z
  `;
  return (
    <g>
      <path d={dropD} fill="url(#grad-brass)" />
      <path d={dropD} fill="url(#shine-brass)" />
      {/* Pas de vis au niveau le plus large */}
      <line
        x1="28" y1={cy + 30} x2="72" y2={cy + 30}
        stroke="rgba(60,40,10,0.55)" strokeWidth="0.6"
      />
      {/* Petit anneau d'attache */}
      <circle cx="50" cy={cy + 2} r="2.4" fill="none" stroke="#c99a3a" strokeWidth="1" />
      {/* ignore unused */}
      {d && null}
    </g>
  );
}

function Egyptien({ cy }: { cy: number }) {
  return (
    <g>
      {/* Disque supérieur fin */}
      <ellipse cx="50" cy={cy + 6} rx="16" ry="4" fill="url(#grad-wood)" />
      {/* Sphère 1 */}
      <circle cx="50" cy={cy + 18} r="11" fill="url(#grad-wood)" />
      {/* Disque médian large */}
      <ellipse cx="50" cy={cy + 34} rx="20" ry="5.5" fill="url(#grad-wood)" />
      {/* Sphère 2 */}
      <circle cx="50" cy={cy + 48} r="10" fill="url(#grad-wood)" />
      {/* Disque inférieur */}
      <ellipse cx="50" cy={cy + 62} rx="15" ry="4.5" fill="url(#grad-wood)" />
      {/* Pointe arrondie finale */}
      <ellipse cx="50" cy={cy + 76} rx="6" ry="12" fill="url(#grad-wood)" />
      {/* Veines du bois (reflet mat) */}
      <ellipse cx="46" cy={cy + 18} rx="3" ry="8" fill="rgba(255,235,190,0.25)" />
    </g>
  );
}

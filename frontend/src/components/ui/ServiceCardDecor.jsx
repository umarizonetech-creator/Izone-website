import { Globe, Cog, Smartphone, Brain, ShieldCheck, Target, Cloud, Award, Megaphone } from "lucide-react";
import { getTagIcon } from "../../lib/tagIcons";

// Shared decorative building blocks used by every "service card" style
// across the site (FlipCard front/back, and the Index.jsx bento grid).
// Keeping them here means one visual language, reused everywhere.

const HEX_CLIP =
  "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)";

// Large floating hexagon icon badge with a soft top-light "glass" layer
// for a bit of depth, plus a colored glow behind it.
export function HexBadge({ icon, accent, size = "lg", className = "" }) {
  const dims = size === "lg" ? "w-[72px] h-[72px]" : "w-16 h-16";
  const iconWrap = size === "lg" ? "scale-125" : "scale-100";

  return (
    <div className={`relative ${dims} flex-shrink-0 ${className}`}>
      {/* Ambient glow behind the badge */}
      <div
        className={`absolute inset-1 rounded-full ${accent.blob} blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
      />
      {/* Hexagon body */}
      <div
        className={`relative w-full h-full bg-gradient-to-br ${accent.badge} ${accent.badgeRing} ${accent.badgeGlow} flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out`}
        style={{ clipPath: HEX_CLIP }}
      >
        {/* Glass highlight layer for a layered/depth feel */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/5 to-transparent dark:from-white/10 dark:via-transparent"
          style={{ clipPath: HEX_CLIP }}
        />
        <span className={`relative z-10 ${accent.icon} ${iconWrap}`}>{icon}</span>
      </div>
    </div>
  );
}

// Visible dotted grid, tucked in a corner.
export function DotGrid({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none absolute w-28 h-28 opacity-[0.16] ${className}`}
      viewBox="0 0 112 112"
      fill="none"
    >
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={10 + col * 18}
            cy={10 + row * 18}
            r="1.7"
            fill="currentColor"
          />
        ))
      )}
    </svg>
  );
}

// One themed line-art icon per accent color, used as a large, very faint
// illustration in a card's bottom-right corner (echoes the globe / gear /
// phone / shield / target motifs from the reference).
const CORNER_ICONS = {
  blue: Globe,
  green: Cog,
  purple: Smartphone,
  violet: Brain,
  orange: ShieldCheck,
  pink: Target,
  cyan: Cloud,
  emerald: Award,
  indigo: Megaphone,
};

export function AbstractCorner({ accentKey = "blue", className = "" }) {
  const Icon = CORNER_ICONS[accentKey] || Globe;
  return (
    <Icon
      className={`pointer-events-none absolute w-40 h-40 opacity-[0.07] ${className}`}
      strokeWidth={1}
    />
  );
}

// A single technology / feature pill: small icon + label, colored to match
// the card's accent, mirroring the reference's tech-stack chips.
export function TagPill({ text, accent, className = "" }) {
  const Icon = getTagIcon(text);
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border ${accent.tag} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      {text}
    </span>
  );
}

// // Shared accent-color system for premium service cards.
// // Each entry only ever uses literal Tailwind class strings (no dynamic
// // interpolation) so the JIT compiler can pick them all up.

// export const accentColors = {
//   blue: {
//     badge: "from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/20",
//     badgeRing: "ring-1 ring-blue-200/70 dark:ring-blue-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(59,130,246,0.55)]",
//     icon: "text-blue-600 dark:text-blue-400",
//     label: "text-blue-600 dark:text-blue-400",
//     underline: "bg-blue-500",
//     tag: "bg-blue-50/80 text-blue-700 border-blue-200/70 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/40",
//     link: "text-blue-600 dark:text-blue-400",
//     arrow: "bg-blue-500 group-hover:bg-blue-600",
//     blob: "bg-blue-400",
//     hoverBorder: "hover:border-blue-300/70 dark:hover:border-blue-700/50",
//     dot: "bg-blue-400",
//   },
//   green: {
//     badge: "from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-900/20",
//     badgeRing: "ring-1 ring-green-200/70 dark:ring-green-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(34,197,94,0.55)]",
//     icon: "text-green-600 dark:text-green-400",
//     label: "text-green-600 dark:text-green-400",
//     underline: "bg-green-500",
//     tag: "bg-green-50/80 text-green-700 border-green-200/70 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/40",
//     link: "text-green-600 dark:text-green-400",
//     arrow: "bg-green-500 group-hover:bg-green-600",
//     blob: "bg-green-400",
//     hoverBorder: "hover:border-green-300/70 dark:hover:border-green-700/50",
//     dot: "bg-green-400",
//   },
//   purple: {
//     badge: "from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/20",
//     badgeRing: "ring-1 ring-purple-200/70 dark:ring-purple-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(168,85,247,0.55)]",
//     icon: "text-purple-600 dark:text-purple-400",
//     label: "text-purple-600 dark:text-purple-400",
//     underline: "bg-purple-500",
//     tag: "bg-purple-50/80 text-purple-700 border-purple-200/70 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800/40",
//     link: "text-purple-600 dark:text-purple-400",
//     arrow: "bg-purple-500 group-hover:bg-purple-600",
//     blob: "bg-purple-400",
//     hoverBorder: "hover:border-purple-300/70 dark:hover:border-purple-700/50",
//     dot: "bg-purple-400",
//   },
//   violet: {
//     badge: "from-violet-50 to-violet-100 dark:from-violet-950/50 dark:to-violet-900/20",
//     badgeRing: "ring-1 ring-violet-200/70 dark:ring-violet-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(139,92,246,0.55)]",
//     icon: "text-violet-600 dark:text-violet-400",
//     label: "text-violet-600 dark:text-violet-400",
//     underline: "bg-violet-500",
//     tag: "bg-violet-50/80 text-violet-700 border-violet-200/70 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800/40",
//     link: "text-violet-600 dark:text-violet-400",
//     arrow: "bg-violet-500 group-hover:bg-violet-600",
//     blob: "bg-violet-400",
//     hoverBorder: "hover:border-violet-300/70 dark:hover:border-violet-700/50",
//     dot: "bg-violet-400",
//   },
//   orange: {
//     badge: "from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/20",
//     badgeRing: "ring-1 ring-orange-200/70 dark:ring-orange-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(249,115,22,0.55)]",
//     icon: "text-orange-600 dark:text-orange-400",
//     label: "text-orange-600 dark:text-orange-400",
//     underline: "bg-orange-500",
//     tag: "bg-orange-50/80 text-orange-700 border-orange-200/70 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800/40",
//     link: "text-orange-600 dark:text-orange-400",
//     arrow: "bg-orange-500 group-hover:bg-orange-600",
//     blob: "bg-orange-400",
//     hoverBorder: "hover:border-orange-300/70 dark:hover:border-orange-700/50",
//     dot: "bg-orange-400",
//   },
//   pink: {
//     badge: "from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/20",
//     badgeRing: "ring-1 ring-pink-200/70 dark:ring-pink-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(236,72,153,0.55)]",
//     icon: "text-pink-600 dark:text-pink-400",
//     label: "text-pink-600 dark:text-pink-400",
//     underline: "bg-pink-500",
//     tag: "bg-pink-50/80 text-pink-700 border-pink-200/70 dark:bg-pink-950/30 dark:text-pink-300 dark:border-pink-800/40",
//     link: "text-pink-600 dark:text-pink-400",
//     arrow: "bg-pink-500 group-hover:bg-pink-600",
//     blob: "bg-pink-400",
//     hoverBorder: "hover:border-pink-300/70 dark:hover:border-pink-700/50",
//     dot: "bg-pink-400",
//   },
//   cyan: {
//     badge: "from-cyan-50 to-cyan-100 dark:from-cyan-950/50 dark:to-cyan-900/20",
//     badgeRing: "ring-1 ring-cyan-200/70 dark:ring-cyan-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(6,182,212,0.55)]",
//     icon: "text-cyan-600 dark:text-cyan-400",
//     label: "text-cyan-600 dark:text-cyan-400",
//     underline: "bg-cyan-500",
//     tag: "bg-cyan-50/80 text-cyan-700 border-cyan-200/70 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-800/40",
//     link: "text-cyan-600 dark:text-cyan-400",
//     arrow: "bg-cyan-500 group-hover:bg-cyan-600",
//     blob: "bg-cyan-400",
//     hoverBorder: "hover:border-cyan-300/70 dark:hover:border-cyan-700/50",
//     dot: "bg-cyan-400",
//   },
//   emerald: {
//     badge: "from-emerald-50 to-teal-100 dark:from-emerald-950/50 dark:to-teal-900/20",
//     badgeRing: "ring-1 ring-emerald-200/70 dark:ring-emerald-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(16,185,129,0.55)]",
//     icon: "text-emerald-600 dark:text-emerald-400",
//     label: "text-emerald-600 dark:text-emerald-400",
//     underline: "bg-emerald-500",
//     tag: "bg-emerald-50/80 text-emerald-700 border-emerald-200/70 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/40",
//     link: "text-emerald-600 dark:text-emerald-400",
//     arrow: "bg-emerald-500 group-hover:bg-emerald-600",
//     blob: "bg-emerald-400",
//     hoverBorder: "hover:border-emerald-300/70 dark:hover:border-emerald-700/50",
//     dot: "bg-emerald-400",
//   },
//   indigo: {
//     badge: "from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/20",
//     badgeRing: "ring-1 ring-indigo-200/70 dark:ring-indigo-800/40",
//     badgeGlow: "shadow-[0_10px_28px_-10px_rgba(99,102,241,0.55)]",
//     icon: "text-indigo-600 dark:text-indigo-400",
//     label: "text-indigo-600 dark:text-indigo-400",
//     underline: "bg-indigo-500",
//     tag: "bg-indigo-50/80 text-indigo-700 border-indigo-200/70 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800/40",
//     link: "text-indigo-600 dark:text-indigo-400",
//     arrow: "bg-indigo-500 group-hover:bg-indigo-600",
//     blob: "bg-indigo-400",
//     hoverBorder: "hover:border-indigo-300/70 dark:hover:border-indigo-700/50",
//     dot: "bg-indigo-400",
//   },
// };

// export function getAccent(key) {
//   return accentColors[key] || accentColors.green;
// }






















// Shared accent-color system for premium service cards.
// Every accent key resolves to the same IZONE brand-green theme (driven by
// the --primary CSS variable), so all cards render in brand green while the
// rest of the design/logic (HexBadge, DotGrid, AbstractCorner, TagPill,
// Index.jsx) stays completely untouched.
// Each entry only ever uses literal Tailwind class strings (no dynamic
// interpolation) so the JIT compiler can pick them all up.

const brandGreen = {
  badge: "from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/10",
  badgeRing: "ring-1 ring-primary/20 dark:ring-primary/30",
  badgeGlow: "shadow-[0_10px_28px_-10px_rgba(36,137,102,0.55)]",
  icon: "text-primary",
  label: "text-primary",
  underline: "bg-primary",
  tag: "bg-primary/10 text-primary border-primary/20 dark:bg-primary/15 dark:text-primary dark:border-primary/30",
  link: "text-primary",
  arrow: "bg-primary group-hover:bg-primary/85",
  blob: "bg-primary",
  hoverBorder: "hover:border-primary/40 dark:hover:border-primary/40",
  dot: "bg-primary",
};

export const accentColors = {
  blue: brandGreen,
  green: brandGreen,
  purple: brandGreen,
  violet: brandGreen,
  orange: brandGreen,
  pink: brandGreen,
  cyan: brandGreen,
  emerald: brandGreen,
  indigo: brandGreen,
};

export function getAccent(key) {
  return accentColors[key] || accentColors.green;
}

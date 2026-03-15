export const colorGradients: Record<string, { from: string; to: string }> = {
  coral: { from: "#ff6b6b", to: "#ee5a24" },
  ocean: { from: "#0abde3", to: "#2e86de" },
  purple: { from: "#a55eea", to: "#8854d0" },
  green: { from: "#2ed573", to: "#05c46b" },
  amber: { from: "#ffa502", to: "#ff6348" },
  pink: { from: "#ff6b81", to: "#ee5a80" },
  teal: { from: "#00d2d3", to: "#01a3a4" },
  indigo: { from: "#6366f1", to: "#4f46e5" },
  slate: { from: "#576574", to: "#222f3e" },
  rose: { from: "#f368e0", to: "#e056c0" },
  lime: { from: "#badc58", to: "#6ab04c" },
  sky: { from: "#48dbfb", to: "#0abde3" },
};

export function getGradientStyle(color: string) {
  const g = colorGradients[color] ?? colorGradients.indigo;
  return {
    background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
  };
}

export function getDesktopIconBg(color: string) {
  const g = colorGradients[color] ?? colorGradients.indigo;
  return {
    background: `${g.from}33`, // 20% opacity
  };
}

// Solid color hex map for squircle icons (mobile light mode)
export const colorHex: Record<string, string> = {
  coral: "#EF4444",
  ocean: "#0EA5E9",
  purple: "#7C3AED",
  green: "#10B981",
  amber: "#F59E0B",
  pink: "#EC4899",
  teal: "#14B8A6",
  indigo: "#4F46E5",
  slate: "#475569",
  rose: "#F43F5E",
  lime: "#84CC16",
  sky: "#38BDF8",
};

export function getSquircleStyle(color: string): {
  backgroundColor: string;
  boxShadow: string;
} {
  const hex = colorHex[color] ?? colorHex.indigo;
  return {
    backgroundColor: hex,
    boxShadow: `0 8px 24px ${hex}33`, // 20% opacity shadow
  };
}

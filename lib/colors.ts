/** Apple-toned solid color map for app icons */
export const colorHex: Record<string, string> = {
  green: "#34C759",
  indigo: "#5856D6",
  purple: "#AF52DE",
  amber: "#FF9500",
  pink: "#FF2D55",
  teal: "#5AC8FA",
  slate: "#8E8E93",
  rose: "#FF3B30",
  lime: "#30D158",
  ocean: "#007AFF",
  coral: "#FF6961",
  sky: "#5AC8FA",
};

export function getSquircleStyle(color: string): {
  backgroundColor: string;
  boxShadow: string;
} {
  const hex = colorHex[color] ?? colorHex.indigo;
  return {
    backgroundColor: hex,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  };
}

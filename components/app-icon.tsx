"use client";

import { getSquircleStyle } from "@/lib/colors";
import { getIcon } from "@/lib/icon-map";

interface AppIconProps {
  iconName: string;
  color: string;
  status?: "live" | "dev";
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
}

const sizes = {
  sm: { container: "w-12 h-12", icon: "w-5 h-5" },
  md: { container: "w-14 h-14", icon: "w-6 h-6" },
  lg: { container: "w-16 h-16 sm:w-20 sm:h-20", icon: "w-8 h-8" },
};

export function AppIcon({
  iconName,
  color,
  status,
  size = "lg",
  showBadge = false,
}: AppIconProps) {
  const Icon = getIcon(iconName);
  const style = getSquircleStyle(color);
  const s = sizes[size];

  return (
    <div
      className={`relative flex items-center justify-center squircle ${s.container}`}
      style={style}
    >
      <Icon className={`${s.icon} text-white`} />
      {showBadge && status && (
        <div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#F6F6F8] ${
            status === "live" ? "bg-emerald-500" : "bg-amber-400"
          }`}
        />
      )}
    </div>
  );
}

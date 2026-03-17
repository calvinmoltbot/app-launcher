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
  sm: { container: "w-8 h-8", icon: "w-4 h-4" },
  md: { container: "w-11 h-11", icon: "w-5 h-5" },
  lg: { container: "w-[60px] h-[60px]", icon: "w-7 h-7" },
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
      <Icon className={`${s.icon} text-white`} strokeWidth={1.5} />
      {showBadge && status && (
        <div
          className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-bg ${
            status === "live" ? "bg-[#34C759]" : "bg-[#FF9500]"
          }`}
        />
      )}
    </div>
  );
}

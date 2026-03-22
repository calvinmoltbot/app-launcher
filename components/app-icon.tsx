"use client";

import { motion } from "framer-motion";
import { getSquircleStyle } from "@/lib/colors";
import { getIcon } from "@/lib/icon-map";

interface AppIconProps {
  iconName: string;
  color: string;
  status?: "live" | "dev";
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
  className?: string;
  layoutId?: string;
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
  className,
  layoutId,
}: AppIconProps) {
  const Icon = getIcon(iconName);
  const style = getSquircleStyle(color);
  const s = sizes[size];

  const content = (
    <>
      <Icon className={`${s.icon} text-white`} strokeWidth={1.5} />
      {showBadge && status && (
        <div
          className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-bg ${
            status === "live" ? "bg-[#34C759]" : "bg-[#FF9500]"
          }`}
        />
      )}
    </>
  );

  if (layoutId) {
    return (
      <motion.div
        layoutId={layoutId}
        className={`relative flex items-center justify-center squircle ${s.container} ${className ?? ""}`}
        style={style}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center squircle ${s.container} ${className ?? ""}`}
      style={style}
    >
      {content}
    </div>
  );
}

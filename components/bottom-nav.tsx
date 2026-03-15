"use client";

import { Home, LayoutGrid, BarChart3, User } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, active: true },
  { id: "library", label: "Library", icon: LayoutGrid, active: false },
  { id: "stats", label: "Stats", icon: BarChart3, active: false },
  { id: "account", label: "Account", icon: User, active: false },
] as const;

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 px-6 py-3 pb-[calc(env(safe-area-inset-bottom,8px)+12px)] z-10">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-1 transition-colors ${
              item.active
                ? "text-[#0F49BD]"
                : "text-slate-400 hover:text-[#0F49BD]"
            }`}
          >
            <div className="relative">
              <item.icon
                className={`w-6 h-6 ${item.active ? "fill-current" : ""}`}
              />
              {item.active && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0F49BD] rounded-full"
                />
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

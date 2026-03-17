"use client";

import { Home, LayoutGrid, BarChart3, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, active: true },
  { id: "library", label: "Library", icon: LayoutGrid, active: false },
  { id: "stats", label: "Stats", icon: BarChart3, active: false },
  { id: "account", label: "Account", icon: User, active: false },
] as const;

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-[rgba(0,0,0,0.06)] px-6 py-2 pb-[calc(env(safe-area-inset-bottom,8px)+8px)] z-10 md:hidden">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              item.active ? "text-[#007AFF]" : "text-[#AEAEB2]"
            }`}
          >
            <item.icon className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[10px] font-normal">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

"use client";

export type FilterTab = "all" | "live" | "dev";

interface FilterTabsProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
}

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "dev", label: "Dev" },
];

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-white/5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 px-4 py-2.5 text-[13px] font-semibold rounded-[10px] transition-all duration-250 border-none cursor-pointer ${
            active === tab.key
              ? "bg-[#6366f1] text-white shadow-[0_2px_12px_rgba(99,102,241,0.3)]"
              : "text-white/50 bg-transparent hover:text-white/70"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

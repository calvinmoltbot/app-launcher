"use client";

export type FilterTab = "all" | "live" | "dev";

interface FilterTabsProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
  counts?: { all: number; live: number; dev: number };
}

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "dev", label: "Dev" },
];

export function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-[10px] bg-black/[0.04]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative flex-1 px-4 py-[7px] text-[13px] font-medium rounded-[8px] transition-all duration-200 border-none cursor-pointer ${
            active === tab.key
              ? "bg-white shadow-sm text-[#1D1D1F]"
              : "bg-transparent text-[#6E6E73]"
          }`}
        >
          {tab.label}
          {counts && (
            <span className="ml-1 text-[#AEAEB2]">
              ({counts[tab.key]})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

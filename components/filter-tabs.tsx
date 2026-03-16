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
    <div className="flex gap-1 p-1 rounded-xl bg-slate-200/50">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 px-4 py-2.5 text-[13px] font-semibold rounded-[10px] transition-all duration-250 border-none cursor-pointer ${
            active === tab.key
              ? "bg-[#0F49BD] text-white shadow-[0_2px_12px_rgba(15,73,189,0.3)]"
              : "text-slate-500 bg-transparent hover:text-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getStaticApps } from "@/data/apps";
import { FilterTabs, type FilterTab } from "./filter-tabs";
import { StatsRow } from "./stats-row";
import { FeaturedCard } from "./featured-card";
import { getDesktopIconBg } from "@/lib/colors";
import { getIcon } from "@/lib/icon-map";

export function DesktopCards() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");

  const apps = useMemo(() => getStaticApps(), []);
  const pinnedApp = apps.find((a) => a.pinned);

  const filtered = useMemo(() => {
    let list = apps.sort((a, b) => a.order - b.order);
    if (filter !== "all") {
      list = list.filter((a) => a.status === filter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search, apps]);

  return (
    <div className="min-h-dvh bg-[#0c0c0e] text-[#f5f5f7] pb-12">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/[0.08] bg-[rgba(12,12,14,0.85)] backdrop-blur-[20px]">
        <div className="max-w-2xl mx-auto px-5">
          <div className="flex justify-between items-center py-4">
            <div className="text-[22px] font-extrabold tracking-tight bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              warmwetcircles
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-sm font-bold text-white">
              C
            </div>
          </div>

          {/* Search + Tabs */}
          <div className="pb-4">
            <input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-3 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/5 text-white text-sm outline-none placeholder:text-white/40 focus:border-[#6366f1]/50 transition-colors"
            />
            <FilterTabs active={filter} onChange={setFilter} />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-5">
        <StatsRow />

        {pinnedApp && <FeaturedCard app={pinnedApp} />}

        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold tracking-tight">Your Apps</div>
          <div className="text-[13px] text-[#6366f1] font-semibold cursor-pointer">
            {filtered.length} apps
          </div>
        </div>

        <div className="space-y-3.5">
          {filtered.map((app) => (
            <Link
              key={app.id}
              href={`/app/${app.id}`}
              className="group flex items-center gap-4 rounded-[20px] border border-white/[0.08] bg-[#1a1a1e] p-5 no-underline transition-all duration-250 hover:bg-[#222226] active:scale-[0.98] relative overflow-hidden"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 w-1 h-full rounded-r"
                style={{
                  background: `linear-gradient(180deg, ${
                    getDesktopIconBg(app.color).background
                  }, transparent)`,
                }}
              />

              {/* Icon */}
              {(() => {
                const Icon = getIcon(app.icon);
                return (
                  <div
                    className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0"
                    style={getDesktopIconBg(app.color)}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                );
              })()}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold tracking-tight text-white">
                  {app.name}
                </div>
                <div className="text-[13px] text-white/50 leading-snug">
                  {app.description}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      app.status === "live"
                        ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e]"
                        : "bg-[rgba(245,158,11,0.15)] text-[#f59e0b]"
                    }`}
                  >
                    {app.status}
                  </span>
                  <span className="text-[11px] text-white/50 capitalize">
                    {app.category}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-white/30 shrink-0 group-hover:text-white/50 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

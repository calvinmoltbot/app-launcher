"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Pin } from "lucide-react";
import { getStaticApps } from "@/data/apps";
import type { App } from "@/data/apps";
import { AppIcon } from "./app-icon";
import { SearchBar } from "./search-bar";
import { BottomNav } from "./bottom-nav";
import { FilterTabs, type FilterTab } from "./filter-tabs";

function DesktopRow({ app }: { app: App }) {
  const appUrl = `https://${app.subdomain}.warmwetcircles.com`;
  return (
    <Link
      href={`/app/${app.id}`}
      className="flex items-center gap-4 px-4 py-3 hover:bg-black/[0.02] transition-colors no-underline group"
    >
      <AppIcon iconName={app.icon} color={app.color} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[17px] text-[#1D1D1F] font-normal">
            {app.name}
          </span>
          {app.pinned && (
            <Pin className="w-3 h-3 text-[#AEAEB2] fill-current" />
          )}
        </div>
        <span className="text-[13px] text-[#6E6E73] leading-tight line-clamp-1">
          {app.description}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div
          className={`w-2 h-2 rounded-full ${
            app.status === "live" ? "bg-[#34C759]" : "bg-[#FF9500]"
          }`}
        />
        <ChevronRight className="w-4 h-4 text-[#AEAEB2] group-hover:text-[#6E6E73] transition-colors" />
      </div>
    </Link>
  );
}

export function AppLauncher() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");

  const apps = useMemo(() => getStaticApps(), []);

  const counts = useMemo(() => ({
    all: apps.length,
    live: apps.filter((a) => a.status === "live").length,
    dev: apps.filter((a) => a.status === "dev").length,
  }), [apps]);

  const filtered = useMemo(() => {
    let list = [...apps];

    // Pinned apps sort first
    list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return a.order - b.order;
    });

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
  }, [search, filter, apps]);

  const now = new Date();
  const dateLine = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-dvh bg-bg">
      {/* Header */}
      <header className="px-6 pt-8 pb-2 sticky top-0 z-10 bg-bg/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto">
          {/* Mobile header */}
          <div className="md:hidden space-y-1 mb-4">
            <h1 className="text-[34px] font-semibold tracking-tight text-text-primary">
              Apps
            </h1>
            <p className="text-[13px] text-text-secondary">
              {dateLine}
            </p>
          </div>

          {/* Desktop header */}
          <div className="hidden md:flex items-baseline justify-between mb-6">
            <h1 className="text-[34px] font-semibold tracking-tight text-text-primary">
              Apps
            </h1>
            <div className="w-64">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: Search + Filters */}
      <section className="px-6 pb-3 md:hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <SearchBar value={search} onChange={setSearch} />
          <FilterTabs active={filter} onChange={setFilter} counts={counts} />
        </div>
      </section>

      {/* Desktop: Filters */}
      <section className="hidden md:block px-6 pb-2">
        <div className="max-w-2xl mx-auto">
          <FilterTabs active={filter} onChange={setFilter} counts={counts} />
        </div>
      </section>

      {/* Mobile: Icon Grid */}
      <main className="flex-1 px-6 py-4 md:hidden">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-y-7 gap-x-2">
            {filtered.map((app) => (
              <Link
                key={app.id}
                href={`/app/${app.id}`}
                className="flex flex-col items-center gap-[6px] cursor-pointer no-underline active:scale-95 transition-transform"
              >
                <AppIcon iconName={app.icon} color={app.color} />
                <span className="text-[11px] font-normal text-text-primary text-center w-full leading-tight line-clamp-2 px-0.5">
                  {app.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Desktop: Settings-style list */}
      <main className="flex-1 px-6 py-2 hidden md:block">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[12px] overflow-hidden divide-y divide-[rgba(0,0,0,0.06)]">
            {filtered.map((app) => (
              <DesktopRow key={app.id} app={app} />
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation (mobile only) */}
      <BottomNav />
    </div>
  );
}

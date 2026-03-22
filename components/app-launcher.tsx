"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Pin, RefreshCw, ArrowUpRight, Loader2 } from "lucide-react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { getStaticApps } from "@/data/apps";
import type { App } from "@/data/apps";
import { AppIcon } from "./app-icon";
import { AppDetail } from "./app-detail";
import { SearchBar } from "./search-bar";
import { BottomNav } from "./bottom-nav";
import { FilterTabs, type FilterTab } from "./filter-tabs";
import { WidgetGrid } from "./widget-grid";

type CategoryFilter = "all" | "creative" | "data" | "productivity" | "tools";

const categoryLabels: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "creative", label: "Creative" },
  { key: "data", label: "Data" },
  { key: "productivity", label: "Productivity" },
  { key: "tools", label: "Tools" },
];

function BentoCard({
  app,
  onSelect,
}: {
  app: App;
  onSelect: (app: App) => void;
}) {
  const isPinned = app.pinned;
  const appUrl = `https://${app.subdomain}.warmwetcircles.com`;

  return (
    <div
      onClick={() => onSelect(app)}
      className={`group relative flex flex-col justify-between bg-surface-container-lowest rounded-[16px] p-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] cursor-pointer ${
        isPinned ? "col-span-2 min-h-[140px]" : "min-h-[120px]"
      }`}
    >
      {/* Status dot + Quick Launch */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-black/[0.06] text-text-tertiary hover:text-primary no-underline"
          title={`Open ${app.name}`}
        >
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
        </a>
        <div
          className={`w-[6px] h-[6px] rounded-full ${
            app.status === "live" ? "bg-semantic-live" : "bg-semantic-dev"
          }`}
        />
      </div>

      {/* Icon */}
      <AppIcon
        iconName={app.icon}
        color={app.color}
        size={isPinned ? "lg" : "md"}
        layoutId={`icon-${app.id}`}
      />

      {/* Info */}
      <div className="mt-auto pt-3">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-semibold text-text-primary leading-tight ${
              isPinned ? "text-[17px]" : "text-[14px]"
            }`}
          >
            {app.name}
          </span>
          {isPinned && (
            <Pin className="w-3 h-3 text-text-muted fill-current shrink-0" />
          )}
        </div>
        <span className="text-[11px] text-text-tertiary leading-tight line-clamp-1 mt-0.5 block">
          {app.description}
        </span>
      </div>
    </div>
  );
}

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function AppLauncher() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [apps, setApps] = useState<App[]>(() => getStaticApps());
  const [syncing, setSyncing] = useState(false);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  // On mount, check if URL matches /app/[id] and hydrate selectedApp
  useEffect(() => {
    const match = window.location.pathname.match(/^\/app\/(.+)$/);
    if (match) {
      const id = match[1];
      const found = apps.find((a) => a.id === id);
      if (found) {
        setSelectedApp(found);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // URL management: push/pop state
  const openApp = useCallback(
    (app: App) => {
      setSelectedApp(app);
      window.history.pushState({ appId: app.id }, "", `/app/${app.id}`);
    },
    []
  );

  const closeApp = useCallback(() => {
    setSelectedApp(null);
    if (window.location.pathname.startsWith("/app/")) {
      window.history.pushState(null, "", "/");
    }
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/app\/(.+)$/);
      if (match) {
        const found = apps.find((a) => a.id === match[1]);
        setSelectedApp(found ?? null);
      } else {
        setSelectedApp(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [apps]);

  const syncApps = useCallback(async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/sync");
      if (res.ok) {
        const data = await res.json();
        if (data.apps?.length) setApps(data.apps);
      }
    } catch {
      // keep existing apps on failure
    } finally {
      setSyncing(false);
    }
  }, []);

  // Fetch on mount + poll every 5 minutes
  useEffect(() => {
    syncApps();
    const id = setInterval(syncApps, SYNC_INTERVAL);
    return () => clearInterval(id);
  }, [syncApps]);

  const counts = useMemo(
    () => ({
      all: apps.length,
      live: apps.filter((a) => a.status === "live").length,
      dev: apps.filter((a) => a.status === "dev").length,
    }),
    [apps]
  );

  const filtered = useMemo(() => {
    let list = [...apps];
    list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return a.order - b.order;
    });
    if (filter !== "all") {
      list = list.filter((a) => a.status === filter);
    }
    if (category !== "all") {
      list = list.filter((a) => a.category === category);
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
  }, [search, filter, category, apps]);

  // Pull-to-refresh state
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);
  const PULL_THRESHOLD = 60;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling.current || refreshing) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      setPullDistance(Math.min(delta * 0.5, 100));
    }
  }, [refreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling.current) return;
    isPulling.current = false;
    if (pullDistance >= PULL_THRESHOLD && !refreshing) {
      setRefreshing(true);
      setPullDistance(PULL_THRESHOLD);
      await syncApps();
      setRefreshing(false);
    }
    setPullDistance(0);
  }, [pullDistance, refreshing, syncApps]);

  const now = new Date();
  const dateLine = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <LayoutGroup>
      <div className="flex flex-col min-h-dvh bg-bg">
        {/* Header */}
        <header className="px-6 pt-8 pb-2 sticky top-0 z-10 bg-bg/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto md:max-w-5xl">
            {/* Mobile header */}
            <div className="md:hidden space-y-1 mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-[34px] font-semibold tracking-tight text-text-primary">
                  Apps
                </h1>
                <button
                  onClick={syncApps}
                  disabled={syncing}
                  className="p-2 rounded-full hover:bg-black/[0.04] transition-colors disabled:opacity-40"
                  title="Refresh apps from Vercel"
                >
                  <RefreshCw
                    className={`w-4 h-4 text-text-tertiary ${syncing ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
              <p className="text-[13px] text-text-secondary">{dateLine}</p>
            </div>

            {/* Desktop header */}
            <div className="hidden md:flex items-baseline justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-[34px] font-semibold tracking-tight text-text-primary">
                  Apps
                </h1>
                <button
                  onClick={syncApps}
                  disabled={syncing}
                  className="p-1.5 rounded-full hover:bg-black/[0.04] transition-colors disabled:opacity-40"
                  title="Refresh apps from Vercel"
                >
                  <RefreshCw
                    className={`w-4 h-4 text-text-tertiary ${syncing ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
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

        {/* Desktop: Filter bar */}
        <section className="hidden md:block px-6 pb-4">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <FilterTabs active={filter} onChange={setFilter} counts={counts} />
            <div className="w-px h-6 bg-black/[0.08]" />
            <div className="flex gap-1.5">
              {categoryLabels.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-3 py-[5px] text-[13px] font-medium rounded-full transition-all border-none cursor-pointer ${
                    category === cat.key
                      ? "bg-text-primary text-on-primary"
                      : "bg-black/[0.04] text-text-tertiary hover:bg-black/[0.08]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile: Icon Grid with pull-to-refresh */}
        <main
          className="flex-1 px-6 py-4 md:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Pull-to-refresh indicator */}
          <div
            className="flex items-center justify-center overflow-hidden transition-all duration-200"
            style={{
              height: pullDistance > 0 || refreshing ? `${refreshing ? PULL_THRESHOLD : pullDistance}px` : "0px",
              opacity: pullDistance > 0 || refreshing ? 1 : 0,
            }}
          >
            <Loader2
              className={`w-5 h-5 text-text-tertiary ${
                refreshing ? "animate-spin" : ""
              }`}
              style={{
                transform: refreshing
                  ? undefined
                  : `rotate(${(pullDistance / PULL_THRESHOLD) * 360}deg)`,
              }}
            />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-4 gap-y-7 gap-x-2">
              {filtered.map((app) => (
                <div
                  key={app.id}
                  onClick={() => {
                    if (navigator.vibrate) navigator.vibrate(10);
                    openApp(app);
                  }}
                  className="flex flex-col items-center gap-[6px] cursor-pointer active:scale-95 transition-transform"
                >
                  <AppIcon
                    iconName={app.icon}
                    color={app.color}
                    layoutId={`icon-${app.id}`}
                  />
                  <span className="text-[11px] font-normal text-text-primary text-center w-full leading-tight line-clamp-2 px-0.5">
                    {app.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Desktop: Bento Grid */}
        <main className="flex-1 px-6 py-2 hidden md:block">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-5 gap-3">
              {filtered.map((app) => (
                <BentoCard key={app.id} app={app} onSelect={openApp} />
              ))}
            </div>
          </div>
        </main>

        {/* Dashboard Widgets (desktop only) */}
        <WidgetGrid apps={apps} />

        {/* Bottom Navigation (mobile only) */}
        <BottomNav />
      </div>

      {/* Detail overlay */}
      <AnimatePresence mode="wait">
        {selectedApp && (
          <AppDetail
            key={selectedApp.id}
            app={selectedApp}
            onClose={closeApp}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

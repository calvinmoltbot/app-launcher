"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getStaticApps } from "@/data/apps";
import { AppIcon } from "./app-icon";
import { SearchBar } from "./search-bar";
import { BottomNav } from "./bottom-nav";

export function MobileGrid() {
  const [search, setSearch] = useState("");

  const apps = useMemo(() => getStaticApps(), []);
  const appCount = apps.length;

  const filtered = useMemo(() => {
    if (!search) return apps;
    const q = search.toLowerCase();
    return apps.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
    );
  }, [search, apps]);

  const now = new Date();
  const dateLine = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-dvh bg-[#F6F6F8]">
      {/* Sticky Header */}
      <header className="px-6 pt-8 pb-4 sticky top-0 z-10 bg-[#F6F6F8]/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div />
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center border border-white/20">
            <span className="text-white font-bold text-sm">C</span>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            {dateLine} &bull;{" "}
            <span className="text-[#0F49BD]/80">{appCount} Apps</span>
          </p>
        </div>
      </header>

      {/* Search */}
      <section className="px-6 py-4">
        <SearchBar value={search} onChange={setSearch} />
      </section>

      {/* App Grid */}
      <main className="flex-1 px-6 py-4">
        <div className="grid grid-cols-4 gap-y-8 gap-x-4">
          {filtered
            .sort((a, b) => a.order - b.order)
            .map((app, i) => (
              <motion.a
                key={app.id}
                href={`https://${app.subdomain}.warmwetcircles.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 cursor-pointer no-underline"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
              >
                <AppIcon iconName={app.icon} color={app.color} />
                <span className="text-xs font-medium text-slate-600 text-center max-w-[72px] truncate">
                  {app.name}
                </span>
              </motion.a>
            ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

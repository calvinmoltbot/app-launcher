"use client";

import Link from "next/link";
import { ArrowLeft, Share2, MoreHorizontal, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { App } from "@/data/apps";
import { AppIcon } from "./app-icon";
import { BottomNav } from "./bottom-nav";

interface AppDetailProps {
  app: App;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 flex justify-between items-center">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className="text-slate-900 text-sm font-medium">{value}</span>
    </div>
  );
}

export function AppDetail({ app }: AppDetailProps) {
  const appUrl = `https://${app.subdomain}.warmwetcircles.com`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: app.name, url: appUrl });
    } else {
      await navigator.clipboard.writeText(appUrl);
    }
  };

  return (
    <div className="min-h-dvh bg-[#F6F6F8] text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-[#F6F6F8]/80 backdrop-blur-md p-4 justify-between border-b border-[#0F49BD]/10">
        <Link
          href="/"
          className="flex size-10 items-center justify-center rounded-full hover:bg-[#0F49BD]/10 transition-colors text-slate-900"
        >
          <ArrowLeft className="size-6" />
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          App Details
        </h2>
        <button
          onClick={handleShare}
          className="flex size-10 items-center justify-center rounded-full hover:bg-[#0F49BD]/10 transition-colors text-slate-900"
        >
          <Share2 className="size-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* App Identity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex p-6"
        >
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-5 items-center">
              <div className="shrink-0">
                <AppIcon
                  iconName={app.icon}
                  color={app.color}
                  size="lg"
                  showBadge={false}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">
                  {app.name}
                </h1>
                <p className="text-[#0F49BD] font-semibold text-sm">
                  warmwetcircles
                </p>
                <p className="text-slate-500 text-sm capitalize">
                  {app.category} •{" "}
                  {app.status === "live" ? "Live" : "In Development"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none min-w-[120px] flex items-center justify-center gap-2 rounded-full h-11 px-8 bg-[#0F49BD] text-white text-sm font-bold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#0F49BD]/20 no-underline"
              >
                <span>Open</span>
                <ExternalLink className="size-4" />
              </a>
              <button className="flex size-11 items-center justify-center rounded-full bg-[#0F49BD]/10 text-[#0F49BD] hover:bg-[#0F49BD]/20 transition-colors">
                <MoreHorizontal className="size-6" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 px-6"
        >
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-white border border-[#0F49BD]/5 shadow-sm">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Status
            </p>
            <p
              className={`text-lg font-bold ${
                app.status === "live" ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {app.status === "live" ? "Live" : "Dev"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-white border border-[#0F49BD]/5 shadow-sm">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Category
            </p>
            <p className="text-slate-900 text-lg font-bold capitalize">
              {app.category}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-white border border-[#0F49BD]/5 shadow-sm">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Pinned
            </p>
            <p className="text-slate-900 text-lg font-bold">
              {app.pinned ? "Yes" : "No"}
            </p>
          </div>
        </motion.section>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 space-y-3"
        >
          <h3 className="text-slate-900 text-lg font-bold">About</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {app.description}
          </p>
        </motion.section>

        {/* Information */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-6"
        >
          <h3 className="text-slate-900 text-lg font-bold mb-4">
            Information
          </h3>
          <div className="divide-y divide-[#0F49BD]/10">
            <InfoRow label="URL" value={`${app.subdomain}.warmwetcircles.com`} />
            <InfoRow label="Category" value={app.category} />
            <InfoRow
              label="Status"
              value={app.status === "live" ? "Live" : "In Development"}
            />
            <InfoRow label="Pinned" value={app.pinned ? "Yes" : "No"} />
          </div>
        </motion.section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

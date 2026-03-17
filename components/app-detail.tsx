"use client";

import Link from "next/link";
import { ArrowLeft, Share2, ExternalLink } from "lucide-react";
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
      <span className="text-[#6E6E73] text-[15px]">{label}</span>
      <span className="text-[#1D1D1F] text-[15px] font-medium">{value}</span>
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
    <div className="min-h-dvh bg-bg text-text-primary flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-bg/80 backdrop-blur-md p-4 justify-between border-b border-[rgba(0,0,0,0.06)]">
        <Link
          href="/"
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/[0.04] transition-colors text-text-primary"
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </Link>
        <h2 className="text-[17px] font-semibold leading-tight tracking-tight flex-1 text-center">
          App Details
        </h2>
        <button
          onClick={handleShare}
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/[0.04] transition-colors text-text-primary"
        >
          <Share2 className="size-5" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 max-w-2xl mx-auto w-full">
        {/* App Identity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex p-6"
        >
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4 items-center">
              <div className="shrink-0">
                <AppIcon
                  iconName={app.icon}
                  color={app.color}
                  size="lg"
                  showBadge={false}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-text-primary">
                  {app.name}
                </h1>
                <p className="text-[#007AFF] font-medium text-[13px]">
                  warmwetcircles
                </p>
                <p className="text-text-secondary text-[13px] capitalize">
                  {app.category} •{" "}
                  {app.status === "live" ? "Live" : "In Development"}
                </p>
              </div>
            </div>
            <div>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-[10px] h-11 px-8 bg-[#007AFF] text-white text-[15px] font-semibold transition-all hover:opacity-90 active:scale-95 shadow-md no-underline"
              >
                <span>Open</span>
                <ExternalLink className="size-4" strokeWidth={1.5} />
              </a>
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
          <div className="flex flex-col items-center justify-center gap-1 rounded-[12px] p-4 bg-white border border-[rgba(0,0,0,0.06)]">
            <p className="text-text-secondary text-[11px] font-medium uppercase tracking-wider">
              Status
            </p>
            <p
              className={`text-[17px] font-semibold ${
                app.status === "live" ? "text-[#34C759]" : "text-[#FF9500]"
              }`}
            >
              {app.status === "live" ? "Live" : "Dev"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-[12px] p-4 bg-white border border-[rgba(0,0,0,0.06)]">
            <p className="text-text-secondary text-[11px] font-medium uppercase tracking-wider">
              Category
            </p>
            <p className="text-text-primary text-[17px] font-semibold capitalize">
              {app.category}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-[12px] p-4 bg-white border border-[rgba(0,0,0,0.06)]">
            <p className="text-text-secondary text-[11px] font-medium uppercase tracking-wider">
              Pinned
            </p>
            <p className="text-text-primary text-[17px] font-semibold">
              {app.pinned ? "Yes" : "No"}
            </p>
          </div>
        </motion.section>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 space-y-2"
        >
          <h3 className="text-text-primary text-[17px] font-semibold">About</h3>
          <p className="text-text-secondary text-[15px] leading-relaxed">
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
          <h3 className="text-text-primary text-[17px] font-semibold mb-3">
            Information
          </h3>
          <div className="bg-white rounded-[12px] px-4 divide-y divide-[rgba(0,0,0,0.06)]">
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

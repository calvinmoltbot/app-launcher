"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { App } from "@/data/apps";
import { AppIcon } from "./app-icon";

interface AppDetailProps {
  app: App;
}

export function AppDetail({ app }: AppDetailProps) {
  const appUrl = `https://${app.subdomain}.warmwetcircles.com`;

  return (
    <div className="h-dvh bg-bg text-text-primary font-sans flex flex-col overflow-hidden">
      {/* Background — blurred grid (desktop only) */}
      <div className="fixed inset-0 z-0 overflow-hidden blur-md opacity-30 select-none pointer-events-none hidden md:block">
        <div className="grid grid-cols-4 gap-8 p-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-surface-container-low rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* Top navigation */}
      <nav className="shrink-0 z-50 glass-panel shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 w-full max-w-6xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-primary no-underline hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-semibold tracking-tight hidden sm:inline">
              Apps
            </span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <span className="text-text-tertiary text-sm font-medium px-3 py-1 rounded-lg hover:bg-black/[0.04] transition-all cursor-pointer">
              Archive
            </span>
            <span className="text-text-tertiary text-sm font-medium px-3 py-1 rounded-lg hover:bg-black/[0.04] transition-all cursor-pointer">
              Tools
            </span>
            <span className="text-primary font-bold text-sm px-3 py-1">
              Details
            </span>
          </div>
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-text-tertiary hover:text-primary transition-colors no-underline"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Visit</span>
          </a>
        </div>
      </nav>

      {/* Main overlay card — fills remaining viewport */}
      <main className="relative z-10 flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-full max-w-5xl max-h-full glass-panel rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Visual column */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col items-center justify-center bg-surface-container-low/50 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              {/* Large icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="mb-5"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 bg-surface-container-lowest rounded-[2rem] shadow-xl flex items-center justify-center">
                  <AppIcon
                    iconName={app.icon}
                    color={app.color}
                    size="lg"
                    showBadge={false}
                    className="!w-22 !h-22 sm:!w-24 sm:!h-24 !rounded-2xl"
                  />
                </div>
              </motion.div>

              {/* Project label + name */}
              <div className="space-y-1 text-center">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">
                  {app.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tighter text-text-primary">
                  {app.name}
                </h2>
              </div>
            </div>

            {/* Decorative blurs */}
            <div className="absolute top-0 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* Content column — scrollable if needed */}
          <div className="w-full md:w-3/5 p-6 sm:p-8 bg-surface-container-lowest flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-5"
              >
                <span className="text-xs font-semibold tracking-wide text-text-tertiary uppercase">
                  {app.category}
                </span>
                <span className="w-1 h-1 bg-outline-variant rounded-full" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {app.status === "live" ? "Live" : "In Development"}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    app.status === "live"
                      ? "bg-semantic-live"
                      : "bg-semantic-dev"
                  }`}
                />
              </motion.div>

              {/* Editorial headline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-3 mb-6"
              >
                <h1 className="text-2xl sm:text-4xl font-black tracking-tighter text-text-primary leading-[0.95]">
                  {app.description}
                </h1>
                {app.longDescription && (
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-md">
                    {app.longDescription}
                  </p>
                )}
              </motion.div>

              {/* Tech stack + features row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-6 mb-6"
              >
                {/* Tech stack */}
                {app.techStack && app.techStack.length > 0 && (
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {app.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-surface-container rounded-full text-xs font-medium text-text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Domain info */}
                <div className="shrink-0">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
                    Domain
                  </h4>
                  <span className="text-sm font-medium text-text-primary">
                    {app.subdomain}.warmwetcircles.com
                  </span>
                </div>
              </motion.div>

              {/* Features — compact inline */}
              {app.features && app.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {app.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span className="text-xs font-medium text-text-primary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action footer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-surface-container pt-5 mt-auto"
            >
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-gradient text-on-primary px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all no-underline text-sm"
              >
                Launch Application
                <ArrowRight className="w-4 h-4" />
              </a>
              {app.repo && (
                <a
                  href={app.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:bg-primary/5 px-5 py-3 rounded-full transition-colors text-center no-underline text-sm"
                >
                  Repository
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

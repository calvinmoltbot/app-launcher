import Link from "next/link";
import type { App } from "@/data/apps";
import { AppIcon } from "./app-icon";

interface FeaturedCardProps {
  app: App;
}

export function FeaturedCard({ app }: FeaturedCardProps) {
  return (
    <Link
      href={`/app/${app.id}`}
      className="block relative overflow-hidden rounded-2xl border border-[#0F49BD]/10 bg-gradient-to-br from-[#0F49BD]/10 to-[#7C3AED]/10 p-5 mb-6 no-underline"
    >
      <div className="absolute -top-1/2 -right-[30%] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(15,73,189,0.15)_0%,transparent_70%)]" />
      <div className="relative z-[1] flex items-center gap-4">
        <AppIcon iconName={app.icon} color={app.color} size="lg" showBadge={false} />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-[#0F49BD] uppercase tracking-[1.5px] mb-1">
            ★ Pinned
          </div>
          <div className="text-lg font-bold tracking-tight text-slate-900">
            {app.name}
          </div>
          <div className="text-sm text-slate-500 leading-snug">
            {app.description}
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-[#0F49BD] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#0F49BD]/20">
          View →
        </span>
      </div>
    </Link>
  );
}

import type { App } from "@/data/apps";

interface FeaturedCardProps {
  app: App;
}

export function FeaturedCard({ app }: FeaturedCardProps) {
  return (
    <a
      href={`https://${app.subdomain}.warmwetcircles.com`}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative overflow-hidden rounded-3xl border border-[rgba(99,102,241,0.3)] bg-gradient-to-br from-[rgba(99,102,241,0.2)] to-[rgba(168,85,247,0.2)] p-6 mb-6 no-underline"
    >
      {/* Glow orb */}
      <div className="absolute -top-1/2 -right-[30%] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.3)_0%,transparent_70%)]" />
      <div className="relative z-[1]">
        <div className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[1.5px] mb-2">
          ★ Pinned
        </div>
        <div className="text-2xl font-extrabold tracking-tight text-white mb-1.5">
          {app.name}
        </div>
        <div className="text-sm text-white/50 leading-snug mb-4">
          {app.description}
        </div>
        <span className="inline-flex items-center gap-1.5 bg-[#6366f1] text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          Open App →
        </span>
      </div>
    </a>
  );
}

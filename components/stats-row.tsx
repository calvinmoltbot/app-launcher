import { getStaticApps } from "@/data/apps";

export function StatsRow() {
  const apps = getStaticApps();
  const total = apps.length;
  const live = apps.filter((a) => a.status === "live").length;
  const dev = apps.filter((a) => a.status === "dev").length;

  const stats = [
    { value: total, label: "Total", color: "#6366f1" },
    { value: live, label: "Live", color: "#22c55e" },
    { value: dev, label: "In Dev", color: "#f59e0b" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-7">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/[0.08] bg-[#1a1a1e] p-4 text-center"
        >
          <div
            className="text-[28px] font-extrabold leading-none mb-1"
            style={{ color: stat.color }}
          >
            {stat.value}
          </div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-white/50">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

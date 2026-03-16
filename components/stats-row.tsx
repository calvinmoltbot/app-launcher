import { getStaticApps } from "@/data/apps";

export function StatsRow() {
  const apps = getStaticApps();
  const total = apps.length;
  const live = apps.filter((a) => a.status === "live").length;
  const dev = apps.filter((a) => a.status === "dev").length;

  const stats = [
    { value: total, label: "Total", color: "#4F46E5" },
    { value: live, label: "Live", color: "#10B981" },
    { value: dev, label: "In Dev", color: "#F59E0B" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[#0F49BD]/5 bg-white p-4 text-center shadow-sm"
        >
          <div
            className="text-[28px] font-extrabold leading-none mb-1"
            style={{ color: stat.color }}
          >
            {stat.value}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

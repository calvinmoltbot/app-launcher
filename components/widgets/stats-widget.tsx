import { LayoutGrid } from "lucide-react";
import type { App } from "@/data/apps";
import { BaseWidget } from "./base-widget";

interface StatsWidgetProps {
  apps: App[];
}

export function StatsWidget({ apps }: StatsWidgetProps) {
  const total = apps.length;
  const live = apps.filter((a) => a.status === "live").length;
  const dev = apps.filter((a) => a.status === "dev").length;

  return (
    <BaseWidget title="Stats" icon={<LayoutGrid className="w-3.5 h-3.5" />}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-3xl font-black text-text-primary">{total}</div>
          <div className="text-xs text-text-tertiary mt-0.5">Total</div>
        </div>
        <div>
          <div className="text-3xl font-black text-semantic-live">{live}</div>
          <div className="text-xs text-text-tertiary mt-0.5">Live</div>
        </div>
        <div>
          <div className="text-3xl font-black text-semantic-dev">{dev}</div>
          <div className="text-xs text-text-tertiary mt-0.5">Dev</div>
        </div>
      </div>
    </BaseWidget>
  );
}

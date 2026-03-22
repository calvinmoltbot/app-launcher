import { Activity } from "lucide-react";
import type { App } from "@/data/apps";
import { AppIcon } from "@/components/app-icon";
import { BaseWidget } from "./base-widget";

interface DeploysWidgetProps {
  apps: App[];
}

export function DeploysWidget({ apps }: DeploysWidgetProps) {
  let recent = apps.filter((a) => a.discovered === true);

  if (recent.length === 0) {
    recent = [...apps].sort((a, b) => a.order - b.order).slice(-5);
  } else {
    recent = recent.slice(0, 5);
  }

  return (
    <BaseWidget title="Recent" icon={<Activity className="w-3.5 h-3.5" />}>
      {recent.length === 0 ? (
        <p className="text-xs text-text-tertiary">No recent activity</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {recent.map((app) => (
            <div key={app.id} className="flex items-center gap-3">
              <AppIcon iconName={app.icon} color={app.color} size="sm" />
              <span className="text-sm font-medium text-text-primary flex-1 truncate">
                {app.name}
              </span>
              <div
                className={`w-[6px] h-[6px] rounded-full shrink-0 ${
                  app.status === "live" ? "bg-semantic-live" : "bg-semantic-dev"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </BaseWidget>
  );
}

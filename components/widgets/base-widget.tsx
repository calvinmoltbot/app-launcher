import type { ReactNode } from "react";

interface BaseWidgetProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function BaseWidget({ title, icon, children, className }: BaseWidgetProps) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-2xl p-5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
        {icon}
        <span>{title}</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

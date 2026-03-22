"use client";

import { Component, type ReactNode } from "react";
import type { App } from "@/data/apps";
import { StatsWidget } from "./widgets/stats-widget";
import { DeploysWidget } from "./widgets/deploys-widget";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WidgetErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-surface-container-lowest rounded-2xl p-5 flex items-center justify-center">
          <p className="text-xs text-text-muted">Widget unavailable</p>
        </div>
      );
    }
    return this.props.children;
  }
}

interface WidgetGridProps {
  apps: App[];
}

export function WidgetGrid({ apps }: WidgetGridProps) {
  return (
    <section className="hidden md:block px-6 pb-6 pt-2">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">
          Dashboard
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <WidgetErrorBoundary>
            <StatsWidget apps={apps} />
          </WidgetErrorBoundary>
          <WidgetErrorBoundary>
            <DeploysWidget apps={apps} />
          </WidgetErrorBoundary>
        </div>
      </div>
    </section>
  );
}

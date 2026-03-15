export interface App {
  id: string;
  name: string;
  description: string;
  subdomain: string;
  icon: string; // lucide-react icon name (e.g., "Rocket", "Sprout")
  color: string;
  status: "live" | "dev";
  category: "productivity" | "creative" | "data" | "tools";
  pinned: boolean;
  order: number;
  discovered?: boolean; // true if auto-discovered from Vercel API
}

/** Static overrides for known apps — keyed by subdomain */
export function getAppOverrides(): Map<string, Partial<App>> {
  return new Map<string, Partial<App>>([
    [
      "command",
      {
        id: "command-center",
        name: "Command Center",
        description: "Task management hub",
        icon: "LayoutDashboard",
        color: "indigo",
        category: "productivity",
        pinned: true,
        order: 1,
      },
    ],
    [
      "mission",
      {
        id: "mission-control",
        name: "Mission Control",
        description: "Ops monitoring dashboard",
        icon: "Rocket",
        color: "coral",
        category: "data",
        pinned: true,
        order: 2,
      },
    ],
    [
      "garden",
      {
        id: "digital-garden",
        name: "Digital Garden",
        description: "Knowledge base & notes",
        icon: "Sprout",
        color: "green",
        category: "creative",
        pinned: false,
        order: 3,
      },
    ],
    [
      "design",
      {
        id: "design-lab",
        name: "Design Lab",
        description: "Component showcase & experiments",
        icon: "Palette",
        color: "pink",
        category: "creative",
        pinned: false,
        order: 4,
      },
    ],
    [
      "ocean",
      {
        id: "ocean-monitor",
        name: "Ocean Monitor",
        description: "Real-time data visualization",
        icon: "Waves",
        color: "ocean",
        category: "data",
        pinned: false,
        order: 5,
      },
    ],
    [
      "ai",
      {
        id: "ai-playground",
        name: "AI Playground",
        description: "Prompt experiments & demos",
        icon: "Sparkles",
        color: "amber",
        category: "tools",
        pinned: false,
        order: 6,
      },
    ],
    [
      "chat",
      {
        id: "chat-app",
        name: "Chat App",
        description: "Real-time messaging platform",
        icon: "MessageSquare",
        color: "purple",
        category: "productivity",
        pinned: false,
        order: 7,
      },
    ],
    [
      "notes",
      {
        id: "notes",
        name: "Notes",
        description: "Quick capture & markdown notes",
        icon: "StickyNote",
        color: "amber",
        category: "productivity",
        pinned: true,
        order: 8,
      },
    ],
    [
      "sound",
      {
        id: "soundboard",
        name: "Soundboard",
        description: "Audio samples & mixing",
        icon: "Music",
        color: "pink",
        category: "creative",
        pinned: false,
        order: 9,
      },
    ],
    [
      "cal",
      {
        id: "calendar",
        name: "Calendar",
        description: "Schedule & event management",
        icon: "Calendar",
        color: "teal",
        category: "productivity",
        pinned: false,
        order: 10,
      },
    ],
    [
      "gallery",
      {
        id: "gallery",
        name: "Gallery",
        description: "Image collection & showcase",
        icon: "Image",
        color: "rose",
        category: "creative",
        pinned: false,
        order: 11,
      },
    ],
    [
      "settings",
      {
        id: "settings",
        name: "Settings",
        description: "App configuration & preferences",
        icon: "Settings",
        color: "slate",
        category: "tools",
        pinned: false,
        order: 12,
      },
    ],
    [
      "app-launcher",
      {
        id: "app-launcher",
        name: "App Launcher",
        description: "Home base for all apps",
        icon: "LayoutGrid",
        color: "indigo",
        category: "tools",
        pinned: false,
        order: 0,
      },
    ],
  ]);
}

/**
 * Fallback static app list — used when Vercel API is unavailable.
 * Built from the overrides map so there's a single source of truth.
 */
export function getStaticApps(): App[] {
  const overrides = getAppOverrides();
  const apps: App[] = [];

  overrides.forEach((override, subdomain) => {
    apps.push({
      id: override.id ?? subdomain,
      name: override.name ?? subdomain,
      description: override.description ?? "",
      subdomain,
      icon: override.icon ?? "Box",
      color: override.color ?? "slate",
      status: "live" as const,
      category: override.category ?? "tools",
      pinned: override.pinned ?? false,
      order: override.order ?? 99,
      discovered: false,
    });
  });

  return apps.sort((a, b) => a.order - b.order);
}

/**
 * Static app list for client components that need synchronous access.
 * Server components should use `getApps()` from `@/lib/merge-apps` instead.
 */
export const apps: App[] = getStaticApps();

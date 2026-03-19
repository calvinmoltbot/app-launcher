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
  discovered?: boolean;
  // Extended fields from .launcher.json
  longDescription?: string;
  features?: string[];
  techStack?: string[];
  screenshots?: string[];
  repo?: string;
  envVars?: string[];
  dependencies?: string[];
}

/** Static overrides for known apps — keyed by subdomain */
export function getAppOverrides(): Map<string, Partial<App>> {
  return new Map<string, Partial<App>>([
    [
      "garden",
      {
        id: "digital-garden",
        name: "Digital Garden",
        description: "Knowledge base & notes",
        icon: "Sprout",
        color: "green",
        category: "creative",
        pinned: true,
        order: 1,
      },
    ],
    [
      "edgetrader",
      {
        id: "edgetrader",
        name: "EdgeTrader",
        description: "Trading analytics dashboard",
        icon: "TrendingUp",
        color: "indigo",
        category: "data",
        pinned: true,
        order: 2,
      },
    ],
    [
      "bookmarks",
      {
        id: "bookmark-vault",
        name: "Bookmark Vault",
        description: "Saved links & resources",
        icon: "Bookmark",
        color: "purple",
        category: "productivity",
        pinned: false,
        order: 3,
      },
    ],
    [
      "finance",
      {
        id: "bank-statement-analyser",
        name: "Bank Statement Analyser",
        description: "Financial data parsing & insights",
        icon: "Wallet",
        color: "green",
        category: "data",
        pinned: false,
        order: 4,
      },
    ],
    [
      "greenhouse",
      {
        id: "greenhouse-tracker",
        name: "Greenhouse Tracker",
        description: "Plant monitoring & growing logs",
        icon: "Flower2",
        color: "lime",
        category: "data",
        pinned: false,
        order: 5,
      },
    ],
    [
      "family",
      {
        id: "ancestry",
        name: "Ancestry",
        description: "Family tree & genealogy",
        icon: "Users",
        color: "rose",
        category: "creative",
        pinned: false,
        order: 6,
      },
    ],
    [
      "vault",
      {
        id: "legacylock",
        name: "LegacyLock",
        description: "Secure vault & credentials",
        icon: "Lock",
        color: "slate",
        category: "tools",
        pinned: false,
        order: 7,
      },
    ],
    [
      "golf",
      {
        id: "golf",
        name: "Golf",
        description: "Golf scorecard & stats",
        icon: "Flag",
        color: "green",
        category: "creative",
        pinned: false,
        order: 8,
      },
    ],
    [
      "sprout",
      {
        id: "snip-and-sprout",
        name: "Snip & Sprout",
        description: "Garden planning & plant care",
        icon: "Scissors",
        color: "teal",
        category: "tools",
        pinned: false,
        order: 9,
      },
    ],
    [
      "snippet",
      {
        id: "snippet-app",
        name: "Snippet App",
        description: "Code snippets & quick notes",
        icon: "Code",
        color: "amber",
        category: "tools",
        pinned: false,
        order: 10,
      },
    ],
    [
      "bv",
      {
        id: "bv",
        name: "BV Web",
        description: "Business ventures portal",
        icon: "Globe",
        color: "ocean",
        category: "tools",
        pinned: false,
        order: 11,
      },
    ],
    [
      "sp-forms",
      {
        id: "sp-forms",
        name: "SP Form Workbench",
        description: "SharePoint form builder",
        icon: "FileText",
        color: "teal",
        category: "productivity",
        pinned: false,
        order: 12,
      },
    ],
    [
      "oilchecker",
      {
        id: "oil-checker",
        name: "Oil Checker",
        description: "Heating oil price tracker",
        icon: "Droplets",
        color: "amber",
        category: "data",
        pinned: false,
        order: 13,
      },
    ],
    [
      "calm-daily-feed",
      {
        id: "calm-daily-feed",
        name: "Calm Daily Feed",
        description: "Curated daily content & calm reads",
        icon: "Leaf",
        color: "teal",
        category: "creative",
        pinned: false,
        order: 14,
      },
    ],
    [
      "herbarium-dyeworks",
      {
        id: "herbarium-dyeworks",
        name: "Herbarium Dyeworks",
        description: "Natural dye recipes & plant catalog",
        icon: "Paintbrush",
        color: "pink",
        category: "creative",
        pinned: false,
        order: 15,
      },
    ],
    [
      "shopify-assist",
      {
        id: "shopify-assist",
        name: "Shopify Assist",
        description: "Store management helper",
        icon: "ShoppingBag",
        color: "purple",
        category: "productivity",
        pinned: false,
        order: 16,
      },
    ],
    [
      "apps",
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

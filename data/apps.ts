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
  url?: string; // Override URL for local/non-Vercel apps
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
        longDescription:
          "A personal knowledge base for cultivating ideas, notes, and interconnected thoughts. Organise writing and research in a non-linear, evergreen format inspired by the digital garden philosophy.",
        features: [
          "Interconnected notes with backlinks",
          "Evergreen content that grows over time",
          "Tag-based organisation and discovery",
          "Markdown-powered writing experience",
        ],
        techStack: ["Next.js", "React", "Tailwind CSS"],
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
        longDescription:
          "Full-featured trading analytics platform built as a Turborepo monorepo. Import trades via CSV, visualise P&L with interactive charts, and analyse performance across strategies and timeframes with a Prisma-backed database.",
        features: [
          "CSV trade import with auto-parsing",
          "Interactive P&L charts via Recharts and Lightweight Charts",
          "Strategy performance breakdown",
          "PDF report generation with jsPDF",
          "Auth via NextAuth with role-based access",
        ],
        techStack: [
          "Next.js 15",
          "React 19",
          "Tailwind CSS 4",
          "Turborepo",
          "Prisma",
          "Recharts",
          "Lightweight Charts",
          "NextAuth",
        ],
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
        longDescription:
          "Personal bookmark manager for saving, organising, and rediscovering links and resources. Features analytics on saved content with visual charts, powered by a Neon Postgres database with Drizzle ORM.",
        features: [
          "Save and categorise bookmarks",
          "Usage analytics with Recharts visualisations",
          "Full-text search across saved links",
          "Animated UI with Framer Motion",
          "Companion Chrome extension for quick capture",
        ],
        techStack: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS 4",
          "Drizzle ORM",
          "Neon Postgres",
          "Recharts",
          "Framer Motion",
        ],
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
        longDescription:
          "Business finance management app for tracking income and expenditure. Upload bank statements from HSBC and Monzo, auto-categorise transactions with drag-and-drop rules, and generate visual reports with forecasting powered by Supabase and Recharts.",
        features: [
          "CSV statement import with smart parsing",
          "Auto-categorisation with learnable patterns",
          "Drag-and-drop transaction management",
          "Interactive spending charts and forecasts",
          "Dark mode support with next-themes",
        ],
        techStack: [
          "Next.js 15",
          "React",
          "Tailwind CSS 4",
          "Supabase",
          "Recharts",
          "React Hook Form",
          "Radix UI",
          "Framer Motion",
          "TanStack Query",
        ],
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
        longDescription:
          "Mobile-first web app for monitoring greenhouse and garden plants. Track seed sowings, log growth milestones, and visualise progress over time with circular progress indicators and charts. Integrates with Google APIs for calendar and weather data.",
        features: [
          "Seed sowing tracker with progress indicators",
          "Growth milestone logging with photos",
          "Circular progress visualisations",
          "Google Calendar integration for planting schedules",
          "Recharts-powered analytics dashboard",
        ],
        techStack: [
          "Next.js 15",
          "React 19",
          "Tailwind CSS 4",
          "Prisma",
          "NextAuth",
          "Recharts",
          "Google APIs",
          "TanStack Query",
        ],
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
        longDescription:
          "Interactive family tree viewer built from GEDCOM genealogy files. Parses family data with read-gedcom, renders navigable tree diagrams using D3 and Topola, and hosts media files via Vercel Blob storage.",
        features: [
          "GEDCOM file parsing and data extraction",
          "Interactive D3-powered family tree visualisation",
          "Photo gallery with Vercel Blob storage",
          "Search and navigate across generations",
          "Auto-generated data from build scripts",
        ],
        techStack: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS 4",
          "D3.js",
          "Topola",
          "read-gedcom",
          "Vercel Blob",
          "Sharp",
        ],
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
        longDescription:
          "Encrypted secrets and credentials vault for securely storing sensitive household information. Features a Vite-powered React SPA with MongoDB backend, client-side routing, and Vercel serverless functions for API access.",
        features: [
          "Encrypted credential and secret storage",
          "Search and organise sensitive records",
          "Vercel serverless API with MongoDB backend",
          "Client-side routing with React Router",
          "Responsive design with TanStack Query data fetching",
        ],
        techStack: [
          "React 19",
          "Vite 7",
          "Tailwind CSS 4",
          "MongoDB",
          "React Router",
          "TanStack Query",
          "Vercel Serverless Functions",
        ],
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
        longDescription:
          "Golf tournament management system with real-time scoring, live leaderboards, and role-based access control. Built with React and Firebase for real-time data sync, with PDF scorecard generation.",
        features: [
          "Real-time scoring with Firebase sync",
          "Live tournament leaderboards",
          "PDF scorecard generation with jsPDF",
          "Rich text editing with Quill editor",
          "Role-based access control for organisers and players",
        ],
        techStack: [
          "React 18",
          "Vite",
          "Tailwind CSS 3",
          "Firebase",
          "jsPDF",
          "Quill",
          "Lucide Icons",
        ],
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
        longDescription:
          "Plant propagation guide PWA for Northern Ireland gardeners. Browse a plant library, identify species, get seasonal care advice, and plan propagation schedules. Monorepo with a separate Drizzle-powered API backend.",
        features: [
          "Plant identification tool",
          "Searchable plant library with detail pages",
          "Seasonal propagation guidance for NI climate",
          "Step-by-step propagation guides",
          "Animated UI with Framer Motion",
        ],
        techStack: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS 4",
          "Drizzle ORM",
          "TanStack Query",
          "Framer Motion",
          "Zod",
          "shadcn/ui",
        ],
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
        longDescription:
          "Full-featured code snippet manager with syntax-highlighted editing via CodeMirror. Supports 10+ languages, fuzzy search with Fuse.js, Markdown preview, and Firebase-backed cloud sync. Includes a command palette for fast navigation.",
        features: [
          "CodeMirror editor with 10+ language modes",
          "Fuzzy search across snippets with Fuse.js",
          "Command palette (cmdk) for quick actions",
          "Markdown preview with remark/rehype",
          "Firebase real-time sync and storage",
        ],
        techStack: [
          "React 19",
          "Vite",
          "CodeMirror 6",
          "Firebase",
          "Fuse.js",
          "React Router",
          "react-markdown",
          "Lucide Icons",
        ],
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
        longDescription:
          "Central portal for managing business ventures and side projects. Consolidates project status, key metrics, and quick-access links into a single dashboard for oversight across all active ventures.",
        features: [
          "Project status overview dashboard",
          "Quick-access links to venture resources",
          "Key metrics and milestone tracking",
          "Responsive layout for mobile and desktop",
        ],
        techStack: ["Next.js", "React", "Tailwind CSS"],
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
        longDescription:
          "Visual designer for SharePoint list forms with drag-and-drop field arrangement. Build form layouts, configure conditional visibility rules with AI assistance, and export clean JSON formatting for SharePoint column formatting.",
        features: [
          "Drag-and-drop form layout builder",
          "AI-assisted conditional visibility rules",
          "Clean JSON export for SharePoint formatting",
          "CSV data import with PapaParse",
          "UUID-based field tracking",
        ],
        techStack: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS 4",
          "dnd-kit",
          "PapaParse",
          "Lucide Icons",
        ],
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
        longDescription:
          "Automated heating oil price tracker that scrapes local supplier websites with Cheerio, stores historical prices in Neon Postgres via Drizzle ORM, and sends email alerts via Nodemailer when prices drop below your target.",
        features: [
          "Automated price scraping from local suppliers",
          "Historical price charts with Recharts",
          "Email alerts when prices drop below target",
          "Neon Postgres database with Drizzle ORM",
          "Scheduled price checks with cron jobs",
        ],
        techStack: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS 4",
          "Drizzle ORM",
          "Neon Postgres",
          "Cheerio",
          "Nodemailer",
          "Recharts",
        ],
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
        longDescription:
          "A mindful daily content feed that curates calming reads, quotes, and reflections. Designed as a peaceful alternative to noisy social feeds, delivering a small batch of thoughtfully selected content each day.",
        features: [
          "Daily curated content selection",
          "Calming, distraction-free reading experience",
          "Quote and reflection highlights",
          "Minimalist, peaceful UI design",
        ],
        techStack: ["Next.js", "React", "Tailwind CSS"],
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
        longDescription:
          "A botanical reference and natural dye recipe catalog. Browse plant species used in traditional dyeing, explore colour palettes derived from natural sources, and follow step-by-step recipes for extracting and applying plant-based dyes.",
        features: [
          "Plant species catalog with dye properties",
          "Step-by-step natural dye recipes",
          "Colour palette explorer from plant sources",
          "Seasonal availability guide",
          "Searchable reference database",
        ],
        techStack: ["Next.js", "React", "Tailwind CSS"],
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
        longDescription:
          "Shopify store management assistant that streamlines common admin tasks. View orders, manage inventory, update product listings, and monitor store performance metrics from a simplified dashboard without navigating the full Shopify admin.",
        features: [
          "Simplified order management view",
          "Inventory level monitoring",
          "Product listing quick-edits",
          "Store performance metrics dashboard",
          "Streamlined admin workflows",
        ],
        techStack: ["Next.js", "React", "Tailwind CSS", "Shopify API"],
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
        longDescription:
          "Central hub for discovering and launching all apps in the warmwetcircles.com ecosystem. Features a bento grid layout with live Vercel sync, category filters, search, and auto-discovery of new deployments.",
        features: [
          "Bento grid desktop layout with pinned apps",
          "Live sync from Vercel API every 5 minutes",
          "Filter by status (live/dev) and category",
          "Search across app names and descriptions",
          "App detail pages with extended metadata",
          "Auto-discovers new deployments via .launcher.json",
        ],
        techStack: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS 4",
          "Framer Motion",
          "Lucide Icons",
        ],
      },
    ],
    [
      "letterboxd",
      {
        id: "letterboxd-tracker",
        name: "Letterboxd Tracker",
        description: "Film diary & watchlist",
        icon: "Film",
        color: "coral",
        category: "creative",
        pinned: false,
        order: 17,
        longDescription:
          "Film diary and watchlist tracker that scrapes your Letterboxd profile with Cheerio and stores viewing history in Neon Postgres via Drizzle ORM. Browse your film log, track ratings, and manage your watchlist in a clean interface built with shadcn/ui.",
        features: [
          "Letterboxd profile scraping and sync",
          "Film diary with ratings and dates",
          "Watchlist management",
          "Search and filter your film history",
          "Clean UI built with shadcn/ui and Base UI",
        ],
        techStack: [
          "Next.js 15",
          "React 19",
          "Tailwind CSS 4",
          "Drizzle ORM",
          "Neon Postgres",
          "Cheerio",
          "shadcn/ui",
        ],
      },
    ],
  ]);
}

/**
 * Local apps running on the Tailscale network (not deployed to Vercel).
 * These are merged into the app list alongside Vercel-discovered apps.
 */
export function getLocalApps(): App[] {
  return [
    {
      id: "home-dashboard-lab",
      name: "Home Dashboard Lab",
      description: "Smart home control surface",
      subdomain: "home-dashboard",
      url: "http://100.90.11.37:3006",
      icon: "Home",
      color: "indigo",
      status: "dev",
      category: "tools",
      pinned: false,
      order: 2,
      discovered: false,
      longDescription:
        "A unified dashboard for Calvin's smart home — Hue lighting, HomePod audio, smart plugs, device discovery, and music rituals. Controls real hardware on the local network with truthful state.",
      features: [
        "Hue lighting control by room",
        "HomePod TTS announcements",
        "Music ritual launcher with Shortcuts bridge",
        "AirPlay/RAOP target discovery",
        "Smart plug control via Tapo",
        "Network device inventory",
      ],
      techStack: ["Next.js 16", "Tailwind CSS 4", "node-airtunes2", "Tapo API", "Hue API"],
      repo: "calvinmoltbot/home-dashboard-lab",
    },
    {
      id: "command-center",
      name: "Command Center",
      description: "OpenClaw agent hub",
      subdomain: "command-center",
      url: "http://100.90.11.37:3020",
      icon: "Cpu",
      color: "indigo",
      status: "live",
      category: "productivity",
      pinned: false,
      order: 3,
      discovered: false,
      longDescription:
        "Task management and intelligence hub for the OpenClaw agent system. Projects, routines, research briefs, daily sweeps, agent lifecycle, and API usage tracking.",
      features: [
        "Project and task management",
        "Daily intelligence sweeps reader",
        "Research briefs library",
        "Agent registry and routine scheduling",
        "API usage and cost tracking",
      ],
      techStack: ["Next.js 16", "SQLite", "Tailwind CSS 4", "shadcn/ui"],
      repo: "calvinmoltbot/command-center",
    },
  ];
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
      ...(override.longDescription && {
        longDescription: override.longDescription,
      }),
      ...(override.features && { features: override.features }),
      ...(override.techStack && { techStack: override.techStack }),
    });
  });

  // Include local apps in the fallback too
  apps.push(...getLocalApps());

  return apps.sort((a, b) => a.order - b.order);
}

/**
 * Static app list for client components that need synchronous access.
 * Server components should use `getApps()` from `@/lib/merge-apps` instead.
 */
export const apps: App[] = getStaticApps();

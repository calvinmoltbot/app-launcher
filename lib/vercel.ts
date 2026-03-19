export interface LauncherManifest {
  $schema?: string;
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  category?: "creative" | "data" | "productivity" | "tools";
  pinned?: boolean;
  longDescription?: string;
  features?: string[];
  techStack?: string[];
  screenshots?: string[];
  repo?: string;
  envVars?: string[];
  dependencies?: string[];
}

export interface DiscoveredApp {
  subdomain: string;
  projectName: string;
  projectId: string;
  status: "live" | "dev";
  manifest?: LauncherManifest;
}

const VERCEL_API = "https://api.vercel.com";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

let cachedResult: { data: DiscoveredApp[]; timestamp: number } | null = null;

/**
 * Discover all projects deployed to *.warmwetcircles.com via the Vercel API.
 * Fetches .launcher.json from each app for rich metadata.
 * Results are cached in memory for 5 minutes.
 * Returns an empty array on any failure.
 */
export async function discoverVercelApps(): Promise<DiscoveredApp[]> {
  // Check cache
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    return cachedResult.data;
  }

  const token = process.env.VERCEL_TOKEN;
  const teamId = process.env.VERCEL_TEAMS_ID;

  if (!token) {
    console.warn("[vercel] VERCEL_TOKEN not set — skipping discovery");
    return [];
  }

  try {
    const apps = await fetchAllApps(token, teamId);
    cachedResult = { data: apps, timestamp: Date.now() };
    return apps;
  } catch (err) {
    console.error("[vercel] Failed to discover apps:", err);
    return [];
  }
}

async function fetchAllApps(
  token: string,
  teamId?: string
): Promise<DiscoveredApp[]> {
  const discovered: DiscoveredApp[] = [];

  // Paginate through all projects
  let nextTimestamp: number | undefined;
  const limit = 100;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (teamId) params.set("teamId", teamId);
    if (nextTimestamp) params.set("until", String(nextTimestamp));

    const res = await fetch(`${VERCEL_API}/v9/projects?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 }, // Next.js fetch cache: 5 min
    });

    if (!res.ok) {
      throw new Error(`Vercel API /v9/projects returned ${res.status}`);
    }

    const body = (await res.json()) as {
      projects: Array<{ id: string; name: string }>;
      pagination?: { next: number | null };
    };

    // Check domains for each project in parallel
    const checks = body.projects.map((project) =>
      getWarmwetcirclesSubdomain(project.id, project.name, token, teamId)
    );
    const results = await Promise.all(checks);
    for (const r of results) {
      if (r) discovered.push(r);
    }

    // Handle pagination
    if (!body.pagination?.next || body.projects.length < limit) {
      break;
    }
    nextTimestamp = body.pagination.next;
  }

  // Fetch .launcher.json manifests in parallel for all discovered apps
  const manifestChecks = discovered.map(async (app) => {
    app.manifest = await fetchManifest(app.subdomain);
    return app;
  });
  await Promise.all(manifestChecks);

  return discovered;
}

/**
 * Fetch .launcher.json from a deployed app.
 * Returns undefined if not found or on any error.
 */
async function fetchManifest(
  subdomain: string
): Promise<LauncherManifest | undefined> {
  try {
    const url = `https://${subdomain}.warmwetcircles.com/.launcher.json`;
    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    if (data && typeof data === "object" && data.name) return data;
    return undefined;
  } catch {
    return undefined;
  }
}

async function getWarmwetcirclesSubdomain(
  projectId: string,
  projectName: string,
  token: string,
  teamId?: string
): Promise<DiscoveredApp | null> {
  try {
    const params = new URLSearchParams();
    if (teamId) params.set("teamId", teamId);

    const res = await fetch(
      `${VERCEL_API}/v13/projects/${projectId}/domains?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return null;

    const body = (await res.json()) as {
      domains: Array<{
        name: string;
        verified: boolean;
        redirect?: string | null;
      }>;
    };

    for (const domain of body.domains) {
      const match = domain.name.match(
        /^([a-z0-9-]+)\.warmwetcircles\.com$/i
      );
      if (match) {
        return {
          subdomain: match[1],
          projectName,
          projectId,
          status: domain.verified ? "live" : "dev",
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

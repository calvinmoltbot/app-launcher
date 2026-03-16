import { type App, getAppOverrides, getStaticApps } from "@/data/apps";
import { discoverVercelApps } from "@/lib/vercel";

/**
 * Fetch apps from Vercel API, merge with static overrides, and return
 * the final sorted list. Falls back to static data on failure.
 */
export async function getApps(): Promise<App[]> {
  const discovered = await discoverVercelApps();

  // If Vercel API returned nothing, fall back to static data
  if (discovered.length === 0) {
    return getStaticApps();
  }

  // Filter out API backends and non-user-facing services
  const hidden = new Set(["sprout-api"]);
  const visible = discovered.filter((d) => !hidden.has(d.subdomain));

  const overrides = getAppOverrides();
  const maxStaticOrder = Math.max(
    ...Array.from(overrides.values()).map((o) => o.order ?? 0)
  );

  let autoOrder = maxStaticOrder + 1;

  const apps: App[] = visible.map((d) => {
    const override = overrides.get(d.subdomain);

    if (override) {
      return {
        id: override.id ?? d.projectName,
        name: override.name ?? formatName(d.projectName),
        description: override.description ?? "",
        subdomain: d.subdomain,
        icon: override.icon ?? "Box",
        color: override.color ?? "slate",
        status: override.status ?? d.status,
        category: override.category ?? "tools",
        pinned: override.pinned ?? false,
        order: override.order ?? autoOrder++,
        discovered: true,
      };
    }

    // Unknown app — sensible defaults
    return {
      id: d.projectName,
      name: formatName(d.projectName),
      description: `${d.subdomain}.warmwetcircles.com`,
      subdomain: d.subdomain,
      icon: "Box",
      color: "slate",
      status: d.status,
      category: "tools" as const,
      pinned: false,
      order: autoOrder++,
      discovered: true,
    };
  });

  return apps.sort((a, b) => a.order - b.order);
}

/** Convert "my-project-name" to "My Project Name" */
function formatName(slug: string): string {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

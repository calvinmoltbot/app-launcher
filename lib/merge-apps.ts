import { type App, getAppOverrides, getStaticApps } from "@/data/apps";
import { discoverVercelApps } from "@/lib/vercel";

/**
 * Fetch apps from Vercel API, merge with .launcher.json manifests and
 * static overrides, and return the final sorted list.
 * Priority: .launcher.json > static overrides > auto-generated defaults.
 * Falls back to static data on failure.
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
    const manifest = d.manifest;
    const override = overrides.get(d.subdomain);

    // Manifest fields take priority, then overrides, then defaults
    const name =
      manifest?.name ?? override?.name ?? formatName(d.projectName);
    const description =
      manifest?.description ?? override?.description ?? "";
    const icon = manifest?.icon ?? override?.icon ?? "Box";
    const color = manifest?.color ?? override?.color ?? "slate";
    const category =
      manifest?.category ?? override?.category ?? "tools";
    const pinned = manifest?.pinned ?? override?.pinned ?? false;
    const order = override?.order ?? autoOrder++;

    return {
      id: override?.id ?? d.projectName,
      name,
      description,
      subdomain: d.subdomain,
      icon,
      color,
      status: override?.status ?? d.status,
      category,
      pinned,
      order,
      discovered: true,
      // Extended fields from manifest
      longDescription: manifest?.longDescription,
      features: manifest?.features,
      techStack: manifest?.techStack,
      screenshots: manifest?.screenshots,
      repo: manifest?.repo,
      envVars: manifest?.envVars,
      dependencies: manifest?.dependencies,
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

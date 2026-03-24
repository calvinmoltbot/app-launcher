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

  // Deduplicate by subdomain — multiple Vercel projects can share the same
  // custom domain (e.g. "bv-web" and "bv" both pointing at bv.warmwetcircles.com).
  // Keep the first entry that has a manifest, otherwise the first entry found.
  const deduped = Array.from(
    visible
      .reduce((map, app) => {
        const existing = map.get(app.subdomain);
        if (!existing) {
          map.set(app.subdomain, app);
        } else if (!existing.manifest && app.manifest) {
          // Prefer the entry with a manifest
          map.set(app.subdomain, app);
        }
        return map;
      }, new Map<string, (typeof visible)[number]>())
      .values()
  );

  const overrides = getAppOverrides();
  const maxStaticOrder = Math.max(
    ...Array.from(overrides.values()).map((o) => o.order ?? 0)
  );

  let autoOrder = maxStaticOrder + 1;

  const apps: App[] = deduped.map((d) => {
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
      // Extended fields — manifest takes priority, then overrides
      longDescription:
        manifest?.longDescription ?? override?.longDescription,
      features: manifest?.features ?? override?.features,
      techStack: manifest?.techStack ?? override?.techStack,
      screenshots: manifest?.screenshots ?? override?.screenshots,
      repo: manifest?.repo ?? override?.repo,
      envVars: manifest?.envVars ?? override?.envVars,
      dependencies: manifest?.dependencies ?? override?.dependencies,
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

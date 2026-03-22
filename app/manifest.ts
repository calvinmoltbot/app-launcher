import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "App Launcher — warmwetcircles",
    short_name: "Apps",
    description: "Central hub for warmwetcircles.com apps",
    start_url: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait",
    categories: ["utilities", "productivity"],
    background_color: "#F5F5F7",
    theme_color: "#F5F5F7",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "All Apps",
        url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
      {
        name: "Creative",
        url: "/?category=creative",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
    ],
  } as MetadataRoute.Manifest;
}

import type { MetadataRoute } from "next";
import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: landing.meta.description,
    lang: "pl",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFCF7",
    theme_color: "#1F3A2E",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/siteConfig";

// Web app manifest — PWA metadata and install icons.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Wrist Works",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/siteConfig";

// Dynamic robots.txt. Allows crawling of everything except admin, api, cart
// and checkout, and points crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/cart", "/checkout", "/account"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

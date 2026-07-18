import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/siteConfig";
import { getAllProducts } from "@/lib/data/products";
import { getAllCategories } from "@/lib/data/categories";

// Dynamically generated sitemap.xml covering static pages, every product page,
// and all brand + category landing pages.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/brands`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/shop/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}

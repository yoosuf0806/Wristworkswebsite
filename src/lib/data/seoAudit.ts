import { getAllProducts } from "@/lib/data/products";
import { getAllCategories } from "@/lib/data/categories";

// RankMath-style content analysis: scan products and category/brand pages for
// missing SEO fields (meta title, meta description, focus keyword, image alt).

export interface SeoIssue {
  id: string;
  type: "product" | "category";
  name: string;
  path: string;
  issues: string[];
}

export interface SeoAudit {
  totalItems: number;
  issueCount: number;
  score: number; // 0–100
  items: SeoIssue[];
}

export async function runSeoAudit(): Promise<SeoAudit> {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);
  const items: SeoIssue[] = [];

  for (const p of products) {
    const issues: string[] = [];
    if (!p.metaTitle) issues.push("Missing meta title");
    if (!p.metaDescription) issues.push("Missing meta description");
    if (!p.focusKeyword) issues.push("Missing focus keyword");
    if (p.images.length === 0) issues.push("No product image");
    if (p.images.some((i) => !i.alt)) issues.push("Image missing alt text");
    if (!p.ogImage && p.images.length === 0) issues.push("No OG image");
    if (issues.length) {
      items.push({ id: p.id, type: "product", name: p.name, path: `/products/${p.slug}`, issues });
    }
  }

  for (const c of categories) {
    const issues: string[] = [];
    if (!c.metaTitle) issues.push("Missing meta title");
    if (!c.metaDescription) issues.push("Missing meta description");
    if (!c.focusKeyword) issues.push("Missing focus keyword");
    if (!c.seoParagraph) issues.push("Missing SEO paragraph");
    if (issues.length) {
      items.push({ id: c.slug, type: "category", name: c.title, path: `/shop/${c.slug}`, issues });
    }
  }

  const totalItems = products.length + categories.length;
  const clean = totalItems - items.length;
  const score = totalItems ? Math.round((clean / totalItems) * 100) : 100;

  return { totalItems, issueCount: items.length, score, items };
}

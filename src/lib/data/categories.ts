import { createPublicSupabase, hasSupabase } from "@/lib/supabase/server";
import type { CategoryContent } from "@/types";
import { mockCategories } from "@/lib/data/mock";

// Category / brand landing-page content (H1, SEO paragraph, meta fields),
// all editable from the admin dashboard. Falls back to mock content.

export async function getAllCategories(): Promise<CategoryContent[]> {
  if (!hasSupabase()) return mockCategories;
  const supabase = createPublicSupabase();
  const { data } = (await supabase.from("categories").select("*")) as { data: any[] | null };
  if (!data) return mockCategories;
  return data.map((c) => ({
    slug: c.slug,
    kind: c.kind as "category" | "brand",
    title: c.title,
    intro: c.intro,
    seoParagraph: c.seo_paragraph,
    metaTitle: c.meta_title,
    metaDescription: c.meta_description,
    focusKeyword: c.focus_keyword,
    ogImage: c.og_image,
  }));
}

// Look up a single category/brand landing page by slug.
export async function getCategory(slug: string): Promise<CategoryContent | null> {
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

// Slugs for brand pages only — used by the sitemap and static params.
export async function getBrandSlugs(): Promise<string[]> {
  const all = await getAllCategories();
  return all.filter((c) => c.kind === "brand").map((c) => c.slug);
}

// Slugs for category pages only.
export async function getCategorySlugs(): Promise<string[]> {
  const all = await getAllCategories();
  return all.filter((c) => c.kind === "category").map((c) => c.slug);
}

// Every landing-page slug (brands + categories) for the sitemap.
export async function getAllCategorySlugs(): Promise<string[]> {
  const all = await getAllCategories();
  return all.map((c) => c.slug);
}

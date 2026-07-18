import { createServerSupabase, hasSupabase } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";
import type { Product, Brand, WatchCategory } from "@/types";
import { mockProducts } from "@/lib/data/mock";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ImageRow = Database["public"]["Tables"]["product_images"]["Row"];

// Map a Supabase product row (+ its images) into the app's Product type.
function mapProduct(row: ProductRow, images: ImageRow[]): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand as Brand,
    categories: (row.categories || []) as WatchCategory[],
    reference: row.reference,
    description: row.description,
    specs: (row.specs as Record<string, string> | null) ?? null,
    price: row.price,
    offerPrice: row.offer_price,
    stock: row.stock,
    featured: row.featured,
    newArrival: row.new_arrival,
    images: images
      .sort((a, b) => a.position - b.position)
      .map((i) => ({ url: i.url, alt: i.alt, position: i.position })),
    ratingAverage: row.rating_average,
    ratingCount: row.rating_count,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    focusKeyword: row.focus_keyword,
    ogImage: row.og_image,
    createdAt: row.created_at,
  };
}

// Fetch every product (with images). Falls back to bundled mock data.
export async function getAllProducts(): Promise<Product[]> {
  if (!hasSupabase()) return mockProducts;
  const supabase = createServerSupabase();
  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  const { data: images } = await supabase.from("product_images").select("*");
  if (!products) return mockProducts;
  const byProduct = new Map<string, ImageRow[]>();
  (images || []).forEach((im) => {
    const list = byProduct.get(im.product_id) || [];
    list.push(im);
    byProduct.set(im.product_id, list);
  });
  return products.map((p) => mapProduct(p, byProduct.get(p.id) || []));
}

// Fetch a single product by its SEO slug, or null if not found.
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabase()) return mockProducts.find((p) => p.slug === slug) ?? null;
  const supabase = createServerSupabase();
  const { data: product } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (!product) return null;
  const { data: images } = await supabase.from("product_images").select("*").eq("product_id", product.id);
  return mapProduct(product, images || []);
}

// Products filtered by brand (case-insensitive).
export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

// Products belonging to a category slug (e.g. "dive-watches").
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.categories.includes(category as WatchCategory));
}

// Newest arrivals, limited.
export async function getNewArrivals(limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.newArrival).slice(0, limit);
}

// Featured products for merchandising blocks.
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured).slice(0, limit);
}

// Related products: same brand or shared category, excluding the current one.
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.id !== product.id)
    .filter(
      (p) =>
        p.brand === product.brand ||
        p.categories.some((c) => product.categories.includes(c))
    )
    .slice(0, limit);
}

// All slugs — used by generateStaticParams and the sitemap.
export async function getAllProductSlugs(): Promise<string[]> {
  const all = await getAllProducts();
  return all.map((p) => p.slug);
}

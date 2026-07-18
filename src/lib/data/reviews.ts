import { createServerSupabase, hasSupabase } from "@/lib/supabase/server";
import type { Review } from "@/types";
import { mockReviews } from "@/lib/data/mock";

// Product reviews + aggregate rating helpers. Only approved reviews are shown
// publicly and counted toward the schema aggregateRating.

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  if (!hasSupabase()) return mockReviews.filter((r) => r.productId === productId && r.approved);
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("approved", true)
    .order("created_at", { ascending: false });
  if (!data) return [];
  return data.map((r) => ({
    id: r.id,
    productId: r.product_id,
    author: r.author,
    city: r.city,
    rating: r.rating,
    body: r.body,
    approved: r.approved,
    source: r.source as Review["source"],
    createdAt: r.created_at,
  }));
}

// Recent approved reviews across all products — for the home-page social proof.
export async function getRecentReviews(limit = 3): Promise<Review[]> {
  if (!hasSupabase()) return mockReviews.filter((r) => r.approved).slice(0, limit);
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (!data) return [];
  return data.map((r) => ({
    id: r.id,
    productId: r.product_id,
    author: r.author,
    city: r.city,
    rating: r.rating,
    body: r.body,
    approved: r.approved,
    source: r.source as Review["source"],
    createdAt: r.created_at,
  }));
}

// Aggregate {average, count} for a product's approved reviews.
export function aggregate(reviews: Review[]): { average: number; count: number } {
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((t, r) => t + r.rating, 0);
  return { average: sum / reviews.length, count: reviews.length };
}

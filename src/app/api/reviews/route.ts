import { getReviewsForProduct } from "@/lib/data/reviews";
import { json, badRequest, adminDbOrNull } from "@/lib/apiHelpers";

// GET /api/reviews?productId=... — approved reviews for a product.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  if (!productId) return badRequest("productId is required.");
  const reviews = await getReviewsForProduct(productId);
  return json({ reviews });
}

// POST /api/reviews — submit a review (public; starts unapproved for moderation).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.productId || !body?.author || typeof body?.rating !== "number" || !body?.body) {
    return badRequest("productId, author, rating and body are required.");
  }

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured — review not stored." }, 202);

  const { data, error } = await db
    .from("reviews")
    .insert({
      product_id: body.productId,
      author: body.author,
      city: body.city ?? null,
      rating: Math.min(5, Math.max(1, body.rating)),
      body: body.body,
      approved: false,
      source: "site",
    })
    .select()
    .single();
  if (error) return badRequest(error.message);
  return json({ review: data, note: "Thanks! Your review will appear once approved." }, 201);
}

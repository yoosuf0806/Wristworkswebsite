import { getProductBySlug } from "@/lib/data/products";
import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// GET /api/products/[id] — fetch a single product by slug.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const product = await getProductBySlug(params.id);
  if (!product) return json({ error: "Not found" }, 404);
  return json({ product });
}

// Map camelCase API fields to snake_case DB columns.
function toRow(body: Record<string, unknown>) {
  const map: Record<string, string> = {
    offerPrice: "offer_price",
    newArrival: "new_arrival",
    metaTitle: "meta_title",
    metaDescription: "meta_description",
    focusKeyword: "focus_keyword",
    ogImage: "og_image",
  };
  const row: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) row[map[k] || k] = v;
  return row;
}

// PUT /api/products/[id] — update a product (admin only).
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body) return badRequest("Invalid body.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured — nothing persisted." }, 202);

  const { data, error } = await db.from("products").update(toRow(body)).eq("id", params.id).select().single();
  if (error) return badRequest(error.message);
  return json({ product: data });
}

// DELETE /api/products/[id] — remove a product (admin only).
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);
  const { error } = await db.from("products").delete().eq("id", params.id);
  if (error) return badRequest(error.message);
  return json({ ok: true });
}

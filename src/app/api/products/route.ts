import { getAllProducts } from "@/lib/data/products";
import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";
import { slugify } from "@/lib/utils";

// GET /api/products — list all products.
export async function GET() {
  const products = await getAllProducts();
  return json({ products });
}

// POST /api/products — create a product (admin only).
export async function POST(request: Request) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.brand || typeof body?.price !== "number") {
    return badRequest("name, brand and price are required.");
  }

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured — nothing persisted." }, 202);

  const { data, error } = await db
    .from("products")
    .insert({
      slug: body.slug || slugify(`${body.brand}-${body.name}`),
      name: body.name,
      brand: body.brand,
      categories: body.categories || [],
      reference: body.reference ?? null,
      description: body.description || "",
      specs: body.specs ?? null,
      price: body.price,
      offer_price: body.offerPrice ?? null,
      stock: body.stock ?? 0,
      featured: body.featured ?? false,
      new_arrival: body.newArrival ?? false,
      meta_title: body.metaTitle ?? null,
      meta_description: body.metaDescription ?? null,
      focus_keyword: body.focusKeyword ?? null,
      og_image: body.ogImage ?? null,
    })
    .select()
    .single();

  if (error) return badRequest(error.message);
  return json({ product: data }, 201);
}

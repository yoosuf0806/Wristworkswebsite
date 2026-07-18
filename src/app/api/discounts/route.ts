import { getAllDiscounts } from "@/lib/data/discounts";
import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// GET /api/discounts — list discount codes (admin only).
export async function GET() {
  if (!requireAdmin()) return unauthorized();
  const discounts = await getAllDiscounts();
  return json({ discounts });
}

// POST /api/discounts — create a discount code (admin only).
export async function POST(request: Request) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body?.code || typeof body?.value !== "number") return badRequest("code and value are required.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);

  const { data, error } = await db
    .from("discount_codes")
    .insert({
      code: String(body.code).toUpperCase(),
      type: body.type || "percentage",
      value: body.value,
      min_subtotal: body.minSubtotal ?? null,
      active: body.active ?? true,
      expires_at: body.expiresAt ?? null,
      usage_limit: body.usageLimit ?? null,
    })
    .select()
    .single();
  if (error) return badRequest(error.message);
  return json({ discount: data }, 201);
}

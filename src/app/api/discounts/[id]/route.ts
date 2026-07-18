import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// PUT /api/discounts/[id] — update a discount code (admin only).
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body) return badRequest("Invalid body.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);

  const row: Record<string, unknown> = {};
  const map: Record<string, string> = { minSubtotal: "min_subtotal", expiresAt: "expires_at", usageLimit: "usage_limit" };
  for (const [k, v] of Object.entries(body)) row[map[k] || k] = v;

  const { data, error } = await db.from("discount_codes").update(row).eq("id", params.id).select().single();
  if (error) return badRequest(error.message);
  return json({ discount: data });
}

// DELETE /api/discounts/[id] — remove a discount code (admin only).
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);
  const { error } = await db.from("discount_codes").delete().eq("id", params.id);
  if (error) return badRequest(error.message);
  return json({ ok: true });
}

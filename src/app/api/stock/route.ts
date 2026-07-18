import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// PATCH /api/stock — update stock levels (admin only).
// Body: { updates: [{ id, stock }] } or { id, stock }.
export async function PATCH(request: Request) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  const updates: { id: string; stock: number }[] = body?.updates || (body?.id ? [{ id: body.id, stock: body.stock }] : []);
  if (updates.length === 0) return badRequest("Provide id + stock, or an updates array.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);

  for (const u of updates) {
    const { error } = await db.from("products").update({ stock: u.stock }).eq("id", u.id);
    if (error) return badRequest(error.message);
  }
  return json({ ok: true, updated: updates.length });
}

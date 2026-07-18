import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// PATCH /api/reviews/[id] — approve/unapprove a review (admin only).
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);
  const { data, error } = await db
    .from("reviews")
    .update({ approved: body?.approved ?? true })
    .eq("id", params.id)
    .select()
    .single();
  if (error) return badRequest(error.message);
  return json({ review: data });
}

// DELETE /api/reviews/[id] — remove a review (admin only).
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);
  const { error } = await db.from("reviews").delete().eq("id", params.id);
  if (error) return badRequest(error.message);
  return json({ ok: true });
}

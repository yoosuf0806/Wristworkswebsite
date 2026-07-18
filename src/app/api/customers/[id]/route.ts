import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// PUT /api/customers/[id] — update a customer (admin only).
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body) return badRequest("Invalid body.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);

  const { data, error } = await db.from("customers").update(body).eq("id", params.id).select().single();
  if (error) return badRequest(error.message);
  return json({ customer: data });
}

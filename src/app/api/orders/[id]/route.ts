import { getOrderById } from "@/lib/data/orders";
import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// GET /api/orders/[id] — fetch one order by id or reference.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);
  if (!order) return json({ error: "Not found" }, 404);
  return json({ order });
}

// PATCH /api/orders/[id] — update order status (admin only).
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body?.status) return badRequest("status is required.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);

  const { data, error } = await db.from("orders").update({ status: body.status }).eq("id", params.id).select().single();
  if (error) return badRequest(error.message);
  return json({ order: data });
}

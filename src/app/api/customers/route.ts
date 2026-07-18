import { getAllCustomers } from "@/lib/data/customers";
import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// GET /api/customers — list customers (admin only).
export async function GET() {
  if (!requireAdmin()) return unauthorized();
  const customers = await getAllCustomers();
  return json({ customers });
}

// POST /api/customers — create/register a customer.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.phone) return badRequest("name and phone are required.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);

  const { data, error } = await db
    .from("customers")
    .insert({ name: body.name, phone: body.phone, email: body.email ?? null, city: body.city ?? null })
    .select()
    .single();
  if (error) return badRequest(error.message);
  return json({ customer: data }, 201);
}

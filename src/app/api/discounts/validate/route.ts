import { validateDiscount } from "@/lib/data/discounts";
import { json, badRequest } from "@/lib/apiHelpers";

// POST /api/discounts/validate — check a code against the cart subtotal.
// Called from the cart page; returns { valid, amount, message }.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.code || typeof body?.subtotal !== "number") {
    return badRequest("code and subtotal are required.");
  }
  const result = await validateDiscount(body.code, body.subtotal);
  return json(result);
}

import { getAllOrders } from "@/lib/data/orders";
import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";
import { notifyOrder } from "@/lib/whatsapp";
import type { OrderItem } from "@/types";

// GET /api/orders — list orders (admin only).
export async function GET() {
  if (!requireAdmin()) return unauthorized();
  const orders = await getAllOrders();
  return json({ orders });
}

// Generate a human-friendly order reference like WW-1042.
function makeReference() {
  return `WW-${1000 + Math.floor(Math.random() * 9000)}`;
}

// POST /api/orders — place an order (public; called from checkout).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.customer?.name || !body?.customer?.phone || !Array.isArray(body?.items) || body.items.length === 0) {
    return badRequest("Customer name, phone and at least one item are required.");
  }

  const items: OrderItem[] = body.items;
  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0);
  const discountAmount = Number(body.discountAmount || 0);
  const shipping = Number(body.shipping || 0);
  const total = Math.max(0, subtotal - discountAmount) + shipping;
  const reference = makeReference();

  const orderRecord = {
    reference,
    customer: body.customer,
    items,
    subtotal,
    discount_code: body.discountCode ?? null,
    discount_amount: discountAmount,
    shipping,
    total,
    payment_method: body.paymentMethod || "cod",
    status: "pending" as const,
  };

  const db = adminDbOrNull();
  if (db) {
    const { data, error } = await db.from("orders").insert(orderRecord).select().single();
    if (error) return badRequest(error.message);
    // Best-effort stock decrement per line item.
    for (const item of items) {
      const { data: prod } = await db.from("products").select("stock").eq("id", item.productId).maybeSingle();
      if (prod) {
        await db.from("products").update({ stock: Math.max(0, prod.stock - item.qty) }).eq("id", item.productId);
      }
    }
    await notifyOrder(reference, body.customer, total);
    return json({ order: { reference, id: data.id } }, 201);
  }

  // No DB configured — still return a reference so the flow completes in dev.
  await notifyOrder(reference, body.customer, total);
  return json({ order: { reference } }, 201);
}

import { createServerSupabase, hasSupabase } from "@/lib/supabase/server";
import type { Order } from "@/types";
import { mockOrders } from "@/lib/data/mock";

// Order queries. Writes happen in the API routes via the admin client; these
// helpers cover the reads used by the admin dashboard and confirmation page.

function mapOrder(row: any): Order {
  return {
    id: row.id,
    reference: row.reference,
    customer: row.customer,
    items: row.items,
    subtotal: row.subtotal,
    discountCode: row.discount_code,
    discountAmount: row.discount_amount,
    shipping: row.shipping,
    total: row.total,
    paymentMethod: row.payment_method,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function getAllOrders(): Promise<Order[]> {
  if (!hasSupabase()) return mockOrders;
  const supabase = createServerSupabase();
  const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  return data ? data.map(mapOrder) : mockOrders;
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (!hasSupabase()) return mockOrders.find((o) => o.id === id || o.reference === id) ?? null;
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .or(`id.eq.${id},reference.eq.${id}`)
    .maybeSingle();
  return data ? mapOrder(data) : null;
}

// Simple revenue / status roll-up for the sales dashboard.
export async function getSalesSummary() {
  const orders = await getAllOrders();
  const paid = orders.filter((o) => o.status !== "cancelled");
  const revenue = paid.reduce((t, o) => t + o.total, 0);
  const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  return {
    orderCount: orders.length,
    revenue,
    averageOrder: paid.length ? Math.round(revenue / paid.length) : 0,
    byStatus,
  };
}

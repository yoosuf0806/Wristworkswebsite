import { createServerSupabase, hasSupabase } from "@/lib/supabase/server";
import type { Customer } from "@/types";
import { mockCustomers } from "@/lib/data/mock";

// Customer list queries used by the admin dashboard.

export async function getAllCustomers(): Promise<Customer[]> {
  if (!hasSupabase()) return mockCustomers;
  const supabase = createServerSupabase();
  const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
  if (!data) return mockCustomers;
  return data.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    city: c.city,
    ordersCount: c.orders_count,
    totalSpent: c.total_spent,
    createdAt: c.created_at,
  }));
}

import { createServerSupabase, hasSupabase } from "@/lib/supabase/server";
import type { DiscountCode } from "@/types";
import { mockDiscounts } from "@/lib/data/mock";

// Discount code queries + validation used by the cart / checkout and admin.

export async function getAllDiscounts(): Promise<DiscountCode[]> {
  if (!hasSupabase()) return mockDiscounts;
  const supabase = createServerSupabase();
  const { data } = await supabase.from("discount_codes").select("*");
  if (!data) return mockDiscounts;
  return data.map((d) => ({
    id: d.id,
    code: d.code,
    type: d.type as DiscountCode["type"],
    value: d.value,
    minSubtotal: d.min_subtotal,
    active: d.active,
    expiresAt: d.expires_at,
    usageLimit: d.usage_limit,
    usedCount: d.used_count,
  }));
}

export interface DiscountResult {
  valid: boolean;
  amount: number;
  message: string;
  code?: DiscountCode;
}

// Validate a code against the current subtotal and return the discount amount.
export async function validateDiscount(code: string, subtotal: number): Promise<DiscountResult> {
  const all = await getAllDiscounts();
  const found = all.find((d) => d.code.toUpperCase() === code.trim().toUpperCase());

  if (!found || !found.active) return { valid: false, amount: 0, message: "That code isn't valid." };
  if (found.expiresAt && new Date(found.expiresAt) < new Date())
    return { valid: false, amount: 0, message: "That code has expired." };
  if (found.usageLimit && found.usedCount >= found.usageLimit)
    return { valid: false, amount: 0, message: "That code has reached its usage limit." };
  if (found.minSubtotal && subtotal < found.minSubtotal)
    return {
      valid: false,
      amount: 0,
      message: `Spend Rs. ${found.minSubtotal.toLocaleString("en-US")} to use this code.`,
    };

  const amount =
    found.type === "percentage" ? Math.round((subtotal * found.value) / 100) : found.value;
  return { valid: true, amount, message: "Discount applied.", code: found };
}

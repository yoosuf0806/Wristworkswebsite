import { createPublicSupabase, hasSupabase } from "@/lib/supabase/server";
import type { Faq } from "@/types";
import { mockFaqs } from "@/lib/data/mock";

// FAQ content, stored in Supabase and editable from admin. FAQs are scoped:
// "global" show everywhere, "product"/"category"/"page" match a scopeRef.

export async function getAllFaqs(): Promise<Faq[]> {
  if (!hasSupabase()) return mockFaqs;
  const supabase = createPublicSupabase();
  const { data } = (await supabase.from("faqs").select("*").order("position")) as { data: any[] | null };
  if (!data) return mockFaqs;
  return data.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    scope: f.scope as Faq["scope"],
    scopeRef: f.scope_ref,
    position: f.position,
  }));
}

// FAQs to render on a given scope. Global FAQs are always included; scoped
// FAQs are included when their scopeRef matches (falling back to global-only).
export async function getFaqsFor(
  scope: "product" | "category" | "page",
  ref?: string
): Promise<Faq[]> {
  const all = await getAllFaqs();
  const scoped = all.filter((f) => f.scope === scope && (!ref || f.scopeRef === ref));
  const globals = all.filter((f) => f.scope === "global");
  const combined = [...scoped, ...globals];
  // Deduplicate by id and keep at most a sensible number for the schema.
  const seen = new Set<string>();
  return combined.filter((f) => (seen.has(f.id) ? false : (seen.add(f.id), true)));
}

// Home-page FAQs (global set).
export async function getGlobalFaqs(): Promise<Faq[]> {
  const all = await getAllFaqs();
  return all.filter((f) => f.scope === "global");
}

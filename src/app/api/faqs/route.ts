import { getAllFaqs } from "@/lib/data/faqs";
import { json, badRequest, requireAdmin, unauthorized, adminDbOrNull } from "@/lib/apiHelpers";

// GET /api/faqs — list all FAQs (optionally filtered by scope/ref via query).
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");
  const ref = searchParams.get("ref");
  let faqs = await getAllFaqs();
  if (scope) faqs = faqs.filter((f) => f.scope === scope && (!ref || f.scopeRef === ref));
  return json({ faqs });
}

// POST /api/faqs — create a FAQ (admin only).
export async function POST(request: Request) {
  if (!requireAdmin()) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body?.question || !body?.answer) return badRequest("question and answer are required.");

  const db = adminDbOrNull();
  if (!db) return json({ ok: true, note: "Supabase not configured." }, 202);

  const { data, error } = await db
    .from("faqs")
    .insert({
      question: body.question,
      answer: body.answer,
      scope: body.scope || "global",
      scope_ref: body.scopeRef ?? null,
      position: body.position ?? 0,
    })
    .select()
    .single();
  if (error) return badRequest(error.message);
  return json({ faq: data }, 201);
}

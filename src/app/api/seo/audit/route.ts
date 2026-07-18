import { runSeoAudit } from "@/lib/data/seoAudit";
import { json, requireAdmin, unauthorized } from "@/lib/apiHelpers";

// GET /api/seo/audit — content analysis feeding the admin SEO dashboard.
export async function GET() {
  if (!requireAdmin()) return unauthorized();
  const audit = await runSeoAudit();
  return json(audit);
}

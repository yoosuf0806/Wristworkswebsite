import Link from "next/link";
import { runSeoAudit } from "@/lib/data/seoAudit";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { Table, Row, Cell } from "@/components/admin/Table";

// SEO content analysis (RankMath-style): flags products and pages missing meta
// titles, descriptions, focus keywords or image alt text.
export default async function SeoDashboard() {
  const audit = await runSeoAudit();

  return (
    <div>
      <PageHeader title="SEO analysis" subtitle="Content health across products and pages" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="SEO score" value={`${audit.score}%`} />
        <StatCard label="Items scanned" value={String(audit.totalItems)} />
        <StatCard label="Need attention" value={String(audit.issueCount)} />
      </div>

      <div className="mt-8">
        {audit.items.length === 0 ? (
          <p className="text-whatsapp">Everything is optimised — no missing meta or alt text. 🎉</p>
        ) : (
          <Table head={["Item", "Type", "Issues", ""]}>
            {audit.items.map((item) => (
              <Row key={`${item.type}-${item.id}`}>
                <Cell className="font-medium">{item.name}</Cell>
                <Cell className="capitalize text-muted2">{item.type}</Cell>
                <Cell>
                  <div className="flex flex-wrap gap-2">
                    {item.issues.map((iss) => (
                      <span key={iss} className="border border-[#4a3a2a] bg-[#1a140c] px-2 py-1 text-[11px] text-[#ec8]">
                        {iss}
                      </span>
                    ))}
                  </div>
                </Cell>
                <Cell>
                  {item.type === "product" ? (
                    <Link href={`/admin/products/${item.id}`} className="text-[12px] uppercase tracking-[.12em] text-muted2 hover:text-white">Fix</Link>
                  ) : (
                    <Link href="/admin/pages-seo" className="text-[12px] uppercase tracking-[.12em] text-muted2 hover:text-white">Fix</Link>
                  )}
                </Cell>
              </Row>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
}

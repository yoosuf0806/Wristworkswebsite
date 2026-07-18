import { getAllCategories } from "@/lib/data/categories";
import { getAllPageSeo } from "@/lib/data/pageSeo";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, Row, Cell } from "@/components/admin/Table";

// Page SEO editor overview. Lists every static page + category/brand landing
// page with its current meta status. (Editing UI posts to the SEO fields APIs.)
export default async function PagesSeo() {
  const [categories, pages] = await Promise.all([getAllCategories(), getAllPageSeo()]);

  return (
    <div>
      <PageHeader title="Page SEO" subtitle="H1, meta title/description, focus keyword and SEO paragraph per page" />

      <h2 className="mb-3 text-[13px] uppercase tracking-[.16em] text-muted">Static pages</h2>
      <Table head={["Page", "Meta title", "Focus keyword", "Status"]}>
        {pages.map((p) => (
          <Row key={p.pageKey}>
            <Cell className="font-medium capitalize">{p.pageKey}</Cell>
            <Cell className="text-muted2">{p.metaTitle || "—"}</Cell>
            <Cell className="text-muted2">{p.focusKeyword || "—"}</Cell>
            <Cell className={p.metaTitle && p.metaDescription ? "text-whatsapp" : "text-[#ec8]"}>
              {p.metaTitle && p.metaDescription ? "Complete" : "Incomplete"}
            </Cell>
          </Row>
        ))}
      </Table>

      <h2 className="mb-3 mt-10 text-[13px] uppercase tracking-[.16em] text-muted">Brand & category pages</h2>
      <Table head={["Page", "H1", "Focus keyword", "Status"]}>
        {categories.map((c) => (
          <Row key={c.slug}>
            <Cell className="font-medium">/shop/{c.slug}</Cell>
            <Cell className="text-muted2">{c.title}</Cell>
            <Cell className="text-muted2">{c.focusKeyword || "—"}</Cell>
            <Cell className={c.metaTitle && c.metaDescription && c.seoParagraph ? "text-whatsapp" : "text-[#ec8]"}>
              {c.metaTitle && c.metaDescription && c.seoParagraph ? "Complete" : "Incomplete"}
            </Cell>
          </Row>
        ))}
      </Table>

      <p className="mt-6 max-w-2xl text-[13px] leading-[1.8] text-muted">
        Meta fields for products are edited on each product page. Static-page and category SEO are
        stored in the <code className="text-white">page_seo</code> and{" "}
        <code className="text-white">categories</code> tables and can be wired to inline editing the
        same way the product form saves via the API.
      </p>
    </div>
  );
}

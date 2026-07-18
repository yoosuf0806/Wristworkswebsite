import Link from "next/link";
import { getAllProducts } from "@/lib/data/products";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, Row, Cell } from "@/components/admin/Table";
import { formatPrice } from "@/lib/utils";

// Products management: list with quick SEO/stock indicators.
export default async function AdminProducts() {
  const products = await getAllProducts();

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle={`${products.length} products`}
        action={
          <Link href="/admin/products/new" className="bg-white px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[.16em] text-black hover:bg-[#ccc]">
            + New product
          </Link>
        }
      />
      <Table head={["Product", "Brand", "Price", "Stock", "SEO", ""]}>
        {products.map((p) => {
          const seoOk = p.metaTitle && p.metaDescription && p.images.every((i) => i.alt);
          return (
            <Row key={p.id}>
              <Cell className="font-medium">{p.name}</Cell>
              <Cell className="text-muted2">{p.brand}</Cell>
              <Cell>{formatPrice(p.offerPrice ?? p.price)}</Cell>
              <Cell className={p.stock === 0 ? "text-[#e88]" : p.stock <= 3 ? "text-[#ec8]" : "text-muted2"}>
                {p.stock}
              </Cell>
              <Cell>
                <span className={seoOk ? "text-whatsapp" : "text-[#ec8]"}>{seoOk ? "✓ Complete" : "Needs work"}</span>
              </Cell>
              <Cell>
                <Link href={`/admin/products/${p.id}`} className="text-[12px] uppercase tracking-[.12em] text-muted2 hover:text-white">
                  Edit
                </Link>
              </Cell>
            </Row>
          );
        })}
      </Table>
    </div>
  );
}

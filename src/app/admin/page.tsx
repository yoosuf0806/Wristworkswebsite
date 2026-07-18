import Link from "next/link";
import { getSalesSummary } from "@/lib/data/orders";
import { getAllProducts } from "@/lib/data/products";
import { getAllCustomers } from "@/lib/data/customers";
import { runSeoAudit } from "@/lib/data/seoAudit";
import { StatCard } from "@/components/admin/StatCard";
import { PageHeader } from "@/components/admin/PageHeader";
import { formatPrice } from "@/lib/utils";

// Admin overview: revenue, orders, catalog + SEO health at a glance.
export default async function AdminDashboard() {
  const [sales, products, customers, seo] = await Promise.all([
    getSalesSummary(),
    getAllProducts(),
    getAllCustomers(),
    runSeoAudit(),
  ]);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Store overview" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Revenue" value={formatPrice(sales.revenue)} sub={`${sales.orderCount} orders`} />
        <StatCard label="Avg. order" value={formatPrice(sales.averageOrder)} />
        <StatCard label="Products" value={String(products.length)} sub={`${lowStock} low · ${outOfStock} out`} />
        <StatCard label="SEO score" value={`${seo.score}%`} sub={`${seo.issueCount} items need work`} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/admin/orders" className="border border-line bg-card p-6 transition-colors hover:border-line2">
          <div className="text-[15px] font-medium">Orders</div>
          <p className="mt-1 text-[13px] text-muted2">{sales.orderCount} total · manage fulfilment and status.</p>
        </Link>
        <Link href="/admin/seo-dashboard" className="border border-line bg-card p-6 transition-colors hover:border-line2">
          <div className="text-[15px] font-medium">SEO content analysis</div>
          <p className="mt-1 text-[13px] text-muted2">{seo.issueCount} products/pages missing meta or alt text.</p>
        </Link>
        <Link href="/admin/stock" className="border border-line bg-card p-6 transition-colors hover:border-line2">
          <div className="text-[15px] font-medium">Stock</div>
          <p className="mt-1 text-[13px] text-muted2">{lowStock} low, {outOfStock} out of stock.</p>
        </Link>
        <Link href="/admin/customers" className="border border-line bg-card p-6 transition-colors hover:border-line2">
          <div className="text-[15px] font-medium">Customers</div>
          <p className="mt-1 text-[13px] text-muted2">{customers.length} customers.</p>
        </Link>
      </div>
    </div>
  );
}

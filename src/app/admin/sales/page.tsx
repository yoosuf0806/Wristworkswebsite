import { getAllOrders, getSalesSummary } from "@/lib/data/orders";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { formatPrice } from "@/lib/utils";

// Sales dashboard: revenue, order counts, status breakdown and top products.
export default async function AdminSales() {
  const [summary, orders] = await Promise.all([getSalesSummary(), getAllOrders()]);

  // Top products by units sold across all orders.
  const productUnits = new Map<string, { name: string; units: number; revenue: number }>();
  for (const o of orders) {
    for (const i of o.items) {
      const cur = productUnits.get(i.productId) || { name: i.name, units: 0, revenue: 0 };
      cur.units += i.qty;
      cur.revenue += i.price * i.qty;
      productUnits.set(i.productId, cur);
    }
  }
  const top = [...productUnits.values()].sort((a, b) => b.units - a.units).slice(0, 5);

  return (
    <div>
      <PageHeader title="Sales" subtitle="Performance overview" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total revenue" value={formatPrice(summary.revenue)} />
        <StatCard label="Orders" value={String(summary.orderCount)} />
        <StatCard label="Avg. order value" value={formatPrice(summary.averageOrder)} />
        <StatCard label="Delivered" value={String(summary.byStatus.delivered || 0)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border border-line bg-card p-6">
          <h2 className="mb-4 text-[13px] uppercase tracking-[.16em] text-muted">Orders by status</h2>
          <div className="space-y-2 text-[14px]">
            {Object.entries(summary.byStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between">
                <span className="capitalize text-muted2">{status}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-line bg-card p-6">
          <h2 className="mb-4 text-[13px] uppercase tracking-[.16em] text-muted">Top products</h2>
          <div className="space-y-2 text-[14px]">
            {top.length === 0 && <p className="text-muted2">No sales yet.</p>}
            {top.map((p) => (
              <div key={p.name} className="flex justify-between">
                <span className="text-muted2">{p.name}</span>
                <span>{p.units} · {formatPrice(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/data/orders";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrderStatusControl } from "@/components/admin/OrderStatusControl";
import { formatPrice } from "@/lib/utils";

// Order detail with status control.
export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);
  if (!order) notFound();

  return (
    <div className="max-w-2xl">
      <PageHeader title={`Order ${order.reference}`} subtitle={new Date(order.createdAt).toLocaleString()} />

      <div className="mb-6 border border-line bg-card p-6">
        <div className="text-[11px] uppercase tracking-[.16em] text-muted">Status</div>
        <div className="mt-3">
          <OrderStatusControl orderId={order.id} current={order.status} />
        </div>
      </div>

      <div className="mb-6 border border-line bg-card p-6">
        <div className="text-[11px] uppercase tracking-[.16em] text-muted">Customer</div>
        <div className="mt-3 text-[14px] leading-[1.9]">
          {order.customer.name}<br />
          {order.customer.phone}{order.customer.email ? ` · ${order.customer.email}` : ""}<br />
          {order.customer.address}, {order.customer.city}
        </div>
      </div>

      <div className="border border-line bg-card p-6">
        <div className="text-[11px] uppercase tracking-[.16em] text-muted">Items</div>
        <div className="mt-3 space-y-2 text-[14px]">
          {order.items.map((i) => (
            <div key={i.productId} className="flex justify-between text-muted2">
              <span>{i.name} × {i.qty}</span>
              <span className="text-white">{formatPrice(i.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1 border-t border-line pt-4 text-[14px]">
          <div className="flex justify-between text-muted2"><span>Subtotal</span><span className="text-white">{formatPrice(order.subtotal)}</span></div>
          {order.discountAmount > 0 && <div className="flex justify-between text-muted2"><span>Discount ({order.discountCode})</span><span className="text-white">− {formatPrice(order.discountAmount)}</span></div>}
          <div className="flex justify-between text-muted2"><span>Shipping</span><span className="text-white">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span></div>
          <div className="flex justify-between pt-2 text-[16px] font-bold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
        </div>
      </div>
    </div>
  );
}

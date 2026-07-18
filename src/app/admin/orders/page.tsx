import Link from "next/link";
import { getAllOrders } from "@/lib/data/orders";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, Row, Cell } from "@/components/admin/Table";
import { formatPrice } from "@/lib/utils";

// Orders management: list of all orders with status.
export default async function AdminOrders() {
  const orders = await getAllOrders();
  return (
    <div>
      <PageHeader title="Orders" subtitle={`${orders.length} orders`} />
      <Table head={["Reference", "Customer", "Items", "Total", "Payment", "Status", ""]}>
        {orders.map((o) => (
          <Row key={o.id}>
            <Cell className="font-medium">{o.reference}</Cell>
            <Cell className="text-muted2">{o.customer.name}<br /><span className="text-[11px] text-muted">{o.customer.city}</span></Cell>
            <Cell className="text-muted2">{o.items.reduce((t, i) => t + i.qty, 0)}</Cell>
            <Cell>{formatPrice(o.total)}</Cell>
            <Cell className="uppercase text-[11px] tracking-[.1em] text-muted2">{o.paymentMethod}</Cell>
            <Cell><StatusPill status={o.status} /></Cell>
            <Cell>
              <Link href={`/admin/orders/${o.id}`} className="text-[12px] uppercase tracking-[.12em] text-muted2 hover:text-white">Open</Link>
            </Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "text-[#ec8]",
    confirmed: "text-[#8cf]",
    packed: "text-[#8cf]",
    shipped: "text-[#8cf]",
    delivered: "text-whatsapp",
    cancelled: "text-[#e88]",
  };
  return <span className={`text-[12px] uppercase tracking-[.1em] ${colors[status] || "text-muted2"}`}>{status}</span>;
}

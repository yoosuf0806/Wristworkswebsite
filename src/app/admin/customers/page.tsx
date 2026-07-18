import { getAllCustomers } from "@/lib/data/customers";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, Row, Cell } from "@/components/admin/Table";
import { formatPrice } from "@/lib/utils";

// Customer list.
export default async function AdminCustomers() {
  const customers = await getAllCustomers();
  return (
    <div>
      <PageHeader title="Customers" subtitle={`${customers.length} customers`} />
      <Table head={["Name", "Phone", "City", "Orders", "Spent"]}>
        {customers.map((c) => (
          <Row key={c.id}>
            <Cell className="font-medium">{c.name}<br /><span className="text-[11px] text-muted">{c.email}</span></Cell>
            <Cell className="text-muted2">{c.phone}</Cell>
            <Cell className="text-muted2">{c.city || "—"}</Cell>
            <Cell>{c.ordersCount}</Cell>
            <Cell>{formatPrice(c.totalSpent)}</Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
}

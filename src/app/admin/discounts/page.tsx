import { getAllDiscounts } from "@/lib/data/discounts";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, Row, Cell } from "@/components/admin/Table";
import { DiscountCreator } from "@/components/admin/DiscountCreator";
import { formatPrice } from "@/lib/utils";

// Discount codes management.
export default async function AdminDiscounts() {
  const discounts = await getAllDiscounts();
  return (
    <div>
      <PageHeader title="Discount codes" subtitle={`${discounts.length} codes`} />
      <DiscountCreator />
      <div className="mt-8">
        <Table head={["Code", "Type", "Value", "Min spend", "Active", "Used"]}>
          {discounts.map((d) => (
            <Row key={d.id}>
              <Cell className="font-medium uppercase">{d.code}</Cell>
              <Cell className="text-muted2">{d.type}</Cell>
              <Cell>{d.type === "percentage" ? `${d.value}%` : formatPrice(d.value)}</Cell>
              <Cell className="text-muted2">{d.minSubtotal ? formatPrice(d.minSubtotal) : "—"}</Cell>
              <Cell className={d.active ? "text-whatsapp" : "text-[#e88]"}>{d.active ? "Yes" : "No"}</Cell>
              <Cell className="text-muted2">{d.usedCount}{d.usageLimit ? ` / ${d.usageLimit}` : ""}</Cell>
            </Row>
          ))}
        </Table>
      </div>
    </div>
  );
}

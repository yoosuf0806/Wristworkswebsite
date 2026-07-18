import { getAllProducts } from "@/lib/data/products";
import { PageHeader } from "@/components/admin/PageHeader";
import { StockManager } from "@/components/admin/StockManager";

// Stock management page.
export default async function AdminStock() {
  const products = await getAllProducts();
  const low = products.filter((p) => p.stock <= 3).length;
  return (
    <div>
      <PageHeader title="Stock" subtitle={`${low} products low or out of stock`} />
      <StockManager products={products} />
    </div>
  );
}

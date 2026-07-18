import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";

// Create a new product.
export default function NewProductPage() {
  return (
    <div>
      <PageHeader title="New product" subtitle="Add a watch to the catalog" />
      <ProductForm />
    </div>
  );
}

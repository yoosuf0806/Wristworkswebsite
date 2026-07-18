import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/data/products";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";

// Edit an existing product (looked up by id).
export default async function EditProductPage({ params }: { params: { id: string } }) {
  const products = await getAllProducts();
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div>
      <PageHeader title={product.name} subtitle="Edit product & SEO" />
      <ProductForm product={product} />
    </div>
  );
}

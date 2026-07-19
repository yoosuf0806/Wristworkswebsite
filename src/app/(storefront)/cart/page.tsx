import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { CartView } from "@/components/cart/CartView";

// Cart is a utility page — no need to index it.
export const metadata: Metadata = buildMetadata({
  title: "Your Cart",
  description: "Review the watches in your cart and apply a discount code before checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-12">
      <h1 className="mb-12 font-serif text-[clamp(36px,5vw,60px)] font-normal">Your Cart</h1>
      <CartView />
    </div>
  );
}

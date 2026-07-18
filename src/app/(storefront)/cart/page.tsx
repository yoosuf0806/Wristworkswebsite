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
    <div className="mx-auto max-w-[1100px] px-6 py-14 md:px-12">
      <h1 className="mb-10 font-serif text-[clamp(30px,4vw,44px)] font-normal">Your Cart</h1>
      <CartView />
    </div>
  );
}

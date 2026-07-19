import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your Wrist Works order — island-wide delivery, Koko instalments and cash on delivery available.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-12">
      <Breadcrumbs crumbs={[{ name: "Cart", path: "/cart" }, { name: "Checkout", path: "/checkout" }]} />
      <h1 className="mb-12 mt-6 font-serif text-[clamp(36px,5vw,60px)] font-normal">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your Wrist Works order — island-wide delivery, Koko instalments and cash on delivery available.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-14 md:px-12">
      <h1 className="mb-10 font-serif text-[clamp(30px,4vw,44px)] font-normal">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getOrderById } from "@/lib/data/orders";
import { formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/lib/seo/siteConfig";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Order Confirmed",
  description: "Thank you for your Wrist Works order.",
  path: "/order-confirmation",
  noIndex: true,
});

export default async function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const order = await getOrderById(params.orderId);

  return (
    <div className="mx-auto max-w-[720px] px-6 py-20 text-center md:px-0">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-whatsapp text-whatsapp text-2xl">
        ✓
      </div>
      <div className="eyebrow">Order confirmed</div>
      <h1 className="mt-3 font-serif text-[clamp(30px,4vw,48px)] font-normal">Thank you{order ? `, ${order.customer.name.split(" ")[0]}` : ""}.</h1>
      <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.8] text-muted2">
        We&apos;ve received your order{order ? ` ${order.reference}` : ""} and will send you live photos of your
        watch on WhatsApp before it ships. Delivery is 2–4 working days island-wide.
      </p>

      {order && (
        <div className="mx-auto mt-10 max-w-[420px] border border-line bg-card p-7 text-left">
          <div className="mb-4 text-[11px] uppercase tracking-[.2em] text-muted">Order {order.reference}</div>
          <div className="space-y-2 text-[14px]">
            {order.items.map((i) => (
              <div key={i.productId} className="flex justify-between text-muted2">
                <span>{i.name} × {i.qty}</span>
                <span className="text-white">{formatPrice(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-[16px] font-bold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href="/shop" variant="outline">Continue shopping</Button>
        <a href={whatsappLink(`Hi Wrist Works! Checking on my order ${order?.reference ?? ""}.`)} className="cap text-whatsapp">
          Message us on WhatsApp →
        </a>
      </div>
      <p className="mt-8 text-[12px] text-muted">
        <Link href="/" className="hover:text-white">Back to home</Link>
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { whatsappLink } from "@/lib/seo/siteConfig";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "My Account",
  description: "Track your Wrist Works orders and manage your details.",
  path: "/account",
  noIndex: true,
});

// Lightweight account page. A full auth flow (Supabase Auth) can be wired to the
// existing server/client Supabase helpers; for now this is an order-lookup entry.
export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[560px] px-6 py-20 text-center md:px-0">
      <div className="eyebrow">Your account</div>
      <h1 className="mt-3 font-serif text-[clamp(30px,4vw,44px)] font-normal">Track an order</h1>
      <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[1.8] text-muted2">
        Have your order number handy? Message us on WhatsApp and we&apos;ll send you a live status
        update and tracking straight away.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <a
          href={whatsappLink("Hi Wrist Works! I'd like a status update on my order.")}
          className="bg-whatsapp px-8 py-4 text-[11.5px] font-bold uppercase tracking-[.16em] text-black transition-transform hover:scale-[1.03]"
        >
          Track on WhatsApp
        </a>
        <Button href="/shop" variant="ghost">Continue shopping</Button>
      </div>
    </div>
  );
}

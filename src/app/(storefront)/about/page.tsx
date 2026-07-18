import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import { Button } from "@/components/ui/Button";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("about");
  return buildMetadata({
    title: seo.metaTitle!,
    description: seo.metaDescription!,
    path: "/about",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
  });
}

export default function AboutPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];
  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <div className="px-6 pt-10 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
        <div className="eyebrow mt-6">Our story</div>
        <h1 className="mt-3 max-w-[720px] font-serif text-[clamp(34px,5vw,60px)] font-normal leading-[1.08]">
          A watch boutique for Colombo — built on trust.
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:px-12">
        <p className="font-serif text-[clamp(20px,2.4vw,28px)] font-normal italic leading-[1.5]">
          We started Wrist Works because buying a genuine watch in Sri Lanka shouldn&apos;t mean
          guessing whether it&apos;s real.
        </p>
        <div className="space-y-5 text-[15px] leading-[1.9] text-muted2">
          <p>
            Every watch we sell comes from an authorised distributor, arrives sealed, and carries a
            stamped manufacturer warranty card. We inspect each piece in Colombo and send you live
            photos on WhatsApp before it ships.
          </p>
          <p>
            Casio, Edifice, Seiko and Citizen — from the Rs. 15,000 vintage classics to Presage
            automatics and Prospex divers. Island-wide delivery in 2–4 days, Koko instalments, and
            cash on delivery in Colombo &amp; suburbs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
        {[
          ["100%", "Genuine, warranty-backed"],
          ["4.9★", "Google rating"],
          ["2–4 days", "Island-wide delivery"],
          ["1–5 yrs", "Manufacturer warranty"],
        ].map(([big, small]) => (
          <div key={small} className="bg-black px-6 py-12">
            <div className="text-[26px] font-semibold">{big}</div>
            <div className="mt-2 text-[12px] uppercase tracking-[.14em] text-muted">{small}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 px-6 py-24 text-center md:px-12">
        <h2 className="font-serif text-[32px] font-normal">Ready to find yours?</h2>
        <Button href="/shop" variant="solid">Shop the collection</Button>
      </div>
    </>
  );
}

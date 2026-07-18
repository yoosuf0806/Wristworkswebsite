import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { getGlobalFaqs } from "@/lib/data/faqs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema, LocalBusinessSchema } from "@/components/seo/schemas";
import { FaqSection } from "@/components/shop/FaqSection";
import { whatsappLink, siteConfig } from "@/lib/seo/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contact");
  return buildMetadata({
    title: seo.metaTitle!,
    description: seo.metaDescription!,
    path: "/contact",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
  });
}

export default async function ContactPage() {
  const faqs = await getGlobalFaqs();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <LocalBusinessSchema />

      <div className="px-6 pt-10 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
        <div className="eyebrow mt-6">Get in touch</div>
        <h1 className="mt-3 font-serif text-[clamp(34px,5vw,56px)] font-normal">We&apos;re here to help.</h1>
        <p className="mt-4 max-w-[560px] text-[15px] leading-[1.8] text-muted2">
          The fastest way to reach us is WhatsApp — we&apos;ll happily send live photos and answer any
          question before you buy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border-y border-line bg-line md:grid-cols-3">
        <div className="bg-black px-8 py-12">
          <div className="eyebrow mb-3">WhatsApp</div>
          <a href={whatsappLink()} className="text-[18px] text-whatsapp">{siteConfig.contact.phoneDisplay}</a>
          <p className="mt-3 text-[13px] text-muted">Fastest response · {siteConfig.contact.hours}</p>
        </div>
        <div className="bg-black px-8 py-12">
          <div className="eyebrow mb-3">Email</div>
          <a href={`mailto:${siteConfig.contact.email}`} className="text-[16px] text-white">{siteConfig.contact.email}</a>
          <p className="mt-3 text-[13px] text-muted">We reply within one business day.</p>
        </div>
        <div className="bg-black px-8 py-12">
          <div className="eyebrow mb-3">Location</div>
          <div className="text-[16px] text-white">Colombo, Sri Lanka</div>
          <p className="mt-3 text-[13px] text-muted">Online boutique · island-wide delivery</p>
        </div>
      </div>

      <FaqSection faqs={faqs} heading="Before you message us" />
    </>
  );
}

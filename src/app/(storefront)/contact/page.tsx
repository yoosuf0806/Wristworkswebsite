import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { BreadcrumbSchema, LocalBusinessSchema } from "@/components/seo/schemas";
import { ContactForm } from "@/components/contact/ContactForm";
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

export default function ContactPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <LocalBusinessSchema />

      <section className="grid grid-cols-1 gap-16 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-12">
        {/* Left: heading + contact details */}
        <div>
          <div className="eyebrow mb-8">Contact</div>
          <h1 className="font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-[1.05]">
            We answer fast — usually on WhatsApp.
          </h1>

          <div className="mt-16 space-y-10">
            <div>
              <div className="text-[12px] uppercase tracking-[.2em] text-muted">WhatsApp</div>
              <a href={whatsappLink()} className="mt-3 block text-[20px] text-whatsapp">
                {siteConfig.contact.phoneDisplay} →
              </a>
              <p className="mt-2 text-[14px] text-muted2">Fastest — live photos, stock checks, order tracking</p>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[.2em] text-muted">Email</div>
              <a href={`mailto:${siteConfig.contact.email}`} className="mt-3 block text-[18px] text-white hover:text-muted2">
                {siteConfig.contact.email}
              </a>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[.2em] text-muted">Hours</div>
              <div className="mt-3 text-[16px] leading-[1.7] text-white">
                Monday – Saturday · 9am – 6pm
                <br />
                Colombo, Sri Lanka
              </div>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[.2em] text-muted">Instagram</div>
              <a href={siteConfig.social.instagram} className="mt-3 block text-[18px] text-white hover:text-muted2">
                @wristworks.lk
              </a>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="md:pt-4">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

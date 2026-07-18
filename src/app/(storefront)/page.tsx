import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { getNewArrivals, getFeaturedProducts } from "@/lib/data/products";
import { getGlobalFaqs } from "@/lib/data/faqs";
import { getRecentReviews } from "@/lib/data/reviews";
import { ProductCard } from "@/components/shop/ProductCard";
import { FaqSection } from "@/components/shop/FaqSection";
import { Button } from "@/components/ui/Button";
import {
  OrganizationSchema,
  WebsiteSchema,
  LocalBusinessSchema,
} from "@/components/seo/schemas";
import { brands, categories } from "@/constants/navigation";
import { whatsappLink, siteConfig } from "@/lib/seo/siteConfig";

// Per-page metadata from the editable page_seo record.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return buildMetadata({
    title: seo.metaTitle!,
    description: seo.metaDescription!,
    path: "/",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
  });
}

export default async function HomePage() {
  const [arrivals, featured, faqs, reviews] = await Promise.all([
    getNewArrivals(4),
    getFeaturedProducts(1),
    getGlobalFaqs(),
    getRecentReviews(3),
  ]);
  const feature = featured[0];

  return (
    <>
      {/* Home-page structured data: Organization, WebSite (SearchAction), LocalBusiness, FAQ */}
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />

      {/* Hero */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-[#e0dfdc] h-[88vh]">
        <Image
          src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1920&q=80"
          alt="Close-up of a luxury automatic watch movement"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/70" />
        <div className="relative z-10 px-6 pb-[72px] md:px-12">
          <div className="eyebrow mb-5 !tracking-[.32em]">Colombo · Authorised originals only</div>
          <h1 className="m-0 max-w-[760px] font-serif text-[clamp(44px,6vw,84px)] font-normal leading-[1.05]">
            Time, worn well.
          </h1>
          <p className="my-[22px] max-w-[440px] text-[15px] leading-[1.7] text-[#bbb]">
            Casio, Seiko and Citizen — sourced from authorised distributors, inspected in Colombo,
            delivered island-wide.
          </p>
          <div className="flex items-center gap-4">
            <Button href="/shop" variant="solid">Shop the collection</Button>
            <Button href="/shop?sort=new" variant="ghost">New arrivals</Button>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="grid grid-cols-2 border-b border-line md:grid-cols-4">
        {brands.map((b, i) => (
          <Link
            key={b.name}
            href={`/shop/${b.slug}`}
            className={`block px-10 py-11 transition-colors hover:bg-[#0d0d0d] ${i < 3 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}
          >
            <div className="font-serif text-[27px] tracking-[.06em]">{b.name.toUpperCase()}</div>
            <div className="mt-[10px] text-[12px] uppercase tracking-[.14em] text-muted">{b.tagline}</div>
          </Link>
        ))}
      </section>

      {/* New arrivals */}
      <section className="px-6 pb-24 pt-[88px] md:px-12">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="m-0 font-serif text-[34px] font-normal">New Arrivals</h2>
          <Link href="/shop" className="cap border-b border-[#333] pb-[3px] text-muted2 hover:text-white">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {arrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Featured product editorial */}
      {feature && (
        <section className="grid grid-cols-1 border-y border-line md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden bg-[#e0dfdc] md:min-h-[560px]">
            <Image
              src={feature.images[0]?.url ?? ""}
              alt={feature.images[0]?.alt ?? feature.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#0a0a0a] px-8 py-16 md:px-[72px] md:py-20">
            <div className="eyebrow mb-6">The Edit · 07</div>
            <h2 className="m-0 max-w-[440px] font-serif text-[clamp(30px,3vw,42px)] font-normal leading-[1.18]">
              {feature.name}
            </h2>
            <p className="my-6 max-w-[420px] text-[14.5px] leading-[1.8] text-muted2">
              {feature.description}
            </p>
            <Button href={`/products/${feature.slug}`} variant="outline" className="self-start">
              Discover the {feature.brand}
            </Button>
          </div>
        </section>
      )}

      {/* Category tiles */}
      <section className="grid grid-cols-2 gap-px border-b border-line bg-line md:grid-cols-4">
        {categories.slice(0, 4).map((c) => (
          <Link key={c.slug} href={`/shop/${c.slug}`} className="relative flex h-[340px] items-end overflow-hidden bg-[#111]">
            <div className="relative z-10 w-full bg-gradient-to-t from-black/75 to-transparent p-6">
              <div className="text-[12.5px] uppercase tracking-[.24em] text-white">{c.label}</div>
              <div className="mt-[7px] text-[11px] uppercase tracking-[.16em] text-[#aaa]">Shop →</div>
            </div>
          </Link>
        ))}
      </section>

      {/* Sale banner */}
      <section className="flex flex-col items-center justify-between gap-8 border-b border-line bg-[#111] px-6 py-16 md:flex-row md:px-12">
        <div>
          <div className="eyebrow mb-[14px]">Limited time</div>
          <div className="font-serif text-[clamp(26px,3vw,38px)] font-normal leading-[1.2]">
            Mid-season markdowns — up to 25% off selected pieces.
          </div>
        </div>
        <Button href="/shop?sale=1" variant="solid" className="flex-none">Shop the sale</Button>
      </section>

      {/* Why Wrist Works */}
      <section className="flex justify-center px-6 py-[120px] text-center md:px-12">
        <div className="max-w-[720px]">
          <div className="eyebrow mb-[26px]">Why Wrist Works</div>
          <p className="m-0 font-serif text-[clamp(24px,3vw,34px)] font-normal italic leading-[1.5]">
            Every watch is sourced from authorised distributors, inspected in Colombo, and delivered
            with its full manufacturer warranty.
          </p>
          <div className="mt-[52px] flex flex-wrap justify-center gap-x-14 gap-y-8">
            {[
              ["100%", "Genuine"],
              ["2–4 days", "Island-wide"],
              ["1–5 yrs", "Warranty"],
              ["Koko", "Pay in 3"],
            ].map(([big, small]) => (
              <div key={small}>
                <div className="text-[22px] font-semibold">{big}</div>
                <div className="mt-[6px] text-[11px] uppercase tracking-[.16em] text-muted">{small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="border-t border-line px-6 py-[88px] md:px-12">
          <div className="mb-11 flex items-center justify-between gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[26px]">4.9</span>
              <span className="tracking-[.3em] text-[13px]">★★★★★</span>
              <span className="text-[11.5px] text-muted">Google Reviews · synced</span>
            </div>
            <a href={siteConfig.social.instagram} className="cap flex-none border border-line2 px-5 py-3 text-muted2 hover:border-[#666] hover:text-white">
              Review us on Google
            </a>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.id}>
                <div className="tracking-[.3em] text-[13px]">★★★★★</div>
                <p className="my-5 font-serif text-[18px] font-normal leading-[1.65] text-[#ddd]">
                  &ldquo;{r.body}&rdquo;
                </p>
                <div className="text-[12px] uppercase tracking-[.14em] text-muted">
                  {r.author} · {r.city} · via Google
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      <section className="flex flex-wrap items-center justify-center gap-7 border-t border-line bg-[#111] px-6 py-11 md:px-12">
        <div className="font-serif text-[clamp(20px,2.2vw,27px)] font-normal">
          Have a question? We&apos;re on WhatsApp.
        </div>
        <a
          href={whatsappLink()}
          className="flex items-center gap-[10px] bg-whatsapp px-7 py-[15px] text-[11.5px] font-bold uppercase tracking-[.16em] text-black transition-transform hover:scale-[1.03]"
        >
          {siteConfig.contact.phoneDisplay}
        </a>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} />
    </>
  );
}

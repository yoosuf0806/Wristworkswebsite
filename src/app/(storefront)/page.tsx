import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { getNewArrivals } from "@/lib/data/products";
import { getGlobalFaqs } from "@/lib/data/faqs";
import { getRecentReviews } from "@/lib/data/reviews";
import { guides } from "@/lib/data/guides";
import { ProductCard } from "@/components/shop/ProductCard";
import { FaqSection } from "@/components/shop/FaqSection";
import { Button } from "@/components/ui/Button";
import {
  OrganizationSchema,
  WebsiteSchema,
  LocalBusinessSchema,
} from "@/components/seo/schemas";
import { brands } from "@/constants/navigation";
import { whatsappLink, siteConfig } from "@/lib/seo/siteConfig";

// Helper for Unsplash placeholder imagery (swap for real photos in admin).
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

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

// Category tiles (3): Men / Women / Dive.
const categoryTiles = [
  { label: "Men", slug: "mens-watches", img: "photo-1523275335684-37898b6baf30", alt: "Men's watch collection lifestyle shot" },
  { label: "Women", slug: "womens-watches", img: "photo-1495856458515-0637185db551", alt: "Women's watch collection lifestyle shot" },
  { label: "Dive", slug: "dive-watches", img: "photo-1509048191080-d2984bad6ae5", alt: "Dive watch bezel macro shot" },
];

// Type tiles (4): Digital / Analog / Dress / Unisex.
const typeTiles = [
  { label: "Digital Watches", slug: "digital-watches", img: "photo-1434056886845-dac89ffe9b56", alt: "Casio digital LCD watch macro" },
  { label: "Analog Watches", slug: "analog-watches", img: "photo-1524592094714-0f0654e20314", alt: "Analog watch with sweeping seconds hand" },
  { label: "Dress Watches", slug: "dress-watches", img: "photo-1587836374828-4dbafa94cf0e", alt: "Dress watch on a leather strap" },
  { label: "Unisex Watches", slug: "unisex-watches", img: "photo-1547996160-81dfa63595aa", alt: "Minimal unisex watch" },
];

// Instagram grid tiles (5).
const igTiles = [
  { img: "photo-1533139502658-0198f920d8e8", alt: "Wrist shot on Instagram" },
  { img: "photo-1434056886845-dac89ffe9b56", alt: "Watch flat lay on Instagram" },
  { img: "photo-1587836374828-4dbafa94cf0e", alt: "Macro dial shot on Instagram" },
  { img: "photo-1524592094714-0f0654e20314", alt: "Unboxing on Instagram" },
  { img: "photo-1523275335684-37898b6baf30", alt: "Wrist shot on Instagram" },
];

// Guide category → eyebrow label mapping already lives on each guide.
export default async function HomePage() {
  const [arrivals, faqs, reviews] = await Promise.all([
    getNewArrivals(4),
    getGlobalFaqs(),
    getRecentReviews(3),
  ]);

  return (
    <>
      {/* Home-page structured data: Organization, WebSite (SearchAction), LocalBusiness, FAQ */}
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative flex h-[88vh] min-h-[560px] items-end overflow-hidden bg-[#e0dfdc]">
        <Image
          src={u("photo-1508057198894-247b23fe5ade", 1920)}
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

      {/* ── Brand strip ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 border-b border-line md:grid-cols-4">
        {brands.map((b, i) => (
          <Link
            key={b.name}
            href={`/shop/${b.slug}`}
            className={`block px-10 py-11 transition-colors hover:bg-[#0d0d0d] ${i < 3 ? "md:border-r md:border-line" : ""} ${i % 2 === 0 ? "border-r border-line md:border-r" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}
          >
            <div className="font-serif text-[27px] tracking-[.06em]">{b.name.toUpperCase()}</div>
            <div className="mt-[10px] text-[12px] uppercase tracking-[.14em] text-muted">{b.tagline}</div>
          </Link>
        ))}
      </section>

      {/* ── New Arrivals ──────────────────────────────────────────────── */}
      <section className="px-6 pb-24 pt-[88px] md:px-12">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="m-0 font-serif text-[34px] font-normal">New Arrivals</h2>
          <Link href="/shop" className="cap border-b border-[#333] pb-[3px] text-muted2 hover:text-white">
            View all
          </Link>
        </div>
        {arrivals.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {arrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted2">New watches are landing soon — check back shortly.</p>
        )}
      </section>

      {/* ── The Edit · 07 (Seiko Presage editorial) ───────────────────── */}
      <section className="grid grid-cols-1 border-y border-line md:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden bg-[#e0dfdc] md:min-h-[560px]">
          <Image
            src={u("photo-1587836374828-4dbafa94cf0e")}
            alt="Seiko Presage Cocktail Time on a desk in moody light"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-[#0a0a0a] px-8 py-16 md:px-[72px] md:py-20">
          <div className="eyebrow mb-6">The Edit · 07</div>
          <h2 className="m-0 max-w-[440px] font-serif text-[clamp(30px,3vw,42px)] font-normal leading-[1.18]">
            The automatic you&apos;ll never take off.
          </h2>
          <p className="my-6 max-w-[420px] text-[14.5px] leading-[1.8] text-muted2">
            Seiko&apos;s Presage Cocktail Time turns a bar in Ginza into a dial. Hand-finished sunburst,
            4R35 movement, and a presence far beyond its price. Our pick for a first proper automatic.
          </p>
          <Button href="/products/seiko-presage-cocktail-time-srpb43" variant="outline" className="self-start">
            Discover the Presage
          </Button>
        </div>
      </section>

      {/* ── Category tiles (Men / Women / Dive) ───────────────────────── */}
      <section className="grid grid-cols-1 gap-px border-b border-line bg-line md:grid-cols-3">
        {categoryTiles.map((c) => (
          <Link key={c.slug} href={`/shop/${c.slug}`} className="group relative flex h-[440px] items-end overflow-hidden bg-[#e0dfdc]">
            <Image src={u(c.img)} alt={c.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="relative z-10 w-full bg-gradient-to-t from-black/75 to-transparent p-7">
              <div className="text-[13px] uppercase tracking-[.24em] text-white">{c.label}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[.16em] text-[#aaa]">Shop →</div>
            </div>
          </Link>
        ))}
      </section>

      {/* ── Sale banner ───────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-between gap-8 border-b border-line bg-[#111] px-6 py-16 md:flex-row md:px-12">
        <div>
          <div className="eyebrow mb-[14px]">Limited time</div>
          <div className="font-serif text-[clamp(26px,3vw,38px)] font-normal leading-[1.2]">
            Mid-season markdowns — up to 25% off selected pieces.
          </div>
        </div>
        <Button href="/shop?sale=1" variant="solid" className="flex-none">Shop the sale</Button>
      </section>

      {/* ── Type tiles (Digital / Analog / Dress / Unisex) ────────────── */}
      <section className="grid grid-cols-2 gap-px border-b border-line bg-line md:grid-cols-4">
        {typeTiles.map((t) => (
          <Link key={t.slug} href={`/shop/${t.slug}`} className="group relative flex h-[340px] items-end overflow-hidden bg-[#e0dfdc]">
            <Image src={u(t.img)} alt={t.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="relative z-10 w-full bg-gradient-to-t from-black/75 to-transparent p-6">
              <div className="text-[12.5px] uppercase tracking-[.24em] text-white">{t.label}</div>
              <div className="mt-[7px] text-[11px] uppercase tracking-[.16em] text-[#aaa]">Shop →</div>
            </div>
          </Link>
        ))}
      </section>

      {/* ── Featured Collection (Casio A168) ──────────────────────────── */}
      <section className="grid grid-cols-1 border-b border-line bg-[#0a0a0a] md:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[420px] overflow-hidden bg-[#e0dfdc] md:min-h-[520px]">
          <Image
            src={u("photo-1434056886845-dac89ffe9b56")}
            alt="Casio A168 retro digital watch on denim with film grain"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 md:px-[72px] md:py-20">
          <div className="eyebrow mb-6">Featured Collection</div>
          <h2 className="m-0 max-w-[440px] font-serif text-[clamp(30px,3.2vw,44px)] font-normal leading-[1.18]">
            The Casio A168 Series — retro never goes out of style.
          </h2>
          <p className="my-6 max-w-[420px] text-[14.5px] leading-[1.8] text-muted2">
            The same stainless case your father wore, still under Rs. 20,000. Seven-year battery, LED
            backlight, and a bracelet that goes with everything from denim to a dinner jacket.
          </p>
          <Button href="/shop/casio" variant="solid" className="self-start">Shop the Collection</Button>
        </div>
      </section>

      {/* ── Why Wrist Works ───────────────────────────────────────────── */}
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

      {/* ── Google Reviews ────────────────────────────────────────────── */}
      <section className="border-t border-line px-6 py-[88px] md:px-12">
        <div className="mb-11 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
              <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" opacity=".9" />
              <path fill="#999" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#666" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.94l3.66-2.84z" />
              <path fill="#ccc" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[26px]">4.9</span>
                <span className="tracking-[.3em] text-[13px]">★★★★★</span>
              </div>
              <div className="mt-1 text-[11.5px] tracking-[.1em] text-muted">Google Reviews · 127 reviews · synced automatically</div>
            </div>
          </div>
          <a href={siteConfig.social.instagram} className="cap flex-none border border-line2 px-5 py-3 text-muted2 hover:border-[#666] hover:text-white">
            Review us on Google
          </a>
        </div>
        {reviews.length > 0 && (
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
        )}
      </section>

      {/* ── The Journal (guides) ──────────────────────────────────────── */}
      <section className="border-t border-line bg-[#0a0a0a] px-6 py-[88px] md:px-12">
        <div className="mb-10 flex items-baseline justify-between">
          <div>
            <div className="eyebrow mb-[14px]">The Journal</div>
            <h2 className="m-0 font-serif text-[32px] font-normal">Know your watch before you buy it.</h2>
          </div>
          <Link href="/guides" className="cap border-b border-[#333] pb-[3px] text-muted2 hover:text-white">
            All guides
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {guides.map((g, i) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block border border-line bg-black transition-colors hover:border-[#3a3a3a]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e9e8e5]">
                <Image src={u(igTiles[i]?.img ?? "photo-1523275335684-37898b6baf30")} alt={`${g.title} guide illustration`} fill className="object-cover" />
              </div>
              <div className="px-6 pb-7 pt-[22px]">
                <div className="text-[10.5px] uppercase tracking-[.22em] text-muted">{g.category}</div>
                <div className="mt-[9px] font-serif text-[19px] leading-[1.4]">{g.title}</div>
                <div className="mt-[10px] text-[12px] text-muted">{g.readTime} →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────────────────── */}
      <section className="flex flex-wrap items-center justify-center gap-7 border-t border-line bg-[#111] px-6 py-11 md:px-12">
        <div className="font-serif text-[clamp(20px,2.2vw,27px)] font-normal">
          Have a question? We&apos;re on WhatsApp.
        </div>
        <a
          href={whatsappLink()}
          className="flex items-center gap-[10px] bg-whatsapp px-7 py-[15px] text-[11.5px] font-bold uppercase tracking-[.16em] text-black transition-transform hover:scale-[1.03]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" />
          </svg>
          {siteConfig.contact.phoneDisplay}
        </a>
      </section>

      {/* ── Instagram grid ────────────────────────────────────────────── */}
      <section className="border-t border-line pt-[72px]">
        <div className="mb-10 text-center">
          <div className="eyebrow mb-[14px]">@wristworks.lk</div>
          <div className="font-serif text-[28px] font-normal">On the wrist, in Colombo</div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-5">
          {igTiles.map((tile, i) => (
            <a
              key={i}
              href={siteConfig.social.instagram}
              className="group relative aspect-square overflow-hidden bg-[#e9e8e5]"
            >
              <Image src={u(tile.img, 600)} alt={tile.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 20vw" />
            </a>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <FaqSection faqs={faqs} />
    </>
  );
}

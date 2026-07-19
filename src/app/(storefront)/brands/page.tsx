import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { getAllProducts } from "@/lib/data/products";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/seo/siteConfig";
import type { Brand } from "@/types";

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

// Editorial content per brand. The first stat (models in stock) is filled in
// live from the catalog; the other two are house facts.
const brandFeatures: {
  brand: Brand;
  established: string;
  description: string;
  stats: [string, string][]; // [value, label] — first entry's value is overwritten with the live count
  shopHref: string;
  image: string;
  imageAlt: string;
  imageLeft: boolean;
}[] = [
  {
    brand: "Casio",
    established: "Est. 1946 · Tokyo",
    description:
      "From the indestructible G-Shock to the cult Vintage series, Casio makes the watches people actually live in. Tough, precise, and priced like a handshake.",
    stats: [["—", "Models in stock"], ["200m", "Max WR"], ["1 yr", "Warranty"]],
    shopHref: "/shop/casio",
    image: u("photo-1523275335684-37898b6baf30"),
    imageAlt: "Casio G-Shock lifestyle shot",
    imageLeft: true,
  },
  {
    brand: "Seiko",
    established: "Est. 1881 · Ginza",
    description:
      "Japan's original watchmaking house — in-house automatic movements, hand-finished dials, and divers with real heritage. The first proper automatic for most collectors.",
    stats: [["—", "Models in stock"], ["4R/6R", "In-house calibres"], ["1 yr", "Warranty"]],
    shopHref: "/shop/seiko",
    image: u("photo-1587836374828-4dbafa94cf0e"),
    imageAlt: "Seiko Presage dial macro",
    imageLeft: false,
  },
  {
    brand: "Edifice",
    established: "By Casio · Motorsport DNA",
    description:
      "Casio's motorsport line stands on its own — sapphire-look chronographs, Bluetooth timing, and race-bred design at a fraction of Swiss prices. Speed and intelligence on the wrist.",
    stats: [["—", "Models in stock"], ["1/1000s", "Chrono precision"], ["1 yr", "Warranty"]],
    shopHref: "/shop?q=Edifice",
    image: u("photo-1524592094714-0f0654e20314"),
    imageAlt: "Edifice chronograph on carbon fibre",
    imageLeft: false,
  },
  {
    brand: "Citizen",
    established: "Est. 1918 · Tokyo",
    description:
      "Eco-Drive turns any light into power — no battery changes, ever. From the Promaster divers to the dressy Tsuyosa automatics, Citizen is quiet engineering at its best.",
    stats: [["—", "Models in stock"], ["∞", "Battery life"], ["5 yrs", "Warranty"]],
    shopHref: "/shop/citizen",
    image: u("photo-1533139502658-0198f920d8e8"),
    imageAlt: "Citizen Eco-Drive in sunlight",
    imageLeft: true,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("brands");
  return buildMetadata({
    title: seo.metaTitle!,
    description: seo.metaDescription!,
    path: "/brands",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
  });
}

export default async function BrandsPage() {
  const products = await getAllProducts();
  const countFor = (brand: Brand) => products.filter((p) => p.brand === brand).length;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Brands", path: "/brands" },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />

      {/* Hero */}
      <section className="px-6 py-[120px] text-center md:px-12">
        <div className="eyebrow mb-8">Our brands</div>
        <h1 className="mx-auto max-w-[1000px] font-serif text-[clamp(44px,7vw,88px)] font-normal leading-[1.02]">
          Three houses. One standard.
        </h1>
        <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-[1.8] text-muted2">
          We carry only what we can stand behind — authorised-distributor stock from Japan&apos;s three
          great watchmaking houses.
        </p>
      </section>

      {/* Brand feature blocks */}
      {brandFeatures.map((b) => {
        const stats: [string, string][] = b.stats.map((s, i) =>
          i === 0 ? [String(countFor(b.brand)), s[1]] : s
        );
        const media = (
          <div className="relative min-h-[420px] overflow-hidden bg-[#e0dfdc] md:min-h-[560px]">
            <Image src={b.image} alt={b.imageAlt} fill className="object-cover" />
          </div>
        );
        const text = (
          <div className="flex flex-col justify-center px-8 py-16 md:px-[72px] md:py-20">
            <div className="eyebrow mb-6">{b.established}</div>
            <h2 className="m-0 font-serif text-[clamp(40px,5vw,64px)] font-normal tracking-[.04em]">
              {b.brand.toUpperCase()}
            </h2>
            <p className="my-7 max-w-[460px] text-[15px] leading-[1.8] text-muted2">{b.description}</p>
            <div className="mb-9 flex gap-10">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <div className="text-[26px] font-semibold">{value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[.14em] text-muted">{label}</div>
                </div>
              ))}
            </div>
            <Button href={b.shopHref} variant="outline" className="self-start">
              Shop {b.brand}
            </Button>
          </div>
        );

        return (
          <section key={b.brand} className="grid grid-cols-1 border-t border-line md:grid-cols-2">
            {b.imageLeft ? (
              <>
                {media}
                {text}
              </>
            ) : (
              <>
                <div className="md:order-2">{media}</div>
                <div className="md:order-1">{text}</div>
              </>
            )}
          </section>
        );
      })}

      {/* Source-on-request CTA */}
      <section className="flex flex-col items-center justify-between gap-8 border-y border-line bg-[#0a0a0a] px-6 py-20 md:flex-row md:px-12">
        <h2 className="max-w-[640px] font-serif text-[clamp(26px,3.4vw,42px)] font-normal leading-[1.15]">
          Looking for a specific reference? We source on request.
        </h2>
        <a
          href={whatsappLink("Hi Wrist Works! I'm looking for a specific watch reference — can you source it?")}
          className="flex-none bg-white px-9 py-4 text-[11.5px] font-semibold uppercase tracking-[.18em] text-black transition-colors hover:bg-[#ccc]"
        >
          Talk to us
        </a>
      </section>
    </>
  );
}

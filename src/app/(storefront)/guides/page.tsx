import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import { guides } from "@/lib/data/guides";
import { whatsappLink, siteConfig } from "@/lib/seo/siteConfig";

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("guides");
  return buildMetadata({
    title: seo.metaTitle!,
    description: seo.metaDescription!,
    path: "/guides",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
  });
}

export default function GuidesPage() {
  const featured = guides.find((g) => g.featured) ?? guides[0];
  const rest = guides.filter((g) => g.slug !== featured.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />

      {/* Hero */}
      <section className="px-6 py-[120px] text-center md:px-12">
        <div className="eyebrow mb-8">The Journal</div>
        <h1 className="mx-auto max-w-[1000px] font-serif text-[clamp(44px,7vw,84px)] font-normal leading-[1.03]">
          Guides, care &amp; know-how.
        </h1>
        <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-[1.8] text-muted2">
          Everything we wish someone had told us before our first watch — written by people who wear
          them, not sell copy.
        </p>
      </section>

      {/* Featured guide */}
      <section className="grid grid-cols-1 border-t border-line md:grid-cols-2">
        <Link href={`/guides/${featured.slug}`} className="relative min-h-[360px] overflow-hidden bg-[#e0dfdc] md:min-h-[520px]">
          <Image src={u(featured.image)} alt={`${featured.title} illustration`} fill className="object-cover" priority />
        </Link>
        <div className="flex flex-col justify-center px-8 py-16 md:px-[72px] md:py-20">
          <div className="eyebrow mb-6">Featured · {featured.category}</div>
          <Link href={`/guides/${featured.slug}`}>
            <h2 className="m-0 max-w-[520px] font-serif text-[clamp(30px,3.4vw,46px)] font-normal leading-[1.14] hover:opacity-90">
              {featured.title}
            </h2>
          </Link>
          <p className="my-7 max-w-[440px] text-[15px] leading-[1.8] text-muted2">{featured.excerpt}</p>
          <Link href={`/guides/${featured.slug}`} className="text-[13px] text-muted2 hover:text-white">
            {featured.readTime} →
          </Link>
        </div>
      </section>

      {/* Guide grid */}
      <section className="px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {rest.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block border border-line bg-black transition-colors hover:border-[#3a3a3a]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e8e5]">
                <Image src={u(g.image)} alt={`${g.title} illustration`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="px-7 pb-8 pt-6">
                <div className="text-[10.5px] uppercase tracking-[.22em] text-muted">{g.category}</div>
                <h3 className="mt-3 font-serif text-[22px] font-normal leading-[1.25]">{g.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-muted2">{g.excerpt}</p>
                <div className="mt-5 text-[12px] text-muted">{g.readTime} →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="flex flex-wrap items-center justify-center gap-7 border-t border-line bg-[#0a0a0a] px-6 py-16 md:px-12">
        <div className="font-serif text-[clamp(24px,2.6vw,32px)] font-normal">
          Still deciding? Ask us on WhatsApp.
        </div>
        <a
          href={whatsappLink("Hi Wrist Works! I've been reading your guides and could use some help deciding.")}
          className="bg-whatsapp px-8 py-4 text-[12px] font-bold uppercase tracking-[.16em] text-black transition-transform hover:scale-[1.03]"
        >
          {siteConfig.contact.phoneDisplay}
        </a>
      </section>
    </>
  );
}

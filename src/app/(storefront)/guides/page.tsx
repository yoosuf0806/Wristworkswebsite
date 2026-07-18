import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import { guides } from "@/lib/data/guides";

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
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];
  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <div className="px-6 pt-10 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
        <div className="eyebrow mt-6">The Journal</div>
        <h1 className="mt-3 font-serif text-[clamp(34px,5vw,56px)] font-normal">
          Know your watch before you buy it.
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 py-16 md:grid-cols-3 md:px-12">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="block border border-line bg-black transition-colors hover:border-[#3a3a3a]">
            <div className="aspect-[16/9] bg-[#e9e8e5]" />
            <div className="px-6 pb-7 pt-[22px]">
              <div className="text-[10.5px] uppercase tracking-[.22em] text-muted">{g.category}</div>
              <div className="mt-[9px] font-serif text-[19px] leading-[1.4]">{g.title}</div>
              <div className="mt-[10px] text-[12px] text-muted">{g.readTime} →</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

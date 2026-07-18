import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { getAllCategories } from "@/lib/data/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schemas";

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
  const cats = await getAllCategories();
  const brandPages = cats.filter((c) => c.kind === "brand");
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Brands", path: "/brands" },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <div className="px-6 pt-10 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
        <div className="eyebrow mt-6">The houses we carry</div>
        <h1 className="mt-3 font-serif text-[clamp(34px,5vw,56px)] font-normal">Brands</h1>
        <p className="mt-4 max-w-[600px] text-[15px] leading-[1.8] text-muted2">
          Four names, one promise: 100% authentic, warranty-backed, delivered island-wide.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border-y border-line bg-line py-px md:grid-cols-3">
        {brandPages.map((b) => (
          <Link key={b.slug} href={`/shop/${b.slug}`} className="group bg-black px-8 py-14 transition-colors hover:bg-[#0a0a0a]">
            <div className="font-serif text-[32px] tracking-[.04em]">{b.title.split(" ")[0].toUpperCase()}</div>
            <p className="mt-4 text-[14px] leading-[1.8] text-muted2">{b.intro}</p>
            <div className="mt-6 cap text-muted2 group-hover:text-white">Shop {b.title.split(" ")[0]} →</div>
          </Link>
        ))}
      </div>
    </>
  );
}

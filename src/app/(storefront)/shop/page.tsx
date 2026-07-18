import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { getAllProducts } from "@/lib/data/products";
import { getFaqsFor } from "@/lib/data/faqs";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { FaqSection } from "@/components/shop/FaqSection";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schemas";

type Sort = "featured" | "new" | "price-asc" | "price-desc";

// Internal-link chips (SEO) shown in the shop's footer block.
const seoLinks = [
  { label: "Men's Watches", href: "/shop/mens-watches" },
  { label: "Digital Watches", href: "/shop/digital-watches" },
  { label: "Dive Watches", href: "/shop/dive-watches" },
  { label: "Automatic Watches", href: "/shop?q=Automatic" },
  { label: "Watches Under Rs. 50,000", href: "/shop" },
];

// Shop metadata from the editable page_seo record.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("shop");
  return buildMetadata({
    title: seo.metaTitle!,
    description: seo.metaDescription!,
    path: "/shop",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
  });
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { q?: string; sale?: string; sort?: string };
}) {
  const [seo, products, faqs] = await Promise.all([
    getPageSeo("shop"),
    getAllProducts(),
    getFaqsFor("page", "shop"),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <div className="px-6 pt-10 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-6 font-serif text-[clamp(34px,5vw,56px)] font-normal leading-[1.1]">
          {seo.h1 || "All Watches"}
        </h1>
      </div>

      <div className="px-6 pb-6 pt-4 md:px-12">
        <ShopGrid
          products={products}
          initialQuery={searchParams.q}
          initialSale={searchParams.sale === "1"}
          initialSort={(searchParams.sort as Sort) || "featured"}
        />
      </div>

      {/* SEO block + internal-link chips */}
      <section className="border-t border-line px-6 py-16 md:px-12">
        <h2 className="font-serif text-[clamp(24px,3vw,34px)] font-normal leading-[1.2]">
          Genuine watches in Sri Lanka, delivered island-wide
        </h2>
        <p className="mt-5 max-w-[900px] text-[14.5px] leading-[1.9] text-muted2">
          {seo.seoParagraph}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {seoLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="border border-line2 px-5 py-3 text-[11.5px] uppercase tracking-[.14em] text-muted2 transition-colors hover:border-white hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <FaqSection faqs={faqs} heading="Shopping with Wrist Works" />

      <RecentlyViewed />
    </>
  );
}

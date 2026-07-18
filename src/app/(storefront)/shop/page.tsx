import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { getAllProducts } from "@/lib/data/products";
import { getFaqsFor } from "@/lib/data/faqs";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { FaqSection } from "@/components/shop/FaqSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schemas";

type Sort = "featured" | "new" | "price-asc" | "price-desc";

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
        {seo.seoParagraph && (
          <p className="mt-4 max-w-[640px] text-[14px] leading-[1.8] text-muted2">{seo.seoParagraph}</p>
        )}
      </div>

      <div className="px-6 py-12 md:px-12">
        <ShopGrid
          products={products}
          initialQuery={searchParams.q}
          initialSale={searchParams.sale === "1"}
          initialSort={(searchParams.sort as Sort) || "featured"}
        />
      </div>

      <FaqSection faqs={faqs} heading="Shopping with Wrist Works" />
    </>
  );
}

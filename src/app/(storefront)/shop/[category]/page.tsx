import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCategory, getAllCategorySlugs } from "@/lib/data/categories";
import { getProductsByBrand, getProductsByCategory } from "@/lib/data/products";
import { getFaqsFor } from "@/lib/data/faqs";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { FaqSection } from "@/components/shop/FaqSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import type { Brand, WatchCategory } from "@/types";

// Pre-render every brand + category landing page.
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

// Unique meta title/description per brand & category, from editable content.
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = await getCategory(params.category);
  if (!cat) return {};
  return buildMetadata({
    title: cat.metaTitle || cat.title,
    description: cat.metaDescription || cat.seoParagraph,
    path: `/shop/${cat.slug}`,
    ogImage: cat.ogImage,
    keywords: cat.focusKeyword ? [cat.focusKeyword] : undefined,
  });
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const cat = await getCategory(params.category);
  if (!cat) notFound();

  const products =
    cat.kind === "brand"
      ? await getProductsByBrand(cat.slug)
      : await getProductsByCategory(cat.slug);

  const faqs = await getFaqsFor("category", cat.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: cat.title, path: `/shop/${cat.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <div className="px-6 pt-10 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
        <div className="eyebrow mt-6">{cat.kind === "brand" ? "Brand" : "Category"}</div>
        {/* Unique H1 per brand / category */}
        <h1 className="mt-3 font-serif text-[clamp(34px,5vw,56px)] font-normal leading-[1.1]">{cat.title}</h1>
        {cat.intro && <p className="mt-3 text-[15px] text-muted2">{cat.intro}</p>}
        {/* Editable SEO paragraph */}
        <p className="mt-4 max-w-[680px] text-[14px] leading-[1.8] text-muted2">{cat.seoParagraph}</p>
      </div>

      <div className="px-6 py-12 md:px-12">
        <ShopGrid
          products={products}
          lockedBrand={cat.kind === "brand" ? (cat.title.split(" ")[0] as Brand) : undefined}
          lockedCategory={cat.kind === "category" ? (cat.slug as WatchCategory) : undefined}
        />
      </div>

      <FaqSection faqs={faqs} heading={`${cat.title} — questions`} />
    </>
  );
}

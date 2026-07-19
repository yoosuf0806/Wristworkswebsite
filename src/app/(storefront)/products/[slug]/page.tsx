import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getProductBySlug,
  getAllProductSlugs,
  getRelatedProducts,
} from "@/lib/data/products";
import { getReviewsForProduct, aggregate } from "@/lib/data/reviews";
import { getFaqsFor } from "@/lib/data/faqs";
import { Gallery } from "@/components/product/Gallery";
import { AddToCart } from "@/components/product/AddToCart";
import { RecordView } from "@/components/product/RecordView";
import { ProductStickyBar } from "@/components/product/ProductStickyBar";
import { Reviews } from "@/components/product/Reviews";
import { ProductCard } from "@/components/shop/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { Rating } from "@/components/ui/Rating";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqSection } from "@/components/shop/FaqSection";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/schemas";
import { formatPrice } from "@/lib/utils";

// Pre-render every product page at build time.
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Unique meta title/description per product (from product SEO fields), with
// canonical URL, product OG image and Twitter card.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  const price = product.offerPrice ?? product.price;
  return buildMetadata({
    title: product.metaTitle || `${product.brand} ${product.name} — ${formatPrice(price)}`,
    description:
      product.metaDescription ||
      `Buy the ${product.brand} ${product.name} — 100% authentic with full warranty and island-wide delivery in Sri Lanka. ${product.description}`,
    path: `/products/${product.slug}`,
    ogImage: product.ogImage || product.images[0]?.url || null,
    type: "product",
    keywords: product.focusKeyword ? [product.focusKeyword] : undefined,
  });
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const [reviews, related, faqs] = await Promise.all([
    getReviewsForProduct(product.id),
    getRelatedProducts(product, 4),
    getFaqsFor("product", product.slug),
  ]);

  // Merge live aggregate into the product for accurate schema markup.
  const agg = aggregate(reviews);
  const productForSchema = {
    ...product,
    ratingAverage: agg.count ? agg.average : product.ratingAverage,
    ratingCount: agg.count || product.ratingCount,
  };

  const price = product.offerPrice ?? product.price;
  const onSale = !!product.offerPrice && product.offerPrice < product.price;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: product.brand, path: `/shop/${product.brand.toLowerCase()}` },
    { name: product.name, path: `/products/${product.slug}` },
  ];

  const specItems = product.specs
    ? Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join("\n")
    : "";

  // Product subtitle: "Ref. X · Men's · 42.5mm".
  const gender = product.categories.includes("womens-watches")
    ? "Women's"
    : product.categories.includes("unisex-watches")
      ? "Unisex"
      : "Men's";
  const caseSize = product.specs?.Case?.match(/(\d+(?:\.\d+)?mm)/)?.[1];
  const subtitle = [product.reference && `Ref. ${product.reference}`, gender, caseSize]
    .filter(Boolean)
    .join(" · ");

  // 2×2 highlight spec grid — pick the four most useful facts available.
  const specEntries = product.specs || {};
  const gridKeys = ["Movement", "Water resistance", "Case", "Strap", "Bracelet", "Battery", "Bezel", "Dial"];
  const specGrid = gridKeys.filter((k) => specEntries[k]).slice(0, 4).map((k) => [k, specEntries[k]] as const);

  const koko = Math.round(price / 3);
  const savings = onSale ? product.price - price : 0;

  const accordionItems = [
    { q: "Description", a: product.description },
    ...(specItems ? [{ q: "Full specifications", a: specItems }] : []),
    {
      q: "Warranty & delivery",
      a: "Sealed box with a stamped manufacturer warranty card. Free courier delivery island-wide in 2–4 working days on orders above Rs. 25,000. Cash on delivery available in Colombo & suburbs. 7-day exchange for unworn pieces.",
    },
  ];

  return (
    <>
      <ProductSchema product={productForSchema} />
      <RecordView product={product} />
      <BreadcrumbSchema crumbs={crumbs} />

      <div className="px-6 pt-8 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="grid grid-cols-1 gap-12 px-6 py-10 md:grid-cols-2 md:px-12">
        <Gallery images={product.images} name={product.name} />

        <div>
          <div className="text-[11px] uppercase tracking-[.22em] text-muted">
            {product.brand}
            {product.newArrival && <span> · New Arrival</span>}
          </div>
          <h1 className="mt-3 font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.15]">
            {product.name}
          </h1>
          {subtitle && <div className="mt-3 text-[12.5px] text-muted">{subtitle}</div>}

          {agg.count > 0 && <Rating value={agg.average} count={agg.count} className="mt-4" />}

          {/* Price + savings */}
          <div className="mt-6 flex flex-wrap items-baseline gap-4">
            <span className="text-[32px] font-bold">{formatPrice(price)}</span>
            {onSale && (
              <>
                <span className="text-[17px] text-[#666] line-through">{formatPrice(product.price)}</span>
                <span className="bg-white px-3 py-[6px] text-[10.5px] font-bold uppercase tracking-[.1em] text-black">
                  Save {formatPrice(savings)}
                </span>
              </>
            )}
          </div>
          <div className="mt-2 text-[13px] text-muted2">
            or 3 × {formatPrice(koko)} with <span className="font-semibold text-white">Koko</span> — 0% interest
          </div>

          {/* 2×2 highlight spec grid */}
          {specGrid.length > 0 && (
            <div className="mt-8 grid grid-cols-2 border border-line">
              {specGrid.map(([k, v], i) => (
                <div
                  key={k}
                  className={`p-5 ${i % 2 === 0 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line" : ""}`}
                >
                  <div className="text-[10.5px] uppercase tracking-[.16em] text-muted">{k}</div>
                  <div className="mt-2 text-[14px] text-white">{v}</div>
                </div>
              ))}
            </div>
          )}

          <AddToCart product={product} />

          <div className="mt-8">
            <Accordion items={accordionItems} defaultOpen={0} />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="border-t border-line px-6 py-16 md:px-12">
        <h2 className="mb-8 font-serif text-[28px] font-normal">Reviews</h2>
        <Reviews reviews={reviews} />
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} heading="Questions about this watch" />

      {/* Related products — internal linking */}
      {related.length > 0 && (
        <section className="border-t border-line px-6 py-16 md:px-12">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-serif text-[28px] font-normal">You may also like</h2>
            <Link href="/shop" className="cap border-b border-[#333] pb-[3px] text-muted2 hover:text-white">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Product-page quick-add sticky bar */}
      <ProductStickyBar product={product} />
    </>
  );
}

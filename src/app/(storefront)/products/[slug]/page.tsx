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
import { Reviews } from "@/components/product/Reviews";
import { ProductCard } from "@/components/shop/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { Rating } from "@/components/ui/Rating";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqSection } from "@/components/shop/FaqSection";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/schemas";
import { formatPrice, discountPercent } from "@/lib/utils";

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
      <BreadcrumbSchema crumbs={crumbs} />

      <div className="px-6 pt-8 md:px-12">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="grid grid-cols-1 gap-12 px-6 py-10 md:grid-cols-2 md:px-12">
        <Gallery images={product.images} name={product.name} />

        <div>
          <div className="text-[11px] uppercase tracking-[.22em] text-muted">{product.brand}</div>
          <h1 className="mt-3 font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.15]">
            {product.name}
          </h1>
          {product.reference && (
            <div className="mt-2 text-[12px] uppercase tracking-[.14em] text-muted">
              Ref. {product.reference}
            </div>
          )}

          {agg.count > 0 && <Rating value={agg.average} count={agg.count} className="mt-4" />}

          <div className="mt-6 flex items-baseline gap-4">
            <span className="text-[28px] font-bold">{formatPrice(price)}</span>
            {onSale && (
              <>
                <span className="text-[16px] text-[#666] line-through">{formatPrice(product.price)}</span>
                <span className="bg-white px-[9px] py-[5px] text-[10.5px] font-bold uppercase tracking-[.1em] text-black">
                  Save {discountPercent(product.price, product.offerPrice)}%
                </span>
              </>
            )}
          </div>

          <div className="mt-3 text-[12.5px] text-muted2">
            {product.stock > 0 ? (
              <span className="text-whatsapp">● In stock — ships from Colombo within 24 hours</span>
            ) : (
              <span className="text-[#c88]">Out of stock — message us to reserve</span>
            )}
          </div>

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
    </>
  );
}

// Thin wrapper components around the JSON-LD builders in lib/seo/schema.ts.
// Keeps page components declarative: <ProductSchema product={p} /> etc.
import { JsonLd } from "@/components/seo/JsonLd";
import {
  productSchema,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/seo/schema";
import type { Product, Faq } from "@/types";

// Product structured data (name, price, availability, brand, image, rating).
export function ProductSchema({ product }: { product: Product }) {
  return <JsonLd data={productSchema(product)} />;
}

// BreadcrumbList structured data for shop / product / category pages.
export function BreadcrumbSchema({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return <JsonLd data={breadcrumbSchema(crumbs)} />;
}

// FAQPage structured data for home / shop / product / category pages.
export function FaqSchema({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;
  return <JsonLd data={faqSchema(faqs)} />;
}

// Organization structured data (home page).
export function OrganizationSchema() {
  return <JsonLd data={organizationSchema()} />;
}

// WebSite + SearchAction structured data (home page).
export function WebsiteSchema() {
  return <JsonLd data={websiteSchema()} />;
}

// LocalBusiness structured data (home + contact pages).
export function LocalBusinessSchema() {
  return <JsonLd data={localBusinessSchema()} />;
}

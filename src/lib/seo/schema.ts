import { siteConfig } from "@/lib/seo/siteConfig";
import { absoluteUrl } from "@/lib/utils";
import type { Product, Faq } from "@/types";

// Builders that return plain JSON-LD objects. Rendered via the <JsonLd>
// component (which wraps them in a <script type="application/ld+json">).

// Organization — business identity, address, phone and social profiles.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
    ],
  };
}

// WebSite + SearchAction — enables the sitelinks search box in Google.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// LocalBusiness — Colombo storefront with geo, hours and WhatsApp contact.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    image: absoluteUrl(siteConfig.ogImage),
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneDisplay,
    priceRange: "Rs. 14,000 – Rs. 200,000",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };
}

// Product — name, price, availability, brand, image and aggregate rating.
export function productSchema(product: Product) {
  const price = product.offerPrice ?? product.price;
  const availability =
    product.stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.reference || product.id,
    brand: { "@type": "Brand", name: product.brand },
    image: product.images.map((i) => (i.url.startsWith("http") ? i.url : absoluteUrl(i.url))),
    category: product.categories[0],
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: siteConfig.currency,
      price: price,
      availability,
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };

  if (product.ratingCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.ratingAverage.toFixed(1),
      reviewCount: product.ratingCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

// BreadcrumbList — an ordered trail of {name, url} crumbs.
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

// FAQPage — a list of question/answer pairs.
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

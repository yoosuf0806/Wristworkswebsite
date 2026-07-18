import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/siteConfig";
import { absoluteUrl, truncate } from "@/lib/utils";

// Options accepted by buildMetadata — a single helper every page/route uses
// so title, description, canonical, Open Graph and Twitter tags stay consistent.
export interface SeoInput {
  title: string;
  description: string;
  // Site-relative path used for the canonical URL, e.g. "/shop/casio".
  path?: string;
  // Absolute or site-relative OG image; falls back to the site default.
  ogImage?: string | null;
  keywords?: string[];
  // "product" pages use the "product" OG type, everything else "website".
  type?: "website" | "article" | "product";
  // Set true on thin/utility pages (cart, checkout) that shouldn't be indexed.
  noIndex?: boolean;
}

// Produce a fully-formed Next.js Metadata object with sensible SEO defaults.
export function buildMetadata(input: SeoInput): Metadata {
  const title = input.title;
  const description = truncate(input.description);
  const canonical = absoluteUrl(input.path || "/");
  const ogImage = input.ogImage
    ? input.ogImage.startsWith("http")
      ? input.ogImage
      : absoluteUrl(input.ogImage)
    : absoluteUrl(siteConfig.ogImage);

  return {
    title,
    description,
    keywords: input.keywords,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: input.type === "product" ? "website" : input.type || "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      images: [ogImage],
    },
  };
}

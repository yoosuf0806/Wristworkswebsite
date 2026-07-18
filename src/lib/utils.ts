import { siteConfig } from "@/lib/seo/siteConfig";

// Small helpers shared across the app.

// Join class names, dropping falsy values (lightweight clsx).
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

// Format a number as an LKR price, e.g. 51500 -> "Rs. 51,500".
export function formatPrice(n: number): string {
  return `${siteConfig.currencySymbol} ${Math.round(n).toLocaleString("en-US")}`;
}

// Convert an arbitrary string into a URL-safe slug.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Percentage discount given an original and offer price.
export function discountPercent(price: number, offer?: number | null): number {
  if (!offer || offer >= price) return 0;
  return Math.round((1 - offer / price) * 100);
}

// Absolute URL from a site-relative path (for canonical / OG tags).
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

// Truncate text to a max length for meta descriptions.
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

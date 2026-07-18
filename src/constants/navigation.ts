import type { Brand } from "@/types";

// Primary nav links shown in the header.
export const navLinks = [
  { label: "Shop", href: "/shop", key: "shop" },
  { label: "Brands", href: "/brands", key: "brands" },
  { label: "Guides", href: "/guides", key: "guides" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

// Brands with their shop slug and one-line tagline (home brand strip).
export const brands: { name: Brand; slug: string; tagline: string }[] = [
  { name: "Casio", slug: "casio", tagline: "Everyday icons" },
  { name: "Edifice", slug: "casio", tagline: "Motorsport DNA" },
  { name: "Seiko", slug: "seiko", tagline: "Japanese craft" },
  { name: "Citizen", slug: "citizen", tagline: "Powered by light" },
];

// Category slugs mapped to display labels (footer + filters).
export const categories = [
  { slug: "mens-watches", label: "Men" },
  { slug: "womens-watches", label: "Women" },
  { slug: "dive-watches", label: "Dive" },
  { slug: "digital-watches", label: "Digital" },
  { slug: "analog-watches", label: "Analog" },
  { slug: "dress-watches", label: "Dress" },
  { slug: "unisex-watches", label: "Unisex" },
];

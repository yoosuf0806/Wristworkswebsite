// Central business / site constants — the single source of truth for SEO,
// schema markup, contact details and social links used across the app.

export const siteConfig = {
  name: "Wrist Works",
  legalName: "Wrist Works",
  shortName: "WRIST.WORKS",
  // Public base URL — drives canonical URLs, sitemap and Open Graph tags.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wristworks.lk").replace(/\/$/, ""),
  description:
    "Premium online watch boutique in Colombo, Sri Lanka. 100% authentic Casio, Seiko and Citizen watches with full manufacturer warranty and island-wide delivery.",
  tagline: "Time, worn well.",
  locale: "en_LK",
  currency: "LKR",
  currencySymbol: "Rs.",

  // Default social share image (served from /public).
  ogImage: "/og-default.jpg",

  // Contact & location — used by LocalBusiness / Organization schema.
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "94770000000",
    phoneDisplay: "+94 77 000 0000",
    email: "hello@wristworks.lk",
    hours: "Mon–Sat · 9am–6pm",
  },
  address: {
    street: "Colombo",
    city: "Colombo",
    region: "Western Province",
    postalCode: "00100",
    country: "LK",
    countryName: "Sri Lanka",
    // Approx. Colombo coordinates for LocalBusiness geo.
    latitude: 6.9271,
    longitude: 79.8612,
  },

  // Social profiles — feed Organization.sameAs.
  social: {
    instagram: "https://instagram.com/wristworks.lk",
    facebook: "https://facebook.com/wristworks.lk",
    tiktok: "https://tiktok.com/@wristworks.lk",
  },
  twitterHandle: "@wristworks",

  // Verification tokens.
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
};

// Build a WhatsApp click-to-chat link with an optional prefilled message.
export function whatsappLink(message?: string): string {
  const num = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
  const text = message || "Hi Wrist Works! I have a question about a watch.";
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export type SiteConfig = typeof siteConfig;

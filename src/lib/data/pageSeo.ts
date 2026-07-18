import { createPublicSupabase, hasSupabase } from "@/lib/supabase/server";
import type { SeoFields } from "@/types";

// Per-static-page SEO overrides (home, shop, about, contact, …) editable from
// admin. Each row keyed by a page_key. Includes an editable H1 + SEO paragraph.

export interface PageSeo extends SeoFields {
  pageKey: string;
  h1?: string | null;
  seoParagraph?: string | null;
}

// Sensible built-in defaults so pages have good SEO before anything is edited.
const defaults: Record<string, PageSeo> = {
  home: {
    pageKey: "home",
    metaTitle: "Wrist Works — Authentic Casio, Seiko & Citizen Watches in Sri Lanka",
    metaDescription:
      "Premium online watch boutique in Colombo. 100% authentic Casio, Seiko and Citizen watches with full warranty and free island-wide delivery.",
    focusKeyword: "authentic watches sri lanka",
  },
  shop: {
    pageKey: "shop",
    h1: "All Watches",
    metaTitle: "Shop All Watches — Casio, Seiko & Citizen | Wrist Works Sri Lanka",
    metaDescription:
      "Browse every authentic Casio, Seiko and Citizen watch in stock. Filter by brand, type and price. Full warranty and island-wide delivery from Colombo.",
    focusKeyword: "buy watches online sri lanka",
    seoParagraph:
      "Shop the full Wrist Works collection of 100% authentic Casio, Seiko and Citizen watches. Every piece is sourced from authorised distributors, inspected in Colombo and delivered island-wide with a stamped manufacturer warranty.",
  },
  about: {
    pageKey: "about",
    metaTitle: "About Wrist Works — Colombo's Authentic Watch Boutique",
    metaDescription:
      "Wrist Works is a premium online watch boutique in Colombo, Sri Lanka, selling only genuine Casio, Seiko and Citizen watches with full warranty.",
    focusKeyword: "wrist works colombo",
  },
  contact: {
    pageKey: "contact",
    metaTitle: "Contact Wrist Works — WhatsApp & Support, Colombo Sri Lanka",
    metaDescription:
      "Questions about a watch? Message Wrist Works on WhatsApp or reach our Colombo team. We're happy to send live photos before you buy.",
    focusKeyword: "contact wrist works",
  },
  brands: {
    pageKey: "brands",
    metaTitle: "Watch Brands — Casio, Seiko & Citizen | Wrist Works Sri Lanka",
    metaDescription:
      "Explore the brands we carry — Casio, Edifice, Seiko and Citizen — all 100% authentic with full warranty and island-wide delivery in Sri Lanka.",
    focusKeyword: "casio seiko citizen sri lanka",
  },
  guides: {
    pageKey: "guides",
    metaTitle: "Watch Guides & Buying Advice | Wrist Works Journal",
    metaDescription:
      "Know your watch before you buy it. Buying guides, explainers and care tips for Casio, Seiko and Citizen from the Wrist Works team in Colombo.",
    focusKeyword: "watch buying guide sri lanka",
  },
};

export async function getPageSeo(pageKey: string): Promise<PageSeo> {
  const fallback = defaults[pageKey] || { pageKey };
  if (!hasSupabase()) return fallback;
  const supabase = createPublicSupabase();
  const { data } = await supabase.from("page_seo").select("*").eq("page_key", pageKey).maybeSingle();
  if (!data) return fallback;
  return {
    pageKey: data.page_key,
    h1: data.h1 ?? fallback.h1,
    seoParagraph: data.seo_paragraph ?? fallback.seoParagraph,
    metaTitle: data.meta_title ?? fallback.metaTitle,
    metaDescription: data.meta_description ?? fallback.metaDescription,
    focusKeyword: data.focus_keyword ?? fallback.focusKeyword,
    ogImage: data.og_image ?? fallback.ogImage,
  };
}

export async function getAllPageSeo(): Promise<PageSeo[]> {
  if (!hasSupabase()) return Object.values(defaults);
  const supabase = createPublicSupabase();
  const { data } = (await supabase.from("page_seo").select("*")) as { data: any[] | null };
  if (!data || data.length === 0) return Object.values(defaults);
  return data.map((d) => ({
    pageKey: d.page_key,
    h1: d.h1,
    seoParagraph: d.seo_paragraph,
    metaTitle: d.meta_title,
    metaDescription: d.meta_description,
    focusKeyword: d.focus_keyword,
    ogImage: d.og_image,
  }));
}

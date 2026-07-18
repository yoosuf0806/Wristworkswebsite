import type {
  CategoryContent,
  Faq,
  Review,
  DiscountCode,
  Customer,
  Order,
} from "@/types";

// Bundled sample data. Used as a fallback whenever Supabase isn't configured
// so the whole site renders out of the box, and mirrors supabase/seed.sql.

// The full 17-product catalog lives in products.data.ts (generated).
export { catalogProducts as mockProducts } from "@/lib/data/products.data";


export const mockCategories: CategoryContent[] = [
  {
    slug: "casio",
    kind: "brand",
    title: "Casio Watches in Sri Lanka",
    intro: "Everyday icons — G-Shock, Edifice, Baby-G and the vintage classics.",
    seoParagraph:
      "Shop 100% authentic Casio watches in Sri Lanka, from the shock-resistant G-Shock line to the retro Vintage series and Edifice chronographs. Every piece is sourced from authorised distributors, inspected in Colombo, and delivered island-wide with a stamped manufacturer warranty.",
    metaTitle: "Casio Watches Sri Lanka — Authentic G-Shock, Edifice & Vintage",
    metaDescription:
      "Buy genuine Casio watches in Sri Lanka. G-Shock, Edifice, Baby-G and Vintage models with full warranty and island-wide delivery from Colombo.",
    focusKeyword: "casio watches sri lanka",
    ogImage: null,
  },
  {
    slug: "seiko",
    kind: "brand",
    title: "Seiko Watches in Sri Lanka",
    intro: "Japanese craft — Seiko 5 Sports, Presage and Prospex.",
    seoParagraph:
      "Discover authentic Seiko watches in Sri Lanka — the automatic Seiko 5 Sports, elegant Presage dress watches and the 200m Prospex divers. Authorised stock, sealed boxes, stamped warranty cards and insured island-wide delivery from our Colombo boutique.",
    metaTitle: "Seiko Watches Sri Lanka — Authentic 5 Sports, Presage & Prospex",
    metaDescription:
      "Buy genuine Seiko watches in Sri Lanka. Seiko 5 Sports, Presage and Prospex automatics with full warranty and island-wide delivery from Colombo.",
    focusKeyword: "seiko watches sri lanka",
    ogImage: null,
  },
  {
    slug: "citizen",
    kind: "brand",
    title: "Citizen Watches in Sri Lanka",
    intro: "Powered by light — Eco-Drive that never needs a battery.",
    seoParagraph:
      "Shop authentic Citizen watches in Sri Lanka, led by the light-powered Eco-Drive range and the automatic Tsuyosa. Citizen Eco-Drive models carry up to a 5-year warranty. Authorised stock, inspected in Colombo and delivered island-wide.",
    metaTitle: "Citizen Watches Sri Lanka — Authentic Eco-Drive & Automatic",
    metaDescription:
      "Buy genuine Citizen watches in Sri Lanka. Eco-Drive and automatic models with up to 5-year warranty and island-wide delivery from Colombo.",
    focusKeyword: "citizen watches sri lanka",
    ogImage: null,
  },
  {
    slug: "mens-watches",
    kind: "category",
    title: "Men's Watches",
    intro: "Automatics, divers and everyday steel for every wrist.",
    seoParagraph:
      "Browse men's watches from Casio, Seiko and Citizen — automatic divers, dress pieces and rugged everyday steel. 100% authentic, with full manufacturer warranty and island-wide delivery across Sri Lanka.",
    metaTitle: "Men's Watches Sri Lanka — Casio, Seiko & Citizen for Men",
    metaDescription:
      "Shop authentic men's watches in Sri Lanka from Casio, Seiko and Citizen. Automatics, divers and dress watches with warranty and island-wide delivery.",
    focusKeyword: "mens watches sri lanka",
    ogImage: null,
  },
  {
    slug: "womens-watches",
    kind: "category",
    title: "Women's Watches",
    intro: "Refined, resilient and made to be worn every day.",
    seoParagraph:
      "Explore women's watches from Casio Baby-G, Seiko and Citizen — refined designs built to last. Every watch is genuine, warranty-backed and delivered island-wide across Sri Lanka.",
    metaTitle: "Women's Watches Sri Lanka — Casio, Seiko & Citizen for Women",
    metaDescription:
      "Shop authentic women's watches in Sri Lanka from Casio Baby-G, Seiko and Citizen. Full warranty and island-wide delivery from Colombo.",
    focusKeyword: "womens watches sri lanka",
    ogImage: null,
  },
  {
    slug: "digital-watches",
    kind: "category",
    title: "Digital Watches",
    intro: "LED backlights, world time and seven-year batteries.",
    seoParagraph:
      "Shop digital watches led by Casio's legendary Vintage and G-Shock lines — LED backlights, world time, stopwatch and multi-year batteries. Genuine stock with warranty and island-wide delivery in Sri Lanka.",
    metaTitle: "Digital Watches Sri Lanka — Authentic Casio Digital & G-Shock",
    metaDescription:
      "Buy authentic digital watches in Sri Lanka. Casio Vintage and G-Shock digital models with warranty and island-wide delivery from Colombo.",
    focusKeyword: "digital watches sri lanka",
    ogImage: null,
  },
  {
    slug: "dive-watches",
    kind: "category",
    title: "Dive Watches",
    intro: "100m to 200m rated — built for water.",
    seoParagraph:
      "Dive watches from Seiko Prospex, Citizen Promaster and Casio — 100m to 200m water resistance, unidirectional bezels and serious lume. Authentic, warranty-backed and delivered island-wide across Sri Lanka.",
    metaTitle: "Dive Watches Sri Lanka — Seiko Prospex, Citizen Promaster",
    metaDescription:
      "Shop authentic dive watches in Sri Lanka. Seiko Prospex and Citizen Promaster divers, 200m rated, with warranty and island-wide delivery.",
    focusKeyword: "dive watches sri lanka",
    ogImage: null,
  },
  {
    slug: "analog-watches",
    kind: "category",
    title: "Analog Watches",
    intro: "Sweeping hands, sunburst dials, timeless faces.",
    seoParagraph:
      "Classic analog watches from Casio, Seiko and Citizen — sunburst dials, automatic movements and clean everyday faces. 100% genuine with full warranty and island-wide delivery in Sri Lanka.",
    metaTitle: "Analog Watches Sri Lanka — Casio, Seiko & Citizen",
    metaDescription:
      "Buy authentic analog watches in Sri Lanka from Casio, Seiko and Citizen. Automatic and quartz models with warranty and island-wide delivery.",
    focusKeyword: "analog watches sri lanka",
    ogImage: null,
  },
  {
    slug: "dress-watches",
    kind: "category",
    title: "Dress Watches",
    intro: "Slim cases, leather straps, quiet elegance.",
    seoParagraph:
      "Dress watches led by the Seiko Presage and Citizen automatics — slim cases, sunburst dials and refined finishing. Authentic stock, warranty-backed and delivered island-wide across Sri Lanka.",
    metaTitle: "Dress Watches Sri Lanka — Seiko Presage & Citizen",
    metaDescription:
      "Shop authentic dress watches in Sri Lanka. Seiko Presage and Citizen automatics with warranty and island-wide delivery from Colombo.",
    focusKeyword: "dress watches sri lanka",
    ogImage: null,
  },
  {
    slug: "unisex-watches",
    kind: "category",
    title: "Unisex Watches",
    intro: "Sized and styled for every wrist.",
    seoParagraph:
      "Versatile unisex watches from Casio, Seiko and Citizen — balanced case sizes and neutral styling that suits everyone. Genuine, warranty-backed and delivered island-wide in Sri Lanka.",
    metaTitle: "Unisex Watches Sri Lanka — Casio, Seiko & Citizen",
    metaDescription:
      "Buy authentic unisex watches in Sri Lanka from Casio, Seiko and Citizen. Full warranty and island-wide delivery from Colombo.",
    focusKeyword: "unisex watches sri lanka",
    ogImage: null,
  },
];

export const mockFaqs: Faq[] = [
  {
    id: "f1",
    scope: "global",
    scopeRef: null,
    position: 0,
    question: "Are your watches 100% genuine?",
    answer:
      "Yes — every piece comes from an authorised distributor with a stamped manufacturer warranty card. We never sell parallel imports or open-box stock, and we'll send you live photos of your exact watch on WhatsApp before dispatch.",
  },
  {
    id: "f2",
    scope: "global",
    scopeRef: null,
    position: 1,
    question: "How long does delivery take?",
    answer:
      "Colombo & suburbs: 1–2 working days. Island-wide: 2–4 working days via insured courier. Delivery is free on orders above Rs. 25,000.",
  },
  {
    id: "f3",
    scope: "global",
    scopeRef: null,
    position: 2,
    question: "Can I pay in instalments?",
    answer:
      "Yes — pay in 3 interest-free instalments with Koko at checkout. Cash on delivery is also available in Colombo & suburbs for orders under Rs. 150,000.",
  },
  {
    id: "f4",
    scope: "global",
    scopeRef: null,
    position: 3,
    question: "What warranty do I get?",
    answer:
      "The full manufacturer warranty: 1 year on Casio, Edifice and Seiko, up to 5 years on Citizen Eco-Drive. Warranty service is handled through the authorised local service centres.",
  },
  {
    id: "f5",
    scope: "global",
    scopeRef: null,
    position: 4,
    question: "Can I exchange or return a watch?",
    answer:
      "Unworn watches with intact tags and packaging can be exchanged within 7 days. If we shipped the wrong item or it arrives damaged, we replace it free — courier on us.",
  },
  // Shop-page FAQs (rendered on /shop with FAQPage schema).
  {
    id: "sf1",
    scope: "page",
    scopeRef: "shop",
    position: 0,
    question: "How do I filter watches by brand?",
    answer:
      "Open the Filters panel on the left, expand \"Brand\", and tick Casio, Edifice, Seiko or Citizen. The grid updates instantly, and you can stack filters — for example Seiko + Dive + Under Rs. 150,000.",
  },
  {
    id: "sf2",
    scope: "page",
    scopeRef: "shop",
    position: 1,
    question: "Are all in-stock watches available for immediate delivery?",
    answer:
      "Yes. Anything marked in stock ships from Colombo within 24 hours, arriving in 1–2 days in Colombo & suburbs and 2–4 days island-wide.",
  },
  {
    id: "sf3",
    scope: "page",
    scopeRef: "shop",
    position: 2,
    question: "Can I order a watch that is out of stock?",
    answer:
      "Message us on WhatsApp — most out-of-stock pieces restock within 2–3 weeks, and we can reserve one against a small deposit. We also source references we don't list.",
  },
  {
    id: "sf4",
    scope: "page",
    scopeRef: "shop",
    position: 3,
    question: "Do you offer instalment payments?",
    answer:
      "Yes — pay in 3 interest-free instalments with Koko at checkout. No credit card needed; approval takes about a minute.",
  },
  {
    id: "sf5",
    scope: "page",
    scopeRef: "shop",
    position: 4,
    question: "How do I use a discount code?",
    answer:
      "Add your watches to the cart, then enter the code in the \"Discount code\" box on the cart page and press Apply. The discount shows immediately in your order summary.",
  },
  {
    id: "sf6",
    scope: "page",
    scopeRef: "shop",
    position: 5,
    question: "What is the delivery time to my area?",
    answer:
      "Colombo 1–15 & suburbs: 1–2 working days (COD available). Kandy, Galle, Kurunegala and other major towns: 2–3 days. Everywhere else island-wide: 2–4 days via insured courier.",
  },
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    productId: "srpd55",
    author: "Dilshan P.",
    city: "Kandy",
    rating: 5,
    body: "Ordered the SRPD55 on Tuesday, on my wrist in Kandy by Thursday. Sealed box, warranty card stamped.",
    approved: true,
    source: "google",
    createdAt: "2026-06-10T00:00:00Z",
  },
  {
    id: "r2",
    productId: "bm8180",
    author: "Amara F.",
    city: "Colombo 05",
    rating: 5,
    body: "The only store here I trust for genuine Citizen. They sent me macro photos on WhatsApp before I paid.",
    approved: true,
    source: "google",
    createdAt: "2026-06-12T00:00:00Z",
  },
  {
    id: "r3",
    productId: "ga2100",
    author: "Ruwan S.",
    city: "Galle",
    rating: 5,
    body: "Paid in three with Koko, no fuss. The packaging alone felt like a boutique, not a courier bag.",
    approved: true,
    source: "google",
    createdAt: "2026-06-14T00:00:00Z",
  },
];

export const mockDiscounts: DiscountCode[] = [
  {
    id: "d1",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minSubtotal: 25000,
    active: true,
    expiresAt: null,
    usageLimit: null,
    usedCount: 12,
  },
  {
    id: "d2",
    code: "COLOMBO2000",
    type: "fixed",
    value: 2000,
    minSubtotal: 40000,
    active: true,
    expiresAt: null,
    usageLimit: 100,
    usedCount: 8,
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "Dilshan Perera",
    email: "dilshan@example.com",
    phone: "+94 77 123 4567",
    city: "Kandy",
    ordersCount: 2,
    totalSpent: 189000,
    createdAt: "2026-05-01T00:00:00Z",
  },
  {
    id: "c2",
    name: "Amara Fernando",
    email: "amara@example.com",
    phone: "+94 71 987 6543",
    city: "Colombo 05",
    ordersCount: 1,
    totalSpent: 47900,
    createdAt: "2026-05-20T00:00:00Z",
  },
];

export const mockOrders: Order[] = [
  {
    id: "o1",
    reference: "WW-1042",
    customer: {
      name: "Dilshan Perera",
      phone: "+94 77 123 4567",
      email: "dilshan@example.com",
      address: "14 Temple Road",
      city: "Kandy",
    },
    items: [
      { productId: "srpd55", name: "Seiko 5 Sports SRPD55 Automatic", slug: "seiko-5-sports-srpd55-automatic", price: 94500, qty: 1 },
    ],
    subtotal: 94500,
    discountCode: null,
    discountAmount: 0,
    shipping: 0,
    total: 94500,
    paymentMethod: "koko",
    status: "shipped",
    createdAt: "2026-07-14T09:20:00Z",
  },
  {
    id: "o2",
    reference: "WW-1043",
    customer: {
      name: "Amara Fernando",
      phone: "+94 71 987 6543",
      email: "amara@example.com",
      address: "5 Sea Avenue",
      city: "Colombo 05",
    },
    items: [
      { productId: "bm8180", name: "Citizen Eco-Drive BM8180 Field", slug: "citizen-eco-drive-bm8180-field", price: 47900, qty: 1 },
    ],
    subtotal: 47900,
    discountCode: null,
    discountAmount: 0,
    shipping: 0,
    total: 47900,
    paymentMethod: "cod",
    status: "confirmed",
    createdAt: "2026-07-16T15:05:00Z",
  },
];

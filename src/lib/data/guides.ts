// Editorial guide/journal content. Static for now; move to Supabase later if
// the journal grows. Each guide has SEO-friendly title, slug and body.
export interface Guide {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  body: string[];
}

export const guides: Guide[] = [
  {
    slug: "how-to-choose-the-right-casio",
    title: "How to choose the right Casio",
    category: "Buying guide",
    readTime: "6 min read",
    excerpt: "From the vintage A168 to G-Shock and Edifice — which Casio is right for you.",
    body: [
      "Casio's range spans the Rs. 15,000 vintage classics to Bluetooth-connected Edifice chronographs. The right one depends on how you'll wear it.",
      "For everyday retro style, the Vintage A168 is unbeatable value. For toughness, G-Shock. For a dressier chronograph, look at Edifice.",
      "Whatever you choose, every Casio we sell is authorised stock with a stamped 1-year warranty and island-wide delivery.",
    ],
  },
  {
    slug: "analog-vs-digital-which-suits-you",
    title: "Analog vs digital: which suits you?",
    category: "Explainer",
    readTime: "4 min read",
    excerpt: "The practical differences that actually matter day to day.",
    body: [
      "Analog watches read at a glance and dress up easily. Digital watches pack alarms, stopwatch, world time and multi-year batteries.",
      "Many Casio models — like the Baby-G ana-digi range — give you both. If you're unsure, message us and we'll help you decide.",
    ],
  },
  {
    slug: "make-your-watch-last-decades",
    title: "Make your watch last decades",
    category: "Watch care",
    readTime: "5 min read",
    excerpt: "Simple care that keeps a watch looking and running like new.",
    body: [
      "Rinse dive watches in fresh water after the sea. Keep automatics wound or on a winder. Avoid hot showers with any watch — heat and gaskets don't mix.",
      "Service mechanical watches every 4–5 years. For Eco-Drive and quartz, a periodic seal check is enough.",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

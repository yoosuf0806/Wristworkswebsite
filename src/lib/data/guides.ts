// Editorial guide/journal content. Static for now; move to Supabase later if
// the journal grows. Each guide has an SEO-friendly title, slug, body and a
// placeholder image id. The first `featured` guide gets the large hero split.
export interface Guide {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string; // Unsplash id for the placeholder
  featured?: boolean;
  body: string[];
}

const img = (id: string) => id;

export const guides: Guide[] = [
  {
    slug: "how-to-choose-the-right-casio",
    title: "How to choose the right Casio: G-Shock, Vintage or Edifice?",
    category: "Buying guide",
    readTime: "6 min read",
    excerpt:
      "Tough, retro, or race-bred — the three Casio families solve very different problems. Here's how to pick in five minutes.",
    image: img("photo-1523275335684-37898b6baf30"),
    featured: true,
    body: [
      "Casio isn't one watch — it's three completely different answers to 'what should I wear every day?'. G-Shock is the tank: shock-resistant, 200m rated, built to be forgotten on your wrist. Vintage is the style pick: a slim steel bracelet and LCD that dresses up or down for under Rs. 20,000. Edifice is the grown-up sports chronograph, with sapphire-look crystals and, on some models, Bluetooth.",
      "If you knock your wrist on things, work outdoors, or just want zero worries, buy G-Shock. If you want the most style for the least money, the A168 Vintage is unbeatable. If you want an analog chronograph that looks like it costs five times as much, Edifice.",
      "Whichever you choose, every Casio we sell is authorised-distributor stock with a stamped 1-year warranty and island-wide delivery. Message us on WhatsApp and we'll match one to your wrist size and budget.",
    ],
  },
  {
    slug: "analog-vs-digital-which-suits-you",
    title: "Analog vs digital: which suits you?",
    category: "Explainer",
    readTime: "4 min read",
    excerpt: "Sweep or LCD? What each does better — and why most collectors end up with both.",
    image: img("photo-1524592094714-0f0654e20314"),
    body: [
      "Analog watches read at a glance and dress up easily — the right one works with a suit or a T-shirt. Digital watches pack alarms, stopwatch, world time and multi-year batteries, and they're unbeatable for sport and travel.",
      "Many Casio models — like the Baby-G and G-Shock ana-digi range — give you both at once. If you're unsure, start with whichever matches how you actually spend your days, and message us if you'd like a second opinion.",
    ],
  },
  {
    slug: "make-your-watch-last-decades",
    title: "Make your watch last decades",
    category: "Watch care",
    readTime: "5 min read",
    excerpt: "Cleaning, storage, magnets, and the one habit that kills quartz movements early.",
    image: img("photo-1533139502658-0198f920d8e8"),
    body: [
      "Rinse dive and sports watches in fresh water after the sea or a sweaty day. Wipe the case and bracelet with a microfibre cloth. Keep watches away from speakers and laptop magnets, which can throw off timekeeping.",
      "The habit that quietly kills quartz watches: leaving a dead battery inside for months. It can leak and corrode the movement. If your quartz stops, bring it in for a battery swap sooner rather than later. Service mechanical watches every 4–5 years.",
    ],
  },
  {
    slug: "water-resistance-actually-explained",
    title: "Water resistance, actually explained",
    category: "Explainer",
    readTime: "3 min read",
    excerpt: "30m doesn't mean 30 metres. What the ratings really allow, from handwash to dive.",
    image: img("photo-1509048191080-d2984bad6ae5"),
    body: [
      "Water-resistance ratings are tested under static lab pressure, not real swimming. So 30m means 'splashes and handwashing only' — not a swim. 50m handles a shower and a careful swim. 100m is fine for swimming and snorkelling. 200m and up is genuine dive territory.",
      "Whatever the rating, never operate the crown or pushers underwater, and have the gaskets checked every couple of years if you swim often. Heat is the enemy — skip the hot shower with any watch.",
    ],
  },
  {
    slug: "your-first-automatic-where-to-start",
    title: "Your first automatic: where to start",
    category: "Buying guide",
    readTime: "6 min read",
    excerpt: "Why the Seiko 5 line is the classic answer, and two alternatives worth a look.",
    image: img("photo-1587836374828-4dbafa94cf0e"),
    body: [
      "The Seiko 5 Sports line is the classic first automatic for good reason: a reliable 4R36 movement that hacks and hand-winds, a display caseback to watch it tick, and a price that leaves room to grow. The SRPD55 is the everyday pick.",
      "Two alternatives worth a look: the Citizen Tsuyosa NJ0150 for an integrated-bracelet sports look, and the Seiko Presage Cocktail Time if you want something dressier. All three are in stock and warranty-backed.",
    ],
  },
  {
    slug: "eco-drive-how-light-becomes-time",
    title: "Eco-Drive: how light becomes time",
    category: "Explainer",
    readTime: "4 min read",
    excerpt: "Citizen's solar tech, honestly assessed — the lifespan, the myths, the upkeep.",
    image: img("photo-1547996160-81dfa63595aa"),
    body: [
      "Eco-Drive turns any light — sun or a desk lamp — into power, storing it in a capacitor that runs the watch for months in the dark. In practice you never change a battery, which is the whole point.",
      "The honest caveats: the light cell and capacitor do age over many years and can be serviced when they eventually fade — but that's a decade-plus horizon for most owners. For a genuine set-and-forget watch, Eco-Drive is hard to beat.",
    ],
  },
  {
    slug: "dress-watches-under-100000",
    title: "Dress watches under Rs. 100,000",
    category: "Buying guide",
    readTime: "5 min read",
    excerpt: "Slim cases, leather straps, and what to wear to a Colombo wedding.",
    image: img("photo-1495856458515-0637185db551"),
    body: [
      "A good dress watch is slim, simple and quiet: a clean dial, slim case that slides under a cuff, and ideally a leather strap. Under Rs. 100,000 you have real options — the Seiko Presage Cocktail Time leads the pack, with Citizen and Casio dress pieces close behind.",
      "For a Colombo wedding: a white or silver dial on a leather or thin steel bracelet is never wrong. Message us and we'll pull two or three that suit the outfit.",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

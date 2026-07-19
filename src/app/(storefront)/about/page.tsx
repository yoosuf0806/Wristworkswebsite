import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/data/pageSeo";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import { whatsappLink } from "@/lib/seo/siteConfig";

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80`;

// The three principles shown in "What we stand for".
const principles = [
  {
    n: "01",
    label: "Genuine, always",
    body: "Authorised-distributor stock with full manufacturer warranty, 1–5 years by brand.",
  },
  {
    n: "02",
    label: "Inspected in Colombo",
    body: "Every watch is checked by hand before dispatch. Ask for live photos on WhatsApp — we'll send them.",
  },
  {
    n: "03",
    label: "Priced honestly",
    body: "No boutique rent, no middlemen. Pay in full, cash on delivery, or three instalments with Koko.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("about");
  return buildMetadata({
    title: seo.metaTitle!,
    description: seo.metaDescription!,
    path: "/about",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
  });
}

export default function AboutPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />

      {/* Hero */}
      <section className="px-6 py-[120px] text-center md:px-12">
        <div className="eyebrow mb-8">About Wrist Works</div>
        <h1 className="mx-auto max-w-[1000px] font-serif text-[clamp(44px,7vw,88px)] font-normal leading-[1.04]">
          A watch boutique, not a gadget store.
        </h1>
        <p className="mx-auto mt-8 max-w-[600px] text-[16px] leading-[1.8] text-muted2">
          Wrist Works started with a simple frustration: buying a genuine watch in Sri Lanka meant
          either paying boutique markups or gambling on grey imports. We built the third option.
        </p>
      </section>

      {/* Full-width image */}
      <section className="relative h-[52vh] min-h-[360px] overflow-hidden border-y border-line bg-[#e0dfdc]">
        <Image
          src={u("photo-1495856458515-0637185db551")}
          alt="A watchmaker's workbench with a loupe, straps and tools"
          fill
          className="object-cover"
        />
      </section>

      {/* What we stand for */}
      <section className="grid grid-cols-1 gap-12 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-12">
        <div>
          <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-normal leading-[1.1]">
            What we stand for
          </h2>
          <p className="mt-7 max-w-[460px] text-[15px] leading-[1.9] text-muted2">
            Every piece we sell comes from an authorised distributor — never parallel imports, never
            open-box. Each watch is inspected in Colombo before it ships: timing checked, seals
            verified, warranty card stamped. If we wouldn&apos;t wear it, we won&apos;t sell it.
          </p>
        </div>
        <div>
          {principles.map((p, i) => (
            <div key={p.n} className={i > 0 ? "border-t border-line pt-8 mt-8" : ""}>
              <div className="text-[12px] uppercase tracking-[.2em] text-muted">
                {p.n} — {p.label}
              </div>
              <p className="mt-3 max-w-[440px] text-[16px] leading-[1.7] text-white">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Source-on-request CTA */}
      <section className="flex flex-col items-center justify-between gap-8 border-y border-line bg-[#0a0a0a] px-6 py-20 md:flex-row md:px-12">
        <h2 className="max-w-[640px] font-serif text-[clamp(26px,3.4vw,42px)] font-normal leading-[1.15]">
          Have a piece in mind that isn&apos;t on the site? We source on request.
        </h2>
        <a
          href={whatsappLink("Hi Wrist Works! I have a specific watch in mind — can you source it?")}
          className="flex-none bg-white px-9 py-4 text-[11.5px] font-semibold uppercase tracking-[.18em] text-black transition-colors hover:bg-[#ccc]"
        >
          Talk to us
        </a>
      </section>
    </>
  );
}

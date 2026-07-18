import { Accordion } from "@/components/ui/Accordion";
import { FaqSchema } from "@/components/seo/schemas";
import type { Faq } from "@/types";

// Renders a FAQ block with visible accordion + FAQPage JSON-LD. Reused on the
// home, shop, category and product pages.
export function FaqSection({
  faqs,
  heading = "Common questions, straight answers.",
  eyebrow = "FAQ",
}: {
  faqs: Faq[];
  heading?: string;
  eyebrow?: string;
}) {
  if (faqs.length === 0) return null;
  const items = faqs.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <section className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 border-t border-line px-6 py-24 md:grid-cols-[1fr_1.6fr] md:px-12">
      <FaqSchema faqs={faqs} />
      <div>
        <div className="eyebrow mb-[18px]">{eyebrow}</div>
        <h2 className="m-0 font-serif text-[34px] font-normal leading-[1.2]">{heading}</h2>
        <p className="mt-5 text-[13.5px] leading-[1.8] text-muted2">
          Anything else — we&apos;re one WhatsApp message away.
        </p>
      </div>
      <Accordion items={items} />
    </section>
  );
}

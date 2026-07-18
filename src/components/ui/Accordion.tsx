"use client";

import { useState } from "react";

// Accordion used for FAQs and product detail sections. Client-side toggle,
// but the answer text is always in the DOM (below) for SEO/crawlers.
interface Item {
  q: string;
  a: string;
}

export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-5 py-[22px] text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-medium">{item.q}</span>
              <span className="flex-none text-lg font-light text-muted">{isOpen ? "−" : "+"}</span>
            </button>
            <div className={isOpen ? "block" : "hidden"}>
              <p className="m-0 whitespace-pre-line pb-6 pr-10 text-[13.5px] leading-[1.8] text-muted2">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

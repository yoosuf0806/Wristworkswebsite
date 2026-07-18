"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/cartStore";
import type { Product } from "@/types";
import { whatsappLink } from "@/lib/seo/siteConfig";
import { formatPrice } from "@/lib/utils";

// Quantity selector + add-to-cart + WhatsApp enquiry, for the product page.
export function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = product.offerPrice ?? product.price;
  const soldOut = product.stock === 0;

  const wa = whatsappLink(
    `Hi Wrist Works! I'm interested in the ${product.brand} ${product.name} (${formatPrice(price)}).`
  );

  const handleAdd = () => {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0]?.url ?? "",
        imageAlt: product.images[0]?.alt ?? product.name,
        price,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-line2">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg text-muted hover:text-white" aria-label="Decrease quantity">
            −
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-lg text-muted hover:text-white" aria-label="Increase quantity">
            +
          </button>
        </div>
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className="flex-1 bg-white px-8 py-4 text-[11.5px] font-semibold uppercase tracking-[.18em] text-black transition-colors hover:bg-[#ccc] disabled:opacity-40"
        >
          {soldOut ? "Sold out" : added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
      <a
        href={wa}
        className="mt-4 flex items-center justify-center gap-[10px] border border-line2 px-8 py-4 text-[11.5px] font-semibold uppercase tracking-[.16em] text-white transition-colors hover:border-[#666]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
          <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" />
        </svg>
        Ask about this watch
      </a>
    </div>
  );
}

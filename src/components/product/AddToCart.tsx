"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/cartStore";
import type { Product } from "@/types";
import { whatsappLink } from "@/lib/seo/siteConfig";
import { formatPrice } from "@/lib/utils";

// Quantity + Add to cart (opens the mini-cart drawer) + Buy on WhatsApp, plus
// the trust row. Matches the product-page design.
export function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const price = product.offerPrice ?? product.price;
  const soldOut = product.stock === 0;
  const warranty = product.brand === "Citizen" ? "Up to 5-year" : `1-year ${product.brand}`;

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
  };

  return (
    <div className="mt-8">
      <div className="flex items-stretch gap-4">
        <div className="flex items-center border border-line2">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-4 text-lg text-muted hover:text-white" aria-label="Decrease quantity">−</button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-4 py-4 text-lg text-muted hover:text-white" aria-label="Increase quantity">+</button>
        </div>
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className="flex-1 bg-white text-[12px] font-semibold uppercase tracking-[.2em] text-black transition-colors hover:bg-[#ccc] disabled:opacity-40"
        >
          {soldOut ? "Sold out" : "Add to cart"}
        </button>
      </div>

      <a
        href={wa}
        className="mt-4 flex items-center justify-center gap-[10px] border border-whatsapp py-4 text-[12px] font-semibold uppercase tracking-[.2em] text-whatsapp transition-colors hover:bg-whatsapp hover:text-black"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" />
        </svg>
        Buy on WhatsApp
      </a>

      {/* Trust row */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-muted2">
        <span>{soldOut ? "◦ Restocking soon" : "✓ In stock — ships in 24h"}</span>
        <span>✓ {warranty} warranty</span>
        <span>✓ COD available</span>
      </div>
    </div>
  );
}

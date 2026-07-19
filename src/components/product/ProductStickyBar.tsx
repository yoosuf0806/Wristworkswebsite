"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart/cartStore";
import type { Product } from "@/types";
import { whatsappLink } from "@/lib/seo/siteConfig";
import { formatPrice } from "@/lib/utils";

// Product-page quick-add sticky bar. Slides up once the visitor scrolls past
// the main add-to-cart, showing the current product with WhatsApp + Add to cart.
export function ProductStickyBar({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [show, setShow] = useState(false);
  const price = product.offerPrice ?? product.price;
  const onSale = !!product.offerPrice && product.offerPrice < product.price;
  const soldOut = product.stock === 0;

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = whatsappLink(
    `Hi Wrist Works! I'm interested in the ${product.brand} ${product.name} (${formatPrice(price)}).`
  );

  const handleAdd = () =>
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: product.images[0]?.url ?? "",
      imageAlt: product.images[0]?.alt ?? product.name,
      price,
    });

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[90] border-t border-line2 bg-black/95 backdrop-blur-md transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex h-[68px] items-center justify-between gap-4 px-6 md:px-12">
        <div className="min-w-0 truncate">
          <div className="truncate text-[14px] font-medium">{product.name}</div>
          <div className="text-[13px]">
            <span className="font-bold">{formatPrice(price)}</span>
            {onSale && <span className="ml-2 text-[12px] text-[#666] line-through">{formatPrice(product.price)}</span>}
          </div>
        </div>
        <div className="flex flex-none items-center gap-3">
          <a href={wa} className="hidden border border-whatsapp px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-whatsapp hover:bg-whatsapp hover:text-black sm:block">
            WhatsApp
          </a>
          <button
            onClick={handleAdd}
            disabled={soldOut}
            className="bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-black hover:bg-[#ccc] disabled:opacity-40 md:px-8"
          >
            {soldOut ? "Sold out" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

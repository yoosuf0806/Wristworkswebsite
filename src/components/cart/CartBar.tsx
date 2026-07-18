"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/cartStore";
import { formatPrice } from "@/lib/utils";

// Sticky bottom cart bar, shown site-wide once the cart has items (hidden on
// the cart and checkout pages themselves). Mirrors the design's persistent bar.
export function CartBar() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const count = items.reduce((t, i) => t + i.qty, 0);
  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0);

  if (count === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-line2 bg-black/95 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-12">
        <div className="text-[13px] md:text-[14px]">
          <span className="font-semibold">{count} {count === 1 ? "item" : "items"}</span>
          <span className="text-muted2"> in your cart — </span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="border border-line2 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-white hover:border-white md:px-6">
            View cart
          </Link>
          <Link href="/checkout" className="bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-black hover:bg-[#ccc] md:px-6">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

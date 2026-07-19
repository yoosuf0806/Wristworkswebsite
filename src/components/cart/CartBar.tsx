"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/cartStore";
import { formatPrice } from "@/lib/utils";

// Sticky bottom cart summary bar. Fixed height regardless of item count: shows
// up to three overlapping thumbnails + a "+N" badge, the item count and total,
// and View cart / Checkout. Hidden on the cart, checkout and product pages
// (product pages show their own quick-add bar instead).
export function CartBar() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const count = items.reduce((t, i) => t + i.qty, 0);
  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0);

  if (count === 0) return null;
  if (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/products/")
  )
    return null;

  const thumbs = items.slice(0, 3);
  const extra = items.length - thumbs.length;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-line2 bg-black/95 backdrop-blur-md">
      <div className="flex h-[64px] items-center justify-between gap-4 px-6 md:px-12">
        <div className="flex min-w-0 items-center gap-4">
          {/* Overlapping thumbnails — fixed footprint no matter how many items */}
          <div className="flex flex-none items-center">
            {thumbs.map((item, i) => (
              <div
                key={item.productId}
                className="relative h-10 w-10 overflow-hidden border border-line2 bg-[#e9e8e5]"
                style={{ marginLeft: i === 0 ? 0 : -12, zIndex: thumbs.length - i }}
              >
                {item.image && <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="40px" />}
              </div>
            ))}
            {extra > 0 && (
              <div className="relative -ml-3 flex h-10 w-10 items-center justify-center border border-line2 bg-[#111] text-[11px] font-bold text-white">
                +{extra}
              </div>
            )}
          </div>
          <div className="min-w-0 truncate text-[13px] md:text-[14px]">
            <span className="font-semibold">{count} {count === 1 ? "item" : "items"}</span>
            <span className="hidden text-muted2 sm:inline"> in your cart — </span>
            <span className="text-muted2 sm:hidden"> — </span>
            <span className="font-bold">{formatPrice(subtotal)}</span>
          </div>
        </div>
        <div className="flex flex-none items-center gap-3">
          <Link href="/cart" className="hidden border border-line2 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-white hover:border-white sm:block">
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

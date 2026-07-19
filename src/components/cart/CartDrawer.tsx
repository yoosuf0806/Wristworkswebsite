"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart/cartStore";
import { formatPrice } from "@/lib/utils";

// Slide-in mini-cart drawer. Opens when a product is added; closes on the ✕,
// a backdrop click, or Escape. Deliberately NOT auto-dismissed — it doubles as
// the mini-cart with Checkout / View cart actions.
export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQty, remove } = useCart();
  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0);
  const count = items.reduce((t, i) => t + i.qty, 0);

  // Close on Escape, and lock body scroll while open.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-[110] bg-black/60 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Your cart"
        className={`fixed right-0 top-0 z-[120] flex h-full w-full max-w-[420px] flex-col bg-[#0a0a0a] shadow-[0_0_60px_rgba(0,0,0,.6)] transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="font-serif text-[22px]">Your cart{count > 0 ? ` (${count})` : ""}</div>
          <button onClick={closeDrawer} aria-label="Close cart" className="flex h-8 w-8 items-center justify-center border border-line2 text-muted hover:border-white hover:text-white">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-muted2">Your cart is empty.</p>
            <button onClick={closeDrawer} className="border border-line2 px-6 py-3 text-[11px] uppercase tracking-[.16em] hover:border-white">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 border-b border-line py-4">
                  <Link href={`/products/${item.slug}`} onClick={closeDrawer} className="relative h-20 w-20 flex-none overflow-hidden bg-[#e9e8e5]">
                    {item.image && <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="80px" />}
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-[.2em] text-muted">{item.brand}</div>
                        <Link href={`/products/${item.slug}`} onClick={closeDrawer} className="text-[14px] font-medium leading-tight hover:text-white">
                          {item.name}
                        </Link>
                      </div>
                      <button onClick={() => remove(item.productId)} aria-label="Remove" className="flex-none text-muted hover:text-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-line2">
                        <button onClick={() => setQty(item.productId, item.qty - 1)} className="px-2.5 py-1 text-muted hover:text-white">−</button>
                        <span className="w-7 text-center text-[13px]">{item.qty}</span>
                        <button onClick={() => setQty(item.productId, item.qty + 1)} className="px-2.5 py-1 text-muted hover:text-white">+</button>
                      </div>
                      <span className="text-[14px] font-bold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-serif text-[18px]">Total</span>
                <span className="text-[20px] font-bold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-[12px] text-muted">Shipping calculated at checkout · free above Rs. 25,000</p>
              <Link href="/checkout" onClick={closeDrawer} className="block bg-white py-4 text-center text-[11.5px] font-semibold uppercase tracking-[.16em] text-black hover:bg-[#ccc]">
                Checkout
              </Link>
              <Link href="/cart" onClick={closeDrawer} className="mt-3 block text-center text-[11px] uppercase tracking-[.14em] text-muted2 underline underline-offset-4 hover:text-white">
                View cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart/cartStore";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 25000;
const SHIPPING_FLAT = 500;

// Full cart page: line items on the left, order summary panel on the right —
// matching the design.
export function CartView() {
  const { items, setQty, remove, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD || sub === 0 ? 0 : SHIPPING_FLAT;
  const total = Math.max(0, sub - discount) + shipping;
  const koko = Math.round(total / 3);

  const applyCode = async () => {
    if (!code.trim()) return;
    setApplying(true);
    setMessage(null);
    try {
      const res = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal: sub }),
      });
      const data = await res.json();
      setDiscount(data.valid ? data.amount : 0);
      setMessage(data.message);
    } catch {
      setMessage("Couldn't check that code. Try again.");
    } finally {
      setApplying(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted2">Your cart is empty.</p>
        <Link href="/shop" className="mt-6 inline-block border border-line2 px-8 py-4 text-[11.5px] uppercase tracking-[.16em] hover:border-white">
          Browse watches
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      {/* Line items */}
      <div>
        <div className="border-t border-line">
          {items.map((item) => (
            <div key={item.productId} className="flex flex-wrap items-center gap-6 border-b border-line py-8">
              <Link href={`/products/${item.slug}`} className="relative h-28 w-28 flex-none overflow-hidden bg-[#e9e8e5]">
                {item.image && <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="112px" />}
              </Link>

              <div className="min-w-[160px] flex-1">
                <div className="text-[10.5px] uppercase tracking-[.22em] text-muted">{item.brand}</div>
                <Link href={`/products/${item.slug}`} className="mt-1 block text-[18px] font-medium leading-tight hover:text-white">
                  {item.name}
                </Link>
                {item.reference && (
                  <div className="mt-1.5 text-[12px] uppercase tracking-[.12em] text-muted">Ref. {item.reference}</div>
                )}
              </div>

              {/* Quantity */}
              <div className="flex flex-none items-center border border-line2">
                <button onClick={() => setQty(item.productId, item.qty - 1)} className="px-4 py-3 text-lg text-muted hover:text-white" aria-label="Decrease quantity">−</button>
                <span className="w-8 text-center text-sm">{item.qty}</span>
                <button onClick={() => setQty(item.productId, item.qty + 1)} className="px-4 py-3 text-lg text-muted hover:text-white" aria-label="Increase quantity">+</button>
              </div>

              {/* Price */}
              <div className="flex-none text-right">
                <div className="text-[17px] font-bold">{formatPrice(item.price * item.qty)}</div>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="text-[13px] text-[#666] line-through">{formatPrice(item.originalPrice * item.qty)}</div>
                )}
              </div>

              {/* Remove */}
              <button onClick={() => remove(item.productId)} aria-label="Remove item" className="flex-none px-1 text-xl text-muted hover:text-white">
                ×
              </button>
            </div>
          ))}
        </div>

        <Link href="/shop" className="mt-8 inline-block border-b border-line2 pb-1 text-[11.5px] uppercase tracking-[.18em] text-muted2 hover:text-white">
          ← Continue shopping
        </Link>
      </div>

      {/* Order summary */}
      <div className="h-fit border border-line bg-card p-8">
        <h2 className="mb-7 text-[13px] uppercase tracking-[.2em] text-muted">Order summary</h2>

        <div className="space-y-4 text-[15px]">
          <div className="flex justify-between text-muted2">
            <span>Subtotal</span>
            <span className="text-white">{formatPrice(sub)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-muted2">
              <span>Discount</span>
              <span className="text-white">− {formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-muted2">
            <span>Delivery</span>
            <span className="text-white">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
          <span className="text-[22px] font-bold">Total</span>
          <span className="text-[24px] font-bold">{formatPrice(total)}</span>
        </div>
        <p className="mt-2 text-[13px] text-muted2">
          or 3 × {formatPrice(koko)} with <span className="font-semibold text-white">Koko</span>
        </p>

        {/* Discount code */}
        <div className="mt-7 flex gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Discount code"
            className="min-w-0 flex-1 border border-line2 bg-transparent px-4 py-3 text-[13px] uppercase tracking-[.1em] text-white outline-none placeholder:text-muted focus:border-white"
          />
          <button
            onClick={applyCode}
            disabled={applying}
            className="flex-none border border-line2 px-6 text-[11.5px] font-semibold uppercase tracking-[.16em] hover:border-white disabled:opacity-50"
          >
            {applying ? "…" : "Apply"}
          </button>
        </div>
        {message && <p className="mt-2 text-[12px] text-muted2">{message}</p>}

        <Link href="/checkout" className="mt-7 block bg-white py-4 text-center text-[12px] font-semibold uppercase tracking-[.2em] text-black transition-colors hover:bg-[#ccc]">
          Checkout
        </Link>

        <p className="mt-5 text-center text-[12.5px] text-muted">Koko · Visa · Mastercard · Cash on delivery</p>
      </div>
    </div>
  );
}

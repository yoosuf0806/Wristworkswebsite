"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const FREE_SHIPPING_THRESHOLD = 25000;
const SHIPPING_FLAT = 500;

// Full cart UI: line items, quantity controls, discount code, order summary.
export function CartView() {
  const { items, setQty, remove, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD || sub === 0 ? 0 : SHIPPING_FLAT;
  const total = Math.max(0, sub - discount) + shipping;

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
        <div className="mt-6">
          <Button href="/shop" variant="outline">Browse watches</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr]">
      {/* Line items */}
      <div className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-5 py-6">
            <Link href={`/products/${item.slug}`} className="relative h-24 w-24 flex-none overflow-hidden bg-[#e9e8e5]">
              {item.image && <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="96px" />}
            </Link>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="text-[10.5px] uppercase tracking-[.2em] text-muted">{item.brand}</div>
                <Link href={`/products/${item.slug}`} className="text-[15px] font-medium hover:text-white">
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-line2">
                  <button onClick={() => setQty(item.productId, item.qty - 1)} className="px-3 py-1 text-muted hover:text-white">−</button>
                  <span className="w-8 text-center text-sm">{item.qty}</span>
                  <button onClick={() => setQty(item.productId, item.qty + 1)} className="px-3 py-1 text-muted hover:text-white">+</button>
                </div>
                <button onClick={() => remove(item.productId)} className="text-[11px] uppercase tracking-[.14em] text-muted hover:text-white">
                  Remove
                </button>
              </div>
            </div>
            <div className="text-[15px] font-bold">{formatPrice(item.price * item.qty)}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="h-fit border border-line bg-card p-7">
        <h2 className="mb-5 font-serif text-[22px]">Order summary</h2>

        <div className="mb-5">
          <div className="mb-2 text-[11px] uppercase tracking-[.2em] text-muted">Discount code</div>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="WELCOME10"
              className="flex-1 border border-line2 bg-black px-3 py-2 text-sm uppercase text-white outline-none"
            />
            <button onClick={applyCode} disabled={applying} className="border border-line2 px-4 text-[11px] uppercase tracking-[.14em] hover:border-white disabled:opacity-50">
              {applying ? "…" : "Apply"}
            </button>
          </div>
          {message && <p className="mt-2 text-[12px] text-muted2">{message}</p>}
        </div>

        <div className="space-y-3 border-t border-line pt-5 text-[14px]">
          <Row label="Subtotal" value={formatPrice(sub)} />
          {discount > 0 && <Row label="Discount" value={`− ${formatPrice(discount)}`} />}
          <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
          <div className="flex justify-between border-t border-line pt-4 text-[17px] font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <div className="mt-6">
          <Button href="/checkout" variant="solid" className="w-full">Proceed to checkout</Button>
        </div>
        {sub < FREE_SHIPPING_THRESHOLD && (
          <p className="mt-3 text-center text-[12px] text-muted">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - sub)} more for free delivery.
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted2">
      <span>{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

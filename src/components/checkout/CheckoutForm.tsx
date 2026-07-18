"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const FREE_SHIPPING_THRESHOLD = 25000;
const SHIPPING_FLAT = 500;

// Checkout form: collects shipping + payment method and posts the order to the
// API, then routes to the confirmation page.
export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    paymentMethod: "cod" as "cod" | "card" | "koko" | "bank",
  });

  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD || sub === 0 ? 0 : SHIPPING_FLAT;
  const total = sub + shipping;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            address: form.address,
            city: form.city,
          },
          items: items.map((i) => ({ productId: i.productId, name: i.name, slug: i.slug, price: i.price, qty: i.qty })),
          paymentMethod: form.paymentMethod,
          shipping,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();
      clear();
      router.push(`/order-confirmation/${data.order.reference}`);
    } catch {
      setError("Something went wrong placing your order. Please try again or message us on WhatsApp.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-muted2">
        Your cart is empty. <a href="/shop" className="text-white underline">Browse watches</a>.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <h2 className="font-serif text-[22px]">Delivery details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} required />
          <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} required />
          <Field label="Email (optional)" value={form.email} onChange={(v) => set("email", v)} type="email" />
          <Field label="City" value={form.city} onChange={(v) => set("city", v)} required />
        </div>
        <Field label="Delivery address" value={form.address} onChange={(v) => set("address", v)} required />

        <h2 className="pt-4 font-serif text-[22px]">Payment</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["cod", "Cash on delivery"],
            ["koko", "Koko — pay in 3"],
            ["card", "Card"],
            ["bank", "Bank transfer"],
          ].map(([val, label]) => (
            <label
              key={val}
              className={`cursor-pointer border px-4 py-3 text-[13px] ${form.paymentMethod === val ? "border-white text-white" : "border-line2 text-muted2"}`}
            >
              <input
                type="radio"
                name="payment"
                value={val}
                checked={form.paymentMethod === val}
                onChange={() => set("paymentMethod", val)}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
        {error && <p className="text-[13px] text-[#e88]">{error}</p>}
      </div>

      {/* Summary */}
      <div className="h-fit border border-line bg-card p-7">
        <h2 className="mb-5 font-serif text-[22px]">Your order</h2>
        <div className="space-y-3 text-[13.5px]">
          {items.map((i) => (
            <div key={i.productId} className="flex justify-between text-muted2">
              <span>{i.name} × {i.qty}</span>
              <span className="text-white">{formatPrice(i.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 border-t border-line pt-5 text-[14px]">
          <div className="flex justify-between text-muted2"><span>Subtotal</span><span className="text-white">{formatPrice(sub)}</span></div>
          <div className="flex justify-between text-muted2"><span>Shipping</span><span className="text-white">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
          <div className="flex justify-between border-t border-line pt-4 text-[17px] font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
        <div className="mt-6">
          <Button type="submit" variant="solid" className="w-full" disabled={submitting}>
            {submitting ? "Placing order…" : "Place order"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[.16em] text-muted">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line2 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white"
      />
    </label>
  );
}

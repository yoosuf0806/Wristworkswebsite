"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart/cartStore";
import { formatPrice, cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 25000;
const SHIPPING_FLAT = 400; // CityPak island-wide express

const PROVINCES = [
  "Western Province",
  "Central Province",
  "Southern Province",
  "North Western Province",
  "North Central Province",
  "Sabaragamuwa Province",
  "Uva Province",
  "Eastern Province",
  "Northern Province",
];

type Payment = "koko" | "card" | "cod";

// Full checkout: numbered Contact / Delivery / Payment sections on the left,
// a Your Order summary on the right. Places the order via /api/orders.
export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, discountCode, discountAmount, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<Payment>("koko");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    province: PROVINCES[0],
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const sub = subtotal();
  const discount = discountAmount;
  const shipping = sub >= FREE_SHIPPING_THRESHOLD || sub === 0 ? 0 : SHIPPING_FLAT;
  const total = Math.max(0, sub - discount) + shipping;
  const koko = Math.round(total / 3);

  const payLabel = payment === "koko" ? "Pay with Koko" : payment === "card" ? "Pay by card" : "Place order";

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
            address: [form.address1, form.address2].filter(Boolean).join(", "),
            city: `${form.city}, ${form.province}`,
          },
          items: items.map((i) => ({ productId: i.productId, name: i.name, slug: i.slug, price: i.price, qty: i.qty })),
          paymentMethod: payment,
          shipping,
          discountCode: discountCode || null,
          discountAmount: discount,
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
    <form onSubmit={submit} className="grid grid-cols-1 gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
      {/* Left: form sections */}
      <div className="space-y-14">
        {/* 1 · Contact */}
        <section>
          <SectionTitle n="1" label="Contact" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field placeholder="Full name" value={form.name} onChange={(v) => set("name", v)} required />
            <Field placeholder="Phone / WhatsApp" value={form.phone} onChange={(v) => set("phone", v)} required />
          </div>
          <div className="mt-5">
            <Field placeholder="Email (for order updates)" type="email" value={form.email} onChange={(v) => set("email", v)} />
          </div>
        </section>

        {/* 2 · Delivery */}
        <section>
          <SectionTitle n="2" label="Delivery" />
          <div className="space-y-5">
            <Field placeholder="Address line 1" value={form.address1} onChange={(v) => set("address1", v)} required />
            <Field placeholder="Address line 2 (optional)" value={form.address2} onChange={(v) => set("address2", v)} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field placeholder="City" value={form.city} onChange={(v) => set("city", v)} required />
              <select
                value={form.province}
                onChange={(e) => set("province", e.target.value)}
                className="border border-line2 bg-black px-5 py-4 text-[15px] text-white outline-none focus:border-white"
              >
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* CityPak delivery method */}
            <div className="flex items-center justify-between border border-white/80 px-5 py-4">
              <div>
                <div className="text-[15px] font-medium">CityPak — Island-wide express</div>
                <div className="mt-1 text-[13px] text-muted2">Delivered in 1–3 working days · insured courier</div>
              </div>
              <div className="text-[14px] font-semibold uppercase tracking-[.1em]">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </div>
            </div>
          </div>
        </section>

        {/* 3 · Payment */}
        <section>
          <SectionTitle n="3" label="Payment" />
          <div className="space-y-4">
            <PaymentOption
              selected={payment === "koko"}
              onSelect={() => setPayment("koko")}
              label="Koko — Pay in 3"
              note="0% interest instalments"
            >
              <p className="mt-3 text-[13.5px] leading-[1.7] text-muted2">
                {formatPrice(koko)} today, then two monthly payments of {formatPrice(koko)}. You&apos;ll be
                redirected to Koko to confirm. No interest, no fees.
              </p>
            </PaymentOption>
            <PaymentOption
              selected={payment === "card"}
              onSelect={() => setPayment("card")}
              label="Credit / Debit card"
              note="Visa · Mastercard"
            />
            <PaymentOption
              selected={payment === "cod"}
              onSelect={() => setPayment("cod")}
              label="Cash on delivery"
              note="Colombo & suburbs"
            />
          </div>
        </section>

        {error && <p className="text-[13px] text-[#e88]">{error}</p>}
      </div>

      {/* Right: order summary */}
      <div className="h-fit border border-line bg-card p-8">
        <h2 className="mb-7 text-[13px] uppercase tracking-[.2em] text-muted">Your order</h2>

        <div className="space-y-3 text-[14px]">
          {items.map((i) => (
            <div key={i.productId} className="flex justify-between gap-4">
              <span className="text-muted2">{i.brand} {i.name} × {i.qty}</span>
              <span className="flex-none font-bold">{formatPrice(i.price * i.qty)}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-line pt-6 text-[14px]">
          <div className="flex justify-between text-muted2"><span>Subtotal</span><span className="text-white">{formatPrice(sub)}</span></div>
          {discount > 0 && (
            <div className="flex justify-between text-whatsapp">
              <span>{discountCode}</span>
              <span>− {formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-muted2"><span>Delivery</span><span className="text-white">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
          <span className="text-[20px] font-bold">Total</span>
          <span className="text-[22px] font-bold">{formatPrice(total)}</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-7 w-full bg-white py-4 text-[12px] font-semibold uppercase tracking-[.2em] text-black transition-colors hover:bg-[#ccc] disabled:opacity-50"
        >
          {submitting ? "Placing order…" : payLabel}
        </button>

        <p className="mt-5 text-center text-[12.5px] leading-[1.7] text-muted">
          Secured checkout. By placing this order you agree to our terms &amp; 7-day exchange policy.
        </p>
      </div>
    </form>
  );
}

function SectionTitle({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-[14px] font-semibold">{n}</span>
      <span className="text-[13px] uppercase tracking-[.24em] text-muted">· {label}</span>
    </div>
  );
}

function Field({
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-line2 bg-transparent px-5 py-4 text-[15px] text-white outline-none placeholder:text-[#666] focus:border-white"
    />
  );
}

function PaymentOption({
  selected,
  onSelect,
  label,
  note,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  note: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "block w-full border p-5 text-left transition-colors",
        selected ? "border-white bg-[#111]" : "border-line2 hover:border-[#555]"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={cn("flex h-4 w-4 items-center justify-center rounded-full border", selected ? "border-white" : "border-line2")}>
            {selected && <span className="h-2 w-2 rounded-full bg-white" />}
          </span>
          <span className="text-[15px] font-medium">{label}</span>
        </div>
        <span className="text-[12.5px] text-muted">{note}</span>
      </div>
      {selected && children}
    </button>
  );
}

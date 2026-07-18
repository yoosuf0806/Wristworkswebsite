"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/types";
import { SeoFields } from "@/components/admin/SeoFields";
import { Field, TextArea } from "@/components/admin/FormControls";

// Create / edit form for a product, including SEO fields and per-image alt text.
export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const editing = !!product;
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: product?.name || "",
    brand: product?.brand || "Casio",
    slug: product?.slug || "",
    reference: product?.reference || "",
    price: product?.price ?? 0,
    offerPrice: product?.offerPrice ?? 0,
    stock: product?.stock ?? 0,
    categories: product?.categories.join(", ") || "",
    description: product?.description || "",
    featured: product?.featured ?? false,
    newArrival: product?.newArrival ?? false,
    imageUrl: product?.images[0]?.url || "",
    imageAlt: product?.images[0]?.alt || "",
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    focusKeyword: product?.focusKeyword || "",
    ogImage: product?.ogImage || "",
  });

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNote(null);
    const payload = {
      ...form,
      price: Number(form.price),
      offerPrice: form.offerPrice ? Number(form.offerPrice) : null,
      stock: Number(form.stock),
      categories: form.categories.split(",").map((c) => c.trim()).filter(Boolean),
    };
    const res = await fetch(editing ? `/api/products/${product!.id}` : "/api/products", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok || res.status === 202) {
      setNote(data.note || "Saved.");
      if (!editing) router.push("/admin/products");
      else router.refresh();
    } else {
      setNote(data.error || "Save failed.");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-8">
      <section className="space-y-4">
        <h2 className="text-[13px] uppercase tracking-[.16em] text-muted">Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Name" value={form.name} onChange={(v) => set("name", v)} required />
          <label className="block">
            <span className="mb-2 block text-[11px] uppercase tracking-[.16em] text-muted">Brand</span>
            <select value={form.brand} onChange={(e) => set("brand", e.target.value)} className="w-full border border-line2 bg-black px-3 py-3 text-sm outline-none focus:border-white">
              {["Casio", "Edifice", "Seiko", "Citizen"].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          <Field label="Slug (URL)" value={form.slug} onChange={(v) => set("slug", v)} placeholder="auto from name if blank" />
          <Field label="Reference" value={form.reference} onChange={(v) => set("reference", v)} />
          <Field label="Price (LKR)" type="number" value={String(form.price)} onChange={(v) => set("price", v)} required />
          <Field label="Offer price (LKR)" type="number" value={String(form.offerPrice)} onChange={(v) => set("offerPrice", v)} />
          <Field label="Stock" type="number" value={String(form.stock)} onChange={(v) => set("stock", v)} />
          <Field label="Categories (comma-separated)" value={form.categories} onChange={(v) => set("categories", v)} placeholder="mens-watches, dive-watches" />
        </div>
        <TextArea label="Description" value={form.description} onChange={(v) => set("description", v)} />
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured
          </label>
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" checked={form.newArrival} onChange={(e) => set("newArrival", e.target.checked)} /> New arrival
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[13px] uppercase tracking-[.16em] text-muted">Primary image</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Image URL" value={form.imageUrl} onChange={(v) => set("imageUrl", v)} />
          <Field label="Image alt text (SEO)" value={form.imageAlt} onChange={(v) => set("imageAlt", v)} placeholder="Casio G-Shock GA-2100 on dark surface" />
        </div>
      </section>

      <SeoFields
        values={{
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          focusKeyword: form.focusKeyword,
          ogImage: form.ogImage,
        }}
        onChange={set}
      />

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="bg-white px-6 py-3 text-[11.5px] font-semibold uppercase tracking-[.16em] text-black hover:bg-[#ccc] disabled:opacity-50">
          {saving ? "Saving…" : editing ? "Save changes" : "Create product"}
        </button>
        {note && <span className="text-[13px] text-muted2">{note}</span>}
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/admin/FormControls";

// Inline form to create a discount code.
export function DiscountCreator() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", type: "percentage", value: "", minSubtotal: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNote(null);
    const res = await fetch("/api/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: form.code,
        type: form.type,
        value: Number(form.value),
        minSubtotal: form.minSubtotal ? Number(form.minSubtotal) : null,
      }),
    });
    const data = await res.json();
    setSaving(false);
    setNote(data.note || (res.ok ? "Created." : data.error));
    if (res.ok) {
      setForm({ code: "", type: "percentage", value: "", minSubtotal: "" });
      router.refresh();
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="bg-white px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[.16em] text-black hover:bg-[#ccc]">
        + New code
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="border border-line bg-card p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Field label="Code" value={form.code} onChange={(v) => set("code", v.toUpperCase())} required />
        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[.16em] text-muted">Type</span>
          <select value={form.type} onChange={(e) => set("type", e.target.value)} className="w-full border border-line2 bg-black px-3 py-3 text-sm outline-none focus:border-white">
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed (LKR)</option>
          </select>
        </label>
        <Field label="Value" type="number" value={form.value} onChange={(v) => set("value", v)} required />
        <Field label="Min spend (LKR)" type="number" value={form.minSubtotal} onChange={(v) => set("minSubtotal", v)} />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button type="submit" disabled={saving} className="bg-white px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[.16em] text-black hover:bg-[#ccc] disabled:opacity-50">
          {saving ? "Saving…" : "Create"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-[12px] uppercase tracking-[.12em] text-muted2 hover:text-white">Cancel</button>
        {note && <span className="text-[13px] text-muted2">{note}</span>}
      </div>
    </form>
  );
}

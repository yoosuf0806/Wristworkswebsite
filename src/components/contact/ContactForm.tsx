"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/seo/siteConfig";

// Contact form panel. Since the store runs on WhatsApp, "Send message"
// composes the enquiry and opens WhatsApp with it prefilled — no email
// backend needed, and it lands where the team actually replies fastest.
export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hi Wrist Works!\n` +
      (form.name ? `Name: ${form.name}\n` : "") +
      (form.phone ? `Phone: ${form.phone}\n` : "") +
      (form.subject ? `Subject: ${form.subject}\n` : "") +
      (form.message ? `\n${form.message}` : "");
    window.open(whatsappLink(text.trim()), "_blank");
  };

  return (
    <form onSubmit={submit} className="border border-line bg-[#0d0d0d] p-8 md:p-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Name" value={form.name} onChange={(v) => set("name", v)} placeholder="Your name" required />
        <Field label="Phone / WhatsApp" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+94" />
      </div>
      <div className="mt-6">
        <Field label="Subject" value={form.subject} onChange={(v) => set("subject", v)} placeholder="e.g. Stock check — SRPD55" />
      </div>
      <label className="mt-6 block">
        <span className="mb-2 block text-[11px] uppercase tracking-[.18em] text-muted">Message</span>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={5}
          placeholder="How can we help?"
          className="w-full resize-y border border-line2 bg-black px-4 py-3 text-[15px] text-white outline-none placeholder:text-[#555] focus:border-white"
        />
      </label>
      <button
        type="submit"
        className="mt-8 w-full bg-white py-4 text-[12px] font-semibold uppercase tracking-[.2em] text-black transition-colors hover:bg-[#ccc]"
      >
        Send message
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[.18em] text-muted">{label}</span>
      <input
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line2 bg-black px-4 py-3 text-[15px] text-white outline-none placeholder:text-[#555] focus:border-white"
      />
    </label>
  );
}

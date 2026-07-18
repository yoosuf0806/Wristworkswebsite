import { Field, TextArea } from "@/components/admin/FormControls";

// Reusable SEO field group: meta title, meta description, focus keyword and OG
// image. Used by the product form and the page-SEO editor. Includes a simple
// character-count hint like RankMath.
export function SeoFields({
  values,
  onChange,
}: {
  values: { metaTitle: string; metaDescription: string; focusKeyword: string; ogImage: string };
  onChange: (key: string, value: string) => void;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-[13px] uppercase tracking-[.16em] text-muted">Search / SEO</h2>
      <div>
        <Field label="Meta title" value={values.metaTitle} onChange={(v) => onChange("metaTitle", v)} placeholder="50–60 characters" />
        <Hint text={values.metaTitle} ideal={[50, 60]} />
      </div>
      <div>
        <TextArea label="Meta description" value={values.metaDescription} onChange={(v) => onChange("metaDescription", v)} />
        <Hint text={values.metaDescription} ideal={[120, 160]} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Focus keyword" value={values.focusKeyword} onChange={(v) => onChange("focusKeyword", v)} placeholder="e.g. casio watches sri lanka" />
        <Field label="OG image URL" value={values.ogImage} onChange={(v) => onChange("ogImage", v)} placeholder="1200×630 social share image" />
      </div>
    </section>
  );
}

function Hint({ text, ideal }: { text: string; ideal: [number, number] }) {
  const len = text.length;
  const ok = len >= ideal[0] && len <= ideal[1];
  return (
    <div className={`mt-1 text-[11px] ${ok ? "text-whatsapp" : "text-muted"}`}>
      {len} characters {ok ? "· good" : `· aim for ${ideal[0]}–${ideal[1]}`}
    </div>
  );
}

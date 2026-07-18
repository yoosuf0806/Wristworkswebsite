// Shared admin form inputs.
export function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[.16em] text-muted">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line2 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white"
      />
    </label>
  );
}

export function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[.16em] text-muted">{label}</span>
      <textarea
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y border border-line2 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white"
      />
    </label>
  );
}

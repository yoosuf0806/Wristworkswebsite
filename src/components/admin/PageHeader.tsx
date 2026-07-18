// Consistent admin page heading.
export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-serif text-[28px] font-normal">{title}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-muted2">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

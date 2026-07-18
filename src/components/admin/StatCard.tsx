// Metric card for the admin dashboards.
export function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-line bg-card p-6">
      <div className="text-[11px] uppercase tracking-[.16em] text-muted">{label}</div>
      <div className="mt-3 text-[28px] font-semibold">{value}</div>
      {sub && <div className="mt-1 text-[12px] text-muted2">{sub}</div>}
    </div>
  );
}

// Lightweight admin table primitives with the store's dark styling.
export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full min-w-[640px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-line bg-[#0d0d0d]">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-[11px] uppercase tracking-[.14em] text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-line last:border-0 hover:bg-[#0a0a0a]">{children}</tr>;
}

export function Cell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className || ""}`}>{children}</td>;
}

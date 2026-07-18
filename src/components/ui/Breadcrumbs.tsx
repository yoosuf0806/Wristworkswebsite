import Link from "next/link";

// Visible breadcrumb navigation (pairs with BreadcrumbList JSON-LD).
export function Breadcrumbs({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[.16em] text-muted">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={c.path} className="flex items-center gap-2">
            {last ? (
              <span className="text-white">{c.name}</span>
            ) : (
              <Link href={c.path} className="hover:text-white">
                {c.name}
              </Link>
            )}
            {!last && <span className="text-[#444]">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

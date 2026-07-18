"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Admin sidebar navigation.
const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/stock", label: "Stock" },
  { href: "/admin/discounts", label: "Discount codes" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/sales", label: "Sales" },
  { href: "/admin/seo-dashboard", label: "SEO analysis" },
  { href: "/admin/pages-seo", label: "Page SEO" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full shrink-0 border-b border-line md:w-60 md:border-b-0 md:border-r">
      <div className="px-6 py-6">
        <Link href="/admin" className="flex items-baseline gap-2">
          <span className="font-serif text-[19px] font-medium">WRIST.</span>
          <span className="font-serif text-[11px] tracking-[.32em]">ADMIN</span>
        </Link>
      </div>
      <nav className="flex flex-row overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:pb-6">
        {links.map((l) => {
          const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "whitespace-nowrap rounded px-3 py-2 text-[13px] transition-colors",
                active ? "bg-[#141414] text-white" : "text-muted2 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

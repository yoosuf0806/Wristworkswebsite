"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/constants/navigation";
import { useCart } from "@/lib/cart/cartStore";
import { cn } from "@/lib/utils";

// Sticky top navigation with brand mark, links, search and cart count.
export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const count = useCart((s) => s.items.reduce((t, i) => t + i.qty, 0));

  // The nav stays mounted across route changes (it lives in the layout), so
  // close the search overlay and clear the query whenever the path changes.
  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  const suggestions = ["G-Shock", "Seiko 5", "Eco-Drive", "Diver"];

  return (
    <div className="relative border-b border-line bg-black/[.88] backdrop-blur-md">
      <div className="flex items-center justify-between gap-8 px-6 py-[18px] md:px-12">
        <Link href="/" className="flex items-baseline gap-[9px] whitespace-nowrap text-white">
          <span className="font-serif text-2xl font-medium tracking-[.02em]">WRIST.</span>
          <span className="font-serif text-[13px] tracking-[.32em]">WORKS</span>
        </Link>

        <div className="hidden gap-9 md:flex">
          {navLinks.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.key}
                href={l.href}
                className={cn(
                  "border-b pb-[3px] text-[11.5px] uppercase tracking-[.16em] transition-colors hover:text-white",
                  active ? "border-white text-white" : "border-transparent text-muted2"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-[22px]">
          <button onClick={() => setSearchOpen((v) => !v)} className="flex p-1" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </button>
          <Link href="/account" className="flex p-1" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </Link>
          <Link href="/cart" className="relative flex" aria-label="Cart">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6">
              <path d="M6 7h12l-1 13H7L6 7z" />
              <path d="M9 7a3 3 0 016 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-[9px] -top-[7px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute left-0 right-0 top-full z-[60] border-b border-line2 bg-[#0a0a0a] shadow-[0_24px_60px_rgba(0,0,0,.7)]">
          <form onSubmit={submitSearch} className="mx-auto max-w-[760px] px-6 pb-8 pt-7 md:px-12">
            <div className="flex items-center gap-[14px] border-b border-line2 pb-[14px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search watches, brands, references…"
                className="flex-1 border-none bg-transparent py-[6px] text-[17px] text-white outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="px-1 text-xl text-muted hover:text-white">
                ×
              </button>
            </div>
            <div className="mt-[18px] flex flex-wrap gap-[10px]">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="border border-line2 px-[14px] py-2 text-[11.5px] uppercase tracking-[.1em] text-[#bbb] transition-colors hover:border-[#666] hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

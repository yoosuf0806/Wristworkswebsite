"use client";

import { useMemo, useState } from "react";
import type { Product, Brand } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

// Faceted shop grid matching the design: collapsible filter groups with live
// counts, an ON SALE toggle, a price range, a sort dropdown and a
// hide/show-filters toggle. All filtering is client-side over the products
// passed from the server.

type Sort = "featured" | "new" | "price-asc" | "price-desc";

// Filter groups, in the design's order. `derive` reads the facet value(s) off
// a product; availability is derived from stock.
const GROUPS: {
  key: string;
  label: string;
  vals: string[];
  derive: (p: Product) => string | string[] | undefined | null;
  defaultOpen?: boolean;
}[] = [
  { key: "brand", label: "Brand", vals: ["Casio", "Edifice", "Seiko", "Citizen"], derive: (p) => p.brand, defaultOpen: true },
  { key: "avail", label: "Availability", vals: ["In Stock", "Out of Stock"], derive: (p) => (p.stock > 0 ? "In Stock" : "Out of Stock"), defaultOpen: true },
  { key: "display", label: "Display type", vals: ["Digital", "Analog", "Ana-Digi"], derive: (p) => p.attributes?.display ?? undefined, defaultOpen: true },
  { key: "style", label: "Style", vals: ["Dress", "Sports", "Dive", "Retro", "Casual", "Outdoor"], derive: (p) => p.attributes?.style ?? undefined },
  { key: "caseColor", label: "Case color", vals: ["Black", "Silver", "Gold", "Two-Tone"], derive: (p) => p.attributes?.caseColor ?? undefined },
  { key: "dial", label: "Dial color", vals: ["Black", "White", "Blue", "Green", "Brown", "Grey"], derive: (p) => p.attributes?.dial ?? undefined },
  { key: "features", label: "Features", vals: ["World Time", "Chronograph", "Solar", "Automatic", "Calculator", "Multi-Dial"], derive: (p) => p.attributes?.features ?? [] },
  { key: "collection", label: "Collection", vals: ["A168 Series", "AE Series", "MDV Series", "MTP Series", "G-Shock", "5 Sports", "Presage", "Prospex", "Eco-Drive", "Tsuyosa"], derive: (p) => p.attributes?.collection ?? undefined },
];

const price = (p: Product) => p.offerPrice ?? p.price;

function matchesGroup(p: Product, group: (typeof GROUPS)[number], selected: string[]): boolean {
  if (!selected.length) return true;
  const v = group.derive(p);
  if (Array.isArray(v)) return v.some((x) => selected.includes(x));
  return v != null && selected.includes(v);
}

export function ShopGrid({
  products,
  initialQuery,
  initialSale,
  initialSort = "featured",
  lockedBrand,
  lockedCategory,
}: {
  products: Product[];
  initialQuery?: string;
  initialSale?: boolean;
  initialSort?: Sort;
  lockedBrand?: Brand;
  lockedCategory?: string;
}) {
  const [showFilters, setShowFilters] = useState(true);
  const [sel, setSel] = useState<Record<string, string[]>>({});
  const [saleOnly, setSaleOnly] = useState(!!initialSale);
  const [sort, setSort] = useState<Sort>(initialSort);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(GROUPS.map((g) => [g.key, !!g.defaultOpen]))
  );
  const [query] = useState(initialQuery ?? "");

  // Hide the brand group on brand pages, the display/style on category pages.
  const groups = GROUPS.filter((g) => !(lockedBrand && g.key === "brand"));

  const toggleVal = (key: string, val: string) =>
    setSel((s) => {
      const cur = s[key] || [];
      return { ...s, [key]: cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val] };
    });

  const clearAll = () => {
    setSel({});
    setSaleOnly(false);
    setMinPrice(0);
    setMaxPrice(200000);
  };

  // Count how many products would match a given facet value (respecting the
  // other active filters), like the design's live counts.
  const countFor = (group: (typeof GROUPS)[number], val: string) =>
    products.filter((p) => {
      const v = group.derive(p);
      const hit = Array.isArray(v) ? v.includes(val) : v === val;
      if (!hit) return false;
      return groups.every((g) => (g.key === group.key ? true : matchesGroup(p, g, sel[g.key] || [])));
    }).length;

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (query) {
        const q = query.toLowerCase();
        if (!`${p.brand} ${p.name} ${p.reference ?? ""}`.toLowerCase().includes(q)) return false;
      }
      if (lockedCategory && !p.categories.includes(lockedCategory as any)) return false;
      if (lockedBrand && p.brand !== lockedBrand) return false;
      if (saleOnly && !(p.offerPrice && p.offerPrice < p.price)) return false;
      if (price(p) < minPrice || price(p) > maxPrice) return false;
      return groups.every((g) => matchesGroup(p, g, sel[g.key] || []));
    });

    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => price(a) - price(b)); break;
      case "price-desc": list = [...list].sort((a, b) => price(b) - price(a)); break;
      case "new": list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival)); break;
      default: list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [products, query, sel, saleOnly, minPrice, maxPrice, sort, groups, lockedBrand, lockedCategory]);

  return (
    <div>
      {/* Toolbar: filters toggle · count · sort */}
      <div className="flex items-center justify-between gap-4 border-y border-line py-4">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 border border-line2 px-4 py-2.5 text-[11.5px] uppercase tracking-[.16em] text-white hover:border-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 6h18M6 12h12M10 18h4" />
          </svg>
          {showFilters ? "Hide filters" : "Filters"}
        </button>
        <span className="text-[12px] uppercase tracking-[.16em] text-muted">{filtered.length} watches</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="border border-line2 bg-black px-4 py-2.5 text-[11.5px] uppercase tracking-[.14em] text-white outline-none focus:border-white"
        >
          <option value="featured">Sort: Featured</option>
          <option value="new">Sort: Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className={cn("grid gap-10 pt-10", showFilters ? "md:grid-cols-[280px_1fr]" : "grid-cols-1")}>
        {/* Sidebar */}
        {showFilters && (
          <aside className="space-y-6">
            {/* ON SALE toggle */}
            <div className="flex items-center justify-between border-b border-line pb-5">
              <span className="text-[12px] uppercase tracking-[.18em] text-white">On sale</span>
              <button
                onClick={() => setSaleOnly((v) => !v)}
                aria-pressed={saleOnly}
                className={cn("relative h-6 w-11 rounded-full transition-colors", saleOnly ? "bg-white" : "bg-line2")}
              >
                <span className={cn("absolute top-1 h-4 w-4 rounded-full transition-all", saleOnly ? "left-6 bg-black" : "left-1 bg-[#666]")} />
              </button>
            </div>

            {groups.map((g) => {
              const isOpen = openSections[g.key];
              const activeCount = (sel[g.key] || []).length;
              return (
                <div key={g.key} className="border-b border-line pb-5">
                  <button
                    onClick={() => setOpenSections((s) => ({ ...s, [g.key]: !s[g.key] }))}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-[12px] uppercase tracking-[.18em] text-white">
                      {g.label}
                      {activeCount > 0 && <span className="ml-2 text-muted">({activeCount})</span>}
                    </span>
                    <span className="text-lg font-light text-muted">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="mt-4 space-y-3">
                      {g.vals.map((val) => {
                        const active = (sel[g.key] || []).includes(val);
                        const count = countFor(g, val);
                        return (
                          <button
                            key={val}
                            onClick={() => toggleVal(g.key, val)}
                            className="flex w-full items-center justify-between text-left text-[13px]"
                          >
                            <span className="flex items-center gap-3">
                              <span className={cn("flex h-4 w-4 items-center justify-center border", active ? "border-white bg-white" : "border-line2")}>
                                {active && (
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                                    <path d="M5 12l5 5L20 6" />
                                  </svg>
                                )}
                              </span>
                              <span className={active ? "text-white" : "text-muted2"}>{val}</span>
                            </span>
                            <span className="text-[11px] text-muted">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Price range */}
            <div className="border-b border-line pb-6">
              <div className="mb-4 text-[12px] uppercase tracking-[.18em] text-white">Price</div>
              <div className="flex items-center gap-3">
                <label className="flex flex-1 items-center border border-line2 px-3">
                  <span className="text-[11px] text-muted">Rs</span>
                  <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    className="w-full bg-transparent py-2 pl-2 text-sm text-white outline-none"
                  />
                </label>
                <span className="text-muted">—</span>
                <label className="flex flex-1 items-center border border-line2 px-3">
                  <span className="text-[11px] text-muted">Rs</span>
                  <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
                    className="w-full bg-transparent py-2 pl-2 text-sm text-white outline-none"
                  />
                </label>
              </div>
            </div>

            <button onClick={clearAll} className="text-[11px] uppercase tracking-[.16em] text-muted2 underline underline-offset-4 hover:text-white">
              Clear all filters
            </button>
          </aside>
        )}

        {/* Product grid */}
        <div>
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted">No watches match those filters.</p>
          ) : (
            <div className={cn("grid grid-cols-2 gap-6", showFilters ? "lg:grid-cols-4" : "lg:grid-cols-5")}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

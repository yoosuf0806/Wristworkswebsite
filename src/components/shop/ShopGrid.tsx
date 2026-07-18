"use client";

import { useMemo, useState } from "react";
import type { Product, Brand, WatchCategory } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

// Interactive shop grid: brand / category / sale filters + sort, all client-side
// over the products passed from the server. Initial query narrows the set.
const BRANDS: Brand[] = ["Casio", "Edifice", "Seiko", "Citizen"];
const CATS: { slug: WatchCategory; label: string }[] = [
  { slug: "mens-watches", label: "Men" },
  { slug: "womens-watches", label: "Women" },
  { slug: "dive-watches", label: "Dive" },
  { slug: "digital-watches", label: "Digital" },
  { slug: "analog-watches", label: "Analog" },
  { slug: "dress-watches", label: "Dress" },
];

type Sort = "featured" | "new" | "price-asc" | "price-desc";

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
  lockedCategory?: WatchCategory;
}) {
  const [selBrands, setSelBrands] = useState<Brand[]>([]);
  const [selCats, setSelCats] = useState<WatchCategory[]>([]);
  const [saleOnly, setSaleOnly] = useState(!!initialSale);
  const [sort, setSort] = useState<Sort>(initialSort);
  const [query] = useState(initialQuery ?? "");

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => `${p.brand} ${p.name} ${p.reference ?? ""}`.toLowerCase().includes(q));
    }
    if (selBrands.length) list = list.filter((p) => selBrands.includes(p.brand));
    if (selCats.length) list = list.filter((p) => p.categories.some((c) => selCats.includes(c)));
    if (saleOnly) list = list.filter((p) => p.offerPrice && p.offerPrice < p.price);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.offerPrice ?? a.price) - (b.offerPrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.offerPrice ?? b.price) - (a.offerPrice ?? a.price));
        break;
      case "new":
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [products, query, selBrands, selCats, saleOnly, sort]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr]">
      {/* Filters */}
      <aside className="space-y-8">
        {!lockedBrand && (
          <FilterGroup title="Brand">
            {BRANDS.map((b) => (
              <FilterChip key={b} label={b} active={selBrands.includes(b)} onClick={() => toggle(selBrands, b, setSelBrands)} />
            ))}
          </FilterGroup>
        )}
        {!lockedCategory && (
          <FilterGroup title="Type">
            {CATS.map((c) => (
              <FilterChip key={c.slug} label={c.label} active={selCats.includes(c.slug)} onClick={() => toggle(selCats, c.slug, setSelCats)} />
            ))}
          </FilterGroup>
        )}
        <FilterGroup title="Offers">
          <FilterChip label="On sale only" active={saleOnly} onClick={() => setSaleOnly((v) => !v)} />
        </FilterGroup>
      </aside>

      {/* Grid */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-[.16em] text-muted">{filtered.length} watches</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-line2 bg-black px-3 py-2 text-[12px] uppercase tracking-[.12em] text-white outline-none"
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted">No watches match those filters.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-[11px] uppercase tracking-[.2em] text-white">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border px-[14px] py-2 text-[11.5px] uppercase tracking-[.1em] transition-colors",
        active ? "border-white bg-white text-black" : "border-line2 text-muted2 hover:border-[#666] hover:text-white"
      )}
    >
      {label}
    </button>
  );
}

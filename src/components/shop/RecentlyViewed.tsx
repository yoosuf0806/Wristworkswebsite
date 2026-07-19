"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getViewed, type ViewedItem } from "@/lib/recentlyViewed";
import { formatPrice } from "@/lib/utils";

// "You recently viewed" row. Reads from localStorage, so it renders nothing on
// the server and only appears once the visitor has viewed a few products.
export function RecentlyViewed() {
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    setItems(getViewed());
  }, []);

  if (items.length < 2) return null;

  return (
    <section className="mx-auto max-w-[1240px] border-t border-line px-6 py-14 md:px-12">
      <div className="eyebrow mb-6">You recently viewed</div>
      <div className="no-scrollbar flex gap-6 overflow-x-auto">
        {items.map((item) => (
          <Link key={item.slug} href={`/products/${item.slug}`} className="flex flex-none items-center gap-4">
            <div className="relative h-16 w-16 flex-none overflow-hidden bg-[#e9e8e5]">
              {item.image && <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="64px" />}
            </div>
            <div className="pr-4">
              <div className="text-[14px] font-medium leading-tight text-white">{item.name}</div>
              <div className="mt-1 text-[13px] font-bold">{formatPrice(item.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

// Product image gallery: large active image + thumbnail strip. Alt text comes
// from each image's stored SEO alt field.
export function Gallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [{ url: "", alt: name, position: 0 }];
  const current = list[active];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-[#e9e8e5]">
        {current.url && (
          <Image
            src={current.url}
            alt={current.alt || name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-3">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square w-20 overflow-hidden border bg-[#e9e8e5]",
                i === active ? "border-white" : "border-line"
              )}
            >
              {img.url && <Image src={img.url} alt={img.alt || name} fill className="object-cover" sizes="80px" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

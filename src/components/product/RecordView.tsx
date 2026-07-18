"use client";

import { useEffect } from "react";
import { addViewed } from "@/lib/recentlyViewed";
import type { Product } from "@/types";

// Records the current product into the "recently viewed" list on mount.
// Renders nothing.
export function RecordView({ product }: { product: Product }) {
  useEffect(() => {
    addViewed({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.offerPrice ?? product.price,
      image: product.images[0]?.url ?? "",
      imageAlt: product.images[0]?.alt ?? product.name,
    });
  }, [product]);
  return null;
}

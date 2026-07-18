"use client";

// Tiny localStorage-backed "recently viewed" list. Kept intentionally minimal
// (a flat array of card data) so it can render without another DB round-trip.
export interface ViewedItem {
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  imageAlt: string;
}

const KEY = "wrist-works-viewed";
const MAX = 8;

export function getViewed(): ViewedItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addViewed(item: ViewedItem) {
  if (typeof window === "undefined") return;
  const list = getViewed().filter((v) => v.slug !== item.slug);
  list.unshift(item);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
}

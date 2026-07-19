"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

// Client cart store, persisted to localStorage so the cart survives refreshes.
// Also holds the mini-cart drawer's open state (not persisted meaningfully).
interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              drawerOpen: true,
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { drawerOpen: true, items: [...state.items, { ...item, qty }] };
        }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((t, i) => t + i.qty, 0),
      subtotal: () => get().items.reduce((t, i) => t + i.price * i.qty, 0),
    }),
    { name: "wrist-works-cart" }
  )
);

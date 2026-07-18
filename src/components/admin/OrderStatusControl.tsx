"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/types";

const STATUSES: OrderStatus[] = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

// Dropdown to update an order's status via the API.
export function OrderStatusControl({ orderId, current }: { orderId: string; current: OrderStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(current);
  const [saving, setSaving] = useState(false);

  const update = async (next: OrderStatus) => {
    setStatus(next);
    setSaving(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => update(e.target.value as OrderStatus)}
        className="border border-line2 bg-black px-3 py-2 text-[13px] uppercase tracking-[.1em] outline-none focus:border-white"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      {saving && <span className="text-[12px] text-muted">Saving…</span>}
    </div>
  );
}

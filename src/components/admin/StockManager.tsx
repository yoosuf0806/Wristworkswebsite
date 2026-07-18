"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { Table, Row, Cell } from "@/components/admin/Table";

// Inline stock editor. Adjust each product's stock and save via /api/stock.
export function StockManager({ products }: { products: Product[] }) {
  const [levels, setLevels] = useState<Record<string, number>>(
    Object.fromEntries(products.map((p) => [p.id, p.stock]))
  );
  const [saving, setSaving] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const save = async (id: string) => {
    setSaving(id);
    setNote(null);
    const res = await fetch("/api/stock", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stock: levels[id] }),
    });
    const data = await res.json();
    setSaving(null);
    setNote(data.note || "Saved.");
  };

  return (
    <div>
      {note && <p className="mb-4 text-[13px] text-muted2">{note}</p>}
      <Table head={["Product", "Brand", "Stock", ""]}>
        {products.map((p) => (
          <Row key={p.id}>
            <Cell className="font-medium">{p.name}</Cell>
            <Cell className="text-muted2">{p.brand}</Cell>
            <Cell>
              <input
                type="number"
                value={levels[p.id]}
                onChange={(e) => setLevels((l) => ({ ...l, [p.id]: Number(e.target.value) }))}
                className="w-20 border border-line2 bg-black px-2 py-1.5 text-sm outline-none focus:border-white"
              />
            </Cell>
            <Cell>
              <button
                onClick={() => save(p.id)}
                disabled={saving === p.id || levels[p.id] === p.stock}
                className="text-[12px] uppercase tracking-[.12em] text-muted2 hover:text-white disabled:opacity-40"
              >
                {saving === p.id ? "Saving…" : "Save"}
              </button>
            </Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
}

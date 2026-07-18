"use client";

import { useState } from "react";

// Simple admin password gate. Posts to /api/admin/login which sets the session
// cookie, then reloads so the server layout re-evaluates auth.
export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm border border-line bg-card p-8">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-[21px] font-medium">WRIST.</span>
          <span className="font-serif text-[12px] tracking-[.32em]">ADMIN</span>
        </div>
        <p className="mt-2 text-[13px] text-muted">Sign in to manage the store.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="mt-6 w-full border border-line2 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white"
        />
        {error && <p className="mt-2 text-[12px] text-[#e88]">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-white py-3 text-[11.5px] font-semibold uppercase tracking-[.18em] text-black hover:bg-[#ccc] disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

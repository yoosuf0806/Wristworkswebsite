"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/seo/siteConfig";

// Account sign-in / create-account form matching the design. Wired to Supabase
// Auth (email/password) when configured; otherwise it explains that accounts
// aren't enabled yet and points to WhatsApp for order tracking.
const hasAuth =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("https://") &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function AccountForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Lazily create the browser client only when auth is configured.
  const getClient = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    return createClient();
  };

  // Check for an existing session on mount.
  useEffect(() => {
    if (!hasAuth) return;
    let active = true;
    getClient().then(async (supabase) => {
      const { data } = await supabase.auth.getSession();
      if (active) setUserEmail(data.session?.user?.email ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  const signOut = async () => {
    const supabase = await getClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    setMessage(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!hasAuth) {
      setMessage("Accounts aren't enabled yet — track any order instantly on WhatsApp.");
      return;
    }
    setLoading(true);
    try {
      const supabase = await getClient();
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const { data } = await supabase.auth.getSession();
        setUserEmail(data.session?.user?.email ?? email);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Check your email to confirm your account, then sign in.");
        setMode("signin");
      }
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Signed-in view.
  if (userEmail) {
    return (
      <div className="mx-auto max-w-[520px] text-center">
        <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-normal">Your account</h1>
        <p className="mt-6 text-[15px] text-muted2">
          Signed in as <span className="text-white">{userEmail}</span>
        </p>
        <p className="mt-4 text-[14px] leading-[1.8] text-muted2">
          For order status and tracking, message us on WhatsApp — we reply fastest there.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a href={whatsappLink("Hi Wrist Works! I'd like an update on my order.")} className="bg-whatsapp px-8 py-4 text-[11.5px] font-bold uppercase tracking-[.16em] text-black hover:scale-[1.03]">
            Track on WhatsApp
          </a>
          <button onClick={signOut} className="text-[11px] uppercase tracking-[.16em] text-muted2 underline underline-offset-4 hover:text-white">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const isSignup = mode === "signup";

  return (
    <div className="mx-auto max-w-[560px] text-center">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-normal">
        {isSignup ? "Create account" : "Sign in"}
      </h1>
      <p className="mt-6 text-[16px] text-muted2">
        {isSignup
          ? "Save your details and keep your orders in one place."
          : "Welcome back — your orders and wishlist are waiting."}
      </p>

      <form onSubmit={submit} className="mt-12 space-y-5 text-left">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or phone"
          required
          className="w-full border border-line2 bg-transparent px-5 py-4 text-[16px] text-white outline-none placeholder:text-[#666] focus:border-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border border-line2 bg-transparent px-5 py-4 text-[16px] text-white outline-none placeholder:text-[#666] focus:border-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white py-4 text-[12px] font-semibold uppercase tracking-[.2em] text-black transition-colors hover:bg-[#ccc] disabled:opacity-50"
        >
          {loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      {message && <p className="mt-5 text-[13.5px] text-muted2">{message}</p>}

      <p className="mt-8 text-[14px] text-muted2">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("signin")} className="text-white underline underline-offset-4">
              Sign in
            </button>
          </>
        ) : (
          <>
            New to Wrist Works?{" "}
            <button onClick={() => setMode("signup")} className="text-white underline underline-offset-4">
              Create one
            </button>
          </>
        )}
      </p>

      {!hasAuth && (
        <p className="mt-6 text-[12.5px] text-muted">
          Prefer not to sign in? You can{" "}
          <Link href="/shop" className="text-white underline underline-offset-4">
            shop as a guest
          </Link>{" "}
          — checkout works without an account.
        </p>
      )}
    </div>
  );
}

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };

// Server-side Supabase client bound to the request cookies. Use in Server
// Components, Route Handlers and Server Actions for reads that honour RLS.
// Left untyped so the hand-authored mappers in lib/data/* own the row shapes.
export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — ignore; middleware refreshes cookies.
          }
        },
      },
    }
  );
}

// Elevated client using the service-role key. SERVER ONLY — bypasses RLS, so
// only use it in trusted API routes (admin writes, webhooks).
export function createAdminSupabase() {
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// True only when real Supabase credentials are present. The data layer falls
// back to bundled mock data otherwise, so the site runs before DB setup.
export function hasSupabase(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("https://") &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

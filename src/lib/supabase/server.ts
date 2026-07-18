import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };

// Server-side Supabase client bound to the request cookies. Use only for reads
// that need to honour a signed-in user's session (Supabase Auth). Calling
// cookies() throws when used outside a request scope (e.g. generateStaticParams
// during `next build`), so this must never be used by the public data layer.
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

// Stateless server client (anon key, no cookies). Use for public catalog reads
// in lib/data/* — safe to call anywhere, including build-time static
// generation, since it never touches the request/cookie context. Explicit
// `any` return type so responses stay loosely typed and callers own the row
// shape via their own mappers, rather than fighting supabase-js's generics.
export function createPublicSupabase(): any {
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

// Elevated client using the service-role key. SERVER ONLY — bypasses RLS, so
// only use it in trusted API routes (admin writes, webhooks).
export function createAdminSupabase(): any {
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

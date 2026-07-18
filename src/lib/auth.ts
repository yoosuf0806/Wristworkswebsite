import { cookies } from "next/headers";

// Minimal admin gate. A shared password sets an httpOnly cookie; swap for
// Supabase Auth + a role check when you're ready for real accounts.
const COOKIE = "ww_admin";

export function isAdminAuthed(): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return true; // no password configured → open in dev
  return cookies().get(COOKIE)?.value === hash(expected);
}

export function adminCookieName() {
  return COOKIE;
}

// Tiny non-cryptographic obfuscation so the raw password isn't the cookie value.
export function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h << 5) - h + input.charCodeAt(i);
  return `ww${h.toString(16)}`;
}

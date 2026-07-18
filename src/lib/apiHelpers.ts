import { NextResponse } from "next/server";
import { hasSupabase, createAdminSupabase } from "@/lib/supabase/server";
import { isAdminAuthed } from "@/lib/auth";

// Shared helpers for route handlers.

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function badRequest(message: string) {
  return json({ error: message }, 400);
}

export function unauthorized() {
  return json({ error: "Unauthorized" }, 401);
}

// Guard for admin-only write endpoints.
export function requireAdmin() {
  return isAdminAuthed();
}

// When Supabase is configured, return the admin (service-role) client; otherwise
// null, so routes can respond gracefully with mock behaviour in dev.
export function adminDbOrNull() {
  return hasSupabase() ? createAdminSupabase() : null;
}

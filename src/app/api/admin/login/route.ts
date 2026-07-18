import { NextResponse } from "next/server";
import { adminCookieName, hash } from "@/lib/auth";
import { json, badRequest } from "@/lib/apiHelpers";

// POST /api/admin/login — exchange the shared admin password for a session
// cookie. Replace with Supabase Auth for real multi-user accounts.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!body?.password) return badRequest("Password required.");
  if (expected && body.password !== expected) return json({ error: "Wrong password." }, 401);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), hash(expected || body.password), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Root middleware: refreshes the Supabase auth session on navigations. Admin
// route protection is enforced in src/app/admin/layout.tsx.
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Run on all paths except static assets and image optimization.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};

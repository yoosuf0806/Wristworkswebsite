import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Sidebar } from "@/components/admin/Sidebar";
import { isAdminAuthed } from "@/lib/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-playfair", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

// Admin is never indexed.
export const metadata: Metadata = {
  title: "Admin · Wrist Works",
  robots: { index: false, follow: false },
};

// Admin shell with sidebar. Sits outside the (storefront) group so it doesn't
// render the customer nav/footer. Access is gated by the shared admin password.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = isAdminAuthed();

  return (
    <div className={`${playfair.variable} ${dmSans.variable} min-h-screen bg-black font-sans text-white`}>
      {authed ? (
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden px-6 py-8 md:px-10">{children}</div>
        </div>
      ) : (
        <AdminLogin />
      )}
    </div>
  );
}

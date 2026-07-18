import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

// Storefront chrome: promo bar, sticky nav and footer. Wraps every customer-
// facing page. Admin routes live outside this group and don't render it.
export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#111] px-4 py-[10px] text-center text-[11px] uppercase tracking-[.18em] text-[#ccc]">
        Free island-wide delivery on orders above Rs. 25,000
      </div>
      <header className="sticky top-0 z-50">
        <SiteNav />
      </header>
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

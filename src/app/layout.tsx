import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo/siteConfig";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

// Font optimization with next/font — self-hosted, no layout shift, preloaded.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Default metadata — templated title + Search Console verification. Per-page
// generateMetadata overrides title/description/canonical/OG/Twitter. Nav and
// footer live in the (storefront) route group so /admin can opt out of them.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Authentic Casio, Seiko & Citizen Watches in Sri Lanka`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  verification: siteConfig.gscVerification ? { google: siteConfig.gscVerification } : undefined,
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}

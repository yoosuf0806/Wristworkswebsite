# Wrist Works

Premium watch store for Colombo, Sri Lanka — 100% authentic Casio, Seiko and
Citizen watches with island-wide delivery. Built with **Next.js 14 (App Router)**,
**Tailwind CSS** and **Supabase**.

## Features

- **Storefront** — Home, Shop, brand/category pages (`/shop/[category]`),
  product pages (`/products/[slug]`), Cart, Checkout, Order Confirmation,
  About, Contact, Brands, Guides, Account.
- **Admin dashboard** (`/admin`) — products, orders, stock, discount codes,
  customers, sales dashboard, SEO content analysis, page SEO.
- **Full SEO architecture** — dynamic `generateMetadata` per page/product,
  canonical URLs, Open Graph + Twitter cards, dynamic `robots.txt` and
  `sitemap.xml`, and JSON-LD (Product, BreadcrumbList, FAQPage, Organization,
  WebSite + SearchAction, LocalBusiness). GA4 + Search Console verification.
- **Supabase** — schema migrations, seed data, typed data-access layer with a
  bundled mock fallback so the site runs before the database is configured.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase + GA4 + WhatsApp values
npm run dev
```

The app runs out of the box using bundled sample data (`src/lib/data/mock.ts`).
Once `NEXT_PUBLIC_SUPABASE_URL` / keys are set, the data layer reads live data.

### Database

```bash
supabase start
supabase db reset           # applies supabase/migrations + supabase/seed.sql
npm run types               # regenerate src/types/database.types.ts
```

## Project layout

```
src/
  app/
    (storefront)/  # customer pages (share nav + footer)
    admin/         # admin dashboard (own layout, password-gated)
    api/           # route handlers (products, orders, discounts, webhooks, …)
    robots.ts sitemap.ts manifest.ts
  components/      # layout, shop, product, cart, checkout, admin, seo, ui
  lib/
    data/          # data-access layer (Supabase + mock fallback)
    seo/           # metadata + JSON-LD builders + siteConfig
    supabase/      # browser / server / middleware clients
    cart/          # zustand cart store
  types/           # domain + database types
supabase/          # config, migrations, seed
```

## Environment variables

See `.env.example`. Key ones: `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
`NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `ADMIN_PASSWORD`.

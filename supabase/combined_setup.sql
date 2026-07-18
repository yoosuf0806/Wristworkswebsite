-- Wrist Works — combined schema + seed.
-- Paste this whole file into the Supabase dashboard SQL editor and Run.


-- ============================================================
-- 0001_products.sql
-- ============================================================
-- products table + per-product SEO fields (meta_title, meta_description,
-- focus_keyword, og_image) and the SEO slug used for /products/[slug].
create extension if not exists "pgcrypto";

create table if not exists public.products (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  brand          text not null,
  categories     text[] not null default '{}',
  reference      text,
  description    text not null default '',
  specs          jsonb,
  price          integer not null,           -- LKR, whole rupees
  offer_price    integer,                    -- discounted price when on sale
  stock          integer not null default 0,
  featured       boolean not null default false,
  new_arrival    boolean not null default false,
  rating_average numeric(2,1) not null default 0,
  rating_count   integer not null default 0,
  attributes     jsonb,                      -- shop filter facets (display, style, case/dial colour, features, collection)
  -- SEO fields, editable from the admin dashboard
  meta_title       text,
  meta_description text,
  focus_keyword    text,
  og_image         text,
  created_at     timestamptz not null default now()
);

create index if not exists products_brand_idx on public.products (brand);
create index if not exists products_categories_idx on public.products using gin (categories);


-- ============================================================
-- 0002_product_images.sql
-- ============================================================
-- product_images: one row per image, each with its own SEO alt text so alt
-- attributes are stored in the DB and rendered on every <Image>.
create table if not exists public.product_images (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url        text not null,
  alt        text not null default '',   -- image SEO alt text
  position   integer not null default 0
);

create index if not exists product_images_product_idx on public.product_images (product_id);


-- ============================================================
-- 0003_categories.sql
-- ============================================================
-- categories: brand + category landing-page content. Each has its own H1
-- (title), SEO paragraph and meta fields, all editable from admin.
create table if not exists public.categories (
  slug             text primary key,
  kind             text not null default 'category',  -- 'category' | 'brand'
  title            text not null,                      -- rendered as the page H1
  intro            text,
  seo_paragraph    text not null default '',
  meta_title       text,
  meta_description text,
  focus_keyword    text,
  og_image         text
);


-- ============================================================
-- 0004_reviews.sql
-- ============================================================
-- reviews: product ratings/testimonials. Only approved rows are shown publicly
-- and counted toward the aggregate rating used in Product schema markup.
create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  author     text not null,
  city       text,
  rating     integer not null check (rating between 1 and 5),
  body       text not null default '',
  approved   boolean not null default false,
  source     text default 'site',   -- 'site' | 'google'
  created_at timestamptz not null default now()
);

create index if not exists reviews_product_idx on public.reviews (product_id);


-- ============================================================
-- 0005_faqs.sql
-- ============================================================
-- faqs: editable FAQ content rendered (with FAQPage schema) on the home page,
-- shop, category and product pages. scope + scope_ref control where each shows.
create table if not exists public.faqs (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  scope      text not null default 'global',  -- global | product | category | page
  scope_ref  text,                            -- product slug / category slug / page key
  position   integer not null default 0
);

create index if not exists faqs_scope_idx on public.faqs (scope, scope_ref);


-- ============================================================
-- 0006_discounts.sql
-- ============================================================
-- discount_codes: percentage or fixed-amount codes applied at cart/checkout.
create table if not exists public.discount_codes (
  id           uuid primary key default gen_random_uuid(),
  code         text unique not null,
  type         text not null default 'percentage',  -- 'percentage' | 'fixed'
  value        integer not null,                     -- percent (0-100) or LKR amount
  min_subtotal integer,
  active       boolean not null default true,
  expires_at   timestamptz,
  usage_limit  integer,
  used_count   integer not null default 0
);


-- ============================================================
-- 0007_customers.sql
-- ============================================================
-- customers: lightweight customer records, aggregated from orders.
create table if not exists public.customers (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text,
  phone        text not null,
  city         text,
  orders_count integer not null default 0,
  total_spent  integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists customers_phone_idx on public.customers (phone);


-- ============================================================
-- 0008_orders.sql
-- ============================================================
-- orders: customer + line items stored as JSONB snapshots so an order stays
-- accurate even if a product is later edited or removed.
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  reference       text unique not null,          -- human-friendly, e.g. WW-1042
  customer        jsonb not null,                -- { name, phone, email, address, city }
  items           jsonb not null,                -- [{ productId, name, slug, price, qty }]
  subtotal        integer not null default 0,
  discount_code   text,
  discount_amount integer not null default 0,
  shipping        integer not null default 0,
  total           integer not null,
  payment_method  text not null default 'cod',   -- cod | card | koko | bank
  status          text not null default 'pending',
  created_at      timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);


-- ============================================================
-- 0009_page_seo.sql
-- ============================================================
-- page_seo: per-static-page SEO overrides (home, shop, about, contact, …),
-- with an editable H1 and SEO paragraph, keyed by page_key.
create table if not exists public.page_seo (
  page_key         text primary key,
  h1               text,
  seo_paragraph    text,
  meta_title       text,
  meta_description text,
  focus_keyword    text,
  og_image         text
);


-- ============================================================
-- 0010_rls_policies.sql
-- ============================================================
-- Row Level Security. Public/anon can read catalog content; all writes and the
-- orders/customers tables are restricted to the service role (used by API routes).
alter table public.products        enable row level security;
alter table public.product_images  enable row level security;
alter table public.categories      enable row level security;
alter table public.reviews         enable row level security;
alter table public.faqs            enable row level security;
alter table public.discount_codes  enable row level security;
alter table public.page_seo        enable row level security;
alter table public.orders          enable row level security;
alter table public.customers       enable row level security;

-- Public read access to catalog/content tables.
create policy "public read products"        on public.products       for select using (true);
create policy "public read product_images"  on public.product_images for select using (true);
create policy "public read categories"      on public.categories     for select using (true);
create policy "public read approved reviews" on public.reviews       for select using (approved = true);
create policy "public read faqs"            on public.faqs           for select using (true);
create policy "public read page_seo"        on public.page_seo       for select using (true);

-- discount_codes, orders and customers have NO anon policies — only the
-- service-role key (server-side API routes) can read/write them, which bypasses RLS.


-- ============================================================
-- seed.sql
-- ============================================================
-- Sample data mirroring src/lib/data/mock.ts. Load with `supabase db reset`.
-- Extend with your real catalog; the app reads live data once these exist.

-- ─── Categories & brands ────────────────────────────────────────────────
insert into public.categories (slug, kind, title, intro, seo_paragraph, meta_title, meta_description, focus_keyword) values
('casio','brand','Casio Watches in Sri Lanka','Everyday icons — G-Shock, Edifice, Baby-G and the vintage classics.','Shop 100% authentic Casio watches in Sri Lanka, from the shock-resistant G-Shock line to the retro Vintage series and Edifice chronographs. Every piece is sourced from authorised distributors, inspected in Colombo, and delivered island-wide with a stamped manufacturer warranty.','Casio Watches Sri Lanka — Authentic G-Shock, Edifice & Vintage','Buy genuine Casio watches in Sri Lanka. G-Shock, Edifice, Baby-G and Vintage models with full warranty and island-wide delivery from Colombo.','casio watches sri lanka'),
('seiko','brand','Seiko Watches in Sri Lanka','Japanese craft — Seiko 5 Sports, Presage and Prospex.','Discover authentic Seiko watches in Sri Lanka — the automatic Seiko 5 Sports, elegant Presage dress watches and the 200m Prospex divers. Authorised stock, sealed boxes, stamped warranty cards and insured island-wide delivery from our Colombo boutique.','Seiko Watches Sri Lanka — Authentic 5 Sports, Presage & Prospex','Buy genuine Seiko watches in Sri Lanka. Seiko 5 Sports, Presage and Prospex automatics with full warranty and island-wide delivery from Colombo.','seiko watches sri lanka'),
('citizen','brand','Citizen Watches in Sri Lanka','Powered by light — Eco-Drive that never needs a battery.','Shop authentic Citizen watches in Sri Lanka, led by the light-powered Eco-Drive range and the automatic Tsuyosa. Citizen Eco-Drive models carry up to a 5-year warranty. Authorised stock, inspected in Colombo and delivered island-wide.','Citizen Watches Sri Lanka — Authentic Eco-Drive & Automatic','Buy genuine Citizen watches in Sri Lanka. Eco-Drive and automatic models with up to 5-year warranty and island-wide delivery from Colombo.','citizen watches sri lanka'),
('mens-watches','category','Men''s Watches','Automatics, divers and everyday steel for every wrist.','Browse men''s watches from Casio, Seiko and Citizen — automatic divers, dress pieces and rugged everyday steel. 100% authentic, with full manufacturer warranty and island-wide delivery across Sri Lanka.','Men''s Watches Sri Lanka — Casio, Seiko & Citizen for Men','Shop authentic men''s watches in Sri Lanka from Casio, Seiko and Citizen. Automatics, divers and dress watches with warranty and island-wide delivery.','mens watches sri lanka'),
('womens-watches','category','Women''s Watches','Refined, resilient and made to be worn every day.','Explore women''s watches from Casio Baby-G, Seiko and Citizen — refined designs built to last. Every watch is genuine, warranty-backed and delivered island-wide across Sri Lanka.','Women''s Watches Sri Lanka — Casio, Seiko & Citizen for Women','Shop authentic women''s watches in Sri Lanka from Casio Baby-G, Seiko and Citizen. Full warranty and island-wide delivery from Colombo.','womens watches sri lanka'),
('digital-watches','category','Digital Watches','LED backlights, world time and seven-year batteries.','Shop digital watches led by Casio''s legendary Vintage and G-Shock lines — LED backlights, world time, stopwatch and multi-year batteries. Genuine stock with warranty and island-wide delivery in Sri Lanka.','Digital Watches Sri Lanka — Authentic Casio Digital & G-Shock','Buy authentic digital watches in Sri Lanka. Casio Vintage and G-Shock digital models with warranty and island-wide delivery from Colombo.','digital watches sri lanka'),
('dive-watches','category','Dive Watches','100m to 200m rated — built for water.','Dive watches from Seiko Prospex, Citizen Promaster and Casio — 100m to 200m water resistance, unidirectional bezels and serious lume. Authentic, warranty-backed and delivered island-wide across Sri Lanka.','Dive Watches Sri Lanka — Seiko Prospex, Citizen Promaster','Shop authentic dive watches in Sri Lanka. Seiko Prospex and Citizen Promaster divers, 200m rated, with warranty and island-wide delivery.','dive watches sri lanka'),
('analog-watches','category','Analog Watches','Sweeping hands, sunburst dials, timeless faces.','Classic analog watches from Casio, Seiko and Citizen — sunburst dials, automatic movements and clean everyday faces. 100% genuine with full warranty and island-wide delivery in Sri Lanka.','Analog Watches Sri Lanka — Casio, Seiko & Citizen','Buy authentic analog watches in Sri Lanka from Casio, Seiko and Citizen. Automatic and quartz models with warranty and island-wide delivery.','analog watches sri lanka'),
('dress-watches','category','Dress Watches','Slim cases, leather straps, quiet elegance.','Dress watches led by the Seiko Presage and Citizen automatics — slim cases, sunburst dials and refined finishing. Authentic stock, warranty-backed and delivered island-wide across Sri Lanka.','Dress Watches Sri Lanka — Seiko Presage & Citizen','Shop authentic dress watches in Sri Lanka. Seiko Presage and Citizen automatics with warranty and island-wide delivery from Colombo.','dress watches sri lanka'),
('unisex-watches','category','Unisex Watches','Sized and styled for every wrist.','Versatile unisex watches from Casio, Seiko and Citizen — balanced case sizes and neutral styling that suits everyone. Genuine, warranty-backed and delivered island-wide in Sri Lanka.','Unisex Watches Sri Lanka — Casio, Seiko & Citizen','Buy authentic unisex watches in Sri Lanka from Casio, Seiko and Citizen. Full warranty and island-wide delivery from Colombo.','unisex watches sri lanka')
on conflict (slug) do nothing;

-- ─── Global FAQs ─────────────────────────────────────────────────────────
insert into public.faqs (question, answer, scope, position) values
('Are your watches 100% genuine?','Yes — every piece comes from an authorised distributor with a stamped manufacturer warranty card. We never sell parallel imports or open-box stock, and we''ll send you live photos of your exact watch on WhatsApp before dispatch.','global',0),
('How long does delivery take?','Colombo & suburbs: 1–2 working days. Island-wide: 2–4 working days via insured courier. Delivery is free on orders above Rs. 25,000.','global',1),
('Can I pay in instalments?','Yes — pay in 3 interest-free instalments with Koko at checkout. Cash on delivery is also available in Colombo & suburbs for orders under Rs. 150,000.','global',2),
('What warranty do I get?','The full manufacturer warranty: 1 year on Casio, Edifice and Seiko, up to 5 years on Citizen Eco-Drive. Warranty service is handled through the authorised local service centres.','global',3),
('Can I exchange or return a watch?','Unworn watches with intact tags and packaging can be exchanged within 7 days. If we shipped the wrong item or it arrives damaged, we replace it free — courier on us.','global',4)
on conflict do nothing;

-- ─── Discount codes ──────────────────────────────────────────────────────
insert into public.discount_codes (code, type, value, min_subtotal, active) values
('WELCOME10','percentage',10,25000,true),
('COLOMBO2000','fixed',2000,40000,true)
on conflict (code) do nothing;

-- ─── Page SEO defaults ───────────────────────────────────────────────────
insert into public.page_seo (page_key, h1, meta_title, meta_description, focus_keyword) values
('home',null,'Wrist Works — Authentic Casio, Seiko & Citizen Watches in Sri Lanka','Premium online watch boutique in Colombo. 100% authentic Casio, Seiko and Citizen watches with full warranty and free island-wide delivery.','authentic watches sri lanka'),
('shop','All Watches','Shop All Watches — Casio, Seiko & Citizen | Wrist Works Sri Lanka','Browse every authentic Casio, Seiko and Citizen watch in stock. Filter by brand, type and price. Full warranty and island-wide delivery from Colombo.','buy watches online sri lanka')
on conflict (page_key) do nothing;

-- Products: add your real catalog here. Example row:
-- insert into public.products (slug, name, brand, categories, price, offer_price, stock, featured, new_arrival, description)
-- values ('casio-g-shock-ga-2100-carbon-core','G-Shock GA-2100 Carbon Core','Casio','{mens-watches,analog-watches}',64500,51500,12,true,true,'…');


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

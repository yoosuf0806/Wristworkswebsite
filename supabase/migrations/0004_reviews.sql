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

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

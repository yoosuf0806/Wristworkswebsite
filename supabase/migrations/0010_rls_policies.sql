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

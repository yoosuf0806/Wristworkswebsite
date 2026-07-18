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

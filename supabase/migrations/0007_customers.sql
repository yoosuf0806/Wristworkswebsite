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

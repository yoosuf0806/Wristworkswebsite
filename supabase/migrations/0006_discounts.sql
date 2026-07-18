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

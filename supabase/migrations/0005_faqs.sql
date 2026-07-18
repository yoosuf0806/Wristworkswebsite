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

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

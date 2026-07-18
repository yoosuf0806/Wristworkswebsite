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

-- Wrist Works — shop upgrade: adds the attributes column and upserts the
-- full 17-product catalog (with filter facets + images). Run in the Supabase
-- SQL editor. Safe to re-run: products are upserted by slug.

alter table public.products add column if not exists attributes jsonb;

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('casio-g-shock-ga-2100-carbon-core', 'G-Shock GA-2100 Carbon Core', 'Casio', '{"mens-watches","digital-watches","analog-watches"}', 'GA-2100-1A1', 'The GA-2100 pairs Casio''s Carbon Core Guard case with a slim octagonal bezel — the ''CasiOak'' silhouette that put G-Shock on every wrist. Analog-digital display, 200m water resistance and shock resistance in a package under 12mm thick.', '{"Movement":"Analog-digital quartz","Case":"Carbon Core Guard, 45.4mm","Water resistance":"200m","Battery":"CR2016, ~3 years","Strap":"Resin band","Features":"World time, stopwatch, LED backlight"}'::jsonb, 64500, 51500, 12, true, true, 4.8, 42, '{"display":"Ana-Digi","style":"Sports","caseColor":"Black","dial":"Black","features":["World Time"],"collection":"G-Shock"}'::jsonb, 'Casio G-Shock GA-2100 Carbon Core — Buy Authentic in Sri Lanka', 'Genuine Casio G-Shock GA-2100 Carbon Core — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'g-shock-ga-2100-carbon-core sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80', 'Casio G-Shock GA-2100 Carbon Core watch', 0 from public.products p
where p.slug = 'casio-g-shock-ga-2100-carbon-core'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('casio-vintage-a168wa-digital', 'Vintage A168WA Digital', 'Casio', '{"mens-watches","digital-watches","unisex-watches"}', 'A168WA-1', 'The same stainless case your father wore, still under Rs. 20,000. Seven-year battery, LED backlight, and a bracelet that goes with everything from denim to a dinner jacket.', '{"Movement":"Digital quartz","Case":"Stainless steel, 38mm","Water resistance":"50m","Battery":"~7 years","Strap":"Stainless steel bracelet","Features":"LED backlight, stopwatch, alarm"}'::jsonb, 18500, 14800, 25, true, false, 4.9, 88, '{"display":"Digital","style":"Retro","caseColor":"Silver","dial":"Grey","features":[],"collection":"A168 Series"}'::jsonb, 'Casio Vintage A168WA Digital — Buy Authentic in Sri Lanka', 'Genuine Casio Vintage A168WA Digital — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'vintage-a168wa-digital sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80', 'Casio Vintage A168WA Digital watch', 0 from public.products p
where p.slug = 'casio-vintage-a168wa-digital'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('casio-ae-1200-world-time-casio-royale', 'AE-1200 World Time "Casio Royale"', 'Casio', '{"mens-watches","digital-watches","unisex-watches"}', 'AE-1200WHD-1A', 'The ''Casio Royale'' — a world-time digital with a stainless bracelet, five daily alarms and a look that punches far above its price. Endlessly wearable, impossible to date.', '{"Movement":"Digital quartz","Case":"Resin/steel, 45mm","Water resistance":"100m","Strap":"Stainless steel bracelet","Features":"World time, 5 alarms, countdown"}'::jsonb, 21500, 18200, 18, false, false, 4.8, 56, '{"display":"Digital","style":"Outdoor","caseColor":"Black","dial":"Grey","features":["World Time","Multi-Dial"],"collection":"AE Series"}'::jsonb, 'Casio AE-1200 World Time "Casio Royale" — Buy Authentic in Sri Lanka', 'Genuine Casio AE-1200 World Time "Casio Royale" — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'ae-1200-world-time-casio-royale sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=80', 'Casio AE-1200 World Time "Casio Royale" watch', 0 from public.products p
where p.slug = 'casio-ae-1200-world-time-casio-royale'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('casio-mdv-106-duro-diver', 'MDV-106 Duro Diver', 'Casio', '{"mens-watches","analog-watches","dive-watches"}', 'MDV-106-1A', 'The ''Duro'' — Casio''s 200m diver on a steel bracelet with a Submariner-style dial and a price that makes it the best value in dive watches. A genuine tool watch.', '{"Movement":"Analog quartz","Case":"Stainless steel, 44mm","Water resistance":"200m","Bezel":"Unidirectional dive bezel","Strap":"Stainless steel bracelet"}'::jsonb, 32500, null, 10, true, false, 4.8, 47, '{"display":"Analog","style":"Dive","caseColor":"Black","dial":"Black","features":[],"collection":"MDV Series"}'::jsonb, 'Casio MDV-106 Duro Diver — Buy Authentic in Sri Lanka', 'Genuine Casio MDV-106 Duro Diver — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'mdv-106-duro-diver sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80', 'Casio MDV-106 Duro Diver watch', 0 from public.products p
where p.slug = 'casio-mdv-106-duro-diver'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('casio-mtp-1375-classic-analog', 'MTP-1375 Classic Analog', 'Casio', '{"mens-watches","analog-watches","dress-watches"}', 'MTP-1375D-1AV', 'A clean, slim dress analog with a sunburst dial and date window — the easiest way to smarten up a shirt without spending a fortune.', '{"Movement":"Analog quartz","Case":"Stainless steel, 40mm","Water resistance":"50m","Dial":"White sunburst, date","Strap":"Stainless steel bracelet"}'::jsonb, 24500, 19900, 15, false, false, 4.6, 22, '{"display":"Analog","style":"Dress","caseColor":"Silver","dial":"White","features":[],"collection":"MTP Series"}'::jsonb, 'Casio MTP-1375 Classic Analog — Buy Authentic in Sri Lanka', 'Genuine Casio MTP-1375 Classic Analog — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'mtp-1375-classic-analog sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=80', 'Casio MTP-1375 Classic Analog watch', 0 from public.products p
where p.slug = 'casio-mtp-1375-classic-analog'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('casio-ca-53w-databank-calculator', 'CA-53W Databank Calculator', 'Casio', '{"mens-watches","digital-watches","unisex-watches"}', 'CA-53W-1', 'The original calculator watch. Retro resin case, working databank calculator and the geek-chic charm that never really left. As worn on screen and off.', '{"Movement":"Digital quartz","Case":"Resin, 34.4mm","Water resistance":"Splash resistant","Strap":"Resin band","Features":"Calculator, dual time, alarm"}'::jsonb, 16800, null, 20, false, false, 4.9, 61, '{"display":"Digital","style":"Retro","caseColor":"Black","dial":"Grey","features":["Calculator"],"collection":"Databank"}'::jsonb, 'Casio CA-53W Databank Calculator — Buy Authentic in Sri Lanka', 'Genuine Casio CA-53W Databank Calculator — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'ca-53w-databank-calculator sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1200&q=80', 'Casio CA-53W Databank Calculator watch', 0 from public.products p
where p.slug = 'casio-ca-53w-databank-calculator'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('casio-baby-g-bga-280-tonal', 'Baby-G BGA-280 Tonal', 'Casio', '{"womens-watches","digital-watches","analog-watches"}', 'BGA-280-4A', 'A slim ana-digi Baby-G in a soft tonal colourway — shock resistant, 100m water resistant, and sized for smaller wrists. World time, stopwatch and the toughness Baby-G is known for.', '{"Movement":"Analog-digital quartz","Case":"Resin, 41mm","Water resistance":"100m","Strap":"Resin band","Features":"World time, stopwatch, LED light"}'::jsonb, 48500, 38800, 0, false, false, 4.7, 21, '{"display":"Ana-Digi","style":"Casual","caseColor":"Black","dial":"White","features":["World Time"],"collection":"Baby-G"}'::jsonb, 'Casio Baby-G BGA-280 Tonal — Buy Authentic in Sri Lanka', 'Genuine Casio Baby-G BGA-280 Tonal — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'baby-g-bga-280-tonal sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80', 'Casio Baby-G BGA-280 Tonal watch', 0 from public.products p
where p.slug = 'casio-baby-g-bga-280-tonal'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('edifice-edifice-efv-100d-chronograph', 'Edifice EFV-100D Chronograph', 'Edifice', '{"mens-watches","analog-watches"}', 'EFV-100D-2AV', 'Edifice motorsport DNA in a slim steel chronograph — three sub-dials, a tachymeter bezel and a blue sunburst dial that catches the light.', '{"Movement":"Analog quartz chronograph","Case":"Stainless steel, 43mm","Water resistance":"100m","Dial":"Blue sunburst, tachymeter","Strap":"Stainless steel bracelet"}'::jsonb, 42500, null, 8, false, false, 4.7, 29, '{"display":"Analog","style":"Sports","caseColor":"Silver","dial":"Blue","features":["Chronograph"],"collection":"Edifice EFV"}'::jsonb, 'Edifice Edifice EFV-100D Chronograph — Buy Authentic in Sri Lanka', 'Genuine Edifice Edifice EFV-100D Chronograph — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'edifice-efv-100d-chronograph sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=1200&q=80', 'Edifice Edifice EFV-100D Chronograph watch', 0 from public.products p
where p.slug = 'edifice-edifice-efv-100d-chronograph'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('edifice-edifice-ecb-2000-bluetooth', 'Edifice ECB-2000 Bluetooth', 'Edifice', '{"mens-watches","digital-watches","analog-watches"}', 'ECB-2000D-1A', 'Edifice''s Bluetooth chronograph links to your phone for world time across 300+ cities, with Tough Solar power and a carbon-look dial.', '{"Movement":"Tough Solar, Bluetooth","Case":"Resin/steel, 46mm","Water resistance":"100m","Strap":"Stainless steel bracelet","Features":"World time (300+ cities), chronograph"}'::jsonb, 108000, 96500, 6, true, true, 4.8, 33, '{"display":"Ana-Digi","style":"Sports","caseColor":"Black","dial":"Black","features":["Chronograph","World Time","Multi-Dial"],"collection":"Edifice ECB"}'::jsonb, 'Edifice Edifice ECB-2000 Bluetooth — Buy Authentic in Sri Lanka', 'Genuine Edifice Edifice ECB-2000 Bluetooth — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'edifice-ecb-2000-bluetooth sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80', 'Edifice Edifice ECB-2000 Bluetooth watch', 0 from public.products p
where p.slug = 'edifice-edifice-ecb-2000-bluetooth'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('seiko-5-sports-srpd55-automatic', '5 Sports SRPD55 Automatic', 'Seiko', '{"mens-watches","analog-watches"}', 'SRPD55K1', 'The SRPD55 carries the 5 Sports line''s SKX heritage — a black sunburst dial, day-date at three, and LumiBrite hands that stay legible long after sunset. The 4R36 automatic hand-winds and hacks, and the 100m rating handles a swim without a second thought.', '{"Movement":"Seiko 4R36, 24 jewels, 41h reserve","Case":"Stainless steel, 42.5mm × 13.4mm","Crystal":"Hardlex","Dial":"Black sunburst, day-date","Water resistance":"100m","Strap":"Stainless steel bracelet","Lume":"LumiBrite hands & indices"}'::jsonb, 118000, 94500, 6, true, true, 4.9, 63, '{"display":"Analog","style":"Sports","caseColor":"Black","dial":"Black","features":["Automatic"],"collection":"5 Sports"}'::jsonb, 'Seiko 5 Sports SRPD55 Automatic — Buy Authentic in Sri Lanka', 'Genuine Seiko 5 Sports SRPD55 Automatic — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', '5-sports-srpd55-automatic sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80', 'Seiko 5 Sports SRPD55 Automatic watch', 0 from public.products p
where p.slug = 'seiko-5-sports-srpd55-automatic'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('seiko-presage-cocktail-time-srpb43', 'Presage Cocktail Time SRPB43', 'Seiko', '{"mens-watches","analog-watches","dress-watches"}', 'SRPB43J1', 'Seiko''s Presage Cocktail Time turns a bar in Ginza into a dial. Hand-finished sunburst blue, 4R35 movement, and a presence far beyond its price. Our pick for a first proper automatic.', '{"Movement":"Seiko 4R35 automatic, 41h reserve","Case":"Stainless steel, 40.5mm","Crystal":"Box-shaped Hardlex","Dial":"Blue sunburst","Water resistance":"50m","Strap":"Leather strap"}'::jsonb, 168000, null, 3, true, true, 5, 24, '{"display":"Analog","style":"Dress","caseColor":"Silver","dial":"Blue","features":["Automatic"],"collection":"Presage"}'::jsonb, 'Seiko Presage Cocktail Time SRPB43 — Buy Authentic in Sri Lanka', 'Genuine Seiko Presage Cocktail Time SRPB43 — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'presage-cocktail-time-srpb43 sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80', 'Seiko Presage Cocktail Time SRPB43 watch', 0 from public.products p
where p.slug = 'seiko-presage-cocktail-time-srpb43'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('seiko-prospex-srpe93-turtle-diver', 'Prospex SRPE93 Turtle Diver', 'Seiko', '{"mens-watches","analog-watches","dive-watches"}', 'SRPE93K1', 'The cushion-cased ''Turtle'' is a modern dive icon — 200m rated, day-date, and lume you could read from across the room. 4R36 automatic with hacking and hand-winding.', '{"Movement":"Seiko 4R36 automatic","Case":"Stainless steel, 45mm cushion","Water resistance":"200m","Bezel":"Unidirectional dive bezel","Strap":"Silicone strap","Lume":"LumiBrite"}'::jsonb, 152000, 129000, 5, false, false, 4.9, 37, '{"display":"Analog","style":"Dive","caseColor":"Black","dial":"Black","features":["Automatic"],"collection":"Prospex"}'::jsonb, 'Seiko Prospex SRPE93 Turtle Diver — Buy Authentic in Sri Lanka', 'Genuine Seiko Prospex SRPE93 Turtle Diver — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'prospex-srpe93-turtle-diver sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=80', 'Seiko Prospex SRPE93 Turtle Diver watch', 0 from public.products p
where p.slug = 'seiko-prospex-srpe93-turtle-diver'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('seiko-essentials-sur497-quartz', 'Essentials SUR497 Quartz', 'Seiko', '{"mens-watches","analog-watches","dress-watches"}', 'SUR497P1', 'A gold-tone quartz dress watch with a crisp white dial — understated, sharp, and ready for anything from the office to a wedding.', '{"Movement":"Analog quartz","Case":"Gold-tone steel, 40mm","Water resistance":"50m","Dial":"White","Strap":"Gold-tone bracelet"}'::jsonb, 78500, 66900, 9, false, false, 4.6, 15, '{"display":"Analog","style":"Dress","caseColor":"Gold","dial":"White","features":[],"collection":"Essentials"}'::jsonb, 'Seiko Essentials SUR497 Quartz — Buy Authentic in Sri Lanka', 'Genuine Seiko Essentials SUR497 Quartz — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'essentials-sur497-quartz sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80', 'Seiko Essentials SUR497 Quartz watch', 0 from public.products p
where p.slug = 'seiko-essentials-sur497-quartz'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('citizen-eco-drive-bm8180-field', 'Eco-Drive BM8180 Field', 'Citizen', '{"mens-watches","analog-watches"}', 'BM8180-03E', 'A do-everything field watch powered by light — never needs a battery. Green dial, 37mm case and a canvas strap that suits jeans as easily as chinos. Citizen''s Eco-Drive runs for months on a full charge.', '{"Movement":"Citizen Eco-Drive (light powered)","Case":"Stainless steel, 37mm","Water resistance":"100m","Power reserve":"180 days","Strap":"Nylon/canvas strap"}'::jsonb, 56500, 47900, 9, true, true, 4.7, 31, '{"display":"Analog","style":"Outdoor","caseColor":"Black","dial":"Black","features":["Solar"],"collection":"Eco-Drive"}'::jsonb, 'Citizen Eco-Drive BM8180 Field — Buy Authentic in Sri Lanka', 'Genuine Citizen Eco-Drive BM8180 Field — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'eco-drive-bm8180-field sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=80', 'Citizen Eco-Drive BM8180 Field watch', 0 from public.products p
where p.slug = 'citizen-eco-drive-bm8180-field'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('citizen-promaster-diver-bn0150', 'Promaster Diver BN0150', 'Citizen', '{"mens-watches","analog-watches","dive-watches"}', 'BN0150-28E', 'The Promaster diver — 200m rated, ISO-certified, Eco-Drive powered. A serious dive tool that never needs a battery.', '{"Movement":"Citizen Eco-Drive (light powered)","Case":"Stainless steel, 44mm","Water resistance":"200m (ISO diver)","Bezel":"Unidirectional dive bezel","Strap":"Polyurethane strap"}'::jsonb, 98500, 82500, 0, false, false, 4.9, 44, '{"display":"Analog","style":"Dive","caseColor":"Black","dial":"Black","features":["Solar"],"collection":"Promaster"}'::jsonb, 'Citizen Promaster Diver BN0150 — Buy Authentic in Sri Lanka', 'Genuine Citizen Promaster Diver BN0150 — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'promaster-diver-bn0150 sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1200&q=80', 'Citizen Promaster Diver BN0150 watch', 0 from public.products p
where p.slug = 'citizen-promaster-diver-bn0150'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('citizen-tsuyosa-nj0150-automatic', 'Tsuyosa NJ0150 Automatic', 'Citizen', '{"mens-watches","analog-watches","unisex-watches"}', 'NJ0150-81X', 'Citizen''s answer to the integrated-bracelet sports watch. A sunray blue dial, faceted indices and an automatic movement visible through the display back — presence far above its price.', '{"Movement":"Citizen 8210 automatic","Case":"Stainless steel, 40mm","Water resistance":"50m","Dial":"Blue sunray","Strap":"Integrated stainless steel bracelet"}'::jsonb, 112000, null, 4, true, true, 4.8, 18, '{"display":"Analog","style":"Casual","caseColor":"Silver","dial":"Blue","features":["Automatic"],"collection":"Tsuyosa"}'::jsonb, 'Citizen Tsuyosa NJ0150 Automatic — Buy Authentic in Sri Lanka', 'Genuine Citizen Tsuyosa NJ0150 Automatic — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'tsuyosa-nj0150-automatic sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80', 'Citizen Tsuyosa NJ0150 Automatic watch', 0 from public.products p
where p.slug = 'citizen-tsuyosa-nj0150-automatic'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, attributes, meta_title, meta_description, focus_keyword)
values
  ('citizen-l-ambiluna-ew5551', 'L Ambiluna EW5551', 'Citizen', '{"womens-watches","analog-watches","dress-watches"}', 'EW5551-56D', 'The L Ambiluna — a refined two-tone Eco-Drive for the wrist that likes a little shimmer. Light powered, mother-of-pearl accents, everyday elegance.', '{"Movement":"Citizen Eco-Drive (light powered)","Case":"Two-tone steel, 33mm","Water resistance":"50m","Dial":"Mother-of-pearl","Strap":"Two-tone bracelet"}'::jsonb, 89500, 74500, 7, false, false, 4.8, 12, '{"display":"Analog","style":"Dress","caseColor":"Two-Tone","dial":"White","features":["Solar"],"collection":"Eco-Drive"}'::jsonb, 'Citizen L Ambiluna EW5551 — Buy Authentic in Sri Lanka', 'Genuine Citizen L Ambiluna EW5551 — 100% authentic with full warranty and island-wide delivery in Sri Lanka.', 'l-ambiluna-ew5551 sri lanka')
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, categories = excluded.categories,
  reference = excluded.reference, description = excluded.description, specs = excluded.specs,
  price = excluded.price, offer_price = excluded.offer_price, stock = excluded.stock,
  featured = excluded.featured, new_arrival = excluded.new_arrival,
  rating_average = excluded.rating_average, rating_count = excluded.rating_count,
  attributes = excluded.attributes, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, focus_keyword = excluded.focus_keyword;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=1200&q=80', 'Citizen L Ambiluna EW5551 watch', 0 from public.products p
where p.slug = 'citizen-l-ambiluna-ew5551'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);


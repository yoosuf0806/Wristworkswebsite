-- Wrist Works — sample product catalog (matches src/lib/data/mock.ts).
-- Safe to re-run: existing slugs are skipped. Edit or delete freely afterwards.
-- Run AFTER combined_setup.sql (the tables must already exist).

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('casio-g-shock-ga-2100-carbon-core', 'G-Shock GA-2100 Carbon Core', 'Casio', '{"mens-watches","analog-watches","unisex-watches"}', 'GA-2100-1A1', 'The GA-2100 pairs Casio''s Carbon Core Guard case with a slim octagonal bezel — the ''CasiOak'' silhouette that put G-Shock on every wrist. Analog-digital display, 200m water resistance and shock resistance in a package under 12mm thick.', '{"Movement":"Analog-digital quartz","Case":"Carbon Core Guard, 45.4mm","Water resistance":"200m","Battery":"CR2016, ~3 years","Features":"World time, stopwatch, LED backlight"}'::jsonb, 64500, 51500, 12, true, true, 4.8, 42, 'Casio G-Shock GA-2100 Carbon Core — Buy Authentic in Sri Lanka', 'Genuine Casio G-Shock GA-2100 ''CasiOak'' with 200m water resistance. Authorised stock, full warranty, island-wide delivery from Colombo.', 'casio g-shock ga-2100 sri lanka')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80', 'Casio G-Shock GA-2100 Carbon Core on a dark surface', 0 from public.products p
where p.slug = 'casio-g-shock-ga-2100-carbon-core'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('seiko-5-sports-srpd55-automatic', '5 Sports SRPD55 Automatic', 'Seiko', '{"mens-watches","analog-watches","dive-watches"}', 'SRPD55K3', 'The SRPD55 carries the 5 Sports line''s SKX heritage — a black sunburst dial, day-date at three, and LumiBrite hands that stay legible long after sunset. The 4R36 automatic hand-winds and hacks, and the 100m rating handles a swim without a second thought.', '{"Movement":"Seiko 4R36, 24 jewels, 41h reserve","Case":"Stainless steel, 42.5mm × 13.4mm","Crystal":"Hardlex","Dial":"Black sunburst, day-date","Water resistance":"100m","Lume":"LumiBrite hands & indices"}'::jsonb, 118000, 94500, 6, true, true, 4.9, 63, 'Seiko 5 Sports SRPD55 Automatic — Authentic, Colombo Sri Lanka', 'Genuine Seiko 5 Sports SRPD55 automatic with 4R36 movement and 100m water resistance. Sealed box, stamped warranty, delivered island-wide.', 'seiko 5 srpd55 sri lanka')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80', 'Seiko 5 Sports SRPD55 automatic watch with black dial', 0 from public.products p
where p.slug = 'seiko-5-sports-srpd55-automatic'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('citizen-eco-drive-bm8180-field', 'Eco-Drive BM8180 Field', 'Citizen', '{"mens-watches","analog-watches"}', 'BM8180-03E', 'A do-everything field watch powered by light — never needs a battery. Green dial, 37mm case and a canvas strap that suits jeans as easily as chinos. Citizen''s Eco-Drive runs for months on a full charge.', '{"Movement":"Citizen Eco-Drive (light powered)","Case":"Stainless steel, 37mm","Water resistance":"100m","Power reserve":"180 days"}'::jsonb, 56500, 47900, 9, false, true, 4.7, 31, 'Citizen Eco-Drive BM8180 Field Watch — Buy in Sri Lanka', 'Genuine Citizen Eco-Drive BM8180 field watch, light powered with up to 5-year warranty. Authorised stock, island-wide delivery from Colombo.', 'citizen eco-drive bm8180')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=80', 'Citizen Eco-Drive BM8180 field watch with green dial', 0 from public.products p
where p.slug = 'citizen-eco-drive-bm8180-field'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('citizen-tsuyosa-nj0150-automatic', 'Tsuyosa NJ0150 Automatic', 'Citizen', '{"mens-watches","dress-watches","unisex-watches"}', 'NJ0150-81X', 'Citizen''s answer to the integrated-bracelet sports watch. A sunray green dial, faceted indices and an automatic movement visible through the display back — presence far above its price.', '{"Movement":"Citizen 8210 automatic","Case":"Stainless steel, 40mm","Water resistance":"50m","Bracelet":"Integrated stainless steel"}'::jsonb, 112000, null, 4, true, true, 4.8, 18, 'Citizen Tsuyosa NJ0150 Automatic — Green Dial, Sri Lanka', 'Genuine Citizen Tsuyosa NJ0150 automatic with integrated bracelet and sunray green dial. Authorised stock and warranty, delivered island-wide.', 'citizen tsuyosa nj0150')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80', 'Citizen Tsuyosa NJ0150 automatic watch with green dial', 0 from public.products p
where p.slug = 'citizen-tsuyosa-nj0150-automatic'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('casio-vintage-a168wa-digital', 'Vintage A168WA Digital', 'Casio', '{"digital-watches","unisex-watches"}', 'A168WA-1', 'The same stainless case your father wore, still under Rs. 20,000. Seven-year battery, LED backlight, and a bracelet that goes with everything from denim to a dinner jacket.', '{"Movement":"Digital quartz","Case":"Stainless steel, 38mm","Battery":"~7 years","Features":"LED backlight, stopwatch, alarm"}'::jsonb, 16800, 14800, 25, true, false, 4.9, 88, 'Casio Vintage A168WA Digital — Retro Steel, Sri Lanka', 'Genuine Casio Vintage A168WA digital watch with LED backlight and 7-year battery. Authorised stock, island-wide delivery from Colombo.', 'casio a168 sri lanka')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=80', 'Casio Vintage A168WA digital watch on steel bracelet', 0 from public.products p
where p.slug = 'casio-vintage-a168wa-digital'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('seiko-presage-cocktail-time-srpb43', 'Presage Cocktail Time SRPB43', 'Seiko', '{"mens-watches","dress-watches"}', 'SRPB43J1', 'Seiko''s Presage Cocktail Time turns a bar in Ginza into a dial. Hand-finished sunburst blue, 4R35 movement, and a presence far beyond its price. Our pick for a first proper automatic.', '{"Movement":"Seiko 4R35 automatic, 41h reserve","Case":"Stainless steel, 40.5mm","Crystal":"Box-shaped Hardlex","Dial":"Blue sunburst","Water resistance":"50m"}'::jsonb, 168000, null, 3, true, false, 5, 24, 'Seiko Presage Cocktail Time SRPB43 — Blue Dial, Sri Lanka', 'Genuine Seiko Presage Cocktail Time SRPB43 automatic dress watch with blue sunburst dial. Authorised stock and warranty, delivered island-wide.', 'seiko presage cocktail time')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1200&q=80', 'Seiko Presage Cocktail Time SRPB43 with blue sunburst dial', 0 from public.products p
where p.slug = 'seiko-presage-cocktail-time-srpb43'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('seiko-prospex-srpe93-turtle-diver', 'Prospex SRPE93 Turtle Diver', 'Seiko', '{"mens-watches","dive-watches"}', 'SRPE93K1', 'The cushion-cased ''Turtle'' is a modern dive icon — 200m rated, day-date, and lume you could read from across the room. 4R36 automatic with hacking and hand-winding.', '{"Movement":"Seiko 4R36 automatic","Case":"Stainless steel, 45mm cushion","Water resistance":"200m","Bezel":"Unidirectional dive bezel"}'::jsonb, 152000, 129000, 5, false, false, 4.9, 37, 'Seiko Prospex SRPE93 Turtle Diver — 200m, Sri Lanka', 'Genuine Seiko Prospex SRPE93 Turtle automatic diver, 200m rated. Authorised stock, full warranty, island-wide delivery from Colombo.', 'seiko turtle srpe93')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80', 'Seiko Prospex SRPE93 Turtle dive watch', 0 from public.products p
where p.slug = 'seiko-prospex-srpe93-turtle-diver'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);

insert into public.products
  (slug, name, brand, categories, reference, description, specs, price, offer_price, stock, featured, new_arrival, rating_average, rating_count, meta_title, meta_description, focus_keyword)
values
  ('casio-baby-g-bga-280-tonal', 'Baby-G BGA-280 Tonal', 'Casio', '{"womens-watches","analog-watches","digital-watches"}', 'BGA-280-4A', 'A slim ana-digi Baby-G in a soft tonal colourway — shock resistant, 100m water resistant, and sized for smaller wrists. World time, stopwatch and the toughness Baby-G is known for.', '{"Movement":"Analog-digital quartz","Case":"Resin, 41mm","Water resistance":"100m","Features":"World time, stopwatch, LED light"}'::jsonb, 38800, null, 14, false, false, 4.7, 21, 'Casio Baby-G BGA-280 Tonal — Women''s Watch, Sri Lanka', 'Genuine Casio Baby-G BGA-280 ana-digi women''s watch, 100m water resistant. Authorised stock, island-wide delivery from Colombo.', 'casio baby-g bga-280')
on conflict (slug) do nothing;

insert into public.product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=1200&q=80', 'Casio Baby-G BGA-280 tonal watch', 0 from public.products p
where p.slug = 'casio-baby-g-bga-280-tonal'
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id);


-- OPSIONAL: contoh data awal. Isi kode lengkapnya nanti lewat Panel Admin (ikon pensil).
insert into public.snippets (id, title, description, category, tags, lang, code, preview, created_at) values
('donghive','Donghive','Scrape untuk Donghive','Tools','{scrape,donghive,saka}','JavaScript',E'/**\nDonghive Scrape\nCredit : Sakaxabell\n*/','/**\nDonghive Scrape\nCredit : Sakaxabell','2026-10-20'),
('host','Host','Scrape Untuk Host Website','Tools','{scrape,host,saka}','JavaScript',E'/**\nHosting Scrape\nCredit : Sakaxabell\n*/','/**\nHosting Scrape\nCredit : Sakaxabell','2026-10-20'),
('netflix-token','Netflix Token','Generate NFtoken','Tools','{scrape,nftoken,saka}','JavaScript',E'/**\nNetflix Token Scrape\nCredit : Sakaxabell\n*/','/**\nNetflix Token Scrape\nCredit : Sakaxabell','2026-10-19'),
('emailqu','emailqu.com','Scraper temp mail emailqu','Tools','{TempMail}','JavaScript',E'/**\n * emailqu.js\n * Creator: Lixx\n */','/**\n * emailqu.js\n * Creator: Lixx','2026-10-18'),
('iloveimg','Iloveimg remove bg','Remove Background Iloveimg','Tools','{removebg}','JavaScript',E'/**\n * iloveimg.js\n * Creator: Lixx\n */','/**\n * iloveimg.js\n * Creator: Lixx','2026-10-18'),
('kiryuu','v7.kiryuu.to manga','Get home, detail, chapter, search','Manga','{manga}','JavaScript',E'/**\n * kiryu.js\n * Creator: Lixx\n */','/**\n * kiryu.js\n * Creator: Lixx','2026-10-18'),
('amnoxx','amnoxxyrorr','Bosen cek am terus yang req','Premium','{amprem}','JavaScript',E'/**\n * amnoxx.js\n * Creator: Lixx\n */','/**\n * amnoxx.js\n * Creator: Lixx','2026-10-18'),
('stickerly','StickerLy','Ambil image nya','Stickerly','{Stickerly}','JavaScript',E'#!/usr/bin/env node\n/**\n * stickerly.js\n */','#!/usr/bin/env node\n/**\n * stickerly.js','2026-10-18'),
('amfinder','amfinder','AM Preset Finder Scraper','Tools','{amfinder}','JavaScript',E'/**\n * NAME : AM Preset Finder\n */','/**\n * ==================\n * NAME : AM Preset Finder','2026-10-15')
on conflict (id) do nothing;

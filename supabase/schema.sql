-- Jalankan di Supabase: SQL Editor -> New query -> tempel -> Run

create table if not exists public.snippets (
  id          text primary key,
  title       text not null,
  description text not null default '',
  category    text not null default 'Tools',
  tags        text[] not null default '{}',
  lang        text not null default 'JavaScript',
  code        text not null,
  preview     text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Kunci akses: tabel hanya bisa dibaca/ditulis lewat server (service role).
-- Tanpa policy, kunci publik (anon) tidak bisa menyentuh data sama sekali.
alter table public.snippets enable row level security;

-- Pastikan hanya server (service_role) yang punya akses ke tabel,
-- apa pun pilihan "Automatically expose new tables" saat membuat project.
revoke all on table public.snippets from anon, authenticated;
grant all on table public.snippets to service_role;

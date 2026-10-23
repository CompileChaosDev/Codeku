# Lixx — Koleksi Snippet (Vercel + Supabase)

Alur: **admin buat snippet → server simpan ke database → semua pengunjung langsung melihatnya.**

> Web ini butuh server (API + database). Jadi **tidak bisa dibuka langsung dari aplikasi coding**
> (hasilnya "Gagal memuat"). Harus di-deploy ke Vercel atau dijalankan dengan `npx vercel dev`.

## Satu file pengaturan: `config.js`
| Bagian | Isi |
|---|---|
| `site.name` | nama web (logo, judul tab, footer) — ubah di sini, semua ikut berubah |
| `site.banner` | link banner (catbox) atau `/assets/banner.jpg` |
| `site.profile` | link foto profil (catbox) atau `/assets/profile.jpg` |
| `site.channelLink` | link channel WhatsApp |
| `database.url` / `database.serviceRoleKey` | koneksi database (rahasia) |
| `admin.username` / `password` / `sessionSecret` | akun admin (rahasia) |

Hanya bagian `site` yang dikirim ke browser. Isi `database` dan `admin` tidak pernah keluar dari server.

## Buat database (Supabase)
1. Buka **supabase.com** → daftar/masuk → **New project**. Isi nama, buat *Database Password*
   (simpan), pilih region terdekat (mis. Singapore) → **Create**. Tunggu beberapa menit sampai siap.
2. Menu kiri **SQL Editor → New query**. Salin isi `supabase/schema.sql`, tempel, klik **Run**
   (muncul "Success"). Ini membuat tabel `snippets`.
3. *(Opsional)* jalankan juga `supabase/seed.sql` untuk 9 contoh snippet.
4. Buka **Project Settings → API** (atau **API Keys**):
   - salin **Project URL** → isi `database.url`
   - salin kunci **service_role** (atau **secret**) → isi `database.serviceRoleKey`
   Kunci ini rahasia. Jangan dibagikan dan jangan dipakai di frontend.
5. Cek menu **Table Editor**: tabel `snippets` harus ada.

## Isi config.js
- `admin.password`: password kuat pilihanmu.
- `admin.sessionSecret`: teks acak ≥ 32 karakter (contoh: `openssl rand -hex 32`).
  Selama masih berisi `GANTI_...`, login sengaja ditolak.

## Deploy ke Vercel
1. Unggah folder ke **GitHub repo PRIVATE** (karena `config.js` berisi rahasia), lalu di Vercel:
   **Add New → Project → pilih repo → Deploy**. (Atau jalankan `npx vercel` dari folder ini.)
2. Buka `https://domainmu/login` → masuk → tambah snippet.
3. Domain sendiri: **Settings → Domains**.

**Tidak mau menaruh rahasia di file?** Kosongkan nilainya (biarkan `ISI_...`/`GANTI_...`) dan isi
Environment Variables di Vercel: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USER`,
`ADMIN_PASSWORD`, `SESSION_SECRET`. Nilai env otomatis menimpa `config.js`.

## Struktur
```
config.js             pengaturan (satu-satunya yang perlu diedit)
public/
  index.html          kerangka halaman
  css/                base, layout, hero, components, pages
  js/                 utils, site, state, views, router
  assets/             banner.jpg, profile.jpg, verified.svg
api/                  config, login, logout, me, snippets
lib/                  settings (baca config), db (Supabase), auth (sesi)
supabase/             schema.sql, seed.sql
vercel.json           routing /login, /admin, /code/<id>
```

## Fitur & keamanan
- Kategori bebas (otomatis jadi chip), bahasa per snippet + filter, pencarian, URL `/code/<id>`, halaman 404.
- Tambah/ubah/hapus hanya untuk admin: cookie sesi bertanda tangan (HttpOnly, 7 hari) + cek Origin.
- Tabel dikunci RLS: kunci publik Supabase tidak bisa membaca/menulis.
- Pembatas login: 5 salah → kunci 60 detik per IP (per instance server; untuk yang lebih ketat pakai Redis).

## Dev lokal
```
npx vercel dev
```

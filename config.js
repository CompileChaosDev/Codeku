Yo// =====================================================================
//  config.js  —  SATU-SATUNYA file pengaturan Lixx
//  Ubah di sini saja, semua bagian web ikut berubah.
// =====================================================================

module.exports = {
  // ------------------------------------------------------------------
  //  TAMPILAN  (aman, ditampilkan ke pengunjung)
  // ------------------------------------------------------------------
  site: {
    name: 'Lixx',                 // nama web: logo, judul tab, footer, teks login
    tagline: 'Koleksi Snippet',   // tulisan di belakang nama pada judul tab
    author: 'Lixx',               // nama pembuat di kartu & halaman detail

    // Banner & foto profil: isi link catbox (https://files.catbox.moe/xxxxx.jpg)
    // atau biarkan bawaan (file ada di folder public/assets).
    banner: '/assets/banner.jpg',
    profile: '/assets/profile.jpg',

    channelLink: 'https://whatsapp.com/channel/0029VbE1ZfX1CYobADYvjY0o',
  },

  // ------------------------------------------------------------------
  //  DATABASE  (RAHASIA — jangan dipublikasikan)
  //  Cara dapat nilainya: lihat README.md bagian "Buat database".
  // ------------------------------------------------------------------
  database: {
    url: 'https://hznogytijknwzrqugdfz.supabase.co',               // contoh: https://abcdxyz.supabase.co
    serviceRoleKey: 'sb_publishable_JXdEAJAIDe9JXLXmML4Xhg__aZHYlwf', // kunci "service_role" / "secret" dari Supabase
  },

  // ------------------------------------------------------------------
  //  ADMIN  (RAHASIA)
  // ------------------------------------------------------------------
admin: {
  username: 'Malixx',
  password: 'Lixx1',
  sessionSecret: 'aa3c47880a7af36e54927e2325f006f720cb50692045266b',
},
};

// CATATAN KEAMANAN
//  - File ini hanya dibaca server. Browser TIDAK pernah menerima isi database/admin;
//    yang dikirim ke pengunjung hanya bagian "site".
//  - Jangan unggah file ini ke GitHub PUBLIK. Pakai repo private,
//    atau isi nilainya lewat Environment Variables Vercel (lihat README).

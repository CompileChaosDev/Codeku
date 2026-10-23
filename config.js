// =====================================================================
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

  // Database & admin TIDAK ditulis di sini.
  // Semuanya diisi lewat Vercel -> Environment Variables:
  //   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_USER, ADMIN_PASSWORD
};

// CATATAN: file ini aman diunggah ke GitHub karena tidak berisi rahasia.

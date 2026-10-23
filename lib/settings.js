// Membaca config.js. Nilai rahasia boleh dioverride lewat Environment Variables Vercel.
const cfg = require('../config');

const isPlaceholder = (v) => !v || /^(ISI_|GANTI_)/.test(String(v));

const database = {
  url: process.env.SUPABASE_URL || cfg.database.url,
  key: process.env.SUPABASE_SERVICE_ROLE_KEY || cfg.database.serviceRoleKey,
};

const admin = {
  username: process.env.ADMIN_USER || cfg.admin.username,
  password: process.env.ADMIN_PASSWORD || cfg.admin.password,
  secret: process.env.SESSION_SECRET || cfg.admin.sessionSecret,
};

const publicSite = () => ({
  name: cfg.site.name,
  tagline: cfg.site.tagline,
  author: cfg.site.author || cfg.site.name,
  banner: cfg.site.banner,
  profile: cfg.site.profile,
  channelLink: cfg.site.channelLink || '',
});

module.exports = {
  database,
  admin,
  publicSite,
  dbReady: () => !isPlaceholder(database.url) && !isPlaceholder(database.key),
  adminReady: () => !isPlaceholder(admin.password) && !isPlaceholder(admin.secret) && String(admin.secret).length >= 16,
};

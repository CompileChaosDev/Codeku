// Membaca config.js. Nilai rahasia boleh dioverride lewat Environment Variables Vercel.
const cfg = require('../config');
const cfgDb = cfg.database || {};
const cfgAdmin = cfg.admin || {};

const isPlaceholder = (v) => !v || /^(ISI_|GANTI_)/.test(String(v));

const database = {
  url: process.env.SUPABASE_URL || cfgDb.url,
  key: process.env.SUPABASE_SERVICE_ROLE_KEY || cfgDb.serviceRoleKey,
};

const admin = {
  username: process.env.ADMIN_USER || cfgAdmin.username || 'admin',
  password: process.env.ADMIN_PASSWORD || cfgAdmin.password,
  secret: process.env.SESSION_SECRET || cfgAdmin.sessionSecret ||
    require('crypto').createHash('sha256').update('lixx:' + String(process.env.ADMIN_PASSWORD || cfgAdmin.password)).digest('hex'),
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

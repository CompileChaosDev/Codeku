const { admin, adminReady } = require('../lib/settings');
const { makeSession, setCookie, sameOrigin, safeEq, TTL_SECONDS } = require('../lib/auth');

// Pembatas percobaan login (per instance server; cukup untuk meredam tebakan sederhana).
const tries = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Origin tidak valid' });
  if (!adminReady()) {
    return res.status(500).json({ error: 'Admin belum diatur: ganti password dan sessionSecret di config.js.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  if (tries.size > 1000) tries.clear();
  const t = tries.get(ip) || { n: 0, until: 0 };
  if (t.until > now) {
    return res.status(429).json({ error: 'Terlalu banyak percobaan. Coba lagi dalam ' + Math.ceil((t.until - now) / 1000) + ' detik.' });
  }

  const body = req.body || {};
  const userOk = safeEq(body.username || '', admin.username);
  const passOk = safeEq(body.password || '', admin.password);
  if (userOk && passOk) {
    tries.delete(ip);
    setCookie(res, makeSession(), TTL_SECONDS);
    return res.status(200).json({ ok: true });
  }

  t.n += 1;
  if (t.n >= 5) { t.until = now + 60000; t.n = 0; }
  tries.set(ip, t);
  await sleep(400);
  const msg = !userOk && !passOk ? 'Password dan username anda salah.'
    : !userOk ? 'Username anda salah.'
    : 'Password anda salah.';
  return res.status(401).json({ error: msg });
};

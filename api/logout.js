const { setCookie, sameOrigin } = require('../lib/auth');

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Origin tidak valid' });
  setCookie(res, '', 0);
  return res.status(200).json({ ok: true });
};

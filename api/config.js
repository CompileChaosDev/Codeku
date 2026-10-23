const { publicSite } = require('../lib/settings');

// Hanya bagian "site" dari config.js yang dikirim ke browser.
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.status(200).json(publicSite());
};

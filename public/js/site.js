/* Pengaturan situs (nama, banner, profil, link channel) */
// Pengaturan tampilan dari config.js (diambil lewat /api/config)
var CFG = { name: 'Lixx', tagline: 'Koleksi Snippet', author: 'Lixx', banner: '/assets/banner.jpg', profile: '/assets/profile.jpg', channelLink: '' };

function cssUrl(s) { return 'url("' + String(s).replace(/["\\\n]/g, '') + '")'; }

function applyConfig() {
  var root = document.documentElement.style, n = String(CFG.name), k = Math.ceil(n.length / 2);
  root.setProperty('--banner', cssUrl(CFG.banner));
  root.setProperty('--avatar', cssUrl(CFG.profile));
  document.querySelectorAll('[data-brand]').forEach(function (e) { e.innerHTML = esc(n.slice(0, k)) + '<b>' + esc(n.slice(k)) + '</b>'; });
  document.querySelectorAll('[data-name]').forEach(function (e) { e.textContent = n; });
  document.title = n + ' — ' + CFG.tagline;
  var a = document.getElementById('chl');
  if (a) { if (CFG.channelLink) a.href = CFG.channelLink; else a.removeAttribute('href'); }
  var im = new Image();
  im.onload = function () { if (im.naturalWidth) root.setProperty('--banner-ratio', (im.naturalHeight / im.naturalWidth).toFixed(4)); };
  im.src = CFG.banner;
}

function loadConfig() {
  return fetch('/api/config').then(function (r) { return r.json(); }).then(function (c) { Object.assign(CFG, c); }).catch(function () {}).then(applyConfig);
}

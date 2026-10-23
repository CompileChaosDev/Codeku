const { sb, need } = require('../lib/db');
const { isAuthed, sameOrigin } = require('../lib/auth');

const LANGS = ['JavaScript', 'Python', 'PHP', 'HTML', 'CSS', 'JSON', 'TypeScript', 'Lainnya'];
const LIST_COLUMNS = 'id,title,description,category,tags,lang,preview,created_at';

function dbErr(r) {
  const d = r && r.data;
  const detail = d && typeof d === 'object' ? (d.message || d.error || d.hint || d.code || '') : '';
  return { error: 'Database error', status: r && r.status, detail: String(detail).slice(0, 200) };
}

function slug(title) {
  return String(title).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'snippet';
}

function clean(b) {
  b = b || {};
  const title = String(b.title || '').trim();
  const description = String(b.description || '').trim();
  const category = String(b.category || 'Tools').trim() || 'Tools';
  const lang = String(b.lang || 'JavaScript');
  const code = String(b.code || '');
  const tags = (Array.isArray(b.tags) ? b.tags : []).map((x) => String(x).trim().replace(/^#/, '')).filter(Boolean).slice(0, 10);
  if (!title || title.length > 120) return { error: 'Judul wajib diisi (maks 120 karakter).' };
  if (description.length > 300) return { error: 'Deskripsi maks 300 karakter.' };
  if (category.length > 30) return { error: 'Kategori maks 30 karakter.' };
  if (tags.some((t) => t.length > 30)) return { error: 'Setiap tag maks 30 karakter.' };
  if (!LANGS.includes(lang)) return { error: 'Bahasa tidak valid.' };
  if (!code.trim() || code.length > 400000) return { error: 'Kode wajib diisi (maks 400.000 karakter).' };
  const preview = code.split('\n').slice(0, 3).join('\n').slice(0, 300);
  return { value: { title, description, category, tags, lang, code, preview } };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    need();
    const id = req.query && req.query.id ? String(req.query.id) : null;
    const eq = id ? 'id=eq.' + encodeURIComponent(id) : '';

    if (req.method === 'GET') {
      if (id) {
        const r = await sb('snippets?' + eq + '&select=*&limit=1');
        if (!r.ok) return res.status(502).json(dbErr(r));
        if (!r.data.length) return res.status(404).json({ error: 'Snippet tidak ditemukan' });
        return res.status(200).json(r.data[0]);
      }
      const r = await sb('snippets?select=' + LIST_COLUMNS + '&order=created_at.desc');
      if (!r.ok) return res.status(502).json(dbErr(r));
      return res.status(200).json(r.data);
    }

    if (!['POST', 'PUT', 'DELETE'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed' });
    if (!sameOrigin(req) || !isAuthed(req)) return res.status(401).json({ error: 'Tidak diizinkan. Silakan login.' });

    if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ error: 'ID wajib diisi.' });
      const r = await sb('snippets?' + eq, { method: 'DELETE' });
      if (!r.ok) return res.status(502).json(dbErr(r));
      return res.status(200).json({ ok: true });
    }

    const c = clean(req.body);
    if (c.error) return res.status(400).json({ error: c.error });

    if (req.method === 'PUT') {
      if (!id) return res.status(400).json({ error: 'ID wajib diisi.' });
      const r = await sb('snippets?' + eq, {
        method: 'PATCH',
        body: Object.assign({}, c.value, { updated_at: new Date().toISOString() }),
        prefer: 'return=representation',
      });
      if (!r.ok) return res.status(502).json(dbErr(r));
      if (!r.data.length) return res.status(404).json({ error: 'Snippet tidak ditemukan' });
      return res.status(200).json(r.data[0]);
    }

    const base = slug(c.value.title);
    let tryId = base;
    for (let i = 0; i < 5; i++) {
      const r = await sb('snippets', { method: 'POST', body: Object.assign({ id: tryId }, c.value), prefer: 'return=representation' });
      if (r.ok) return res.status(201).json(r.data[0]);
      if (r.status === 409) { tryId = base + '-' + Math.random().toString(36).slice(2, 6); continue; }
      return res.status(502).json(dbErr(r));
    }
    return res.status(500).json({ error: 'Gagal membuat ID unik.' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message === 'CONFIG' ? 'Database belum diatur: isi bagian database di config.js.' : 'Terjadi kesalahan server.', detail: String(e && e.message || '').slice(0, 200) + (e && e.cause ? ' | ' + String(e.cause.message || e.cause.code || e.cause).slice(0, 120) : '') });
  }
};

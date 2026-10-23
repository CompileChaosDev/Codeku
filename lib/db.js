// Klien ringan untuk Supabase REST (PostgREST). Hanya dipakai di server.
const { database, dbReady } = require('./settings');

function need() {
  if (!dbReady()) throw new Error('CONFIG');
}

async function sb(path, { method = 'GET', body, prefer } = {}) {
  const base = String(database.url).replace(/\/$/, '');
  const key = database.key;
  const headers = { apikey: key, 'Content-Type': 'application/json' };
  if (String(key).startsWith('eyJ')) headers.Authorization = 'Bearer ' + key; // kunci lama (JWT)
  if (prefer) headers.Prefer = prefer;
  const r = await fetch(base + '/rest/v1/' + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await r.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = null; }
  return { ok: r.ok, status: r.status, data };
}

module.exports = { sb, need };

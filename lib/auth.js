const crypto = require('crypto');
const { admin } = require('./settings');

const COOKIE = 'lixx_s';
const TTL_SECONDS = 60 * 60 * 24 * 7; // 7 hari

function sign(value) {
  return crypto.createHmac('sha256', admin.secret).update(value).digest('base64url');
}

function makeSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TTL_SECONDS * 1000 })).toString('base64url');
  return payload + '.' + sign(payload);
}

function readCookie(header, name) {
  const parts = String(header || '').split(';');
  for (const part of parts) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return '';
}

function isAuthed(req) {
  if (!admin.secret) return false;
  const token = readCookie(req.headers.cookie, COOKIE);
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now();
  } catch (e) {
    return false;
  }
}

function setCookie(res, value, maxAge) {
  res.setHeader('Set-Cookie', `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`);
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === req.headers.host; } catch (e) { return false; }
}

function safeEq(a, b) {
  const x = crypto.createHash('sha256').update(String(a)).digest();
  const y = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}

module.exports = { makeSession, isAuthed, setCookie, sameOrigin, safeEq, TTL_SECONDS };

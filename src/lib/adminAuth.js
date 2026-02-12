import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24; // 24 hours

function sign(value) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error('ADMIN_SECRET is not configured');
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

export function createAdminSession() {
  if (!process.env.ADMIN_SECRET) {
    throw new Error('ADMIN_SECRET is not configured');
  }
  const payload = { admin: true, exp: Date.now() + MAX_AGE * 1000 };
  const raw = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(raw);
  return raw + '.' + signature;
}

export function verifyAdminSession(token) {
  if (!token || !process.env.ADMIN_SECRET) return false;
  const [raw, sig] = token.split('.');
  if (!raw || !sig) return false;
  try {
    if (sign(raw) !== sig) return false;
    const payload = JSON.parse(Buffer.from(raw, 'base64url').toString());
    return payload.admin === true && Date.now() < payload.exp;
  } catch {
    return false;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token ? verifyAdminSession(token) : false;
}

export async function setAdminCookie() {
  const cookieStore = await cookies();
  const token = createAdminSession();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME, { path: '/' });
}

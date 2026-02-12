import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { setAdminCookie, clearAdminCookie } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

/** Constant-time comparison to prevent timing attacks on login */
function secureCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const key = process.env.ADMIN_SECRET || '';
  const ah = crypto.createHmac('sha256', key).update(a).digest();
  const bh = crypto.createHmac('sha256', key).update(b).digest();
  if (ah.length !== bh.length) return false;
  return crypto.timingSafeEqual(ah, bh);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { password, logout } = body;
    if (logout) {
      await clearAdminCookie();
      return NextResponse.json({ ok: true, message: 'Logged out' });
    }
    const secret = process.env.ADMIN_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Admin not configured' }, { status: 500 });
    }
    if (!secureCompare(password, secret)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    await setAdminCookie();
    return NextResponse.json({ ok: true, message: 'Logged in' });
  } catch (e) {
    console.error('POST /api/admin/auth', e);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}

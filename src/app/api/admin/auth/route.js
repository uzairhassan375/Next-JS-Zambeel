import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { setAdminCookie, clearAdminCookie } from '../../../../lib/adminAuth';
import { consumeAdminLoginAttempt } from '../../../../lib/adminLoginRateLimit';

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

    let rateLimit;
    try {
      rateLimit = await consumeAdminLoginAttempt(request);
    } catch (error) {
      console.error('Admin login rate limit unavailable', error);
      return NextResponse.json(
        { error: 'Authentication temporarily unavailable' },
        { status: 503 },
      );
    }
    if (rateLimit.limited) {
      const retryAfter = rateLimit.retryAfter;
      const minutes = Math.ceil(retryAfter / 60);
      const waitLabel =
        retryAfter < 60
          ? `${retryAfter} second${retryAfter === 1 ? '' : 's'}`
          : `${minutes} minute${minutes === 1 ? '' : 's'}`;
      return NextResponse.json(
        {
          error: `Too many login attempts. Try again in ${waitLabel}.`,
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (!secureCompare(password, secret)) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401, headers: { 'Cache-Control': 'no-store' } },
      );
    }
    await setAdminCookie();
    return NextResponse.json(
      { ok: true, message: 'Logged in' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (e) {
    console.error('POST /api/admin/auth', e);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}

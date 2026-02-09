import { NextResponse } from 'next/server';
import { setAdminCookie, clearAdminCookie } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

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
    if (password !== secret) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    await setAdminCookie();
    return NextResponse.json({ ok: true, message: 'Logged in' });
  } catch (e) {
    console.error('POST /api/admin/auth', e);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}

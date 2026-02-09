import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

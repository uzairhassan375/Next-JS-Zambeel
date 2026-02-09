import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const isAdmin = await getAdminSession();
  let allowed = isAdmin;
  if (!allowed) {
    try {
      const body = await request.json().catch(() => ({}));
      if (body.secret && process.env.ADMIN_SECRET && body.secret === process.env.ADMIN_SECRET) {
        allowed = true;
      }
    } catch (_) {}
  }
  if (!allowed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Hardcoded blogs have been removed - all blogs are now managed through the admin dashboard
  return NextResponse.json({ 
    ok: true, 
    message: 'Hardcoded blogs have been removed. All blogs are now stored in MongoDB and managed through the admin dashboard.',
    inserted: 0,
    total: 0
  });
}

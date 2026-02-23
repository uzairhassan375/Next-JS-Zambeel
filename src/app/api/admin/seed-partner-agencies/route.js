import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/adminAuth';
import { connectDB } from '../../../../lib/db';
import PartnerAgency from '../../../../models/PartnerAgency';

export const dynamic = 'force-dynamic';

// Hardcoded partner agencies have been removed – all agencies are stored in MongoDB and managed via the admin dashboard.

export async function POST() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const existing = await PartnerAgency.countDocuments();
    return NextResponse.json({
      ok: true,
      message: 'Partner agencies are managed in the admin dashboard. No seed data. Add or edit from the list.',
      inserted: 0,
      total: existing,
    });
  } catch (e) {
    console.error('POST /api/admin/seed-partner-agencies', e);
    return NextResponse.json({ error: 'Failed to seed partner agencies' }, { status: 500 });
  }
}

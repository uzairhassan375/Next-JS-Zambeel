import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '../../../../../lib/db';
import PartnerAgency from '../../../../../models/PartnerAgency';
import { getAdminSession } from '../../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

export async function GET(request, { params }) {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    await connectDB();
    const doc = await PartnerAgency.findById(id).select('logo').lean();
    if (!doc) return NextResponse.json({ error: 'Partner agency not found' }, { status: 404 });
    return NextResponse.json({ logo: doc.logo || '' });
  } catch (e) {
    console.error('GET /api/partner-agencies/[id]/logo', e);
    return NextResponse.json({ error: 'Failed to fetch logo' }, { status: 500 });
  }
}

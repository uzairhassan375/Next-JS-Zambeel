import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '../../../../lib/db';
import PartnerAgency from '../../../../models/PartnerAgency';
import { getAdminSession } from '../../../../lib/adminAuth';
import { partnerAgencyForResponse } from '../../../../lib/partnerAgencyResponse';
import { invalidatePartnerAgenciesCache } from '../../../../lib/partnerAgenciesCache';

export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

function validateBase64ImageSize(base64String) {
  if (!base64String || !base64String.startsWith('data:image/')) {
    return { valid: false, error: 'Invalid image format' };
  }
  const base64Length = base64String.length - (base64String.indexOf(',') + 1);
  const estimatedSize = (base64Length * 3) / 4;
  if (estimatedSize > MAX_IMAGE_SIZE) {
    return { valid: false, error: 'Image must be 2MB or less' };
  }
  return { valid: true };
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

// GET: no auth (same as blog edit) – edit page is behind AdminGuard; keeps response fast
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    await connectDB();
    const agency = await PartnerAgency.findById(id).lean();
    if (!agency) return NextResponse.json({ error: 'Partner agency not found' }, { status: 404 });
    return NextResponse.json(partnerAgencyForResponse(agency));
  } catch (e) {
    console.error('GET /api/partner-agencies/[id]', e);
    return NextResponse.json({ error: 'Failed to fetch partner agency' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  const [isAdmin, , body] = await Promise.all([getAdminSession(), connectDB(), request.json()]);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const {
      tier,
      order,
      nameEn,
      nameAr,
      countryEn,
      countryAr,
      descriptionEn,
      descriptionAr,
      contact,
      phone,
      website,
      logo,
    } = body;

    if (tier != null && !['diamond', 'gold', 'silver'].includes(tier)) {
      return NextResponse.json({ error: 'tier must be diamond, gold, or silver' }, { status: 400 });
    }

    if (logo !== undefined && logo && logo.startsWith('data:image/')) {
      const validation = validateBase64ImageSize(logo);
      if (!validation.valid) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
    }

    const $set = {};
    if (tier != null) $set.tier = tier;

    // If setting order and another agency in same tier has that order, swap their orders
    const requestedOrder = order != null ? Number(order) : null;
    if (requestedOrder !== null) {
      const current = await PartnerAgency.findById(id).select('order tier').lean();
      const targetTier = tier != null ? tier : current?.tier;
      if (targetTier) {
        const other = await PartnerAgency.findOne({
          tier: targetTier,
          order: requestedOrder,
          _id: { $ne: id },
        }).lean();
        if (other && current) {
          await PartnerAgency.findByIdAndUpdate(other._id, { $set: { order: current.order } });
        }
      }
      $set.order = requestedOrder;
    }
    if (nameEn != null) $set.nameEn = nameEn;
    if (nameAr != null) $set.nameAr = nameAr;
    if (countryEn != null) $set.countryEn = countryEn;
    if (countryAr != null) $set.countryAr = countryAr;
    if (descriptionEn != null) $set.descriptionEn = descriptionEn;
    if (descriptionAr != null) $set.descriptionAr = descriptionAr;
    if (contact != null) $set.contact = contact;
    if (phone != null) $set.phone = phone;
    if (website != null) $set.website = website;
    if (logo !== undefined) $set.logo = logo || '';

    const agency = await PartnerAgency.findByIdAndUpdate(
      id,
      { $set },
      { new: true, runValidators: true }
    ).lean();

    if (!agency) return NextResponse.json({ error: 'Partner agency not found' }, { status: 404 });
    invalidatePartnerAgenciesCache();
    return NextResponse.json(partnerAgencyForResponse(agency));
  } catch (e) {
    console.error('PUT /api/partner-agencies/[id]', e);
    return NextResponse.json({ error: 'Failed to update partner agency' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  const [isAdmin] = await Promise.all([getAdminSession(), connectDB()]);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const agency = await PartnerAgency.findByIdAndDelete(id).lean();
    if (!agency) return NextResponse.json({ error: 'Partner agency not found' }, { status: 404 });
    invalidatePartnerAgenciesCache();
    return NextResponse.json({ deleted: true });
  } catch (e) {
    console.error('DELETE /api/partner-agencies/[id]', e);
    return NextResponse.json({ error: 'Failed to delete partner agency' }, { status: 500 });
  }
}

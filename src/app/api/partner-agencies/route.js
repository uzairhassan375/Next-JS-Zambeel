import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import PartnerAgency from '../../../models/PartnerAgency';
import { getAdminSession } from '../../../lib/adminAuth';
import { partnerAgenciesForResponse, partnerAgencyForResponse } from '../../../lib/partnerAgencyResponse';
import { getCachedOrFetch, getCachedPartnerAgencies, invalidatePartnerAgenciesCache } from '../../../lib/partnerAgenciesCache';

export const dynamic = 'force-dynamic';

// Don't cache in browser so admin changes show immediately; server still uses in-memory cache
const PUBLIC_CACHE_CONTROL = 'public, max-age=0, must-revalidate';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB for logos

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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdminList = searchParams.get('admin') === 'true';

    if (isAdminList) {
      const [isAdmin] = await Promise.all([getAdminSession(), connectDB()]);
      if (!isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // Exclude logo (can be large base64) so admin list loads fast
      const agencies = await PartnerAgency.find({})
        .select('-logo')
        .sort({ tier: 1, order: 1, createdAt: 1 })
        .lean();
      return NextResponse.json(partnerAgenciesForResponse(agencies));
    }

    await connectDB();

    // Public: serve from cache; refetch if any agency was updated/deleted (count or updatedAt changed)
    const agencies = await getCachedOrFetch(
      async () => {
        const list = await PartnerAgency.find({})
          .sort({ tier: 1, order: 1, createdAt: 1 })
          .lean();
        return partnerAgenciesForResponse(list);
      },
      async (cacheTimestamp) => {
        const [latest, count] = await Promise.all([
          PartnerAgency.findOne().sort({ updatedAt: -1 }).select('updatedAt').lean(),
          PartnerAgency.countDocuments(),
        ]);
        const cached = getCachedPartnerAgencies();
        const cachedCount = Array.isArray(cached) ? cached.length : 0;
        if (count !== cachedCount) return true; // add or delete
        if (!latest || !latest.updatedAt) return false;
        return new Date(latest.updatedAt).getTime() > cacheTimestamp;
      }
    );
    return NextResponse.json(agencies, {
      headers: { 'Cache-Control': PUBLIC_CACHE_CONTROL },
    });
  } catch (e) {
    console.error('GET /api/partner-agencies', e);
    return NextResponse.json({ error: 'Failed to fetch partner agencies' }, { status: 500 });
  }
}

export async function POST(request) {
  const [isAdmin, , body] = await Promise.all([getAdminSession(), connectDB(), request.json()]);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const tier = body.tier;
    const order = body.order;
    const nameEn = body.nameEn;
    const nameAr = body.nameAr;
    const countryEn = body.countryEn;
    const countryAr = body.countryAr;
    const descriptionEn = body.descriptionEn;
    const descriptionAr = body.descriptionAr;
    const contact = body.contact;
    const phone = body.phone;
    const website = body.website;
    const logo = body.logo;

    if (!tier || !nameEn) {
      return NextResponse.json({ error: 'tier and nameEn are required' }, { status: 400 });
    }
    if (!['diamond', 'gold', 'silver'].includes(tier)) {
      return NextResponse.json({ error: 'tier must be diamond, gold, or silver' }, { status: 400 });
    }

    if (logo && logo.startsWith('data:image/')) {
      const validation = validateBase64ImageSize(logo);
      if (!validation.valid) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
    }

    const requestedOrder = typeof order === 'number' ? order : 0;
    // If another agency in same tier already has this order, give it the next available order (so new one gets requested order)
    const existingWithOrder = await PartnerAgency.findOne({ tier, order: requestedOrder }).lean();
    if (existingWithOrder) {
      const maxOrderDoc = await PartnerAgency.findOne({ tier }).sort({ order: -1 }).select('order').lean();
      const nextOrder = (maxOrderDoc?.order ?? 0) + 1;
      await PartnerAgency.findByIdAndUpdate(existingWithOrder._id, { $set: { order: nextOrder } });
    }

    const doc = {
      tier,
      order: requestedOrder,
      nameEn: (nameEn ?? '').toString(),
      nameAr: (nameAr ?? '').toString(),
      countryEn: (countryEn ?? '').toString(),
      countryAr: (countryAr ?? '').toString(),
      descriptionEn: (descriptionEn ?? '').toString(),
      descriptionAr: (descriptionAr ?? '').toString(),
      contact: (contact ?? '').toString(),
      phone: (phone ?? '').toString(),
      website: (website ?? '').toString(),
      logo: logo ?? '',
    };

    const agency = await PartnerAgency.create(doc);
    if (!agency || !agency._id) {
      console.error('POST /api/partner-agencies: create() did not return a document with _id');
      return NextResponse.json({ error: 'Failed to save partner agency' }, { status: 500 });
    }
    invalidatePartnerAgenciesCache();
    const obj = agency.toObject ? agency.toObject() : agency;
    return NextResponse.json(partnerAgencyForResponse(obj));
  } catch (e) {
    console.error('POST /api/partner-agencies', e);
    return NextResponse.json(
      { error: e.message || 'Failed to create partner agency' },
      { status: 500 }
    );
  }
}

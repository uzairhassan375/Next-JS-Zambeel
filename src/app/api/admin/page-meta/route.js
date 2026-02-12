import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/adminAuth';
import PageMeta from '../../../../models/PageMeta';
import { PAGE_IDS } from '../../../../lib/pageMeta';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const docs = await PageMeta.find({}).lean();
    const byId = Object.fromEntries(docs.map((d) => [d.pageId, d]));
    const list = PAGE_IDS.map(({ id, label, path }) => ({
      pageId: id,
      label,
      path,
      metaTitleEn: byId[id]?.metaTitleEn ?? '',
      metaTitleAr: byId[id]?.metaTitleAr ?? '',
      metaDescriptionEn: byId[id]?.metaDescriptionEn ?? '',
      metaDescriptionAr: byId[id]?.metaDescriptionAr ?? '',
    }));
    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/admin/page-meta', e);
    return NextResponse.json({ error: 'Failed to fetch page meta' }, { status: 500 });
  }
}

export async function PUT(request) {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const { pageId, metaTitleEn, metaTitleAr, metaDescriptionEn, metaDescriptionAr } = body;
    const validIds = new Set(PAGE_IDS.map((p) => p.id));
    if (!pageId || !validIds.has(pageId)) {
      return NextResponse.json({ error: 'Invalid pageId' }, { status: 400 });
    }
    await PageMeta.findOneAndUpdate(
      { pageId },
      {
        metaTitleEn: String(metaTitleEn ?? ''),
        metaTitleAr: String(metaTitleAr ?? ''),
        metaDescriptionEn: String(metaDescriptionEn ?? ''),
        metaDescriptionAr: String(metaDescriptionAr ?? ''),
      },
      { upsert: true, new: true }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('PUT /api/admin/page-meta', e);
    return NextResponse.json({ error: 'Failed to update page meta' }, { status: 500 });
  }
}

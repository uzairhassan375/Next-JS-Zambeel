import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/adminAuth';
import TickerSetting from '../../../../models/TickerSetting';
import { TICKER_PAGES, mergeTickerFields } from '../../../../lib/tickerPages';
import { normalizeTickerStyle } from '../../../../lib/tickerStyle';
import { TICKERS_CACHE_TAG } from '../../../../lib/contentCache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const docs = await TickerSetting.find({}).lean();
    const byPageId = Object.fromEntries(docs.map((doc) => [doc.pageId, doc]));
    const list = TICKER_PAGES.map((page) => mergeTickerFields(page.id, byPageId[page.id] || {}));
    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/admin/tickers', e);
    return NextResponse.json({ error: 'Failed to fetch tickers' }, { status: 500 });
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
    const validIds = new Set(TICKER_PAGES.map((p) => p.id));
    if (!body.pageId || !validIds.has(body.pageId)) {
      return NextResponse.json({ error: 'Invalid pageId' }, { status: 400 });
    }

    const style = normalizeTickerStyle(body, body.pageId);

    await TickerSetting.findOneAndUpdate(
      { pageId: body.pageId },
      {
        textEn: String(body.textEn ?? ''),
        textAr: String(body.textAr ?? ''),
        isBold: body.isBold === true,
        isUnderline: body.isUnderline === true,
        isHighlight: body.isHighlight === true,
        isBlink: body.isBlink === true,
        ...style,
      },
      { upsert: true, new: true }
    );
    revalidateTag(TICKERS_CACHE_TAG);
    revalidateTag(`ticker-${body.pageId}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('PUT /api/admin/tickers', e);
    return NextResponse.json({ error: 'Failed to update ticker' }, { status: 500 });
  }
}

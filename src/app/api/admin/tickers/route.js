import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/adminAuth';
import TickerSetting from '../../../../models/TickerSetting';
import { TICKER_PAGES, getDefaultTickerItem } from '../../../../lib/tickerPages';
import { TICKERS_CACHE_TAG } from '../../../../lib/contentCache';

export const dynamic = 'force-dynamic';

function toBoolean(value) {
  return value === true;
}

export async function GET() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const docs = await TickerSetting.find({}).lean();
    const byPageId = Object.fromEntries(docs.map((doc) => [doc.pageId, doc]));
    const list = TICKER_PAGES.map((page) => {
      const defaults = getDefaultTickerItem(page.id);
      const saved = byPageId[page.id] || {};
      return {
        ...defaults,
        pageId: page.id,
        label: page.label,
        path: page.path,
        textEn: saved.textEn ?? defaults.textEn,
        textAr: saved.textAr ?? defaults.textAr,
        isBold: toBoolean(saved.isBold),
        isUnderline: toBoolean(saved.isUnderline),
        isHighlight: toBoolean(saved.isHighlight),
        isBlink: toBoolean(saved.isBlink),
      };
    });
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
    await TickerSetting.findOneAndUpdate(
      { pageId: body.pageId },
      {
        textEn: String(body.textEn ?? ''),
        textAr: String(body.textAr ?? ''),
        isBold: toBoolean(body.isBold),
        isUnderline: toBoolean(body.isUnderline),
        isHighlight: toBoolean(body.isHighlight),
        isBlink: toBoolean(body.isBlink),
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

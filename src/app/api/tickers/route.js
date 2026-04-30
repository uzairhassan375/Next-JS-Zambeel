import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import TickerSetting from '../../../models/TickerSetting';
import { TICKER_PAGES, getDefaultTickerItem } from '../../../lib/tickerPages';

export const dynamic = 'force-dynamic';

function toBoolean(value) {
  return value === true;
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const validIds = new Set(TICKER_PAGES.map((p) => p.id));

    if (pageId && validIds.has(pageId)) {
      const defaults = getDefaultTickerItem(pageId);
      const doc = await TickerSetting.findOne({ pageId }).lean();
      return NextResponse.json({
        ...defaults,
        textEn: doc?.textEn ?? defaults.textEn,
        textAr: doc?.textAr ?? defaults.textAr,
        isBold: toBoolean(doc?.isBold),
        isUnderline: toBoolean(doc?.isUnderline),
        isHighlight: toBoolean(doc?.isHighlight),
        isBlink: toBoolean(doc?.isBlink),
      });
    }

    const docs = await TickerSetting.find({}).lean();
    const byPageId = Object.fromEntries(docs.map((doc) => [doc.pageId, doc]));
    const list = TICKER_PAGES.map((page) => {
      const defaults = getDefaultTickerItem(page.id);
      const doc = byPageId[page.id];
      return {
        ...defaults,
        textEn: doc?.textEn ?? defaults.textEn,
        textAr: doc?.textAr ?? defaults.textAr,
        isBold: toBoolean(doc?.isBold),
        isUnderline: toBoolean(doc?.isUnderline),
        isHighlight: toBoolean(doc?.isHighlight),
        isBlink: toBoolean(doc?.isBlink),
      };
    });
    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/tickers', e);
    return NextResponse.json({ error: 'Failed to fetch tickers' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { TICKER_PAGES } from '../../../lib/tickerPages';
import { PUBLIC_JSON_CACHE_HEADERS } from '../../../lib/contentCache';
import { getCachedAllTickers, getCachedTickerByPageId } from '../../../lib/tickerServer';

export const revalidate = 60;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const validIds = new Set(TICKER_PAGES.map((p) => p.id));

    if (pageId && validIds.has(pageId)) {
      const ticker = await getCachedTickerByPageId(pageId);
      return NextResponse.json(ticker, { headers: PUBLIC_JSON_CACHE_HEADERS });
    }

    const list = await getCachedAllTickers();
    return NextResponse.json(list, { headers: PUBLIC_JSON_CACHE_HEADERS });
  } catch (e) {
    console.error('GET /api/tickers', e);
    return NextResponse.json({ error: 'Failed to fetch tickers' }, { status: 500 });
  }
}

import 'server-only';
import { unstable_cache } from 'next/cache';
import { connectDB } from './db';
import TickerSetting from '../models/TickerSetting';
import { TICKER_PAGES, getDefaultTickerItem } from './tickerPages';
import { CONTENT_CACHE_SECONDS, TICKERS_CACHE_TAG } from './contentCache';

function toBoolean(value) {
  return value === true;
}

function mergeTickerDoc(pageId, doc) {
  const defaults = getDefaultTickerItem(pageId);
  return {
    ...defaults,
    textEn: doc?.textEn ?? defaults.textEn,
    textAr: doc?.textAr ?? defaults.textAr,
    isBold: toBoolean(doc?.isBold),
    isUnderline: toBoolean(doc?.isUnderline),
    isHighlight: toBoolean(doc?.isHighlight),
    isBlink: toBoolean(doc?.isBlink),
  };
}

async function fetchTickerByPageId(pageId) {
  await connectDB();
  const doc = await TickerSetting.findOne({ pageId }).lean();
  return mergeTickerDoc(pageId, doc);
}

async function fetchAllTickers() {
  await connectDB();
  const docs = await TickerSetting.find({}).lean();
  const byPageId = Object.fromEntries(docs.map((doc) => [doc.pageId, doc]));
  return TICKER_PAGES.map((page) => mergeTickerDoc(page.id, byPageId[page.id]));
}

export async function getCachedTickerByPageId(pageId) {
  return unstable_cache(
    () => fetchTickerByPageId(pageId),
    ['ticker', pageId],
    { revalidate: CONTENT_CACHE_SECONDS, tags: [TICKERS_CACHE_TAG, `ticker-${pageId}`] },
  )();
}

export async function getCachedAllTickers() {
  return unstable_cache(fetchAllTickers, ['tickers-all'], {
    revalidate: CONTENT_CACHE_SECONDS,
    tags: [TICKERS_CACHE_TAG],
  })();
}

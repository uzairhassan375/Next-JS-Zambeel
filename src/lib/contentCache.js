import 'server-only';

/** Public homepage/ticker cache TTL (seconds). */
export const CONTENT_CACHE_SECONDS = 60;

export const PUBLIC_JSON_CACHE_HEADERS = {
  'Cache-Control': `public, s-maxage=${CONTENT_CACHE_SECONDS}, stale-while-revalidate=${CONTENT_CACHE_SECONDS * 2}`,
};

export const HOMEPAGE_BLOGS_CACHE_TAG = 'homepage-blogs';
export const TICKERS_CACHE_TAG = 'tickers';

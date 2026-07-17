export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.myzambeel.com';

/**
 * Build an absolute canonical URL for a site path.
 * @param {string} path - e.g. '/', '/blog', '/pages/dropshipping-uae-and-ksa'
 * @param {'en'|'ar'} locale
 */
export function getCanonicalUrl(path = '/', locale = 'en') {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (locale === 'ar') {
    if (normalized === '/') return `${base}/ar`;
    if (normalized.startsWith('/ar')) return `${base}${normalized}`;
    return `${base}/ar${normalized}`;
  }

  if (normalized.startsWith('/ar')) {
    const withoutAr = normalized.replace(/^\/ar/, '') || '/';
    return withoutAr === '/' ? base : `${base}${withoutAr}`;
  }

  return normalized === '/' ? base : `${base}${normalized}`;
}

/**
 * Keep document titles within a search-friendly length.
 */
export function trimSeoTitle(title, maxLen = 55) {
  const value = String(title || '').trim();
  if (value.length <= maxLen) return value;
  return `${value.slice(0, maxLen - 1).trimEnd()}…`;
}

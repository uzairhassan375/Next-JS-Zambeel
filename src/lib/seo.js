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
 * Build the hreflang map for a site path (both locales + x-default).
 * @param {string} path - locale-less path, e.g. '/', '/blog', '/pages/zambeel-360'
 * @returns {{ en: string, ar: string, 'x-default': string }}
 */
export function getAlternateLanguages(path = '/') {
  return {
    en: getCanonicalUrl(path, 'en'),
    ar: getCanonicalUrl(path, 'ar'),
    'x-default': getCanonicalUrl(path, 'en'),
  };
}

/** Open Graph locale codes keyed by app locale. */
export const OG_LOCALES = { en: 'en_US', ar: 'ar_AR' };

/** Default social preview image (absolute). */
export const DEFAULT_OG_IMAGE = '/blue_logo.png';

/**
 * Pick a crawler-usable image: base64 data URIs can't be fetched by crawlers,
 * so fall back to the site default.
 */
export function getSocialImage(imageUrl) {
  const value = String(imageUrl || '').trim();
  if (!value || value.startsWith('data:')) return DEFAULT_OG_IMAGE;
  return value;
}

/**
 * Keep document titles within a search-friendly length.
 */
export function trimSeoTitle(title, maxLen = 55) {
  const value = String(title || '').trim();
  if (value.length <= maxLen) return value;
  return `${value.slice(0, maxLen - 1).trimEnd()}…`;
}

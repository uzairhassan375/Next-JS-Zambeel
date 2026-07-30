import { getAllBlogSlugsWithDates } from '../lib/blog';

// Make sure this exists in your .env file:
// NEXT_PUBLIC_SITE_URL=https://www.myzambeel.com
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.myzambeel.com';

/** Static routes (exclude admin & api) */
const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'about', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'learn-ecommerce', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'supplier', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'pages/dropshipping-uae-and-ksa', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/usa-dropshipping', priority: 0.85, changeFrequency: 'monthly' },
  { path: 'pages/zambeel-360', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/warehousing-3pl', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/amazon-usa', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/partner-agencies', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'pages/refund-replacement-policy', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'pages/terms-of-service', priority: 0.5, changeFrequency: 'yearly' },
];

/**
 * Safe URL builder (does NOT break https://)
 */
function buildUrl(path = '', locale = '') {
  let url = BASE_URL.replace(/\/$/, ''); // remove trailing slash only

  if (locale) {
    url += `/${locale}`;
  }

  if (path) {
    url += `/${path}`;
  }

  return url;
}

/** hreflang pair for a path, so each entry declares both language versions */
function languagesFor(path) {
  return {
    en: buildUrl(path),
    ar: buildUrl(path, 'ar'),
  };
}

export default async function sitemap() {
  const entries = [];

  // Static pages (English + Arabic). No lastModified: these are hand-authored
  // pages, and stamping "now" on every rebuild makes lastmod meaningless.
  for (const route of STATIC_ROUTES) {
    const languages = languagesFor(route.path);
    for (const locale of ['', 'ar']) {
      entries.push({
        url: buildUrl(route.path, locale),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      });
    }
  }

  // Blog posts (English + Arabic), with real last-modified dates
  try {
    const posts = await getAllBlogSlugsWithDates();

    const validPosts = posts?.filter((p) => p?.slug?.trim());

    for (const { slug, lastModified } of validPosts || []) {
      const safeSlug = encodeURIComponent(slug);
      const path = `blog/${safeSlug}`;
      const languages = languagesFor(path);

      for (const locale of ['', 'ar']) {
        entries.push({
          url: buildUrl(path, locale),
          lastModified: lastModified ? new Date(lastModified) : undefined,
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: { languages },
        });
      }
    }
  } catch (error) {
    console.error('Sitemap: Failed to fetch blog slugs', error);
  }

  return entries;
}

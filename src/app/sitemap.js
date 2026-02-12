import { getAllBlogSlugs } from '../lib/blog';

// Set NEXT_PUBLIC_SITE_URL in .env (e.g. https://www.myzambeel.com) for production sitemap URLs
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.myzambeel.com';

/** Static routes: English and Arabic (no admin or api) */
const STATIC_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: 'about', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'team', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'learn-ecommerce', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'supplier', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'pages/dropshipping-uae-and-ksa', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/zambeel-360', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/warehousing-3pl', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/partner-agencies', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'pages/refund-replacement-policy', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'pages/terms-of-service', priority: 0.5, changeFrequency: 'yearly' },
];

function toUrl(path, locale = '') {
  const segment = locale ? (path ? `${locale}/${path}` : locale) : path;
  const url = segment ? `${BASE_URL}/${segment}` : BASE_URL + '/';
  return url.replace(/\/+/g, '/').replace(/\/$/, '') || BASE_URL + '/';
}

export default async function sitemap() {
  const entries = [];

  // English static pages
  for (const route of STATIC_ROUTES) {
    entries.push({
      url: toUrl(route.path),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  // Arabic static pages
  for (const route of STATIC_ROUTES) {
    entries.push({
      url: toUrl(route.path, 'ar'),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  // Blog posts from database (English and Arabic URLs)
  try {
    const slugs = await getAllBlogSlugs();
    const validSlugs = slugs.filter((s) => s?.slug?.trim());
    for (const { slug } of validSlugs) {
      if (!slug) continue;
      entries.push({
        url: `${BASE_URL}/blog/${encodeURIComponent(slug)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
      entries.push({
        url: `${BASE_URL}/ar/blog/${encodeURIComponent(slug)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  } catch (e) {
    console.error('Sitemap: failed to fetch blog slugs', e);
  }

  return entries;
}

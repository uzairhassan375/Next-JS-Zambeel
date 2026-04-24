import { getAllBlogSlugs } from '../lib/blog';

// Make sure this exists in your .env file:
// NEXT_PUBLIC_SITE_URL=https://www.myzambeel.com
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.myzambeel.com';

/** Static routes (exclude admin & api) */
const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'about', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'team', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'learn-ecommerce', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'supplier', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'pages/dropshipping-uae-and-ksa', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/us-dropshipping', priority: 0.85, changeFrequency: 'monthly' },
  { path: 'pages/zambeel-360', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'pages/warehousing-3pl', priority: 0.9, changeFrequency: 'monthly' },
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

export default async function sitemap() {
  const entries = [];

  // English static pages
  for (const route of STATIC_ROUTES) {
    entries.push({
      url: buildUrl(route.path),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  // Arabic static pages
  for (const route of STATIC_ROUTES) {
    entries.push({
      url: buildUrl(route.path, 'ar'),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  // Blog posts (English + Arabic)
  try {
    const slugs = await getAllBlogSlugs();

    const validSlugs = slugs?.filter((s) => s?.slug?.trim());

    for (const { slug } of validSlugs || []) {
      const safeSlug = encodeURIComponent(slug);

      entries.push({
        url: buildUrl(`blog/${safeSlug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      entries.push({
        url: buildUrl(`blog/${safeSlug}`, 'ar'),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  } catch (error) {
    console.error('Sitemap: Failed to fetch blog slugs', error);
  }

  return entries;
}
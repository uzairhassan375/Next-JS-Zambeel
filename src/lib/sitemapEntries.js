import { getAllBlogSlugsWithDates } from './blog';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.myzambeel.com';

export const SITEMAP_CHILDREN = {
  pages: 'sitemap_pages_1.xml',
  blogs: 'sitemap_blogs_1.xml',
};

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

function buildUrl(path = '', locale = '') {
  let url = SITE_URL.replace(/\/$/, '');

  if (locale) {
    url += `/${locale}`;
  }

  if (path) {
    url += `/${path}`;
  }

  return url;
}

function sitemapUrl(filename) {
  return `${SITE_URL.replace(/\/$/, '')}/${filename}`;
}

/** hreflang alternates per Google multilingual sitemap guidance */
function languagesFor(path) {
  const en = buildUrl(path);
  const ar = buildUrl(path, 'ar');
  return {
    en,
    ar,
    'x-default': en,
  };
}

function entriesForRoute(route) {
  const languages = languagesFor(route.path);
  return ['', 'ar'].map((locale) => ({
    url: buildUrl(route.path, locale),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: { languages },
  }));
}

export function getPageSitemapEntries() {
  return STATIC_ROUTES.flatMap((route) => entriesForRoute(route));
}

export async function getBlogSitemapEntries() {
  const entries = [];

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

function latestModifiedDate(entries) {
  let latest = null;

  for (const entry of entries) {
    if (!entry.lastModified) continue;
    const date = entry.lastModified instanceof Date
      ? entry.lastModified
      : new Date(entry.lastModified);
    if (Number.isNaN(date.getTime())) continue;
    if (!latest || date > latest) latest = date;
  }

  return latest;
}

export async function getSitemapIndexEntries() {
  const blogEntries = await getBlogSitemapEntries();
  const blogLastModified = latestModifiedDate(blogEntries);

  const sitemaps = [
    { loc: sitemapUrl(SITEMAP_CHILDREN.pages) },
  ];

  if (blogEntries.length > 0) {
    sitemaps.push({
      loc: sitemapUrl(SITEMAP_CHILDREN.blogs),
      lastModified: blogLastModified,
    });
  }

  return sitemaps;
}

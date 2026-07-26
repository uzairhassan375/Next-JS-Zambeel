import 'server-only';
import { connectDB } from './db';
import PageMeta from '../models/PageMeta';
import {
  getCanonicalUrl,
  getAlternateLanguages,
  OG_LOCALES,
  DEFAULT_OG_IMAGE,
} from './seo';

/** Page IDs used across the site (route path without leading slash; 'home' for /) */
export const PAGE_IDS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'blog', label: 'Blog listing', path: '/blog' },
  { id: 'learn-ecommerce', label: 'Learn E-commerce', path: '/learn-ecommerce' },
  { id: 'supplier', label: 'Supplier', path: '/supplier' },
  { id: 'pages/dropshipping-uae-and-ksa', label: 'Dropshipping UAE & KSA', path: '/pages/dropshipping-uae-and-ksa' },
  { id: 'pages/usa-dropshipping', label: 'USA Dropshipping', path: '/pages/usa-dropshipping' },
  { id: 'pages/zambeel-360', label: 'Zambeel 360', path: '/pages/zambeel-360' },
  { id: 'pages/warehousing-3pl', label: 'Warehousing 3PL', path: '/pages/warehousing-3pl' },
  { id: 'pages/amazon-services', label: 'Amazon Services', path: '/pages/amazon-services' },
  { id: 'pages/partner-agencies', label: 'Partner Agencies', path: '/pages/partner-agencies' },
  { id: 'pages/refund-replacement-policy', label: 'Refund & Replacement Policy', path: '/pages/refund-replacement-policy' },
  { id: 'pages/terms-of-service', label: 'Terms of Service', path: '/pages/terms-of-service' },
];

/**
 * Get meta for a page. Server-only.
 * @param {string} pageId - e.g. 'home', 'about', 'blog'
 * @returns {Promise<{ metaTitleEn, metaTitleAr, metaDescriptionEn, metaDescriptionAr }|null>}
 */
export async function getPageMeta(pageId) {
  if (!pageId) return null;
  await connectDB();
  const doc = await PageMeta.findOne({ pageId }).lean();
  if (!doc) return null;
  return {
    metaTitleEn: doc.metaTitleEn || '',
    metaTitleAr: doc.metaTitleAr || '',
    metaDescriptionEn: doc.metaDescriptionEn || '',
    metaDescriptionAr: doc.metaDescriptionAr || '',
  };
}

/**
 * Get all page meta for admin. Server-only.
 * @returns {Promise<Array<{ pageId, metaTitleEn, metaTitleAr, metaDescriptionEn, metaDescriptionAr }>>}
 */
export async function getAllPageMeta() {
  await connectDB();
  const docs = await PageMeta.find({}).lean();
  const byId = Object.fromEntries(docs.map((d) => [d.pageId, d]));
  return PAGE_IDS.map(({ id }) => ({
    pageId: id,
    metaTitleEn: byId[id]?.metaTitleEn ?? '',
    metaTitleAr: byId[id]?.metaTitleAr ?? '',
    metaDescriptionEn: byId[id]?.metaDescriptionEn ?? '',
    metaDescriptionAr: byId[id]?.metaDescriptionAr ?? '',
  }));
}

/**
 * Build metadata object for a page using DB meta + fallbacks. Server-only.
 * @param {string} pageId - e.g. 'home', 'about'
 * @param {'en'|'ar'} locale
 * @param {{ title: string, description: string }} fallback
 * @returns {Promise<{ title: string, description: string, openGraph: { title, description, type: 'website' } }>}
 */
export async function buildMetadataForPage(pageId, locale, fallback) {
  const meta = await getPageMeta(pageId);
  const isAr = locale === 'ar';
  const title =
    (isAr ? meta?.metaTitleAr : meta?.metaTitleEn)?.trim() ||
    (isAr ? meta?.metaTitleEn : meta?.metaTitleAr)?.trim() ||
    fallback.title;
  const description =
    (isAr ? meta?.metaDescriptionAr : meta?.metaDescriptionEn)?.trim() ||
    (isAr ? meta?.metaDescriptionEn : meta?.metaDescriptionAr)?.trim() ||
    fallback.description;

  const page = PAGE_IDS.find((p) => p.id === pageId);
  const pagePath = page?.path || '/';
  const canonical = getCanonicalUrl(pagePath, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getAlternateLanguages(pagePath),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'Zambeel',
      locale: OG_LOCALES[isAr ? 'ar' : 'en'],
      alternateLocale: OG_LOCALES[isAr ? 'en' : 'ar'],
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

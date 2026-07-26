import 'server-only';
import { getBlogBySlug } from './blog';
import {
  getCanonicalUrl,
  getAlternateLanguages,
  getSocialImage,
  trimSeoTitle,
  OG_LOCALES,
} from './seo';

const BLOG_SUFFIX_EN = '| Zambeel';
const BLOG_SUFFIX_AR = '| زمبيل';

export async function buildBlogPostMetadata(slug, locale = 'en') {
  const isArabic = locale === 'ar';
  const post = await getBlogBySlug(slug);
  const path = `/blog/${slug}`;
  const canonical = getCanonicalUrl(path, locale);
  const alternates = {
    canonical,
    languages: getAlternateLanguages(path),
  };
  const ogLocale = OG_LOCALES[isArabic ? 'ar' : 'en'];
  const ogAlternateLocale = OG_LOCALES[isArabic ? 'en' : 'ar'];

  if (!post) {
    const title = isArabic ? `مقال المدونة ${BLOG_SUFFIX_AR}` : `Blog Post ${BLOG_SUFFIX_EN}`;
    const description = isArabic
      ? 'اقرأ مقالات زمبيل حول الدروبشيبينغ والتجارة الإلكترونية.'
      : 'Read our blog post.';
    const image = getSocialImage('');
    return {
      title,
      description,
      alternates,
      openGraph: {
        title,
        description,
        type: 'article',
        url: canonical,
        siteName: 'Zambeel',
        locale: ogLocale,
        alternateLocale: ogAlternateLocale,
        images: [image],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  }

  const metaTitle = isArabic
    ? post.metaTitleAr || post.titleAr || post.metaTitleEn || post.titleEn
    : post.metaTitleEn || post.titleEn || post.metaTitleAr || post.titleAr;

  const metaDescription = isArabic
    ? post.metaDescriptionAr || post.descriptionAr || post.metaDescriptionEn || post.descriptionEn
    : post.metaDescriptionEn || post.descriptionEn || post.metaDescriptionAr || post.descriptionAr;

  // Crawlers can't fetch base64 data URIs, so getSocialImage falls back to the site logo
  const imageUrl = getSocialImage(
    isArabic && (post.imageAr || '').trim() ? post.imageAr : post.image
  );

  const titleBase =
    trimSeoTitle(metaTitle || slug?.replace(/-/g, ' ') || 'Blog Post');
  const suffix = isArabic ? BLOG_SUFFIX_AR : BLOG_SUFFIX_EN;
  const title = `${titleBase} ${suffix}`;
  const description =
    metaDescription ||
    (isArabic ? `اقرأ مقالنا: ${titleBase}.` : `Read our blog post: ${titleBase}.`);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      siteName: 'Zambeel',
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      publishedTime: post.createdAt || undefined,
      modifiedTime: post.updatedAt || post.createdAt || undefined,
      images: [{ url: imageUrl, alt: titleBase }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

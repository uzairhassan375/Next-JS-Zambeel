import { getCanonicalUrl, getSocialImage } from '../../lib/seo';
import { BUSINESS_INFO } from '../../lib/businessInfo';

/**
 * BlogPosting JSON-LD for a blog detail page.
 * @param {{ post: object, locale: 'en'|'ar' }} props
 */
export default function ArticleSchema({ post, locale = 'en' }) {
  if (!post?.slug) return null;

  const isArabic = locale === 'ar';
  const headline = isArabic
    ? post.titleAr || post.titleEn || post.slug
    : post.titleEn || post.titleAr || post.slug;
  const description = isArabic
    ? post.metaDescriptionAr || post.descriptionAr || post.metaDescriptionEn || post.descriptionEn
    : post.metaDescriptionEn || post.descriptionEn || post.metaDescriptionAr || post.descriptionAr;
  // Base64 data URIs are useless to crawlers, so this falls back to the site logo
  const image = getSocialImage(
    isArabic && (post.imageAr || '').trim() ? post.imageAr : post.image
  );
  const absoluteImage = image.startsWith('http')
    ? image
    : `${BUSINESS_INFO.url}${image}`;
  const url = getCanonicalUrl(`/blog/${post.slug}`, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description: description || undefined,
    image: [absoluteImage],
    datePublished: post.createdAt || undefined,
    dateModified: post.updatedAt || post.createdAt || undefined,
    inLanguage: isArabic ? 'ar' : 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    author: { '@id': `${BUSINESS_INFO.url}/#organization` },
    publisher: { '@id': `${BUSINESS_INFO.url}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

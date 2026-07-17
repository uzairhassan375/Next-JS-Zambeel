import 'server-only';
import { getBlogBySlug } from './blog';
import { getCanonicalUrl, trimSeoTitle } from './seo';

const BLOG_SUFFIX_EN = '| Zambeel';
const BLOG_SUFFIX_AR = '| زمبيل';

export async function buildBlogPostMetadata(slug, locale = 'en') {
  const isArabic = locale === 'ar';
  const post = await getBlogBySlug(slug);

  if (!post) {
    const title = isArabic ? `مقال المدونة ${BLOG_SUFFIX_AR}` : `Blog Post ${BLOG_SUFFIX_EN}`;
    return {
      title,
      description: isArabic
        ? 'اقرأ مقالات زمبيل حول الدروبشيبينغ والتجارة الإلكترونية.'
        : 'Read our blog post.',
      alternates: {
        canonical: getCanonicalUrl(`/blog/${slug}`, locale),
      },
      openGraph: {
        title,
        description: isArabic
          ? 'اقرأ مقالات زمبيل حول الدروبشيبينغ والتجارة الإلكترونية.'
          : 'Read our blog post.',
        type: 'article',
      },
    };
  }

  const metaTitle = isArabic
    ? post.metaTitleAr || post.titleAr || post.metaTitleEn || post.titleEn
    : post.metaTitleEn || post.titleEn || post.metaTitleAr || post.titleAr;

  const metaDescription = isArabic
    ? post.metaDescriptionAr || post.descriptionAr || post.metaDescriptionEn || post.descriptionEn
    : post.metaDescriptionEn || post.descriptionEn || post.metaDescriptionAr || post.descriptionAr;

  const imageUrl =
    isArabic && (post.imageAr || '').trim() ? post.imageAr : post.image;

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
    alternates: {
      canonical: getCanonicalUrl(`/blog/${slug}`, locale),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      images: imageUrl ? [{ url: imageUrl, alt: titleBase }] : undefined,
    },
  };
}

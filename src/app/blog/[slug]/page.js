import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getBlogBySlug, getAllBlogSlugs } from '../../../lib/blog';
import BlogDetailPage from '../../../pages/BlogDetailPage';

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const isArabic = locale === 'ar';
  
  const post = await getBlogBySlug(slug);
  if (!post) {
    return {
      title: 'Blog Post | Zambeel',
      description: 'Read our blog post.',
    };
  }
  
  // Use meta fields if available, otherwise fall back to title/description
  const metaTitle = isArabic 
    ? (post.metaTitleAr || post.titleAr || post.metaTitleEn || post.titleEn)
    : (post.metaTitleEn || post.titleEn || post.metaTitleAr || post.titleAr);
  
  const metaDescription = isArabic
    ? (post.metaDescriptionAr || post.descriptionAr || post.metaDescriptionEn || post.descriptionEn)
    : (post.metaDescriptionEn || post.descriptionEn || post.metaDescriptionAr || post.descriptionAr);
  
  // Fallback to slug if no title available
  const title = metaTitle || slug?.replace(/-/g, ' ') || 'Blog Post';
  const description = metaDescription || `Read our blog post: ${title}.`;
  
  return {
    title: `${title} | Zambeel Blog`,
    description,
    openGraph: {
      title: `${title} | Zambeel Blog`,
      description,
      type: 'article',
      images: post.image ? [{ url: post.image, alt: title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();
  return <BlogDetailPage post={post} />;
}

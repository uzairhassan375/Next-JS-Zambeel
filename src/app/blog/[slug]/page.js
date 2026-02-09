import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '../../../lib/blog';
import BlogDetailPage from '../../../pages/BlogDetailPage';

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return {
      title: 'Blog Post | Zambeel',
      description: 'Read our blog post.',
    };
  }
  const title = post.titleEn || post.titleAr || slug?.replace(/-/g, ' ') || 'Blog Post';
  const description =
    post.descriptionEn || post.descriptionAr || `Read our blog post: ${title}.`;
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

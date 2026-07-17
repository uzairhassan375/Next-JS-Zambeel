import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getBlogBySlug, getAllBlogSlugs } from '../../../lib/blog';
import { buildBlogPostMetadata } from '../../../lib/blogMetadata';
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
  return buildBlogPostMetadata(slug, locale);
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();
  return <BlogDetailPage post={post} />;
}

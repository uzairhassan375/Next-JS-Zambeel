import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getBlogBySlug, getAllBlogSlugs } from '../../../lib/blog';
import { buildBlogPostMetadata } from '../../../lib/blogMetadata';
import BlogDetailPage from '../../../pages/BlogDetailPage';
import ArticleSchema from '../../../components/seo/ArticleSchema';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';

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
  return (
    <>
      <ArticleSchema post={post} locale="en" />
      <BreadcrumbSchema
        locale="en"
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.titleEn || post.slug, path: `/blog/${post.slug}` },
        ]}
      />
      <BlogDetailPage post={post} />
    </>
  );
}

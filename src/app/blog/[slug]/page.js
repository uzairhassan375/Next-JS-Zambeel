import { headers } from 'next/headers';
import BlogDetailPage from '../../../pages/BlogDetailPage';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  
  // Basic metadata for blog posts - can be enhanced with actual blog data
  return {
    title: `${slug ? slug.replace(/-/g, ' ') : 'Blog Post'} - Zambeel Blog`,
    description: `Read our blog post about ${slug ? slug.replace(/-/g, ' ') : 'e-commerce'}. Get insights and tips on dropshipping, e-commerce business, and more.`,
    openGraph: {
      title: `${slug ? slug.replace(/-/g, ' ') : 'Blog Post'} - Zambeel Blog`,
      description: `Read our blog post about ${slug ? slug.replace(/-/g, ' ') : 'e-commerce'}. Get insights and tips on dropshipping, e-commerce business, and more.`,
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}


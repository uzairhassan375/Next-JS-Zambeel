import { headers } from 'next/headers';
import { getBlogs } from '../../lib/blog';
import { buildMetadataForPage } from '../../lib/pageMeta';
import BlogListingPage from '../../pages/BlogListingPage';

export const revalidate = 1800; // ISR: revalidate every 30 minutes

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const fallback = {
    title: 'Blog - E-commerce Insights & Tips | Zambeel',
    description: 'Read the latest e-commerce insights, tips, and guides from Zambeel. Learn about dropshipping, 3PL services, product sourcing, and more.',
  };
  return buildMetadataForPage('blog', locale, fallback);
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogListingPage blogs={blogs} />;
}

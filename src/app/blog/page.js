import { getBlogs } from '../../lib/blog';
import BlogListingPage from '../../pages/BlogListingPage';

export const revalidate = 1800; // ISR: revalidate every 30 minutes

export async function generateMetadata() {
  return {
    title: 'Blog - E-commerce Insights & Tips | Zambeel',
    description:
      'Read the latest e-commerce insights, tips, and guides from Zambeel. Learn about dropshipping, 3PL services, product sourcing, and more.',
    openGraph: {
      title: 'Blog - E-commerce Insights & Tips | Zambeel',
      description:
        'Read the latest e-commerce insights, tips, and guides from Zambeel. Learn about dropshipping, 3PL services, product sourcing, and more.',
      type: 'website',
    },
  };
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogListingPage blogs={blogs} />;
}

import { headers } from 'next/headers';
import BlogListingPage from '../../pages/BlogListingPage';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  return {
    title: 'Blog - E-commerce Insights & Tips | Zambeel',
    description: 'Read the latest e-commerce insights, tips, and guides from Zambeel. Learn about dropshipping, 3PL services, product sourcing, and more.',
    openGraph: {
      title: 'Blog - E-commerce Insights & Tips | Zambeel',
      description: 'Read the latest e-commerce insights, tips, and guides from Zambeel. Learn about dropshipping, 3PL services, product sourcing, and more.',
      type: 'website',
    },
  };
}

export default function BlogPage() {
  return <BlogListingPage />;
}


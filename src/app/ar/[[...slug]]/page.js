import { Suspense } from 'react';
import HomePage from '../../../pages/HomePage';
import AboutPage from '../../../pages/AboutPage';
import BlogListingPage from '../../../pages/BlogListingPage';
import BlogDetailPage from '../../../pages/BlogDetailPage';
import SuperClassPage from '../../../pages/SuperClassPage';
import TeamPage from '../../../pages/TeamPage';
import SupplierWrapper from './SupplierWrapper';
import DropshippingPage from '../../../pages/DropshippingPage';
import Zambeel360Page from '../../../pages/Zambeel360Page';
import Zambeel3PLPage from '../../../pages/Zambeel3PLPage';

// Loading fallback
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E3B78] mx-auto"></div>
        <p className="mt-4 text-[#2E3B78]">Loading...</p>
      </div>
    </div>
  );
}

// Route mapping for Arabic pages
const routeMap = {
  '': HomePage,
  'about': AboutPage,
  'blog': BlogListingPage,
  'learn-ecommerce': SuperClassPage,
  'team': TeamPage,
  'supplier': SupplierWrapper,
  'pages/dropshipping-uae-and-ksa': DropshippingPage,
  'pages/zambeel-360': Zambeel360Page,
  'pages/warehousing-3pl': Zambeel3PLPage,
};

export default async function ArabicPage({ params }) {
  const { slug } = await params;
  
  // Handle empty slug (homepage)
  const routePath = slug && slug.length > 0 ? slug.join('/') : '';
  
  // Handle blog detail pages (blog/[slug])
  if (routePath.startsWith('blog/')) {
    const parts = routePath.split('/');
    if (parts.length === 2 && parts[0] === 'blog') {
      const blogSlug = parts[1];
      return (
        <Suspense fallback={<PageFallback />}>
          <BlogDetailPage slug={blogSlug} />
        </Suspense>
      );
    }
  }
  
  // Get the component for the route
  const PageComponent = routeMap[routePath];
  
  if (!PageComponent) {
    // 404 - route not found
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2E3B78] mb-4">404</h1>
          <p className="text-lg text-gray-600">Page not found</p>
        </div>
      </div>
    );
  }
  
  return (
    <Suspense fallback={<PageFallback />}>
      <PageComponent />
    </Suspense>
  );
}


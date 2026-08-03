/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
  async headers() {
    const xmlHeaders = [
      {
        key: 'Content-Type',
        value: 'text/xml; charset=utf-8',
      },
    ];

    return [
      { source: '/sitemap.xml', headers: xmlHeaders },
      { source: '/sitemap_pages_1.xml', headers: xmlHeaders },
      { source: '/sitemap_blogs_1.xml', headers: xmlHeaders },
    ];
  },
  async redirects() {
    // `src/pages/*.jsx` holds the page *components*, but Next also treats src/pages
    // as the legacy Pages Router, which published /HomePage, /DropshippingPage, ...
    // as duplicate, title-less, unstyled copies of the real App Router pages.
    // 301 them onto their canonical URLs so nothing serves duplicate content.
    const legacyComponentRoutes = [
      ['/HomePage', '/'],
      ['/AboutPage', '/about'],
      ['/BlogListingPage', '/blog'],
      ['/BlogDetailPage', '/blog'],
      ['/LearnEcommercePage', '/learn-ecommerce'],
      ['/SuperClassPage', '/learn-ecommerce'],
      ['/DropshippingPage', '/pages/dropshipping-uae-and-ksa'],
      ['/USDropshippingPage', '/pages/usa-dropshipping'],
      ['/Zambeel360Page', '/pages/zambeel-360'],
      ['/Zambeel3PLPage', '/pages/warehousing-3pl'],
      ['/AmazonUsaPage', '/pages/amazon-usa'],
      ['/AmazonServicesPage', '/pages/amazon-usa'],
      ['/PartnerAgenciesPage', '/pages/partner-agencies'],
      ['/RefundReplacementPolicyPage', '/pages/refund-replacement-policy'],
      ['/TermsOfServicePage', '/pages/terms-of-service'],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));

    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/ar/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      ...legacyComponentRoutes,
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'myzambeel.com' }],
        destination: 'https://www.myzambeel.com/:path*',
        permanent: true,
      },
      
      // Legacy slug for the USA dropshipping page — 301 so the old URL consolidates
      {
        source: '/pages/us-dropshipping',
        destination: '/pages/usa-dropshipping',
        permanent: true,
      },
      {
        source: '/ar/pages/us-dropshipping',
        destination: '/ar/pages/usa-dropshipping',
        permanent: true,
      },
      // Legacy slug for Amazon USA page
      {
        source: '/pages/amazon-services',
        destination: '/pages/amazon-usa',
        permanent: true,
      },
      {
        source: '/ar/pages/amazon-services',
        destination: '/ar/pages/amazon-usa',
        permanent: true,
      },
      {
        source: '/pages/products',
        destination: 'https://products.myzambeel.com',
        permanent: true,
      },
      {
        source: '/pages/products/:path*',
        destination: 'https://products.myzambeel.com/:path*',
        permanent: true,
      },
      {
        source: '/ar/pages/products',
        destination: 'https://products.myzambeel.com',
        permanent: true,
      },
      {
        source: '/ar/pages/products/:path*',
        destination: 'https://products.myzambeel.com/:path*',
        permanent: true,
      },
      {
        source: '/pages/zambeel_signup',
        destination: 'https://portal.myzambeel.com',
        permanent: true,
      },
      {
        source: '/ar/pages/zambeel_signup',
        destination: 'https://portal.myzambeel.com',
        permanent: true,
      },
      {
        source: '/products/:slug*',
        destination: 'https://products.myzambeel.com/products/:slug*',
        permanent: true
      },
      {
        source: '/collections/:collection*',
        destination: 'https://products.myzambeel.com/collections/:collection*',
        permanent: true
      },
      {
        source: '/pages/unauthorised-access',
        destination: 'https://products.myzambeel.com/pages/unauthorised-access',
        permanent: true
      }
    ];
  },
};

export default nextConfig;

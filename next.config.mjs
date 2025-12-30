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
    ],
  },
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;

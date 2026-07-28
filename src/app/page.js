import { Suspense } from 'react';
import { headers } from 'next/headers';
import HomePage from '../pages/HomePage';
import { getHomepageBlogSelection } from '../lib/blog';
import { buildMetadataForPage } from '../lib/pageMeta';
import enTranslations from '../locales/en/translation.json';
import arTranslations from '../locales/ar/translation.json';

function HomePageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E3B78] mx-auto"></div>
        <p className="mt-4 text-[#2E3B78]">Loading...</p>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const fallback = {
    title: 'Zambeel - One Platform for Your E-commerce Business',
    description: translations.footer.seoDescription || translations.homepage.whereToSell.seoDescription || 'Zambeel E-commerce Solutions',
  };
  return buildMetadataForPage('home', locale, fallback);
}

export default async function Home() {
  // Fetch the admin-selected homepage blogs on the server (no client wait)
  const { web, mobile } = await getHomepageBlogSelection();
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePage initialBlogs={web} initialMobileBlogs={mobile} />
    </Suspense>
  );
}



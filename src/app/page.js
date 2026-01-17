import { Suspense } from 'react';
import { headers } from 'next/headers';
import HomePage from '../pages/HomePage';
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
  
  return {
    title: 'Zambeel - One Platform for Your E-commerce Business',
    description: translations.footer.seoDescription || translations.homepage.whereToSell.seoDescription || 'Zambeel E-commerce Solutions',
    openGraph: {
      title: 'Zambeel - One Platform for Your E-commerce Business',
      description: translations.footer.seoDescription || translations.homepage.whereToSell.seoDescription || 'Zambeel E-commerce Solutions',
      type: 'website',
    },
  };
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePage />
    </Suspense>
  );
}



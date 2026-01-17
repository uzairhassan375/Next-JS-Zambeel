import { headers } from 'next/headers';
import AboutPage from '../../pages/AboutPage';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  return {
    title: `${translations.about.title} - Zambeel`,
    description: translations.about.description || 'Learn about Zambeel and our mission to simplify e-commerce',
    openGraph: {
      title: `${translations.about.title} - Zambeel`,
      description: translations.about.description || 'Learn about Zambeel and our mission to simplify e-commerce',
      type: 'website',
    },
  };
}

export default function About() {
  return <AboutPage />;
}



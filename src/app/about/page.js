import { headers } from 'next/headers';
import AboutPage from '../../pages/AboutPage';
import { buildMetadataForPage } from '../../lib/pageMeta';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const fallback = {
    title: `${translations.about.title} - Zambeel`,
    description: translations.about.description || 'Learn about Zambeel and our mission to simplify e-commerce',
  };
  return buildMetadataForPage('about', locale, fallback);
}

export default function About() {
  return <AboutPage />;
}



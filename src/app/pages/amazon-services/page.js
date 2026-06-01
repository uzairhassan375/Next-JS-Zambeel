import { headers } from 'next/headers';
import AmazonServicesPage from '../../../pages/AmazonServicesPage';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const fallback = {
    title: `${translations.amazon.hero.title} - ${translations.amazon.hero.subtitle} | Zambeel`,
    description: translations.amazon.whyZambeel.description,
  };
  return buildMetadataForPage('pages/amazon-services', locale, fallback);
}

export default function AmazonServices() {
  return <AmazonServicesPage />;
}

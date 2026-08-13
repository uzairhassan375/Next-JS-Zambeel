import { headers } from 'next/headers';
import Zambeel3PLPage from '../../../pages/Zambeel3PLPage';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const fallback = {
    title: translations.zambeel3PL?.metaTitle || 'Zambeel 3PL Warehousing | Zambeel',
    description: translations.zambeel3PL.whyZambeel.description || 'Get warehousing, inventory management and efficient fulfillment with Zambeel 3PL service',
  };
  return buildMetadataForPage('pages/warehousing-3pl', locale, fallback);
}

export default function Zambeel3PL() {
  return <Zambeel3PLPage />;
}


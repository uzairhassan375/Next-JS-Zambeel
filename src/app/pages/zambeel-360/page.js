import { headers } from 'next/headers';
import Zambeel360Page from '../../../pages/Zambeel360Page';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const fallback = {
    title: translations.zambeel360?.metaTitle || 'Zambeel 360 | Source from China | Zambeel',
    description: translations.zambeel360.whatIs.description || 'Source high quality products from China with Zambeel 360 - full service from sourcing to delivery',
  };
  return buildMetadataForPage('pages/zambeel-360', locale, fallback);
}

export default function Zambeel360() {
  return <Zambeel360Page />;
}


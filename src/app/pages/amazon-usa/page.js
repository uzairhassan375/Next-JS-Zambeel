import { headers } from 'next/headers';
import AmazonUsaPage from '../../../pages/AmazonUsaPage';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const t = translations.amazon || {};
  const fallback = {
    title: t.metaTitle || `${t.hero?.title} - ${t.hero?.subtitle} | Zambeel`,
    description: t.metaDescription || t.goldPlan?.description,
  };
  return buildMetadataForPage('pages/amazon-usa', locale, fallback);
}

export default function AmazonUsa() {
  return <AmazonUsaPage />;
}

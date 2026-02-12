import { headers } from 'next/headers';
import PartnerAgenciesPage from '../../../pages/PartnerAgenciesPage';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const title = translations.partnerAgencies?.title || 'Partner Agencies';
  const description = translations.partnerAgencies?.subtitle || 'Connect with trusted partners who can help grow your business.';
  const fallback = { title: `${title} - Zambeel`, description };
  return buildMetadataForPage('pages/partner-agencies', locale, fallback);
}

export default function PartnerAgencies() {
  return <PartnerAgenciesPage />;
}

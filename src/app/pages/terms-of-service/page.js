import { headers } from 'next/headers';
import TermsOfServicePage from '../../../pages/TermsOfServicePage';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const title = `${translations.footer?.termsOfService || 'Terms of Service'} - Zambeel`;
  const fallback = { title, description: 'Reseller Agreement - Terms and conditions for using Zambeel drop-shipping services.' };
  return buildMetadataForPage('pages/terms-of-service', locale, fallback);
}

export default function TermsOfService() {
  return <TermsOfServicePage />;
}

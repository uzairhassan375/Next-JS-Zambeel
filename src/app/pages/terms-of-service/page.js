import { headers } from 'next/headers';
import TermsOfServicePage from '../../../pages/TermsOfServicePage';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;

  return {
    title: `${translations.footer?.termsOfService || 'Terms of Service'} - Zambeel`,
    description: 'Reseller Agreement - Terms and conditions for using Zambeel drop-shipping services.',
    openGraph: {
      title: `${translations.footer?.termsOfService || 'Terms of Service'} - Zambeel`,
      description: 'Reseller Agreement - Terms and conditions for using Zambeel drop-shipping services.',
      type: 'website',
    },
  };
}

export default function TermsOfService() {
  return <TermsOfServicePage />;
}

import PartnerAgenciesPage from '../../../pages/PartnerAgenciesPage';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;

  const title = translations.partnerAgencies?.title || 'Partner Agencies';
  const description = translations.partnerAgencies?.subtitle || 'Connect with trusted partners who can help grow your business.';

  return {
    title: `${title} - Zambeel`,
    description: description,
    openGraph: {
      title: `${title} - Zambeel`,
      description: description,
      type: 'website',
    },
  };
}

export default function PartnerAgencies() {
  return <PartnerAgenciesPage />;
}

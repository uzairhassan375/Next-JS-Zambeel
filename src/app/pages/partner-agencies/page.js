import PartnerAgenciesPage from '../../../pages/PartnerAgenciesPage';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  return {
    title: `${translations.header?.trustedPartners || 'Trusted Partners'} - Zambeel`,
    description: translations.comingSoon?.trustedPartners?.description || 'Connect with trusted partners who can help grow your business',
    openGraph: {
      title: `${translations.header?.trustedPartners || 'Trusted Partners'} - Zambeel`,
      description: translations.comingSoon?.trustedPartners?.description || 'Connect with trusted partners who can help grow your business',
      type: 'website',
    },
  };
}

export default function PartnerAgencies() {
  return <PartnerAgenciesPage />;
}

import PartnerAgenciesClient from './PartnerAgenciesClient';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  const title = translations.comingSoon?.trustedPartners?.title || 'Trusted Partners';
  const description = translations.comingSoon?.trustedPartners?.description || 'We are working hard to bring you an amazing partner network. Stay tuned for updates!';
  
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
  return <PartnerAgenciesClient />;
}

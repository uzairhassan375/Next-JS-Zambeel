import { headers } from 'next/headers';
import Zambeel3PLPage from '../../../pages/Zambeel3PLPage';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  return {
    title: `${translations.zambeel3PL.hero.title} - ${translations.zambeel3PL.hero.subtitle} | Zambeel`,
    description: translations.zambeel3PL.whyZambeel.description || 'Get warehousing, inventory management and efficient fulfillment with Zambeel 3PL service',
    openGraph: {
      title: `${translations.zambeel3PL.hero.title} - ${translations.zambeel3PL.hero.subtitle} | Zambeel`,
      description: translations.zambeel3PL.whyZambeel.description || 'Get warehousing, inventory management and efficient fulfillment with Zambeel 3PL service',
      type: 'website',
    },
  };
}

export default function Zambeel3PL() {
  return <Zambeel3PLPage />;
}


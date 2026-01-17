import { headers } from 'next/headers';
import Zambeel360Page from '../../../pages/Zambeel360Page';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  return {
    title: `${translations.zambeel360.hero.title} - ${translations.zambeel360.hero.subtitle} | Zambeel`,
    description: translations.zambeel360.whatIs.description || 'Source high quality products from China with Zambeel 360 - full service from sourcing to delivery',
    openGraph: {
      title: `${translations.zambeel360.hero.title} - ${translations.zambeel360.hero.subtitle} | Zambeel`,
      description: translations.zambeel360.whatIs.description || 'Source high quality products from China with Zambeel 360 - full service from sourcing to delivery',
      type: 'website',
    },
  };
}

export default function Zambeel360() {
  return <Zambeel360Page />;
}


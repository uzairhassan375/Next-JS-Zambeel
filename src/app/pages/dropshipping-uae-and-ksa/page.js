import { headers } from 'next/headers';
import DropshippingPage from '../../../pages/DropshippingPage';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  return {
    title: `${translations.dropshipping.hero.title} - ${translations.dropshipping.hero.subtitle} | Zambeel`,
    description: translations.dropshipping.whyZambeel.description || 'Start selling without inventory or business registration hassles with Zambeel Dropshipping',
    openGraph: {
      title: `${translations.dropshipping.hero.title} - ${translations.dropshipping.hero.subtitle} | Zambeel`,
      description: translations.dropshipping.whyZambeel.description || 'Start selling without inventory or business registration hassles with Zambeel Dropshipping',
      type: 'website',
    },
  };
}

export default function Dropshipping() {
  return <DropshippingPage />;
}


import { headers } from 'next/headers';
import SuperClassWrapper from '../../components/SuperClassWrapper';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  // Use superClass translations if available, otherwise fallback to learnEcommerce
  const title = translations.superClass?.hero?.title || translations.learnEcommerce?.hero?.title || 'Learn E-commerce';
  const description = translations.learnEcommerce?.hero?.description || translations.superClass?.hero?.subtitle || 'Learn e-commerce with Zambeel - master classes to help you understand and learn e-commerce';
  
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

export default function LearnEcommerce() {
  return <SuperClassWrapper />;
}



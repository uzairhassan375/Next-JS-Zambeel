import { headers } from 'next/headers';
import SuperClassWrapper from '../../components/SuperClassWrapper';
import { buildMetadataForPage } from '../../lib/pageMeta';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const title = translations.superClass?.hero?.title || translations.learnEcommerce?.hero?.title || 'Learn E-commerce';
  const description = translations.learnEcommerce?.hero?.description || translations.superClass?.hero?.subtitle || 'Learn e-commerce with Zambeel - master classes to help you understand and learn e-commerce';
  const fallback = { title: `${title} - Zambeel`, description };
  return buildMetadataForPage('learn-ecommerce', locale, fallback);
}

export default function LearnEcommerce() {
  return <SuperClassWrapper />;
}



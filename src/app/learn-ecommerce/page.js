import { headers } from 'next/headers';
import SuperClassPage from '../../pages/SuperClassPage';
import { buildMetadataForPage } from '../../lib/pageMeta';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export const revalidate = 60;

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const fallback = {
    title: translations.learnEcommerce?.metaTitle || 'Learn E-commerce | Zambeel SuperClass',
    description:
      translations.learnEcommerce?.metaDescription ||
      translations.learnEcommerce?.hero?.description ||
      'Learn e-commerce with Zambeel — live masterclasses for dropshipping and online business growth.',
  };
  return buildMetadataForPage('learn-ecommerce', locale, fallback);
}

export default async function LearnEcommerce() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const intro =
    translations.learnEcommerce?.seoIntro ||
    'Learn e-commerce with Zambeel through live masterclasses covering product research, store setup, ads, and scaling across GCC and global markets.';

  return (
    <>
      <h1 className="sr-only">
        {translations.learnEcommerce?.hero?.title || 'Learn E-commerce with Zambeel'}
      </h1>
      <p className="sr-only">{intro}</p>
      <SuperClassPage />
    </>
  );
}



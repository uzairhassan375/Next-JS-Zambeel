import { headers } from 'next/headers';
import SupplierClient from './SupplierClient.jsx';
import { buildMetadataForPage } from '../../lib/pageMeta';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const title = translations.comingSoon?.supplier?.title || 'Become a Supplier';
  const description = translations.comingSoon?.supplier?.description || 'Join our supplier network and grow your business with Zambeel. We are preparing something special for you!';
  const fallback = { title: `${title} - Zambeel`, description };
  return buildMetadataForPage('supplier', locale, fallback);
}

export default function Supplier() {
  return <SupplierClient />;
}



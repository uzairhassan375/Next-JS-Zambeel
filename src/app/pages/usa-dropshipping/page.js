import { headers } from 'next/headers';
import USDropshippingPage from '../../../pages/USDropshippingPage';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import enTranslations from '../../../locales/en/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const t = enTranslations?.usDropshipping || {};
  const fallback = {
    title: t.metaTitle || 'USA Dropshipping | Zambeel',
    description:
      t.metaDescription ||
      'Zambeel USA dropshipping — start without US company registration or bank account.',
  };
  return buildMetadataForPage('pages/usa-dropshipping', locale, fallback);
}

export default function USDropshipping() {
  return <USDropshippingPage />;
}

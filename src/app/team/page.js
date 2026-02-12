import { headers } from 'next/headers';
import TeamPage from '../../pages/TeamPage';
import { buildMetadataForPage } from '../../lib/pageMeta';
import enTranslations from '../../locales/en/translation.json';
import arTranslations from '../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const fallback = {
    title: `${translations.team.title} - Zambeel`,
    description: translations.team.subtitle || 'Meet the team behind Zambeel\'s mission to simplify e-commerce',
  };
  return buildMetadataForPage('team', locale, fallback);
}

export default function Team() {
  return <TeamPage />;
}



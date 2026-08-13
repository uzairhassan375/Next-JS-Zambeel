import { headers } from 'next/headers';
import PartnerAgenciesPage from '../../../pages/PartnerAgenciesPage';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import { connectDB } from '../../../lib/db';
import PartnerAgency from '../../../models/PartnerAgency';
import { partnerAgenciesForResponse } from '../../../lib/partnerAgencyResponse';
import { getCachedOrFetch, getCachedPartnerAgencies } from '../../../lib/partnerAgenciesCache';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const title = translations.partnerAgencies?.title || 'Partner Agencies';
  const description = translations.partnerAgencies?.subtitle || 'Connect with trusted partners who can help grow your business.';
  const fallback = { title: translations.partnerAgencies?.metaTitle || 'Partner Agencies | Zambeel', description };
  return buildMetadataForPage('pages/partner-agencies', locale, fallback);
}

export const revalidate = 0;

export default async function PartnerAgencies() {
  let initialAgencies = [];
  try {
    await connectDB();
    initialAgencies = await getCachedOrFetch(
      async () => {
        const list = await PartnerAgency.find({})
          .sort({ tier: 1, order: 1, createdAt: 1 })
          .lean();
        return partnerAgenciesForResponse(list);
      },
      async (cacheTimestamp) => {
        const [latest, count] = await Promise.all([
          PartnerAgency.findOne().sort({ updatedAt: -1 }).select('updatedAt').lean(),
          PartnerAgency.countDocuments(),
        ]);
        const cached = getCachedPartnerAgencies();
        const cachedCount = Array.isArray(cached) ? cached.length : 0;
        if (count !== cachedCount) return true;
        if (!latest || !latest.updatedAt) return false;
        return new Date(latest.updatedAt).getTime() > cacheTimestamp;
      }
    );
  } catch {
    // leave initialAgencies as [] so client can refetch
  }
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  const copy = translations?.partnerAgencies ? { ...translations.partnerAgencies } : {};
  const serialized = JSON.parse(JSON.stringify(initialAgencies));
  return <PartnerAgenciesPage initialAgencies={serialized} initialCopy={copy} />;
}

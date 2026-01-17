'use client';

import { Suspense } from 'react';
import ComingSoon from '../../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

function PartnerAgenciesFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E3B78] mx-auto"></div>
        <p className="mt-4 text-[#2E3B78]">Loading...</p>
      </div>
    </div>
  );
}

function PartnerAgenciesContent() {
  const { t } = useTranslation();

  return (
    <ComingSoon
      title={t('comingSoon.trustedPartners.title')}
      description={t('comingSoon.trustedPartners.description')}
      cookieName="trusted_partners_countdown_target"
    />
  );
}

export default function PartnerAgencies() {
  return (
    <Suspense fallback={<PartnerAgenciesFallback />}>
      <PartnerAgenciesContent />
    </Suspense>
  );
}

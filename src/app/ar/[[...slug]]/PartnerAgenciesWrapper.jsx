'use client';

import ComingSoon from '../../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

export default function PartnerAgenciesWrapper() {
  const { t } = useTranslation();
  
  return (
    <ComingSoon
      title={t('comingSoon.trustedPartners.title')}
      description={t('comingSoon.trustedPartners.description')}
      cookieName="trusted_partners_countdown_target"
    />
  );
}

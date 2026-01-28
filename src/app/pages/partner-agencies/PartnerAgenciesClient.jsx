'use client';

import ComingSoon from '../../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

export default function PartnerAgenciesClient() {
  const { t } = useTranslation();
  
  return (
    <ComingSoon
      title={t('comingSoon.trustedPartners.title') || 'Trusted Partners'}
      description={t('comingSoon.trustedPartners.description') || 'We are working hard to bring you an amazing partner network. Stay tuned for updates!'}
      cookieName="partner_agencies_countdown_target"
    />
  );
}

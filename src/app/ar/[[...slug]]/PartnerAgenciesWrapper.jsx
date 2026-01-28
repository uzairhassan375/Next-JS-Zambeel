'use client';

import ComingSoon from '../../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

export default function PartnerAgenciesWrapper() {
  const { t } = useTranslation();
  
  return (
    <ComingSoon
      title={t('comingSoon.trustedPartners.title') || 'الشركاء الموثوقون'}
      description={t('comingSoon.trustedPartners.description') || 'نعمل بجد لنقدم لك شبكة شركاء رائعة. ترقبوا التحديثات!'}
      cookieName="partner_agencies_countdown_target"
    />
  );
}

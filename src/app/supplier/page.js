'use client';

import ComingSoon from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

export default function Supplier() {
  const { t } = useTranslation();
  
  return (
    <ComingSoon
      title={t('comingSoon.supplier.title') || 'Become a Supplier'}
      description={t('comingSoon.supplier.description') || 'Join our supplier network and grow your business with Zambeel. We are preparing something special for you!'}
    />
  );
}



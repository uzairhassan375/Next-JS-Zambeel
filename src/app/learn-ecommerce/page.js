'use client';

import ComingSoon from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

export default function LearnEcommerce() {
  const { t } = useTranslation();
  
  return (
    <ComingSoon
      title={t('comingSoon.learnEcommerce.title') || 'Learn E-commerce'}
      description={t('comingSoon.learnEcommerce.description') || 'We are working hard to bring you an amazing learning experience. Stay tuned for updates!'}
    />
  );
}



import { headers } from 'next/headers';
import RefundReplacementPolicyPage from '../../../pages/RefundReplacementPolicyPage';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

export async function generateMetadata() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const translations = locale === 'ar' ? arTranslations : enTranslations;
  
  return {
    title: `${translations.refundReplacement.title} - Zambeel`,
    description: `Learn about Zambeel's refund and replacement policy for customers and resellers. Understand our guidelines and procedures for processing refunds and replacements.`,
    openGraph: {
      title: `${translations.refundReplacement.title} - Zambeel`,
      description: `Learn about Zambeel's refund and replacement policy for customers and resellers. Understand our guidelines and procedures for processing refunds and replacements.`,
      type: 'website',
    },
  };
}

export default function RefundReplacementPolicy() {
  return <RefundReplacementPolicyPage />;
}

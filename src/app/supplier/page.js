'use client';

import { useTranslation } from 'react-i18next';

export default function Supplier() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#2E3B78] mb-4">
          {t('header.becomeASupplier') || 'Become a Supplier'}
        </h1>
        <p className="text-lg text-gray-600">
          Supplier page coming soon...
        </p>
      </div>
    </div>
  );
}



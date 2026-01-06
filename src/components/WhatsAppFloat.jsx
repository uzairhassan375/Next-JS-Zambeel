'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function WhatsAppFloat() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const getWhatsAppLink = () => {
    // Support phone number: +971 56 847 2271
    // Format: remove spaces, plus sign, and use wa.me format
    const phoneNumber = '971568472271';
    return `https://wa.me/${phoneNumber}`;
  };

  const handleClick = () => {
    window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 p-2 hover:opacity-80 transition-all duration-300 hover:scale-110 focus:outline-none"
      aria-label="Contact us on WhatsApp"
    >
      <Image 
        src="/assets/icons/whatsapp.webp" 
        alt="WhatsApp" 
        width={48}
        height={48}
        className="w-10 h-10 md:w-12 md:h-12"
      />
    </button>
  );
}

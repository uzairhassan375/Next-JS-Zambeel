'use client';

import Image from 'next/image';

export default function WhatsAppFloat() {
  const handleClick = () => {
    // Same WhatsApp link as used in WhatsAppPopup
    window.open('https://wa.me/971568472271', '_blank', 'noopener,noreferrer');
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

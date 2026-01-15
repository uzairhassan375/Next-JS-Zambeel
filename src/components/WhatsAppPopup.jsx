'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import Image from 'next/image';
const blue_logoImage = '/blue_logo.png';

export default function WhatsAppPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';



  useEffect(() => {
    // Show popup after 2.5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const getWhatsAppLink = () => {
    return currentLanguage === 'ar' 
      ? 'https://whatsapp.com/channel/0029Vb1chFnH5JLr8lKoXE2I' // Arabic WhatsApp channel link
      : 'https://whatsapp.com/channel/0029VaZgjwHIN9iiX6YpEj0w'; // English WhatsApp channel link
  };

  const handleJoinNow = () => {
    window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  const getInstagramLink = () => {
    return currentLanguage === 'ar'
      ? 'https://www.instagram.com/zambeel_ecommerce?igsh=MWg0emhiMndqY3lq' // Arabic Instagram link
      : 'https://www.instagram.com/zambeel.ecommerce?igsh=a20zdW9naGE2aDA4'; // English Instagram link
  };

  const getFacebookLink = () => {
    return currentLanguage === 'ar'
      ? 'https://www.facebook.com/share/1AMQmX7cT6/?mibextid=wwXIfr' // Arabic Facebook link
      : 'https://www.facebook.com/share/1CHT3yCtCm/'; // English Facebook link
  };

  const handleInstagramClick = () => {
    window.open(getInstagramLink(), '_blank', 'noopener,noreferrer');
  };

  const handleFacebookClick = () => {
    window.open(getFacebookLink(), '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 pb-10 flex flex-col items-center">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="w-full flex flex-col items-center space-y-5 pt-2">
            {/* Top text */}
            <div className="text-center space-y-0.5">
              <p className="text-orange-500 text-sm font-medium">
                {t('popup.lookingFor')}
              </p>
              <p className="text-orange-500 text-2xl font-bold leading-tight">
                {t('popup.winningProducts')}
              </p>
              <p className="text-black text-base font-medium mt-1">
                {t('popup.forFree')}
              </p>
            </div>

            {/* Logo */}
            <div className="my-2">
              <Image
                src={blue_logoImage}
                alt="Zambeel Logo"
                width={200}
                height={56}
                className="h-14 w-auto object-contain"
              />
            </div>

            {/* Join text */}
            <div className="text-center space-y-0.5">
              <p className="text-gray-700 text-sm">
                {t('popup.joinOur')}
              </p>
              <p className="text-gray-700 text-lg font-bold">
                {t('popup.exclusiveWhatsApp')}
              </p>
            </div>

            {/* Divider */}
            <div className="w-4/5 border-t border-gray-300 my-1"></div>

            {/* Join Now button */}
            <button
              onClick={handleJoinNow}
              className="w-4/5 bg-[#6B46C1] hover:bg-[#5B21B6] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              {t('popup.joinNow')}
            </button>

            {/* Divider */}
            <div className="w-4/5 border-t border-gray-300 my-1"></div>

            {/* Social icons */}
            <div className="flex gap-8 items-center justify-center pt-1">
              <button
                onClick={handleInstagramClick}
                className="text-black hover:text-gray-600 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              <button
                onClick={handleFacebookClick}
                className="text-black hover:text-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}


import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyZambeel = ({
  title,
  mobileTitle,
  description,
  features,
  desktopFeatures
}) => {
  const { t } = useTranslation();
  
  // Use translations as defaults if props are not provided
  const defaultTitle = title || t('dropshipping.whyZambeel.title');
  const defaultMobileTitle = mobileTitle || t('dropshipping.whyZambeel.title');
  const defaultDescription = description || t('dropshipping.whyZambeel.description');
  
  const defaultFeatures = features || [
    {
      id: 1,
      text: t('dropshipping.whyZambeel.features.dedicatedAccountManagers'),
      mobileLineW: "w-[12%]",
      mobileCardMl: "ml-[12%]",
      icon: (
        <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="18" r="6" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 38C10 32 16 28 24 28C32 28 38 32 38 38" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="30" y="8" width="12" height="8" rx="1" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M33 12H39" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      text: t('dropshipping.whyZambeel.features.highestDeliveryRates'),
      mobileLineW: "w-[22%]",
      mobileCardMl: "ml-[22%]",
      icon: (
        <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 34C10 35.0609 10.4214 36.0783 11.1716 36.8284C11.9217 37.5786 12.9391 38 14 38C15.0609 38 16.0783 37.5786 16.8284 36.8284C17.5786 36.0783 18 35.0609 18 34C18 32.9391 17.5786 31.9217 16.8284 31.1716C16.0783 30.4214 15.0609 30 14 30C12.9391 30 11.9217 30.4214 11.1716 31.1716C10.4214 31.9217 10 32.9391 10 34Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 34C30 35.0609 30.4214 36.0783 31.1716 36.8284C31.9217 37.5786 32.9391 38 34 38C35.0609 38 36.0783 37.5786 36.8284 36.8284C37.5786 36.0783 38 35.0609 38 34C38 32.9391 37.5786 31.9217 36.8284 31.1716C36.0783 30.4214 35.0609 30 34 30C32.9391 30 31.9217 30.4214 31.1716 31.1716C30.4214 31.9217 30 32.9391 30 34Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 34H6V12C6 11.4696 6.21071 10.9609 6.58579 10.5858C6.96086 10.2107 7.46957 10 8 10H26V34M18 34H30M38 34H42V22M42 22H26M42 22L36 12H26" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 3,
      text: t('dropshipping.whyZambeel.features.biggestCatalog'),
      mobileLineW: "w-[32%]",
      mobileCardMl: "ml-[32%]",
      icon: (
        <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="32" height="28" rx="2" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 18H34" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 24H28" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 30H26" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="24" r="3" fill="#1e3a8a" />
          <path d="M8 10L20 6L24 10" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 4,
      text: t('dropshipping.whyZambeel.features.smartOrderConfirmation'),
      mobileLineW: "w-[18%]",
      mobileCardMl: "ml-[18%]",
      icon: (
        <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="32" height="24" rx="2" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 24L22 30L32 18" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="36" r="4" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 32V40" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 5,
      text: t('dropshipping.whyZambeel.features.weeklyPayments'),
      mobileLineW: "w-[8%]",
      mobileCardMl: "ml-[8%]",
      icon: (
        <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="14" width="32" height="22" rx="2" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 20H40" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="28" r="2" fill="#1e3a8a" />
          <circle cx="24" cy="28" r="2" fill="#1e3a8a" />
          <circle cx="30" cy="28" r="2" fill="#1e3a8a" />
          <path d="M32 32H36" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 32H16" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];
  
  const defaultDesktopFeatures = desktopFeatures || [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#d_manager)">
            <circle cx="24" cy="18" r="6" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 38C10 32 16 28 24 28C32 28 38 32 38 38" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="30" y="8" width="12" height="8" rx="1" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M33 12H39" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs><clipPath id="d_manager"><rect width="48" height="48" fill="white" /></clipPath></defs>
        </svg>
      ),
      label: t('dropshipping.whyZambeel.features.dedicatedAccountManagers').replace(/ Account /g, '\nAccount ')
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#d_ship)">
            <path d="M10 34C10 35.0609 10.4214 36.0783 11.1716 36.8284C11.9217 37.5786 12.9391 38 14 38C15.0609 38 16.0783 37.5786 16.8284 36.8284C17.5786 36.0783 18 35.0609 18 34C18 32.9391 17.5786 31.9217 16.8284 31.1716C16.0783 30.4214 15.0609 30 14 30C12.9391 30 11.9217 30.4214 11.1716 31.1716C10.4214 31.9217 10 32.9391 10 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 34C30 35.0609 30.4214 36.0783 31.1716 36.8284C31.9217 37.5786 32.9391 38 34 38C35.0609 38 36.0783 37.5786 36.8284 36.8284C37.5786 36.0783 38 35.0609 38 34C38 32.9391 37.5786 31.9217 36.8284 31.1716C36.0783 30.4214 35.0609 30 34 30C32.9391 30 31.9217 30.4214 31.1716 31.1716C30.4214 31.9217 30 32.9391 30 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 34H6V12C6 11.4696 6.21071 10.9609 6.58579 10.5858C6.96086 10.2107 7.46957 10 8 10H26V34M18 34H30M38 34H42V22M42 22H26M42 22L36 12H26" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs><clipPath id="d_ship"><rect width="48" height="48" fill="white" /></clipPath></defs>
        </svg>
      ),
      label: t('dropshipping.whyZambeel.features.highestDeliveryRates').replace(/ Delivery /g, '\nDelivery ')
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#d_catalog)">
            <rect x="8" y="10" width="32" height="28" rx="2" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 18H34" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 24H28" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 30H26" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="32" cy="24" r="3" fill="#2D3E7E" />
            <path d="M8 10L20 6L24 10" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs><clipPath id="d_catalog"><rect width="48" height="48" fill="white" /></clipPath></defs>
        </svg>
      ),
      label: t('dropshipping.whyZambeel.features.biggestCatalog').replace(/ of /g, '\nof ').replace(/ Winning /g, '\nWinning ')
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#d_confirm)">
            <rect x="8" y="12" width="32" height="24" rx="2" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 24L22 30L32 18" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="36" r="4" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 32V40" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs><clipPath id="d_confirm"><rect width="48" height="48" fill="white" /></clipPath></defs>
        </svg>
      ),
      label: t('dropshipping.whyZambeel.features.smartOrderConfirmation').replace(/ Order /g, '\nOrder ')
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#d_payment)">
            <rect x="8" y="14" width="32" height="22" rx="2" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 20H40" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18" cy="28" r="2" fill="#2D3E7E" />
            <circle cx="24" cy="28" r="2" fill="#2D3E7E" />
            <circle cx="30" cy="28" r="2" fill="#2D3E7E" />
            <path d="M32 32H36" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 32H16" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs><clipPath id="d_payment"><rect width="48" height="48" fill="white" /></clipPath></defs>
        </svg>
      ),
      label: t('dropshipping.whyZambeel.features.weeklyPayments').replace(' ', '\n')
    }
  ];
  
  const finalTitle = title || defaultTitle;
  const finalMobileTitle = mobileTitle || defaultMobileTitle;
  const finalDescription = description || defaultDescription;
  const finalFeatures = features || defaultFeatures;
  const finalDesktopFeatures = desktopFeatures || defaultDesktopFeatures;
  return (
    <section className="relative w-full mx-auto py-8 md:py-8 px-6 sm:px-10 lg:px-12">
      <div className="max-w-[1050px] mx-auto relative z-10">
        
        {/* ==================== */}
        {/* DESKTOP VIEW (850px and above) */}
        {/* ==================== */}
        <div className="hidden md:block rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-white px-14 pt-16 pb-10 text-center">
            <h2 className="text-[36px] font-bold leading-[100%] tracking-[0] text-center text-black mb-6" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>{finalTitle}</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {finalDescription}
            </p>
          </div>
          <div className="bg-gray-400 px-14 py-10">
            <div className="flex flex-wrap justify-center gap-12">
              {finalDesktopFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center w-32 text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 ring-1 ring-gray-200">
                    {feature.icon}
                  </div>
                  <p className="text-xs font-semibold text-[#35466d] leading-tight whitespace-pre-line">
                    {feature.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== */}
        {/* MOBILE VIEW (below 850px) */}
        {/* ==================== */}
        <div className="md:hidden w-full overflow-hidden" style={{ backgroundColor: '#FFFFFF33' }}>
          <div className="px-6 pt-10 pb-8 text-center">
            <h2 className="text-white text-xl font-bold mb-3 tracking-wide">{finalMobileTitle}</h2>
            <p className="text-white/90 text-[12px] leading-5 font-light">
              {finalDescription}
            </p>
          </div>
          <div className="py-8 space-y-5" style={{ backgroundColor: '#E8F0FE4D' }}>
            {finalFeatures.map((feature) => (
              <div key={feature.id} className="relative flex items-center w-full">
                <div className={`absolute left-0 h-[2px] bg-[#fbbf24] z-0 transition-all duration-300 ${feature.mobileLineW || ''}`}></div>
                <div className={`relative z-10 flex items-center bg-gradient-to-r from-[#eef2ff] to-white rounded-l-full rounded-r-full py-2 pl-2 pr-6 shadow-lg transition-all duration-300 ${feature.mobileCardMl || ''}`}>
                  <div className="w-10 h-10 bg-[#e0e7ff] rounded-full flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                    {feature.icon}
                  </div>
                  <span className="ml-3 text-[#1e3a8a] font-semibold text-[13px] leading-tight">
                    {feature.text || feature.label || ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default WhyZambeel;

'use client';

import { useTranslation } from 'react-i18next';

export default function AmazonUsaPlatforms() {
  const { t } = useTranslation();

  const platforms = [
    {
      name: 'Shopify',
      color: '#5E8E3E',
      fontClass: 'font-bold font-sans',
    },
    {
      name: 'Amazon',
      color: '#FF9900',
      fontClass: 'font-bold font-sans',
    },
    {
      name: 'eBay',
      color: '#E53238',
      fontClass: 'font-bold font-sans',
    },
    {
      name: 'Etsy',
      color: '#F16521',
      fontClass: 'font-serif font-bold',
    },
    {
      name: 'Walmart',
      color: '#0071DC',
      fontClass: 'font-bold font-sans',
    },
  ];

  return (
    <section className="w-full px-4 py-10 md:py-14">
      <div className="max-w-[980px] mx-auto text-center">
        {/* Eyebrow */}
        <p
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#ffd24c] mb-2.5"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('amazon.platforms.eyebrow')}
        </p>

        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white mb-3 md:mb-4 leading-tight tracking-tight"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('amazon.platforms.title')}
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('amazon.platforms.subtitle')}
        </p>

        {/* 5 Platforms Card */}
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white">
          {/* Header Banner */}
          <div className="bg-[#243a86] py-3.5 px-4 text-center">
            <span
              className="text-xs md:text-sm font-bold text-white uppercase tracking-[0.2em]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {t('amazon.platforms.cardHeader')}
            </span>
          </div>

          {/* Platforms Grid / Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-white">
            {platforms.map((platform, idx) => (
              <div
                key={platform.name}
                className={`flex items-center justify-center py-6 md:py-8 px-4 transition-transform duration-200 hover:scale-105 ${
                  idx === platforms.length - 1 && 'col-span-2 sm:col-span-1'
                }`}
              >
                <span
                  className={`text-xl md:text-2xl lg:text-[26px] tracking-tight ${platform.fontClass}`}
                  style={{ color: platform.color }}
                >
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

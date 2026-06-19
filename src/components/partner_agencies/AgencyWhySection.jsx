'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PORTAL_URL = 'https://portal.myzambeel.com/login';

const STAT_KEYS = ['dashboard', 'earnings', 'support'];

export default function AgencyWhySection({ getCopy }) {
  const { t } = useTranslation();
  const c = getCopy || ((key, fallback = '') => t(`partnerAgencies.whyZambeel.${key}`, fallback));

  return (
    <section className="relative px-4 md:px-6 py-14 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {c('title', 'Agency Benefits')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur-sm px-5 py-5 text-center transition-all duration-300 hover:shadow-lg shadow-sm"
            >
              <p
                className="text-xl md:text-2xl font-bold text-[#b45309] mb-1"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {c(`stats.${key}.value`)}
              </p>
              <p className="text-gray-600 text-xs md:text-sm">{c(`stats.${key}.label`)}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-sm md:text-base text-[#243a86] bg-[#ffd24c] hover:bg-[#ffc933] transition-all hover:scale-[1.03] shadow-lg"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {c('portalCta', 'Apply Now')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQ_KEYS = [
  'whoCanApply',
  'commission',
  'payment',
  'documents',
  'approval',
  'multipleMerchants',
  'setupFee',
];

export default function AgencyFaqSection({ getCopy }) {
  const { t } = useTranslation();
  const c = getCopy || ((key, fallback = '') => t(`partnerAgencies.faq.${key}`, fallback));
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative px-4 md:px-6 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {c('title', 'Frequently Asked Questions')}
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-md mx-auto">
            {c('subtitle', 'Everything you need to know about joining the Zambeel Agency Program.')}
          </p>
        </div>

        <div className="rounded-2xl md:rounded-3xl border border-white/60 bg-white/95 overflow-hidden shadow-xl backdrop-blur-sm">
          {FAQ_KEYS.map((key, index) => {
            const isOpen = openIndex === index;
            const isLast = index === FAQ_KEYS.length - 1;
            return (
              <div
                key={key}
                className={`${!isLast ? 'border-b border-gray-100' : ''} ${
                  isOpen ? 'bg-blue-50/50' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left transition-colors ${
                    isOpen
                      ? 'border-l-2 border-l-[#2E3B78]'
                      : 'border-l-2 border-l-transparent hover:bg-gray-50'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm md:text-base font-bold leading-snug transition-colors ${
                      isOpen ? 'text-[#2E3B78]' : 'text-gray-800'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {c(`items.${key}.question`)}
                  </span>
                  <span
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-[#2E3B78]/10 text-[#2E3B78]' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-4 md:pb-5 -mt-1 border-l-2 border-l-[#2E3B78]">
                    <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                      {c(`items.${key}.answer`)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22d3ee]/40 text-[#22d3ee] text-xs md:text-sm mb-4">
            FAQ
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {c('title', 'Frequently Asked Questions')}
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto">
            {c('subtitle', 'Everything you need to know about joining the Zambeel Agency Program.')}
          </p>
        </div>

        <div
          className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.9) 100%)',
            boxShadow: '0 8px 32px rgba(34, 211, 238, 0.06)',
          }}
        >
          {FAQ_KEYS.map((key, index) => {
            const isOpen = openIndex === index;
            const isLast = index === FAQ_KEYS.length - 1;
            return (
              <div
                key={key}
                className={`${!isLast ? 'border-b border-white/10' : ''} ${
                  isOpen ? 'bg-[#22d3ee]/[0.06]' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left transition-colors ${
                    isOpen
                      ? 'border-l-2 border-l-[#22d3ee]'
                      : 'border-l-2 border-l-transparent hover:bg-white/[0.04]'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm md:text-base font-bold leading-snug transition-colors ${
                      isOpen ? 'text-white' : 'text-white/90'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {c(`items.${key}.question`)}
                  </span>
                  <span
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-[#22d3ee]/15 text-[#22d3ee]' : 'bg-white/5 text-white/50'
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
                  <div className="px-5 md:px-6 pb-4 md:pb-5 -mt-1 border-l-2 border-l-[#22d3ee]">
                    <p className="text-sm md:text-[15px] text-white/70 leading-relaxed">
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

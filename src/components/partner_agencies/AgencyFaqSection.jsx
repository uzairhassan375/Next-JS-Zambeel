'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQ_KEYS = [
  'whoCanApply',
  'commission',
  'payment',
  'documents',
  'approval',
  'multipleMerchants',
];

export default function AgencyFaqSection({ getCopy }) {
  const { t } = useTranslation();
  const c = getCopy || ((key, fallback = '') => t(`partnerAgencies.faq.${key}`, fallback));
  const [openIndex, setOpenIndex] = useState(-1);

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

        <div className="flex flex-col gap-3 md:gap-4">
          {FAQ_KEYS.map((key, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={key}
                className="rounded-xl md:rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-sm md:text-base font-semibold text-gray-800 leading-snug"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {c(`items.${key}.question`)}
                  </span>
                  <span className="shrink-0 text-gray-700" aria-hidden="true">
                    {isOpen ? (
                      <Minus className="w-5 h-5" strokeWidth={2} />
                    ) : (
                      <Plus className="w-5 h-5" strokeWidth={2} />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-4 md:pb-5 pt-0">
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

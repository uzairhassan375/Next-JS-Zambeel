'use client';

import { useTranslation } from 'react-i18next';

const STEP_KEYS = ['1', '2', '3', '4'];

export default function AmazonUsaHowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-white px-4 py-14 md:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <p
          className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-3"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('amazon.howItWorks.eyebrow')}
        </p>
        <h2
          className="text-[32px] sm:text-[42px] md:text-[52px] font-extrabold text-[#0B1E3C] tracking-tight leading-[1.15] mb-4"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('amazon.howItWorks.title')}
        </h2>
        <p
          className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-10 md:mb-14"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('amazon.howItWorks.subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 text-left">
          {STEP_KEYS.map((key) => (
            <div key={key} className="pt-4 border-t-2 border-blue-600">
              <p
                className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600 mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {t(`amazon.howItWorks.steps.${key}.label`)}
              </p>
              <h3
                className="text-lg md:text-xl font-bold text-[#0B1E3C] mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {t(`amazon.howItWorks.steps.${key}.title`)}
              </h3>
              <p
                className="text-sm md:text-base text-slate-500 leading-relaxed"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {t(`amazon.howItWorks.steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

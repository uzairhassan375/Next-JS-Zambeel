'use client';

import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const STEP_KEYS = ['1', '2', '3', '4', '5', '6'];

export default function AmazonUsaGoldPlan({ ctaHref }) {
  const { t } = useTranslation();

  const featureItems = [
    ...STEP_KEYS.map((key) => t(`amazon.goldPlan.steps.${key}.title`)),
    t('amazon.goldPlan.seniorConsultant.title'),
    t('amazon.goldPlan.dedicatedSupport.title'),
  ];

  return (
    <section id="pricing" className="w-full px-4 py-12 md:py-16">
      <div className="max-w-[980px] mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.goldPlan.sectionHeading')}
          </h2>
          <p
            className="text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.goldPlan.sectionSubtitle')}
          </p>
        </div>

        <div className="rounded-[28px] md:rounded-[32px] border border-[#ffd24c]/40 bg-gradient-to-br from-white via-[#FFFBF0] to-[#FFF8DE] shadow-xl px-6 py-8 md:px-12 md:py-12 lg:px-14 lg:py-14 flex flex-col md:flex-row md:items-start gap-10 md:gap-12 lg:gap-16">
          {/* Left — plan overview */}
          <div className="md:w-[44%] lg:w-[42%] flex flex-col md:min-h-[320px]">
            <span className="inline-flex self-start items-center rounded-lg bg-[#ffd24c] px-3.5 py-1.5 text-sm font-bold text-[#243a86] uppercase tracking-wide">
              {t('amazon.goldPlan.badge')}
            </span>

            <p
              className="mt-6 text-[15px] md:text-base leading-relaxed text-[#4a5568] max-w-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {t('amazon.goldPlan.description')}
            </p>

            <div className="mt-8 md:mt-auto md:pt-10 flex flex-wrap items-end gap-x-2 gap-y-1">
              <span
                className="text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold leading-none text-[#243a86] tracking-tight"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {t('amazon.goldPlan.priceAmount')}
              </span>
              <span className="text-base md:text-lg text-[#64748b] pb-1 md:pb-1.5 font-normal">
                {t('amazon.goldPlan.period')}
              </span>
            </div>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 block w-full overflow-hidden rounded-full bg-[#243a86] py-3.5 pl-14 pr-6 min-h-[52px] text-[15px] md:text-base font-semibold text-white transition-colors duration-300 hover:bg-[#1e3270]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <span className="pointer-events-none absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#ffd24c] text-[#243a86] transition-[left] duration-500 ease-in-out group-hover:left-[calc(100%-2.75rem)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="relative z-20 flex min-h-[28px] items-center justify-center text-center">
                {t('common.talkToAgent')}
              </span>
            </a>
          </div>

          {/* Right — features */}
          <div className="md:flex-1 md:pt-1 md:border-l md:border-[#ffd24c]/30 md:pl-12 lg:pl-16">
            <h3
              className="text-lg md:text-xl font-semibold text-[#243a86] mb-6 md:mb-8"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {t('amazon.goldPlan.featuresLabel')}
            </h3>
            <ul className="space-y-4 md:space-y-[1.125rem]">
              {featureItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#FF9900]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span
                    className="text-[15px] md:text-base text-[#334155] leading-snug"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

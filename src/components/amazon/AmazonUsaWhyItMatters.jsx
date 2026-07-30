'use client';

import { useTranslation } from 'react-i18next';

const POINT_KEYS = ['1', '2', '3', '4'];

export default function AmazonUsaWhyItMatters({ ctaHref }) {
  const { t } = useTranslation();

  return (
    <section className="w-full px-4 pb-12 md:pb-16 pt-4 md:pt-6">
      <div className="max-w-[980px] mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <p
            className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#ffd24c] mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.whyItMatters.eyebrow')}
          </p>
          <h2
            className="text-xl md:text-3xl lg:text-4xl font-bold text-white max-w-3xl mx-auto leading-snug"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.whyItMatters.title')}
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {POINT_KEYS.map((key, index) => (
            <li
              key={key}
              className="group relative flex gap-4 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-5 md:px-6 md:py-6 backdrop-blur-sm transition-colors hover:bg-white/[0.11] hover:border-[#FF9900]/35"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF9900]/20 text-sm font-bold text-[#ffd24c] ring-1 ring-[#FF9900]/40"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
                aria-hidden
              >
                {index + 1}
              </span>
              <p
                className="text-[15px] md:text-base text-white/85 leading-relaxed pt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {t(`amazon.whyItMatters.points.${key}`)}
              </p>
              <span
                className="pointer-events-none absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#FF9900]/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-10 md:mt-12">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#ffd24c] text-[#243a86] font-bold px-8 py-3.5 rounded-full hover:bg-[#ffc933] transition-colors duration-200 shadow-lg text-base md:text-lg"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('common.talkToAgent')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Ticker from '../components/Ticker';
import AmazonUsaPlatforms from '../components/amazon/AmazonUsaPlatforms';
import AmazonUsaHowItWorks from '../components/amazon/AmazonUsaHowItWorks';
import AmazonUsaGoldPlan from '../components/amazon/AmazonUsaGoldPlan';
import AmazonUsaWhyItMatters from '../components/amazon/AmazonUsaWhyItMatters';
import { trackButtonClick } from '../lib/analytics';

const AMAZON_USA_WHATSAPP =
  'https://wa.me/971568472271?text=Hey!%20I%20want%20to%20start%20Amazon%20USA%20(Gold%20Plan)%20with%20Zambeel.%20Please%20assign%20me%20an%20account%20manager';

const AmazonUsaPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.substring(1);
    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const timer1 = setTimeout(scrollToTarget, 150);
    const timer2 = setTimeout(scrollToTarget, 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden relative -mt-20 pt-20"
      style={{
        background:
          'linear-gradient(186.57deg, rgba(255, 153, 0, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(28, 54, 89, 0.911419) 31.95%, rgba(146, 64, 14, 0.793286) 47.98%, rgba(51, 88, 140, 0.913498) 70.93%, #4A61C4 81.76%)',
      }}
    >
      {/* Hero */}
      <section className="pb-10 md:pb-12 text-center relative pt-24 md:pt-28 overflow-hidden px-4">
        {/* Left side SVGs */}
        <div className="absolute left-[3%] top-[50%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#FF9900" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute left-[3%] top-[64%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#FF9900" fillOpacity="0.3"/>
          </svg>
        </div>

        {/* Right side SVGs */}
        <div className="absolute right-[4%] top-[10%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#FF9900" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute right-[4%] top-[25%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#FF9900" fillOpacity="0.3"/>
          </svg>
        </div>

        {/* Center SVG */}
        <div className="absolute left-1/2 top-[50%] transform -translate-x-1/2 hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#FF9900" fillOpacity="0.3"/>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          {/* Top Title */}
          <h1
            className="text-[28px] sm:text-[38px] md:text-[52px] lg:text-[58px] font-extrabold text-white mt-4 md:mt-0 tracking-tight leading-[1.15]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.hero.title')}
          </h1>

          {/* Divider: AND THE BEST PART */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-sm md:max-w-md mx-auto my-2 md:my-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/40 to-white/70" />
            <span
              className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.22em] text-[#ffd24c] uppercase select-none"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {t('amazon.hero.bestPart')}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/40 to-white/70" />
          </div>

          {/* Large Highlight: No LLC required */}
          <h2
            className="text-[26px] sm:text-[34px] md:text-[44px] lg:text-[50px] font-extrabold text-white/80 tracking-tight leading-[1.1] mb-4 md:mb-6 drop-shadow-sm"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.hero.noLlc')}
          </h2>

          {/* Subtitle / Description */}
          <p
            className="text-[15px] sm:text-base md:text-[19px] font-normal text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-8"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.hero.description')}
          </p>

          {/* Badges / Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
            <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/25 bg-white/10 text-white text-sm md:text-base font-semibold backdrop-blur-md shadow-sm transition hover:bg-white/15">
              {t('amazon.hero.pillNoLlc')}
            </div>
            <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/25 bg-white/10 text-white text-sm md:text-base font-semibold backdrop-blur-md shadow-sm transition hover:bg-white/15">
              {t('amazon.hero.pillNoBank')}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-6">
            <a
              href={AMAZON_USA_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackButtonClick({
                  name: 'talk_to_agent',
                  href: AMAZON_USA_WHATSAPP,
                  page: 'amazon_usa',
                  location: 'hero',
                })
              }
              className="inline-flex items-center bg-[#ffd24c] text-[#243a86] font-bold px-8 py-3.5 rounded-full hover:bg-[#ffc933] transition-all duration-300 shadow-lg text-base md:text-lg"
            >
              {t('common.talkToAgent')}
              <svg className="w-5 h-5 ml-2 rtl:rotate-180 rtl:mr-2 rtl:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Ticker pageId="amazon-usa" variant="yellow" className="mt-0" />

      <AmazonUsaPlatforms />

      <AmazonUsaHowItWorks />

      <AmazonUsaGoldPlan ctaHref={AMAZON_USA_WHATSAPP} />
      <AmazonUsaWhyItMatters ctaHref={AMAZON_USA_WHATSAPP} />
    </div>
  );
};

export default AmazonUsaPage;

'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Ticker from '../components/Ticker';
import AmazonUsaGoldPlan from '../components/amazon/AmazonUsaGoldPlan';
import AmazonUsaWhyItMatters from '../components/amazon/AmazonUsaWhyItMatters';

const AMAZON_USA_WHATSAPP =
  'https://wa.me/971568472271?text=Hey!%20I%20want%20to%20start%20Amazon%20USA%20(Gold%20Plan)%20with%20Zambeel.%20Please%20assign%20me%20an%20account%20manager';

const AmazonUsaPage = () => {
  const { t } = useTranslation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const carouselTexts = [
    t('amazon.hero.carousel.winningProducts'),
    t('amazon.hero.carousel.ppcCampaigns'),
    t('amazon.hero.carousel.setupToScale'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselTexts.length]);

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
      <section className="pb-8 md:pb-8 text-center relative pt-24 md:pt-28 overflow-hidden">
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

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <h1
            className="text-[26px] md:text-[44px] font-bold text-white mt-8 md:mt-0 mb-4 md:mb-6"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.hero.title')}
          </h1>
          <p
            className="text-[20px] md:text-[30px] font-normal italic text-white mb-2 md:mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.hero.subtitle')}
          </p>
          <p
            className="text-[14px] md:text-[20px] font-normal italic text-white/95 max-w-3xl mx-auto min-h-[30px] md:min-h-[40px] transition-opacity duration-500 mb-2"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {carouselTexts[currentTextIndex]}
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {carouselTexts.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentTextIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentTextIndex ? 'w-7 md:w-8 h-2 bg-[#ffd24c]' : 'w-2 h-2 bg-white/40'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-center mb-8">
            <a
              href={AMAZON_USA_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#ffd24c] text-[#243a86] font-bold px-8 py-3 rounded-full hover:bg-[#ffc933] transition-all duration-300 shadow-lg text-base md:text-lg"
            >
              {t('common.talkToAgent')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Ticker pageId="amazon-usa" variant="yellow" className="mt-0" />

      <AmazonUsaGoldPlan ctaHref={AMAZON_USA_WHATSAPP} />
      <AmazonUsaWhyItMatters ctaHref={AMAZON_USA_WHATSAPP} />
    </div>
  );
};

export default AmazonUsaPage;

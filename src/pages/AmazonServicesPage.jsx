'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import WhyZambeel from '../components/dropshiping_components/WhyZambeel';
import Wts from '../components/dropshiping_components/WhereTS';

const connectionImg = '/assets/images/connection.png';
const databaseImg = '/assets/images/database.png';
const frameImg = '/assets/images/frame1.png';

const AmazonServicesPage = () => {
  const { t } = useTranslation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const carouselTexts = [
    t('amazon.hero.carousel.fbmFba'),
    t('amazon.hero.carousel.uaeKsa'),
    t('amazon.hero.carousel.scale'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselTexts.length]);

  const whyFeatures = [
    {
      id: 1,
      text: t('amazon.whyZambeel.features.listing'),
      mobileLineW: 'w-[12%]',
      mobileCardMl: 'ml-[12%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="#1e3a8a" strokeWidth="1.5" />
          <path d="M8 9H16M8 12H14M8 15H12" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 2,
      text: t('amazon.whyZambeel.features.prep'),
      mobileLineW: 'w-[22%]',
      mobileCardMl: 'ml-[22%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L20 7V17L12 21L4 17V7L12 3Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 12L20 7M12 12V21M12 12L4 7" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 3,
      text: t('amazon.whyZambeel.features.fba'),
      mobileLineW: 'w-[32%]',
      mobileCardMl: 'ml-[32%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21V17H3V7Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M3 11H21M7 7V5M17 7V5" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 4,
      text: t('amazon.whyZambeel.features.fbm'),
      mobileLineW: 'w-[18%]',
      mobileCardMl: 'ml-[18%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17H19L17 7H7L5 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="9" cy="19" r="1.5" fill="#1e3a8a" />
          <circle cx="17" cy="19" r="1.5" fill="#1e3a8a" />
        </svg>
      ),
    },
  ];

  const wtsSteps = [
    {
      number: 1,
      title: t('amazon.whereToStart.steps.consultation.title'),
      description: t('amazon.whereToStart.steps.consultation.desc'),
      icon: connectionImg,
      iconAlt: 'consultation',
    },
    {
      number: 2,
      title: t('amazon.whereToStart.steps.chooseModel.title'),
      description: t('amazon.whereToStart.steps.chooseModel.desc'),
      icon: frameImg,
      iconAlt: 'model',
    },
    {
      number: 3,
      title: t('amazon.whereToStart.steps.setup.title'),
      description: t('amazon.whereToStart.steps.setup.desc'),
      icon: databaseImg,
      iconAlt: 'setup',
    },
    {
      number: 4,
      title: t('amazon.whereToStart.steps.launch.title'),
      description: t('amazon.whereToStart.steps.launch.desc'),
      icon: null,
      iconAlt: 'launch',
    },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden relative -mt-20 pt-20"
      style={{
        background:
          'linear-gradient(186.57deg, rgba(255, 153, 0, 0.45) 4%, rgba(31, 46, 100, 0.96) 14%, rgba(35, 47, 62, 0.92) 35%, rgba(146, 64, 14, 0.55) 52%, rgba(51, 88, 140, 0.9) 72%, #4A61C4 88%)',
      }}
    >
      {/* Hero */}
      <section className="pb-8 md:pb-8 text-center relative pt-24 md:pt-28 overflow-hidden">
        <div className="absolute left-[10%] top-[30%] hidden md:block opacity-40">
          <svg width="120" height="100" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 0 153 0C99.386 0 0 44.4904 0 44.4904C61.4613 107.826 68.0003 217 115.078 217Z"
              fill="#FF9900"
              fillOpacity="0.35"
            />
          </svg>
        </div>
        <div className="absolute right-[8%] top-[20%] hidden md:block opacity-40">
          <svg width="140" height="110" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 0 153 0C99.386 0 0 44.4904 0 44.4904C61.4613 107.826 68.0003 217 115.078 217Z"
              fill="#FF9900"
              fillOpacity="0.35"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <h3
            className="text-[26px] md:text-[44px] font-bold text-white mt-8 md:mt-0 mb-4 md:mb-6"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('amazon.hero.title')}
          </h3>
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
              href="https://wa.me/971568472271?text=I%20want%20to%20start%20Amazon%20services%20(FBA%2FFBM)%20with%20Zambeel.%20Please%20assign%20me%20an%20account%20manager"
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

          {/* UAE & KSA */}
          <div className="max-w-md mx-auto">
            <div className="bg-[#d5dce8]/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10">
              <p className="text-[#2c3e5f] text-center text-xs sm:text-sm md:text-base font-semibold mb-6 md:mb-8">
                {t('amazon.hero.availableIn')}
              </p>
              <div className="flex justify-center items-center gap-12 md:gap-20">
                <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="h-1/3 bg-green-600" />
                        <div className="h-1/3 bg-white" />
                        <div className="h-1/3 bg-black" />
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-600" />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">
                    {t('countries.UAE')}
                  </span>
                </div>
                <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                  <div className="w-20 h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center mb-2 md:mb-3">
                    <svg width="80" height="80" viewBox="0 0 96 96" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="48" cy="48" r="34" fill="#6DA544" />
                      <path d="M34 58C34 60.7614 36.2386 63 39 63H53C53 65.2091 54.7909 67 57 67H61C63.2091 67 65 65.2091 65 63V58H34Z" fill="#F0F0F0" />
                      <path d="M65 36V46C65 47.6569 63.6569 49 62 49V53C65.866 53 69 49.866 69 46V36H65Z" fill="#F0F0F0" />
                      <path d="M32 46C32 47.6569 30.6569 49 29 49V53C32.866 53 36 49.866 36 46V36H32V46Z" fill="#F0F0F0" />
                      <path d="M56 36H60V46H56V36Z" fill="#F0F0F0" />
                      <path d="M50 42C50 42.5523 49.5523 43 49 43C48.4477 43 48 42.5523 48 42V36H44V42C44 42.5523 43.5523 43 43 43C42.4477 43 42 42.5523 42 42V36H38V42C38 44.7614 40.2386 47 43 47C44.1046 47 45.1046 46.6569 46 46C46.8954 46.6569 47.8954 47 49 47C49.1843 47 49.364 46.987 49.538 46.962C49.268 48.378 48.1 49.4 46.7 49.4V53C50.566 53 53.7 49.866 53.7 46V42H50Z" fill="#F0F0F0" />
                      <path d="M38 49H44V53H38V49Z" fill="#F0F0F0" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">
                    {t('countries.KSA')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FBM & FBA */}
      <section className="w-full bg-[#F8FAFC] py-12 md:py-16 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1e3a8a] mb-3">{t('amazon.models.title')}</h2>
            <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">{t('amazon.models.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-[#FF9900] to-[#E47911] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                  {t('amazon.models.fbm.badge')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{t('amazon.models.fbm.title')}</h3>
                <p className="text-white/90 text-sm mt-1">{t('amazon.models.fbm.fullName')}</p>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">{t('amazon.models.fbm.description')}</p>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-[#FF9900] font-bold mt-0.5">✓</span>
                      {t(`amazon.models.fbm.points.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF9900]">
                  {t('amazon.models.fba.badge')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{t('amazon.models.fba.title')}</h3>
                <p className="text-white/90 text-sm mt-1">{t('amazon.models.fba.fullName')}</p>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">{t('amazon.models.fba.description')}</p>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-[#FF9900] font-bold mt-0.5">✓</span>
                      {t(`amazon.models.fba.points.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyZambeel
        title={t('amazon.whyZambeel.title')}
        mobileTitle={t('amazon.whyZambeel.title')}
        description={t('amazon.whyZambeel.description')}
        features={whyFeatures}
      />

      <Wts
        title={t('amazon.whereToStart.title')}
        description={t('amazon.whereToStart.description')}
        buttonText={t('common.talkToAgent')}
        buttonLink="https://wa.me/971568472271?text=I%20want%20to%20start%20Amazon%20services%20(FBA%2FFBM)%20with%20Zambeel.%20Please%20assign%20me%20an%20account%20manager"
        steps={wtsSteps}
      />
    </div>
  );
};

export default AmazonServicesPage;

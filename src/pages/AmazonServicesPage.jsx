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
      text: t('amazon.whyZambeel.features.accountManagers'),
      mobileLineW: 'w-[12%]',
      mobileCardMl: 'ml-[12%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="3" stroke="#1e3a8a" strokeWidth="1.5" />
          <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 2,
      text: t('amazon.whyZambeel.features.fastDelivery'),
      mobileLineW: 'w-[22%]',
      mobileCardMl: 'ml-[22%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17H19L17 7H7L5 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="9" cy="19" r="1.5" stroke="#1e3a8a" strokeWidth="1.5" />
          <circle cx="17" cy="19" r="1.5" stroke="#1e3a8a" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 3,
      text: t('amazon.whyZambeel.features.liveInventory'),
      mobileLineW: 'w-[32%]',
      mobileCardMl: 'ml-[32%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16v12H4V6z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 14l3-3 2 2 5-5" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 4,
      text: t('amazon.whyZambeel.features.chinaSourcing'),
      mobileLineW: 'w-[18%]',
      mobileCardMl: 'ml-[18%]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#1e3a8a" strokeWidth="1.5" />
          <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const desktopWhyFeatures = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="18" r="6" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 38C10 32 16 28 24 28C32 28 38 32 38 38" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: t('amazon.whyZambeel.features.accountManagers').replace(/ Account /g, '\nAccount '),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 34C10 35.0609 10.4214 36.0783 11.1716 36.8284C11.9217 37.5786 12.9391 38 14 38C15.0609 38 16.0783 37.5786 16.8284 36.8284C17.5786 36.0783 18 35.0609 18 34C18 32.9391 17.5786 31.9217 16.8284 31.1716C16.0783 30.4214 15.0609 30 14 30C12.9391 30 11.9217 30.4214 11.1716 31.1716C10.4214 31.9217 10 32.9391 10 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 34C30 35.0609 30.4214 36.0783 31.1716 36.8284C31.9217 37.5786 32.9391 38 34 38C35.0609 38 36.0783 37.5786 36.8284 36.8284C37.5786 36.0783 38 35.0609 38 34C38 32.9391 37.5786 31.9217 36.8284 31.1716C36.0783 30.4214 35.0609 30 34 30C32.9391 30 31.9217 30.4214 31.1716 31.1716C30.4214 31.9217 30 32.9391 30 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 34H6V12C6 11.4696 6.21071 10.9609 6.58579 10.5858C6.96086 10.2107 7.46957 10 8 10H26V34M18 34H30M38 34H42V22M42 22H26M42 22L36 12H26" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: t('amazon.whyZambeel.features.fastDelivery').replace(/ /g, '\n'),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="32" height="24" rx="2" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 24L22 30L32 18" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: t('amazon.whyZambeel.features.liveInventory').replace(/ Inventory /g, '\nInventory '),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 24h36M24 6c3 3 5 7 5 12s-2 9-5 12M24 6c-3 3-5 7-5 12s2 9 5 12" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: t('amazon.whyZambeel.features.chinaSourcing').replace(/ /g, '\n'),
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
              <div className="bg-gradient-to-r from-[#FF9900] to-[#E47911] px-6 py-4 md:py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{t('amazon.models.fbm.title')}</h3>
                    <p className="text-white/90 text-sm mt-1">{t('amazon.models.fbm.fullName')}</p>
                  </div>
                  <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white shrink-0 leading-none">
                    {t('amazon.models.fbm.badge')}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">{t('amazon.models.fbm.description')}</p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-[#FF9900] font-bold mt-0.5">✓</span>
                      {t(`amazon.models.fbm.points.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] px-6 py-4 md:py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{t('amazon.models.fba.title')}</h3>
                    <p className="text-white/90 text-sm mt-1">{t('amazon.models.fba.fullName')}</p>
                  </div>
                  <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-[#FF9900] shrink-0 leading-none">
                    {t('amazon.models.fba.badge')}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">{t('amazon.models.fba.description')}</p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((i) => (
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
        desktopFeatures={desktopWhyFeatures}
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

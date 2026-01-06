'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PricingSection from '../components/PricingSection';
import WhyZambeel from '../components/dropshiping_components/WhyZambeel';
import Wts from '../components/dropshiping_components/WhereTS';
import DeliveryCharges from '../components/DeliveryCharges';
const connectionImg = '/assets/images/connection.png';
const databaseImg = '/assets/images/database.png';
const frameImg = '/assets/images/frame1.png';

const Zambeel360Page = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  
  // Helper function to format description - only for Arabic
  const formatDescription = (desc) => {
    if (currentLanguage === 'ar') {
      return desc
        .replace(/ and /g, '\nand ')
        .replace(/ or /g, '\nor ')
        .replace(/ & /g, '\n& ')
        .replace(/, /g, ',\n')
        .replace(/\. /g, '.\n')
        .replace(/\n\n/g, '\n');
    }
    return desc;
  };
  // Text carousel state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const carouselTexts = [
    {
      line1: t('zambeel360.hero.carousel.allDone'),
    },
    {
      line1: t('zambeel360.hero.carousel.quality'),
    },
    {
      line1: t('zambeel360.hero.carousel.allInSolution'),
    }
  ];

  // Auto-rotate text every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [carouselTexts.length, t]);
  const features = [
    {
      id: 1,
      text: t('zambeel360.whatIs.features.findProducts'),
      lineWidth: "md:w-[15%]",
      mobileLineW: "w-[12%]",
      mobileCardMl: "ml-[12%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="4" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 15L19 19" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="4" y="4" width="6" height="6" rx="1" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 5H9M5 7H7" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      text: t('zambeel360.whatIs.features.qualityCheck'),
      lineWidth: "md:w-[25%]",
      mobileLineW: "w-[22%]",
      mobileCardMl: "ml-[22%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L14 7L18 8L15 11L15.5 15L12 13L8.5 15L9 11L6 8L10 7L12 3Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12L10 14L14 10" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 3,
      text: t('zambeel360.whatIs.features.handleCustoms'),
      lineWidth: "md:w-[35%]",
      mobileLineW: "w-[32%]",
      mobileCardMl: "ml-[32%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="4" width="14" height="16" rx="1" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 8H19" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H16" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 15H14" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 18H14" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 6H11" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="6" r="1" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 4,
      text: t('zambeel360.whatIs.features.storeSafely'),
      lineWidth: "md:w-[20%]",
      mobileLineW: "w-[18%]",
      mobileCardMl: "ml-[18%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="7" width="16" height="14" rx="1" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 10H20" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 13H17" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 16H15" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 19H13" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 4V7" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 4V7" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="5" r="0.75" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 5,
      text: t('zambeel360.whatIs.features.fastDelivery'),
      lineWidth: "md:w-[10%]",
      mobileLineW: "w-[8%]",
      mobileCardMl: "ml-[8%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19C7.53043 19 8.03914 18.7893 8.41421 18.4142C8.78929 18.0391 9 17.5304 9 17C9 16.4696 8.78929 15.9609 8.41421 15.5858C8.03914 15.2107 7.53043 15 7 15C6.46957 15 5.96086 15.2107 5.58579 15.5858C5.21071 15.9609 5 16.4696 5 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 17C15 17.5304 15.2107 18.0391 15.5858 18.4142C15.9609 18.7893 16.4696 19 17 19C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17C19 16.4696 18.7893 15.9609 18.4142 15.5858C18.0391 15.2107 17.5304 15 17 15C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 17H3V6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H13V17M9 17H15M19 17H21V11M21 11H13M21 11L18 6H13" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3L19 6H16V3Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative -mt-20 pt-20" style={{ background: 'linear-gradient(186.57deg, rgba(18, 75, 61, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(28, 54, 89, 0.911419) 31.95%, rgba(22, 81, 66, 0.793286) 47.98%, rgba(51, 88, 140, 0.913498) 70.93%, #4A61C4 81.76%)' }}>

      {/* Hero Section */}
      <section className="pb-8 md:pb-8 text-center relative pt-24 md:pt-28 overflow-hidden">
        {/* Left side SVGs */}
        <div className="absolute left-[3%] top-[50%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute left-[3%] top-[64%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        {/* Right side SVGs */}
        <div className="absolute right-[4%] top-[10%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute right-[4%] top-[25%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        {/* Center SVG */}
        <div className="absolute left-1/2 top-[50%] transform -translate-x-1/2 hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h3 className="text-[26px] md:text-[44px] font-[700] leading-[100%] tracking-[0.02em] text-center text-white mt-8 md:mt-0 mb-4 md:mb-6 relative z-10" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>
              {t('zambeel360.hero.title')}
            </h3>
            <p className="text-[20px] md:text-[30px] font-normal italic leading-[100%] tracking-[0] text-center text-white mb-2 md:mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t('zambeel360.hero.subtitle')}
            </p>
            <div>
              <p className="text-[14px] md:text-[20px] font-normal italic leading-[100%] tracking-[0] text-center text-white/95 max-w-3xl mx-auto px-2 min-h-[30px] md:min-h-[40px] transition-opacity duration-500 mb-2 md:mb-0" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {carouselTexts[currentTextIndex].line1}
              </p>
            </div>
            {/* Carousel dots */}
            <div className="flex justify-center gap-2 mb-4 md:-mt-2">
              {carouselTexts.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentTextIndex(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    index === currentTextIndex
                      ? 'w-7 md:w-8 h-2 bg-[#ffd24c]'
                      : 'w-2 h-2 bg-white/40'
                  }`}
                ></div>
              ))}
            </div>
            {/* Get Started Button */}
            <div className="flex justify-center mb-8">
              <a 
                href="https://wa.me/971568472271?text=I%20want%20to%20start%20with%20Zambeel%20360%20or%20Zambeel%203PL.%20Please%20assign%20me%20an%20account%20manager"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffd24c] text-[#243a86] font-bold px-8 py-3 rounded-full hover:bg-[#ffc933] transition-all duration-300 shadow-lg text-base md:text-lg inline-block"
              >
                {t('common.talkToAgent')}
              </a>
            </div>
          </div>
          <div className="max-w-md md:max-w-2xl mx-auto">
            <div className="bg-[#d5dce8]/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10">
              <p className="text-[#2c3e5f] text-center text-xs sm:text-sm md:text-base font-semibold mb-6 md:mb-8">
                {t('zambeel360.hero.availableIn')}
              </p>
              <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-center md:items-center md:space-x-6 lg:space-x-10">
                <div className="flex justify-center items-center gap-6 md:contents">
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="h-1/3 bg-green-600"></div>
                          <div className="h-1/3 bg-white"></div>
                          <div className="h-1/3 bg-black"></div>
                        </div>
                        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-600"></div>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">{t('countries.UAE')}</span>
                  </div>
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                    <div className="w-20 h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <svg width="96" height="96" viewBox="0 0 96 96" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="48" cy="48" r="34" fill="#6DA544" />
                        <path d="M34 58C34 60.7614 36.2386 63 39 63H53C53 65.2091 54.7909 67 57 67H61C63.2091 67 65 65.2091 65 63V58H34Z" fill="#F0F0F0" />
                        <path d="M65 36V46C65 47.6569 63.6569 49 62 49V53C65.866 53 69 49.866 69 46V36H65Z" fill="#F0F0F0" />
                        <path d="M32 46C32 47.6569 30.6569 49 29 49V53C32.866 53 36 49.866 36 46V36H32V46Z" fill="#F0F0F0" />
                        <path d="M56 36H60V46H56V36Z" fill="#F0F0F0" />
                        <path d="M50 42C50 42.5523 49.5523 43 49 43C48.4477 43 48 42.5523 48 42V36H44V42C44 42.5523 43.5523 43 43 43C42.4477 43 42 42.5523 42 42V36H38V42C38 44.7614 40.2386 47 43 47C44.1046 47 45.1046 46.6569 46 46C46.8954 46.6569 47.8954 47 49 47C49.1843 47 49.364 46.987 49.538 46.962C49.268 48.378 48.1 49.4 46.7 49.4V53C50.566 53 53.7 49.866 53.7 46V42H50Z" fill="#F0F0F0" />
                        <path d="M38 49H44V53H38V49Z" fill="#F0F0F0" />
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">{t('countries.KSA')}</span>
                  </div>
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                    <div className="w-18 h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
                        <g clipPath="url(#clip)">
                          <path d="M48 86C70.0914 86 88 68.0914 88 46C88 23.9086 70.0914 6 48 6C25.9086 6 8 23.9086 8 46C8 68.0914 25.9086 86 48 86Z" fill="#F0F0F0" />
                          <path d="M8 45.9997C8 61.1614 16.4358 74.3519 28.8695 81.1361V10.8633C16.4358 17.6475 8 30.838 8 45.9997Z" fill="#F0F0F0" />
                          <path d="M48.0035 6C41.0738 6 34.556 7.76297 28.873 10.8636V81.1363C34.556 84.237 41.0738 86 48.0035 86C70.0948 86 88.0035 68.0913 88.0035 46C88.0035 23.9087 70.0948 6 48.0035 6Z" fill="#496E2D" />
                          <path d="M65.1017 52.6155C60.0412 56.2719 52.9746 55.1338 49.3184 50.0735C45.6618 45.0129 46.8001 37.9465 51.8606 34.2902C53.4384 33.1502 55.2112 32.4763 57.0148 32.2421C53.5449 31.7232 49.877 32.5051 46.8087 34.7221C40.5806 39.2224 39.1795 47.9194 43.6796 54.1479C48.1798 60.3758 56.877 61.7771 63.1054 57.2765C66.174 55.0594 68.0679 51.823 68.6645 48.3654C67.876 50.0038 66.6796 51.4754 65.1017 52.6155Z" fill="#F0F0F0" />
                          <path d="M64.8824 32.0879L67.733 35.1599L71.5355 33.3987L69.4945 37.0587L72.3449 40.131L68.233 39.3209L66.1921 42.9812L65.692 38.8202L61.5801 38.0101L65.3827 36.2488L64.8824 32.0879Z" fill="#F0F0F0" />
                        </g>
                        <defs>
                          <clipPath id="clip">
                            <rect width="80" height="80" transform="translate(8 6)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">{t('countries.Pakistan')}</span>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-12 md:contents">
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="h-1/3 bg-green-600"></div>
                          <div className="h-1/3 bg-white"></div>
                          <div className="h-1/3 bg-red-600"></div>
                        </div>
                        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-black"></div>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">{t('countries.Kuwait')}</span>
                  </div>
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#8d1b3d] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-white" style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 30%, 0 50%, 100% 70%, 100% 80%, 0 100%)' }}></div>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">{t('countries.Qatar')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full py-4 md:py-4">
        <div className="max-w-[1150px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="rounded-xl overflow-hidden">
            <video
              className="w-full h-64 md:h-96 object-cover pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              poster="https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVjb21tZXJjZXxlbnwwfDB8MHx8fDA%3D"
            >
              <source src="/videos/360-zambeel.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Why China Sourcing Section */}
      <WhyZambeel
        title={t('zambeel360.whatIs.title')}
        mobileTitle={t('zambeel360.whatIs.title')}
        description={t('zambeel360.whatIs.description')}
        features={features}
        desktopFeatures={[
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#d_find)">
                  <circle cx="22" cy="22" r="8" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 30L36 36" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="8" y="8" width="12" height="12" rx="2" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 10H18M10 14H16" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                <defs><clipPath id="d_find"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel360.whatIs.features.findProducts').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#d_quality)">
                  <path d="M24 6L28 14L36 16L30 22L31 30L24 26L17 30L18 22L12 16L20 14L24 6Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 24L20 28L28 20" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="24" cy="24" r="18" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                <defs><clipPath id="d_quality"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel360.whatIs.features.qualityCheck').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#d_customs)">
                  <rect x="10" y="8" width="28" height="32" rx="2" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 16H38" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 24H32" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 30H28" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 36H28" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 12H18" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="32" cy="12" r="2" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                <defs><clipPath id="d_customs"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel360.whatIs.features.handleCustoms').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#d_store)">
                  <rect x="8" y="14" width="32" height="28" rx="2" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 20H40" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 26H34" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 32H30" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 38H26" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 8V14" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 8V14" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="32" cy="10" r="1.5" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                <defs><clipPath id="d_store"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel360.whatIs.features.storeSafely').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#d_delivery)">
                  <path d="M10 34C10 35.0609 10.4214 36.0783 11.1716 36.8284C11.9217 37.5786 12.9391 38 14 38C15.0609 38 16.0783 37.5786 16.8284 36.8284C17.5786 36.0783 18 35.0609 18 34C18 32.9391 17.5786 31.9217 16.8284 31.1716C16.0783 30.4214 15.0609 30 14 30C12.9391 30 11.9217 30.4214 11.1716 31.1716C10.4214 31.9217 10 32.9391 10 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 34C30 35.0609 30.4214 36.0783 31.1716 36.8284C31.9217 37.5786 32.9391 38 34 38C35.0609 38 36.0783 37.5786 36.8284 36.8284C37.5786 36.0783 38 35.0609 38 34C38 32.9391 37.5786 31.9217 36.8284 31.1716C36.0783 30.4214 35.0609 30 34 30C32.9391 30 31.9217 30.4214 31.1716 31.1716C30.4214 31.9217 30 32.9391 30 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 34H6V12C6 11.4696 6.21071 10.9609 6.58579 10.5858C6.96086 10.2107 7.46957 10 8 10H26V34M18 34H30M38 34H42V22M42 22H26M42 22L36 12H26" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 6L38 12H32V6Z" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                <defs><clipPath id="d_delivery"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel360.whatIs.features.fastDelivery').replace(/ /g, '\n')
          }
        ]}
      />

      {/* Where to Start Section */}
      <Wts
        title={t('zambeel360.whereToStart.title')}
        description={t('zambeel360.whereToStart.description')}
        buttonText={t('common.talkToAgent')}
        buttonLink="https://wa.me/971568472271?text=I%20want%20to%20start%20with%20Zambeel%20360%20or%20Zambeel%203PL.%20Please%20assign%20me%20an%20account%20manager"
        steps={[
          {
            number: 1,
            title: t('zambeel360.whereToStart.steps.bookConsultation.title'),
            description: t('zambeel360.whereToStart.steps.bookConsultation.desc'),
            desktopDescription: formatDescription(t('zambeel360.whereToStart.steps.bookConsultation.desc')),
            icon: connectionImg,
            iconAlt: "connection"
          },
          {
            number: 2,
            title: t('zambeel360.whereToStart.steps.sendInventory.title'),
            description: t('zambeel360.whereToStart.steps.sendInventory.desc'),
            desktopDescription: formatDescription(t('zambeel360.whereToStart.steps.sendInventory.desc')),
            icon: frameImg,
            iconAlt: "frame"
          },
          {
            number: 3,
            title: t('zambeel360.whereToStart.steps.connectStore.title'),
            description: t('zambeel360.whereToStart.steps.connectStore.desc'),
            desktopDescription: formatDescription(t('zambeel360.whereToStart.steps.connectStore.desc')),
            icon: databaseImg,
            iconAlt: "database"
          },
          {
            number: 4,
            title: t('zambeel360.whereToStart.steps.startSelling.title'),
            description: t('zambeel360.whereToStart.steps.startSelling.desc'),
            desktopDescription: formatDescription(t('zambeel360.whereToStart.steps.startSelling.desc')),
            icon: null,
            iconAlt: null
          }
        ]}
      />

      {/* Pricing Section */}
      <PricingSection 
        title={t('zambeel360.pricing.title')}
        subtitle={t('zambeel360.pricing.subtitle')}
      />

      {/* ================= DELIVERY CHARGES ================= */}
      <DeliveryCharges
        title={t('zambeel360.deliveryCharges.title')}
        subtitle={t('zambeel360.deliveryCharges.subtitle')}
        countries={[
          { code: "UAE", name: t('countries.UAE'), currency: "AED" },
          { code: "KSA", name: t('countries.KSA'), currency: "SAR" },
          { code: "Kuwait", name: t('countries.Kuwait'), currency: "AED" },
          { code: "Qatar", name: t('countries.Qatar'), currency: "AED" },
          { code: "Pakistan", name: t('countries.Pakistan'), currency: "PKR" }
        ]}
        charges={[
          {
            label: t('deliveryCharges.orderConfirmation'),
            values: {
              UAE: "18 AED",
              KSA: "26 SAR",
              Kuwait: "30 AED",
              Qatar: "25 AED",
              Pakistan: "300 PKR"
            }
          },
          {
            label: t('deliveryCharges.return'),
            values: {
              UAE: "5 AED",
              KSA: "7.5 SAR",
              Kuwait: "15 AED",
              Qatar: "5 AED",
              Pakistan: "300 PKR"
            }
          },
          {
            label: t('deliveryCharges.codTax'),
            values: {
              UAE: "0%",
              KSA: "0%",
              Kuwait: "0%",
              Qatar: "0%",
              Pakistan: "4%"
            }
          },
          {
            label: t('deliveryCharges.deliveryTime'),
            icon: "⚡",
            values: {
              UAE: "1-2 Days",
              KSA: "1-3 Days",
              Kuwait: "1-2 Days",
              Qatar: "1-2 Days",
              Pakistan: "1-3 Days"
            }
          }
        ]}
        importantInfo={[
          t('deliveryCharges.warehousingFree'),
          t('deliveryCharges.failedDelivery'),
          t('deliveryCharges.outskirtAreas')
        ]}
      />
    </div>
  );
};

export default Zambeel360Page;


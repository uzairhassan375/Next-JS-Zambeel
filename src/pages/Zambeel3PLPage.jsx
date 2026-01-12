'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import PricingSection from '../components/PricingSection';
import WhyZambeel from '../components/dropshiping_components/WhyZambeel';
import Wts from '../components/dropshiping_components/WhereTS';
import DeliveryCharges from '../components/DeliveryCharges';
const connectionImg = '/assets/images/connection.png';
const databaseImg = '/assets/images/database.png';
const frameImg = '/assets/images/frame1.png';

const Zambeel3PLPage = () => {
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
      line1: t('zambeel3PL.hero.carousel.freeWarehousing'),
    },
    {
      line1: t('zambeel3PL.hero.carousel.fastDelivery'),
    },
    {
      line1: t('zambeel3PL.hero.carousel.scale'),
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
      text: t('zambeel3PL.whyZambeel.features.warehousing'),
      lineWidth: "md:w-[15%]",
      mobileLineW: "w-[12%]",
      mobileCardMl: "ml-[12%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="4" width="8" height="9" rx="1" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 14H15C15.5304 14 16.0391 14.2107 16.4142 14.5858C16.7893 14.9609 17 15.4696 17 16V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7H8C8.53043 7 9.03914 7.21071 9.41421 7.58579C9.78929 7.96086 10 8.46957 10 9V21" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      text: t('zambeel3PL.whyZambeel.features.fulfillment'),
      lineWidth: "md:w-[25%]",
      mobileLineW: "w-[22%]",
      mobileCardMl: "ml-[22%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19C7.53043 19 8.03914 18.7893 8.41421 18.4142C8.78929 18.0391 9 17.5304 9 17C9 16.4696 8.78929 15.9609 8.41421 15.5858C8.03914 15.2107 7.53043 15 7 15C6.46957 15 5.96086 15.2107 5.58579 15.5858C5.21071 15.9609 5 16.4696 5 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 17C15 17.5304 15.2107 18.0391 15.5858 18.4142C15.9609 18.7893 16.4696 19 17 19C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17C19 16.4696 18.7893 15.9609 18.4142 15.5858C18.0391 15.2107 17.5304 15 17 15C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 17H3V6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H13V17M9 17H15M19 17H21V11M21 11H13M21 11L18 6H13" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 3,
      text: t('zambeel3PL.whyZambeel.features.inventory'),
      lineWidth: "md:w-[35%]",
      mobileLineW: "w-[32%]",
      mobileCardMl: "ml-[32%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19C5.53043 19 6.03914 18.7893 6.41421 18.4142C6.78929 18.0391 7 17.5304 7 17C7 16.4696 6.78929 15.9609 6.41421 15.5858C6.03914 15.2107 5.53043 15 5 15C4.46957 15 3.96086 15.2107 3.58579 15.5858C3.21071 15.9609 3 16.4696 3 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 17C12 17.5304 12.2107 18.0391 12.5858 18.4142C12.9609 18.7893 13.4696 19 14 19C14.5304 19 15.0391 18.7893 15.4142 18.4142C15.7893 18.0391 16 17.5304 16 17C16 16.4696 15.7893 15.9609 15.4142 15.5858C15.0391 15.2107 14.5304 15 14 15C13.4696 15 12.9609 15.2107 12.5858 15.5858C12.2107 15.9609 12 16.4696 12 17Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 17H12" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 17V11H16V17" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 11V7H9" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11V5H13L16 11" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 15H19V5" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 13H19" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 4,
      text: t('zambeel3PL.whyZambeel.features.shipping'),
      lineWidth: "md:w-[20%]",
      mobileLineW: "w-[18%]",
      mobileCardMl: "ml-[18%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2C15.31 2 18.31 3.5 20.31 5.9" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C8.69 22 5.69 20.5 3.69 18.1" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12H22" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2C9.24 2 6.8 3.5 5.2 5.6" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C14.76 22 17.2 20.5 18.8 18.4" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 5,
      text: t('zambeel3PL.whyZambeel.features.tracking'),
      lineWidth: "md:w-[10%]",
      mobileLineW: "w-[8%]",
      mobileCardMl: "ml-[8%]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 15L12 12L15 15" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 9C15 9.53043 14.7893 10.0391 14.4142 10.4142C14.0391 10.7893 13.5304 11 13 11C12.4696 11 11.9609 10.7893 11.5858 10.4142C11.2107 10.0391 11 9.53043 11 9C11 8.46957 11.2107 7.96086 11.5858 7.58579C11.9609 7.21071 12.4696 7 13 7C13.5304 7 14.0391 7.21071 14.4142 7.58579C14.7893 7.96086 15 8.46957 15 9Z" fill="#1e3a8a" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9C9 9.53043 8.78929 10.0391 8.41421 10.4142C8.03914 10.7893 7.53043 11 7 11C6.46957 11 5.96086 10.7893 5.58579 10.4142C5.21071 10.0391 5 9.53043 5 9C5 8.46957 5.21071 7.96086 5.58579 7.58579C5.96086 7.21071 6.46957 7 7 7C7.53043 7 8.03914 7.21071 8.41421 7.58579C8.78929 7.96086 9 8.46957 9 9Z" fill="#1e3a8a" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="10" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative -mt-20 pt-20" style={{ background: 'linear-gradient(186.57deg, rgba(72, 11, 96, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(28, 54, 89, 0.911419) 31.95%, rgba(53, 4, 72, 0.793286) 47.98%, rgba(51, 88, 140, 0.913498) 70.93%, #4A61C4 81.76%)' }}>

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
              {t('zambeel3PL.hero.title')}
            </h3>
            <p className="text-[20px] md:text-[30px] font-normal italic leading-[100%] tracking-[0] text-center text-white mb-2 md:mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t('zambeel3PL.hero.subtitle')}
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
                {t('zambeel3PL.hero.availableIn')}
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
                <div className="flex justify-center items-center gap-6 md:gap-12 md:contents flex-wrap">
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
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-200">
                        <Image
                          src="https://flagcdn.com/w160/om.png"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          alt="Oman"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">{t('countries.Oman')}</span>
                  </div>
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-200">
                        <Image
                          src="https://flagcdn.com/w160/bh.png"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          alt="Bahrain"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#2c3e5f] font-semibold">{t('countries.Bahrain')}</span>
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
              poster="https://plus.unsplash.com/premium_photo-1749423089108-9ab9871fb9e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhpcmQlMjBwYXJ0JTIwbG9naXN0aWNzfGVufDB8MHwwfHx8MA%3D%3D"
            >
              <source src="/videos/3pl-landscape.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Why 3PL with Zambeel Section */}
      <WhyZambeel
        title={t('zambeel3PL.whyZambeel.title')}
        mobileTitle={t('zambeel3PL.whyZambeel.title')}
        description={t('zambeel3PL.whyZambeel.description')}
        features={features}
        desktopFeatures={[
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#d_hq)">
            <path d="M28 8C28 7.46957 28.2107 6.96086 28.5858 6.58579C28.9609 6.21071 29.4696 6 30 6H40C40.5304 6 41.0391 6.21071 41.4142 6.58579C41.7893 6.96086 42 7.46957 42 8V18C42 18.5304 41.7893 19.0391 41.4142 19.4142C41.0391 19.7893 40.5304 20 40 20H30C29.4696 20 28.9609 19.7893 28.5858 19.4142C28.2107 19.0391 28 18.5304 28 18V8Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 28H30C31.0609 28 32.0783 28.4214 32.8284 29.1716C33.5786 29.9217 34 30.9391 34 32V38C34 39.0609 33.5786 40.0783 32.8284 40.8284C32.0783 41.5786 31.0609 42 30 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V18C6 16.9391 6.42143 15.9217 7.17157 15.1716C7.92172 14.4214 8.93913 14 10 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18V42" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs><clipPath id="d_hq"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel3PL.whyZambeel.features.warehousing').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#d_ship)">
                  <path d="M10 34C10 35.0609 10.4214 36.0783 11.1716 36.8284C11.9217 37.5786 12.9391 38 14 38C15.0609 38 16.0783 37.5786 16.8284 36.8284C17.5786 36.0783 18 35.0609 18 34C18 32.9391 17.5786 31.9217 16.8284 31.1716C16.0783 30.4214 15.0609 30 14 30C12.9391 30 11.9217 30.4214 11.1716 31.1716C10.4214 31.9217 10 32.9391 10 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 34C30 35.0609 30.4214 36.0783 31.1716 36.8284C31.9217 37.5786 32.9391 38 34 38C35.0609 38 36.0783 37.5786 36.8284 36.8284C37.5786 36.0783 38 35.0609 38 34C38 32.9391 37.5786 31.9217 36.8284 31.1716C36.0783 30.4214 35.0609 30 34 30C32.9391 30 31.9217 30.4214 31.1716 31.1716C30.4214 31.9217 30 32.9391 30 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 34H6V12C6 11.4696 6.21071 10.9609 6.58579 10.5858C6.96086 10.2107 7.46957 10 8 10H26V34M18 34H30M38 34H42V22M42 22H26M42 22L36 12H26" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs><clipPath id="d_ship"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel3PL.whyZambeel.features.fulfillment').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#d_src)">
                  <path d="M6 34C6 35.0609 6.42143 36.0783 7.17157 36.8284C7.92172 37.5786 8.93913 38 10 38C11.0609 38 12.0783 37.5786 12.8284 36.8284C13.5786 36.0783 14 35.0609 14 34C14 32.9391 13.5786 31.9217 12.8284 31.1716C12.0783 30.4214 11.0609 30 10 30C8.93913 30 7.92172 30.4214 7.17157 31.1716C6.42143 31.9217 6 32.9391 6 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24 34C24 35.0609 24.4214 36.0783 25.1716 36.8284C25.9217 37.5786 26.9391 38 28 38C29.0609 38 30.0783 37.5786 30.8284 36.8284C31.5786 36.0783 32 35.0609 32 34C32 32.9391 31.5786 31.9217 30.8284 31.1716C30.0783 30.4214 29.0609 30 28 30C26.9391 30 25.9217 30.4214 25.1716 31.1716C24.4214 31.9217 24 32.9391 24 34Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 34H24" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 34V22H32V34" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 22V14H18" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 22V10H26L32 22" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M44 30H38V10" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M32 26H38" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs><clipPath id="d_src"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel3PL.whyZambeel.features.inventory').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#d_pkg)">
                        <path d="M42 32.015V15.979C41.9988 15.2812 41.8132 14.596 41.4619 13.993C41.1107 13.39 40.6064 12.8904 40 12.545L26 4.52904C25.3909 4.18107 24.7015 3.99805 24 3.99805C23.2985 3.99805 22.6091 4.18107 22 4.52904L8 12.545C6.762 13.255 6 14.565 6 15.981V32.017C6 33.435 6.762 34.743 8 35.451L22 43.467C23.24 44.175 24.76 44.175 26 43.467L40 35.451C41.238 34.741 42 33.431 42 32.015Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M24 44V24" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M24 23.9999L41.46 13.9199" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.53906 13.9199L23.9991 23.9999" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M30.006 30.664L24 34L6 24M36.006 27.33L42 24" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M30 34.0002L36 30.6602V24.6602L30 28.0002V34.0002Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs><clipPath id="d_pkg"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel3PL.whyZambeel.features.shipping').replace(/ /g, '\n')
          },
          {
            icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#d_low)">
                        <path d="M18 30L30 18" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29 27C30.1046 27 31 27.8954 31 29C31 30.1046 30.1046 31 29 31C27.8954 31 27 30.1046 27 29C27 27.8954 27.8954 27 29 27Z" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 17C20.1046 17 21 17.8954 21 19C21 20.1046 20.1046 21 19 21C17.8954 21 17 20.1046 17 19C17 17.8954 17.8954 17 19 17Z" stroke="#2D3E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 24C6 26.3638 6.46558 28.7044 7.37017 30.8883C8.27475 33.0722 9.60062 35.0565 11.2721 36.7279C12.9435 38.3994 14.9278 39.7252 17.1117 40.6298C19.2956 41.5344 21.6362 42 24 42C26.3638 42 28.7044 41.5344 30.8883 40.6298C33.0722 39.7252 35.0565 38.3994 36.7279 36.7279C38.3994 35.0565 39.7252 33.0722 40.6298 30.8883C41.5344 28.7044 42 26.3638 42 24C42 21.6362 41.5344 19.2956 40.6298 17.1117C39.7252 14.9278 38.3994 12.9435 36.7279 11.2721C35.0565 9.60062 33.0722 8.27475 30.8883 7.37017C28.7044 6.46558 26.3638 6 24 6C21.6362 6 19.2956 6.46558 17.1117 7.37017C14.9278 8.27475 12.9435 9.60062 11.2721 11.2721C9.60062 12.9435 8.27475 14.9278 7.37017 17.1117C6.46558 19.2956 6 21.6362 6 24Z" stroke="#2D3E7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs><clipPath id="d_low"><rect width="48" height="48" fill="white" /></clipPath></defs>
                    </svg>
            ),
            label: t('zambeel3PL.whyZambeel.features.tracking').replace(/ /g, '\n')
          }
        ]}
      />

      {/* Where to Start Section */}
      <Wts
        title={t('zambeel3PL.whereToStart.title')}
        description={t('zambeel3PL.whereToStart.description')}
        buttonText={t('common.talkToAgent')}
        buttonLink="https://wa.me/971568472271?text=I%20want%20to%20start%20with%20Zambeel%20360%20or%20Zambeel%203PL.%20Please%20assign%20me%20an%20account%20manager"
        steps={[
          {
            number: 1,
            title: t('zambeel3PL.whereToStart.steps.bookConsultation.title'),
            description: t('zambeel3PL.whereToStart.steps.bookConsultation.desc'),
            desktopDescription: formatDescription(t('zambeel3PL.whereToStart.steps.bookConsultation.desc')),
            icon: connectionImg,
            iconAlt: "connection"
          },
          {
            number: 2,
            title: t('zambeel3PL.whereToStart.steps.sendInventory.title'),
            description: t('zambeel3PL.whereToStart.steps.sendInventory.desc'),
            desktopDescription: formatDescription(t('zambeel3PL.whereToStart.steps.sendInventory.desc')),
            icon: frameImg,
            iconAlt: "frame"
          },
          {
            number: 3,
            title: t('zambeel3PL.whereToStart.steps.connectStore.title'),
            description: t('zambeel3PL.whereToStart.steps.connectStore.desc'),
            desktopDescription: formatDescription(t('zambeel3PL.whereToStart.steps.connectStore.desc')),
            icon: databaseImg,
            iconAlt: "database"
          },
          {
            number: 4,
            title: t('zambeel3PL.whereToStart.steps.startSelling.title'),
            description: t('zambeel3PL.whereToStart.steps.startSelling.desc'),
            desktopDescription: formatDescription(t('zambeel3PL.whereToStart.steps.startSelling.desc')),
            icon: null,
            iconAlt: null
          }
        ]}
      />

      {/* Pricing Section */}
      <PricingSection 
        title={t('zambeel3PL.pricing.title')}
        subtitle={t('zambeel3PL.pricing.subtitle')}
        customPlans={[
          {
            tag: "FREE",
            tagTranslationKey: "pricing.plans.free.tag",
            name: "For Experts",
            nameTranslationKey: "pricing.plans.free.name",
            monthlyPrice: "$0",
            yearlyPrice: "$0",
            description: "",
            features: [
              { translationKey: "pricing.features.juniorAccountManager", included: true },
              { translationKey: "pricing.features.responseTime4Hours", included: true },
              { translationKey: "pricing.features.whatsappGroupAccess", included: false },
              { translationKey: "pricing.features.winningCreativity", included: false },
              { translationKey: "pricing.features.bumperTrendingProducts", included: false },
              { translationKey: "pricing.features.seniorBusinessConsultant", included: false },
              { translationKey: "pricing.features.winningCreativedStrategy", included: false },
              { translationKey: "pricing.features.customisedPackaging", included: false },
              { translationKey: "pricing.features.productFinancing", included: false },
            ],
          },
          {
            tag: "GOLD",
            tagTranslationKey: "pricing.plans.gold.tag",
            name: "For Beginners",
            nameTranslationKey: "pricing.plans.gold.name",
            monthlyPrice: "$69",
            yearlyPrice: "$207",
            description: "",
            features: [
              { translationKey: "pricing.features.seniorAccountManager", included: true },
              { translationKey: "pricing.features.responseTime30Minutes", included: true },
              { translationKey: "pricing.features.whatsappGroupAccess", included: true },
              { translationKey: "pricing.features.exclusiveWinningProduct", included: true },
              { translationKey: "pricing.features.winningCreativedStrategy", included: true },
              { translationKey: "pricing.features.bumperTrendingProducts", included: true },
              { translationKey: "pricing.features.seniorBusinessConsultant", included: true },
              { translationKey: "pricing.features.customisedPackaging", included: true },
              { translationKey: "pricing.features.productFinancing", included: true },
            ],
          },
          {
            tag: "Diamond",
            tagTranslationKey: "pricing.plans.diamond.tag",
            name: "Super Saver",
            nameTranslationKey: "pricing.plans.diamond.name",
            monthlyPrice: "$199",
            yearlyPrice: "$447",
            description: "",
            features: [
              { translationKey: "pricing.features.seniorAccountManager", included: true },
              { translationKey: "pricing.features.responseTime30Minutes", included: true },
              { translationKey: "pricing.features.whatsappGroupAccess", included: true },
              { translationKey: "pricing.features.exclusiveWinningProduct", included: true },
              { translationKey: "pricing.features.winningCreativedStrategy", included: true },
              { translationKey: "pricing.features.bumperTrendingProducts", included: true },
              { translationKey: "pricing.features.seniorBusinessConsultant", included: true },
              { translationKey: "pricing.features.customisedPackaging", included: true },
              { translationKey: "pricing.features.productFinancing", included: true },
            ],
          },
        ]}
      />

      {/* ================= DELIVERY CHARGES ================= */}
      <DeliveryCharges
        title={t('zambeel3PL.deliveryCharges.title')}
        subtitle={t('zambeel3PL.deliveryCharges.subtitle')}
        countries={[
          { code: "UAE", name: t('countries.UAE'), currency: "AED" },
          { code: "KSA", name: t('countries.KSA'), currency: "SAR" },
          { code: "Kuwait", name: t('countries.Kuwait'), currency: "AED" },
          { code: "Qatar", name: t('countries.Qatar'), currency: "AED" },
          { code: "Oman", name: t('countries.Oman'), currency: "AED" },
          { code: "Bahrain", name: t('countries.Bahrain'), currency: "AED" },
          { code: "Pakistan", name: t('countries.Pakistan'), currency: "PKR" }
        ]}
        charges={[
          {
            label: t('deliveryCharges.orderConfirmation'),
            values: {
              UAE: "20 AED",
              KSA: "28 SAR",
              Kuwait: "30 AED",
              Qatar: "25 AED",
              Oman: "26 AED",
              Bahrain: "20 AED",
              Pakistan: "350 PKR"
            }
          },
          {
            label: t('deliveryCharges.return'),
            values: {
              UAE: "5 AED",
              KSA: "7.5 SAR",
              Kuwait: "15 AED",
              Qatar: "5 AED",
              Oman: "12 AED",
              Bahrain: "12 AED",
              Pakistan: "350 PKR"
            }
          },
          {
            label: t('deliveryCharges.codTax'),
            values: {
              UAE: "0%",
              KSA: "0%",
              Kuwait: "0%",
              Qatar: "0%",
              Oman: "0%",
              Bahrain: "0%",
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
              Oman: "1-2 Days",
              Bahrain: "1-2 Days",
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

export default Zambeel3PLPage;


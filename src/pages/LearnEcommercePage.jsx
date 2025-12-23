'use client';

import React from "react";
import { useTranslation } from "react-i18next";

const LearnEcommercePage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isRTL = currentLanguage === 'ar';

  // Topic cards data
  const topics = [
    {
      id: 1,
      key: "marketUnderstanding",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" stroke="#FF8C00" strokeWidth="1.5" fill="#FF8C00" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="#FF8C00" strokeWidth="1.5" fill="none"/>
        </svg>
      )
    },
    {
      id: 2,
      key: "productHunting",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      key: "creativeHunting",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )
    },
    {
      id: 4,
      key: "websiteLandingPages",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="#FF8C00" strokeWidth="2" fill="none"/>
          <path d="M3 8H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 12H16" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 5,
      key: "pixelAndAdManager",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FF8C00" strokeWidth="2" fill="none"/>
          <path d="M3 9H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 21V9" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="15" cy="15" r="2" stroke="#FF8C00" strokeWidth="2" fill="none"/>
        </svg>
      )
    }
  ];

  // Form link - Replace this with your actual form URL
  const formLink = "#"; // TODO: Replace with actual form link (e.g., Google Forms, Typeform, etc.)

  return (
    <div
      className="min-h-screen m-0 p-0 overflow-x-hidden"
      style={{
        background: `linear-gradient(186.57deg, rgba(18, 75, 61, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(28, 54, 89, 0.911419) 31.95%, rgba(22, 81, 66, 0.793286) 47.98%, rgba(51, 88, 140, 0.913498) 70.93%, #4A61C4 81.76%)`,
      }}
    >
      {/* Hero Section */}
      <section className="pb-12 md:pb-16 text-center relative pt-24 md:pt-32 overflow-hidden">
        {/* Decorative SVGs */}
        <div className="absolute left-[3%] top-[30%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute right-[3%] top-[40%] hidden md:block">
          <svg width="100" height="110" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
          <h1 
            className="text-[32px] md:text-[48px] font-bold leading-tight tracking-tight text-center text-white mb-6 md:mb-8"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('learnEcommerce.hero.title')}
          </h1>
          <p 
            className="text-[16px] md:text-[20px] font-normal leading-relaxed text-center text-white/95 max-w-3xl mx-auto"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('learnEcommerce.hero.description')}
          </p>
        </div>
      </section>

      {/* Topics Grid Section */}
      <section className="py-8 md:py-12 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border-2 border-[#FF8C00] p-6 md:p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              <div className="mb-4 text-[#FF8C00]">
                {topic.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#2E3B78] uppercase tracking-wide">
                {t(`learnEcommerce.topics.${topic.key}`)}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Join Class Button Section */}
      <section className="py-8 md:py-12 text-center relative z-10">
        <a
          href={formLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#ffd24c] text-[#243a86] font-bold px-8 py-4 rounded-full hover:bg-[#ffc933] transition-all duration-300 shadow-lg text-base md:text-lg hover:scale-105"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('learnEcommerce.joinClass')}
        </a>
      </section>
    </div>
  );
};

export default LearnEcommercePage;


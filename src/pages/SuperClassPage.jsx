'use client';

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Marquee from 'react-fast-marquee';
import ComingSoon from "../components/ComingSoon";

const SuperClassPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isRTL = currentLanguage === 'ar';
  const registerLink = 'https://docs.google.com/forms/d/e/1FAIpQLSeA4WTKzxanXcM4inCxjpGsimihwMlbQh50dK1UMSjUhPEzYQ/viewform';

  // Show Coming Soon page for Arabic language
  if (currentLanguage === 'ar') {
    return (
      <ComingSoon
        title={t('comingSoon.learnEcommerce.title', { defaultValue: 'تعلم التجارة الإلكترونية' })}
        description={t('comingSoon.learnEcommerce.description', { defaultValue: 'نعمل بجد لنقدم لك تجربة تعليمية رائعة. ترقبوا التحديثات!' })}
        cookieName="learn_ecommerce_countdown_target"
      />
    );
  }

  // Text carousel state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const carouselTexts = [
    t('superClass.hero.carousel.productHunting', { defaultValue: 'Product Hunting' }),
    t('superClass.hero.carousel.creativeHunting', { defaultValue: 'Creative Hunting' }),
    t('superClass.hero.carousel.websiteDesign', { defaultValue: 'Website Design' }),
    t('superClass.hero.carousel.digitalMarketing', { defaultValue: 'Digital Marketing' })
  ];

  // Auto-rotate text every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [carouselTexts.length, t]);

  // Moving ticker content
  const tickerText = t('superClass.ticker', { 
    defaultValue: 'Starts 23 January 2026 · Live Online · 3 Seats Left' 
  });

  // What is Super Class features
  const features = [
    {
      title: t('superClass.features.weekProgram', { defaultValue: '4-week live program' })
    },
    {
      title: t('superClass.features.stepByStep', { defaultValue: 'step-by-step guidance' })
    },
    {
      title: t('superClass.features.experts', { defaultValue: 'Top industry experts' })
    },
    {
      title: t('superClass.features.marketResearch', { defaultValue: 'Market Research & Practical Product Hunting' })
    },
    {
      title: t('superClass.features.creatives', { defaultValue: 'Creating Hunting & Editing for Winning Creatives' })
    },
    {
      title: t('superClass.features.shopify', { defaultValue: 'Shopify Store Setup & Optimisation' })
    },
    {
      title: t('superClass.features.businessManager', { defaultValue: 'Business Manager, Ad Account & Pixel Setup' })
    },
    {
      title: t('superClass.features.campaigns', { defaultValue: 'Campaign Setup & Analysis' })
    },
    {
      title: t('superClass.features.scaling', { defaultValue: 'Business Scaling' })
    }
  ];

  // Instructors
  const instructors = [
    {
      name: 'Waleed Ali',
      role: t('superClass.instructors.waleed.role', { defaultValue: 'Community Operations & Seller Training Expert' }),
      image: '/assets/instructors/1.jpeg'
    },
    {
      name: 'Ilqa Rasul',
      role: t('superClass.instructors.ilqa.role', { defaultValue: 'Product Hunting & Creative Strategy Expert' }),
      image: '/assets/instructors/2.jpeg'
    },
    {
      name: 'Ibrahim Ahmed',
      role: t('superClass.instructors.ibrahim.role', { defaultValue: 'Meta & TikTok Marketing Expert' }),
      image: '/assets/instructors/3.jpeg'
    },
    {
      name: 'Farah Kiran',
      role: t('superClass.instructors.farah.role', { defaultValue: 'Shopify & Marketing Expert' }),
      image: '/assets/instructors/4.jpeg'
    }
  ];

  return (
    <div className="min-h-screen m-0 p-0 overflow-x-hidden bg-transparent" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ================= HERO SECTION ================= */}
      <section 
        className="pb-8 md:pb-8 text-center relative pt-24 md:pt-28 overflow-hidden"
        style={{
          background: `linear-gradient(186.57deg, #2E3B78 0%, #4A61C4 100%)`,
        }}
      >
        {/* Left side SVGs (smaller, flipped) */}
        <div className="absolute left-[15%] top-[35%] hidden md:block">
          <svg width="90" height="76" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
            <path d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 -2.57223e-06 153 -4.45854e-06C99.386 -6.80211e-06 1.33141e-05 44.4904 1.33141e-05 44.4904C61.4613 107.826 68.0003 217 115.078 217Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute left-[15%] top-[50%] hidden md:block">
          <svg width="90" height="76" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
            <path d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 -2.57223e-06 153 -4.45854e-06C99.386 -6.80211e-06 1.33141e-05 44.4904 1.33141e-05 44.4904C61.4613 107.826 68.0003 217 115.078 217Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        {/* Right side SVGs (bigger) */}
        <div className="absolute right-[10%] top-[20%] hidden md:block">
          <svg width="200" height="150" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 -2.57223e-06 153 -4.45854e-06C99.386 -6.80211e-06 1.33141e-05 44.4904 1.33141e-05 44.4904C61.4613 107.826 68.0003 217 115.078 217Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute right-[10%] top-[50%] hidden md:block">
          <svg width="200" height="150" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 -2.57223e-06 153 -4.45854e-06C99.386 -6.80211e-06 1.33141e-05 44.4904 1.33141e-05 44.4904C61.4613 107.826 68.0003 217 115.078 217Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <h3 className="text-[26px] md:text-[44px] font-[700] leading-[100%] tracking-[0.02em] text-center text-white mt-8 md:mt-0 mb-4 md:mb-6 relative z-10" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>{t('superClass.hero.title', { defaultValue: 'Learn E-commerce' })}</h3>
        <p className="text-[20px] md:text-[30px] font-normal italic leading-[100%] tracking-[0] text-center text-white mb-2 md:mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t('superClass.hero.subtitle', { defaultValue: "Don't just study e-commerce. Launch it LIVE - Step by Step with E-commerce Experts" })}</p>
        <div>
          <p className="text-[14px] md:text-[20px] font-normal italic leading-[100%] tracking-[0] text-center text-white/95 max-w-3xl mx-auto px-2 min-h-[30px] md:min-h-[40px] transition-opacity duration-500 mb-2 md:mb-0" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {carouselTexts[currentTextIndex]}
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
          <a href={registerLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-[#ffd24c] text-[#243a86] font-bold px-8 py-3 rounded-full hover:bg-[#ffc933] transition-all duration-300 shadow-lg text-base md:text-lg">
            <span>{t('superClass.cta.join', { defaultValue: 'Join the Super Class' })}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Moving Ticker with Prominent Background */}
      <div className="w-screen bg-[#FCD64C] py-3 overflow-hidden" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <Marquee 
          speed={50} 
          gradient={true} 
          gradientColor={[252, 214, 76]} 
          gradientWidth={50}
          pauseOnHover={true}
          direction={currentLanguage === 'ar' ? 'left' : 'right'}
          autoFill={true}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex items-center mx-8 whitespace-nowrap text-sm md:text-base">
              <span className="text-[#2E3B78] font-semibold">{tickerText}</span>
              <span className="mx-8 text-[#2E3B78] opacity-60">•</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Who is this class for Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#F8FAFC] to-white relative overflow-hidden">
        {/* Texture background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E3B78' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 
            className="text-sm md:text-base font-semibold text-[#4A5568] mb-4 md:mb-6 tracking-widest uppercase relative inline-block px-8 py-4"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(252, 214, 76, 0.12) 0%, rgba(252, 214, 76, 0.06) 50%, rgba(252, 214, 76, 0.12) 100%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCD64C' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: 'auto, 30px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(252, 214, 76, 0.2)',
              boxShadow: '0 4px 12px rgba(46, 59, 120, 0.08)',
            }}
          >
            {t('superClass.whoIsThisFor.title', { defaultValue: 'WHO IS THIS CLASS FOR?' })}
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2E3B78] leading-tight">
            {t('superClass.whoIsThisFor.everyone', { defaultValue: 'For EVERYONE who wants to start and scale E-commerce business' })}
          </p>
        </div>
      </section>

      {/* What is Zambeel Super Class Section */}
      <section className="py-8 md:py-12 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E3B78] text-center mb-6 md:mb-8">
            {t('superClass.whatIs.title', { defaultValue: 'What is Zambeel Super Class?' })}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-[#E7EFFC] hover:border-[#FCD64C] transition-all duration-300 hover:shadow-lg text-center"
              >
                <p className="text-[#2E3B78] font-semibold text-sm md:text-base">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2E3B78] hover:bg-[#1a234d] text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl transition-all duration-300 shadow-lg hover:scale-105"
            >
              {t('superClass.cta.joinZambeel', { defaultValue: 'Join the Zambeel Super Class' })}
            </a>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E3B78] mb-4">
              {t('superClass.instructors.title', { defaultValue: 'Super Instructors for SuperClass' })}
            </h2>
            <p className="text-base md:text-lg text-[#4A5568] max-w-3xl mx-auto">
              {t('superClass.instructors.subtitle', { 
                defaultValue: 'Top Industry Experts - Building your E-commerce Business LIVE with you!' 
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="bg-[#E7EFFC] rounded-xl p-6 text-center border-2 border-transparent hover:border-[#FCD64C] transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center relative">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#2E3B78] mb-2">
                  {instructor.name}
                </h3>
                <p className="text-sm md:text-base text-[#4A5568]">
                  {instructor.role}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2E3B78] hover:bg-[#1a234d] text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl transition-all duration-300 shadow-lg hover:scale-105"
            >
              {t('superClass.cta.joinZambeel', { defaultValue: 'Join the Zambeel Super Class' })}
            </a>
          </div>

          {/* Price Ticker */}
          <div className="mt-8 w-screen bg-[#FCD64C] text-[#2E3B78] py-2 overflow-hidden" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
            <Marquee 
              speed={40} 
              gradient={false}
              direction={currentLanguage === 'ar' ? 'left' : 'right'}
            >
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i} className="mx-4 font-bold text-sm md:text-base">
                  {t('superClass.priceTicker', { defaultValue: 'Starts 23 January 2026 · Live Online · $50 Only' })} • 
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* How the Program Works Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-[#E7EFFC] to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E3B78] text-center mb-6 md:mb-8">
            {t('superClass.howItWorks.title', { defaultValue: 'HOW THE PROGRAM WORKS (STRUCTURE)' })}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* Super Instructor Classes */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#FCD64C] shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-[#2E3B78] mb-6">
                {t('superClass.howItWorks.instructorClasses.title', { defaultValue: 'Super Instructor Classes' })}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#FCD64C] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.instructorClasses.fridaySaturday', { defaultValue: 'Friday & Saturday' })}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FCD64C] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.instructorClasses.duration', { defaultValue: '2 hours daily' })}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FCD64C] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.instructorClasses.content', { defaultValue: 'Strategy, frameworks, live builds' })}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FCD64C] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.instructorClasses.decisionMaking', { defaultValue: 'Real-time decision making' })}
                  </span>
                </li>
              </ul>
            </div>

            {/* Practice Sessions */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#2E3B78] shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-[#2E3B78] mb-6">
                {t('superClass.howItWorks.practiceSessions.title', { defaultValue: 'Practice Sessions' })}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#2E3B78] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.practiceSessions.tuesdayThursday', { defaultValue: 'Tuesday & Thursday' })}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2E3B78] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.practiceSessions.duration', { defaultValue: '1.5 hours daily' })}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2E3B78] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.practiceSessions.execution', { defaultValue: 'Hands-on execution' })}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2E3B78] font-bold text-xl">•</span>
                  <span className="text-[#4A5568] text-base">
                    {t('superClass.howItWorks.practiceSessions.support', { defaultValue: 'Store audits, ad reviews & learning support' })}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-transparent rounded-2xl p-6 md:p-8 text-center">
            <p className="text-base md:text-lg text-[#2E3B78] font-semibold mb-4">
              {t('superClass.howItWorks.summary', { 
                defaultValue: 'You learn on weekends | You execute with support during the week.' 
              })}
            </p>
          </div>

          <div className="text-center mt-12">
            <a
              href={registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2E3B78] hover:bg-[#1a234d] text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl transition-all duration-300 shadow-lg hover:scale-105"
            >
              {t('superClass.cta.joinZambeel', { defaultValue: 'Join the Zambeel Super Class' })}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuperClassPage;


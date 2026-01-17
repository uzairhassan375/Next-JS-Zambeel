'use client';

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Marquee from 'react-fast-marquee';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ComingSoon from "../components/ComingSoon";

const SuperClassPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isRTL = currentLanguage === 'ar';
  const registerLink = 'https://docs.google.com/forms/d/e/1FAIpQLSeA4WTKzxanXcM4inCxjpGsimihwMlbQh50dK1UMSjUhPEzYQ/viewform';

  // Text carousel state - MUST be declared before any conditional returns
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  // Mobile features carousel state
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  
  const carouselTexts = [
    t('superClass.hero.carousel.productHunting', { defaultValue: 'Product Hunting' }),
    t('superClass.hero.carousel.creativeHunting', { defaultValue: 'Creative Hunting' }),
    t('superClass.hero.carousel.websiteDesign', { defaultValue: 'Website Design' }),
    t('superClass.hero.carousel.digitalMarketing', { defaultValue: 'Digital Marketing' })
  ];

  // Auto-rotate text every 3.5 seconds - MUST be declared before any conditional returns
  useEffect(() => {
    if (currentLanguage === 'ar') return; // Early exit for Arabic, but hook still called
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [carouselTexts.length, t, currentLanguage]);

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

  // Moving ticker content
  const tickerText = t('superClass.ticker', { 
    defaultValue: 'Starts 23 January 2026 · Live Online · 3 Seats Left' 
  });

  // Icon components for each feature
  const getFeatureIcon = (index) => {
    const icons = [
      // 1. 4-Week Live Program - Calendar icon
      <svg key="0" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>,
      // 2. Step-by-Step Guidance - Steps icon
      <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      // 3. Top Industry Experts - Star icon
      <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>,
      // 4. Market Research & Product Hunting - Search icon
      <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>,
      // 5. Creative Hunting & Editing - Edit icon
      <svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>,
      // 6. Shopify Store Setup & Optimisation - Store icon
      <svg key="5" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>,
      // 7. Business, Ads & Pixel Setup - Chart/Ad icon
      <svg key="6" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>,
      // 8. Campaign Setup & Analysis - Analytics icon
      <svg key="7" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>,
      // 9. Business Scaling - Trending/Growth icon
      <svg key="8" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ];
    return icons[index] || icons[0];
  };

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
      role: t('superClass.instructors.waleed.role', { defaultValue: 'Community & Seller Training Lead' }),
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
      role: t('superClass.instructors.farah.role', { defaultValue: 'Shopify Store & Marketing Specialist' }),
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

      {/* What is Zambeel Super Class Section - Distinguished Design */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0F9FF] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-[#FCD64C] opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#2E3B78] opacity-5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FCD64C] via-[#2E3B78] to-[#FCD64C]"></div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          {/* Distinguished Header */}
          <div className="text-center mb-10 max-w-3xl mx-auto relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2E3B78] text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Program Overview</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2E3B78] mb-3 leading-tight">
              {t('superClass.whatIs.title', { defaultValue: 'What is Zambeel Super Class?' })}
            </h2>
            <p className="text-base md:text-lg text-[#64748B] leading-relaxed">
              A comprehensive 4-week live program transforming you into a successful e-commerce entrepreneur
            </p>
            
            {/* Decorative line under subtitle */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-[#FCD64C]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FCD64C]"></div>
              <div className="w-16 h-0.5 bg-[#2E3B78]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2E3B78]"></div>
              <div className="w-8 h-0.5 bg-[#FCD64C]"></div>
            </div>
          </div>
          
          {/* Distinguished Categorized Features with Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-[#E2E8F0] mb-8">
            {/* Mobile: Vertical Timeline using react-vertical-timeline-component */}
            <div className="md:hidden">
              <style jsx global>{`
                .vertical-timeline::before {
                  background: #CBD5E1 !important;
                  left: 8px !important;
                }
                .vertical-timeline-element-icon {
                  box-shadow: 0 0 0 4px white, 0 2px 4px rgba(0,0,0,0.1) !important;
                  left: 8px !important;
                }
                .vertical-timeline-element-content {
                  box-shadow: none !important;
                  padding: 0 !important;
                  background: transparent !important;
                  margin-left: 28px !important;
                }
                .vertical-timeline-element-content p {
                  margin: 0 !important;
                }
                .vertical-timeline-element-content-arrow {
                  display: none !important;
                }
                .vertical-timeline.vertical-timeline-custom-line::before {
                  left: 8px !important;
                }
              `}</style>
              <VerticalTimeline lineColor="#CBD5E1" className="custom-timeline">
                {/* Program Structure Section Header */}
                <VerticalTimelineElement
                  contentStyle={{ padding: 0, background: 'transparent', boxShadow: 'none' }}
                  contentArrowStyle={{ display: 'none' }}
                  iconStyle={{ 
                    background: '#2E3B78', 
                    color: '#fff', 
                    width: '8px', 
                    height: '32px',
                    marginLeft: '-2px',
                    marginTop: '0px',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: '2px solid white',
                    left: '0'
                  }}
                  icon={<div></div>}
                >
                  <h3 className="text-lg font-bold text-[#2E3B78] mb-4">Program Structure</h3>
                </VerticalTimelineElement>

                {/* Steps 1-3 */}
                {features.slice(0, 3).map((feature, index) => (
                  <VerticalTimelineElement
                    key={index}
                    className="vertical-timeline-element"
                    contentStyle={{ padding: 0, background: 'transparent', boxShadow: 'none' }}
                    contentArrowStyle={{ display: 'none' }}
                    iconStyle={{ 
                      background: '#2E3B78', 
                      color: '#fff',
                      width: '12px',
                      height: '12px',
                      marginLeft: '-4px',
                      marginTop: '8px',
                      boxShadow: '0 0 0 2px white',
                      left: '0'
                    }}
                    icon={<div></div>}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border-2 border-[#E2E8F0] text-[#64748B] flex items-center justify-center shadow-sm">
                        {getFeatureIcon(index)}
                      </div>
                      <p className="flex-1 leading-relaxed font-medium text-[#64748B] m-0">
                        {feature.title}
                      </p>
                    </div>
                  </VerticalTimelineElement>
                ))}

                {/* Core Skills Section Header */}
                <VerticalTimelineElement
                  contentStyle={{ padding: 0, background: 'transparent', boxShadow: 'none' }}
                  contentArrowStyle={{ display: 'none' }}
                  iconStyle={{ 
                    background: '#2E3B78', 
                    color: '#fff', 
                    width: '8px', 
                    height: '32px',
                    marginLeft: '-2px',
                    marginTop: '0px',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: '2px solid white',
                    left: '0'
                  }}
                  icon={<div></div>}
                >
                  <h3 className="text-lg font-bold text-[#2E3B78] mb-4">Core Skills</h3>
                </VerticalTimelineElement>

                {/* Steps 4-6 */}
                {features.slice(3, 6).map((feature, index) => {
                  const actualIndex = index + 3;
                  return (
                    <VerticalTimelineElement
                      key={actualIndex}
                      contentStyle={{ padding: 0, background: 'transparent', boxShadow: 'none' }}
                      contentArrowStyle={{ display: 'none' }}
                      iconStyle={{ 
                        background: '#2E3B78', 
                        color: '#fff',
                        width: '12px',
                        height: '12px',
                        marginLeft: '-4px',
                        marginTop: '8px',
                        boxShadow: '0 0 0 2px white'
                      }}
                      icon={<div></div>}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border-2 border-[#E2E8F0] text-[#64748B] flex items-center justify-center shadow-sm">
                          {getFeatureIcon(actualIndex)}
                        </div>
                        <p className="flex-1 leading-relaxed font-medium text-[#64748B] m-0">
                          {feature.title}
                        </p>
                      </div>
                    </VerticalTimelineElement>
                  );
                })}

                {/* Advanced Skills Section Header */}
                <VerticalTimelineElement
                  contentStyle={{ padding: 0, background: 'transparent', boxShadow: 'none' }}
                  contentArrowStyle={{ display: 'none' }}
                  iconStyle={{ 
                    background: '#2E3B78', 
                    color: '#fff', 
                    width: '8px', 
                    height: '32px',
                    marginLeft: '-2px',
                    marginTop: '0px',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: '2px solid white',
                    left: '0'
                  }}
                  icon={<div></div>}
                >
                  <h3 className="text-lg font-bold text-[#2E3B78] mb-4">Advanced Skills</h3>
                </VerticalTimelineElement>

                {/* Steps 7-9 */}
                {features.slice(6, 9).map((feature, index) => {
                  const actualIndex = index + 6;
                  return (
                    <VerticalTimelineElement
                      key={actualIndex}
                      contentStyle={{ padding: 0, background: 'transparent', boxShadow: 'none' }}
                      contentArrowStyle={{ display: 'none' }}
                      iconStyle={{ 
                        background: '#2E3B78', 
                        color: '#fff',
                        width: '12px',
                        height: '12px',
                        marginLeft: '-4px',
                        marginTop: '8px',
                        boxShadow: '0 0 0 2px white'
                      }}
                      icon={<div></div>}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border-2 border-[#E2E8F0] text-[#64748B] flex items-center justify-center shadow-sm">
                          {getFeatureIcon(actualIndex)}
                        </div>
                        <p className="flex-1 leading-relaxed font-medium text-[#64748B] m-0">
                          {feature.title}
                        </p>
                      </div>
                    </VerticalTimelineElement>
                  );
                })}
              </VerticalTimeline>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:block">
              <div className="space-y-6 md:space-y-8">
                {/* Category 1: Program Structure */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-[#FCD64C] rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold text-[#2E3B78]">Program Structure</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        className="relative bg-gradient-to-br from-white to-[#F8FAFC] rounded-xl p-5 border-2 border-[#E2E8F0] hover:border-[#FCD64C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                      >
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCD64C] opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300"></div>
                        
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E3B78] to-[#4A61C4] text-white flex items-center justify-center shadow-md group-hover:bg-gradient-to-br group-hover:from-[#FCD64C] group-hover:to-[#FFE066] group-hover:scale-110 transition-all duration-300">
                            {getFeatureIcon(index)}
                          </div>
                          <p className="text-[#1E293B] font-bold text-sm leading-relaxed pt-1 group-hover:text-[#2E3B78] transition-colors duration-300">
                            {feature.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 2: Core Skills */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-[#2E3B78] rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold text-[#2E3B78]">Core Skills</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.slice(3, 6).map((feature, index) => (
                      <div
                        key={index + 3}
                        className="relative bg-gradient-to-br from-white to-[#F8FAFC] rounded-xl p-5 border-2 border-[#E2E8F0] hover:border-[#2E3B78] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                      >
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#2E3B78] opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300"></div>
                        
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E3B78] to-[#4A61C4] text-white flex items-center justify-center shadow-md group-hover:bg-gradient-to-br group-hover:from-[#FCD64C] group-hover:to-[#FFE066] group-hover:scale-110 transition-all duration-300">
                            {getFeatureIcon(index + 3)}
                          </div>
                          <p className="text-[#1E293B] font-bold text-sm leading-relaxed pt-1 group-hover:text-[#2E3B78] transition-colors duration-300">
                            {feature.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 3: Advanced & Scaling */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-[#FCD64C] rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold text-[#2E3B78]">Advanced Skills</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.slice(6, 9).map((feature, index) => (
                      <div
                        key={index + 6}
                        className="relative bg-gradient-to-br from-white to-[#F8FAFC] rounded-xl p-5 border-2 border-[#E2E8F0] hover:border-[#FCD64C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                      >
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCD64C] opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300"></div>
                        
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E3B78] to-[#4A61C4] text-white flex items-center justify-center shadow-md group-hover:bg-gradient-to-br group-hover:from-[#FCD64C] group-hover:to-[#FFE066] group-hover:scale-110 transition-all duration-300">
                            {getFeatureIcon(index + 6)}
                          </div>
                          <p className="text-[#1E293B] font-bold text-sm leading-relaxed pt-1 group-hover:text-[#2E3B78] transition-colors duration-300">
                            {feature.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distinguished Call to Action */}
          <div className="text-center pt-6 border-t border-[#E2E8F0]">
            <a
              href={registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2E3B78] hover:bg-[#1a234d] text-white font-bold px-8 md:px-12 py-3 md:py-4 rounded-lg text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
            >
              <span>{t('superClass.cta.joinZambeel', { defaultValue: 'Join the Zambeel Super Class' })}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
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

      {/* How the Program Works Section - Enhanced Design */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white via-[#F0F9FF] to-[#E7EFFC] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-[#FCD64C] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#2E3B78] opacity-5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block mb-4">
              <span className="text-xs md:text-sm font-bold text-[#FCD64C] bg-[#2E3B78] px-4 py-2 rounded-full tracking-wider uppercase shadow-md">
                Program Structure
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2E3B78] mb-3 leading-tight">
              {t('superClass.howItWorks.title', { defaultValue: 'HOW THE PROGRAM WORKS (STRUCTURE)' })}
            </h2>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-[#FCD64C]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FCD64C]"></div>
              <div className="w-20 h-0.5 bg-[#2E3B78]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2E3B78]"></div>
              <div className="w-12 h-0.5 bg-[#FCD64C]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            {/* Super Instructor Classes - Enhanced */}
            <div className="relative bg-gradient-to-br from-white to-[#FFFBF0] rounded-2xl p-6 md:p-8 border-2 border-[#FCD64C] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCD64C] opacity-10 rounded-bl-full"></div>
              
              {/* Header with icon */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCD64C] to-[#FFE066] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-[#2E3B78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#2E3B78]">
                  {t('superClass.howItWorks.instructorClasses.title', { defaultValue: 'Super Instructor Classes' })}
                </h3>
              </div>
              
              <ul className="space-y-4 relative z-10">
                {[
                  t('superClass.howItWorks.instructorClasses.fridaySaturday', { defaultValue: 'Friday & Saturday' }),
                  t('superClass.howItWorks.instructorClasses.duration', { defaultValue: '2 hours daily' }),
                  t('superClass.howItWorks.instructorClasses.content', { defaultValue: 'Strategy, frameworks, live builds' }),
                  t('superClass.howItWorks.instructorClasses.decisionMaking', { defaultValue: 'Real-time decision making' })
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FCD64C] flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300">
                      <svg className="w-3 h-3 text-[#2E3B78]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#1E293B] text-base md:text-lg font-medium leading-relaxed flex-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice Sessions - Enhanced */}
            <div className="relative bg-gradient-to-br from-white to-[#F0F9FF] rounded-2xl p-6 md:p-8 border-2 border-[#2E3B78] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2E3B78] opacity-10 rounded-bl-full"></div>
              
              {/* Header with icon */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#2E3B78] to-[#4A61C4] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#2E3B78]">
                  {t('superClass.howItWorks.practiceSessions.title', { defaultValue: 'Practice Sessions' })}
                </h3>
              </div>
              
              <ul className="space-y-4 relative z-10">
                {[
                  t('superClass.howItWorks.practiceSessions.tuesdayThursday', { defaultValue: 'Tuesday & Thursday' }),
                  t('superClass.howItWorks.practiceSessions.duration', { defaultValue: '1.5 hours daily' }),
                  t('superClass.howItWorks.practiceSessions.execution', { defaultValue: 'Hands-on execution' }),
                  t('superClass.howItWorks.practiceSessions.support', { defaultValue: 'Store audits, ad reviews & learning support' })
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2E3B78] flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#1E293B] text-base md:text-lg font-medium leading-relaxed flex-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Summary Section */}
          <div className="text-center mb-10">
            <p className="text-base md:text-xl text-[#2E3B78] font-medium leading-relaxed">
              {t('superClass.howItWorks.summary', { 
                defaultValue: 'You learn on weekends | You execute with support during the week.' 
              })}
            </p>
          </div>

          {/* Call to Action - Enhanced */}
          <div className="text-center">
            <a
              href={registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2E3B78] to-[#4A61C4] hover:from-[#1a234d] hover:to-[#2E3B78] text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-xl text-lg md:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <span>{t('superClass.cta.joinZambeel', { defaultValue: 'Join the Zambeel Super Class' })}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuperClassPage;


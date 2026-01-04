'use client';

import React from "react";
import { useTranslation } from "react-i18next";
import Marquee from 'react-fast-marquee';

const SuperClassPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isRTL = currentLanguage === 'ar';
  const registerLink = 'https://docs.google.com/forms/d/e/1FAIpQLSeA4WTKzxanXcM4inCxjpGsimihwMlbQh50dK1UMSjUhPEzYQ/viewform';

  // Moving ticker content
  const tickerText = t('superClass.ticker', { 
    defaultValue: 'Starts 23 January 2026 · Live Online · 3 Seats Left' 
  });

  // Who is this class for items
  const targetAudience = [
    {
      text: t('superClass.targetAudience.item1', { defaultValue: 'You want to start ecommerce business' })
    },
    {
      text: t('superClass.targetAudience.item2', { defaultValue: "Looking for step by step guidance and hand-holding" })
    },
    {
      text: t('superClass.targetAudience.item3', { defaultValue: "You've tried ads but don't understand what's wrong" })
    },
    {
      text: t('superClass.targetAudience.item4', { defaultValue: 'You want real support, not recorded videos' })
    }
  ];

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
      role: t('superClass.instructors.waleed.role', { defaultValue: 'Community Operations & Seller Training Expert' })
    },
    {
      name: 'Ilqa Rasul',
      role: t('superClass.instructors.ilqa.role', { defaultValue: 'Product Hunting & Creative Strategy Expert' })
    },
    {
      name: 'Ibrahim Ahmed',
      role: t('superClass.instructors.ibrahim.role', { defaultValue: 'Meta & TikTok Marketing Expert' })
    },
    {
      name: 'Farah Kiran',
      role: t('superClass.instructors.farah.role', { defaultValue: 'Shopify & Marketing Expert' })
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFE] overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-b from-[#2E3B78] to-[#4F66C8] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-[#FCD64C] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#FCD64C] rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {t('superClass.hero.title', { 
              defaultValue: 'Learn, Launch & Scale a Profitable E-commerce Store in Just 4 Weeks' 
            })}
          </h1>
          
          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto">
            {t('superClass.hero.subtitle', { 
              defaultValue: "Don't just study e-commerce. Launch it LIVE - Step by Step with Ecommerce Experts" 
            })}
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base text-white/80 mb-8">
            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {t('superClass.hero.duration', { defaultValue: '4 Weeks' })}
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {t('superClass.hero.liveClasses', { defaultValue: 'Live Classes' })}
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {t('superClass.hero.buildLive', { defaultValue: 'Build Everything Live' })}
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {t('superClass.hero.fromProductHunt', { defaultValue: 'From Product Hunt to Scaling' })}
            </span>
          </div>

          <a
            href={registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FCD64C] hover:bg-[#E5C043] text-[#2E3B78] font-bold px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl transition-all duration-300 shadow-lg hover:scale-105 mb-8"
          >
            {t('superClass.cta.join', { defaultValue: 'Join the Super Class' })}
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
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E3B78] text-center mb-6 md:mb-8">
            {t('superClass.whoIsThisFor.title', { defaultValue: 'WHO IS THIS CLASS FOR?' })}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {targetAudience.map((item, index) => (
              <div
                key={index}
                className="bg-[#E7EFFC] rounded-2xl p-6 md:p-8 border-2 border-[#2E3B78]/10 hover:border-[#FCD64C] transition-all duration-300 hover:shadow-lg"
              >
                <p className="text-base md:text-lg text-[#2E3B78] font-medium">
                  {item.text}
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

          {/* Seats Left Ticker */}
          <div className="mt-8 w-screen bg-[#FCD64C] text-[#2E3B78] py-2 overflow-hidden" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
            <Marquee 
              speed={40} 
              gradient={false}
              direction={currentLanguage === 'ar' ? 'left' : 'right'}
            >
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i} className="mx-4 font-bold text-sm md:text-base">
                  {t('superClass.seatsLeft', { defaultValue: '3 Seats Left' })} • 
                </span>
              ))}
            </Marquee>
          </div>
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
                defaultValue: 'Top Industry Experts - Building your Ecommerce Business LIVE with you!' 
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="bg-[#E7EFFC] rounded-xl p-6 text-center border-2 border-transparent hover:border-[#FCD64C] transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-24 h-24 bg-[#2E3B78] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
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


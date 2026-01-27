'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import PricingSection from "../components/PricingSection.jsx"; 
import TrendingProducts from "../components/dropshiping_components/TrendingProducts.jsx"; 
import Wts from "../components/dropshiping_components/WhereTS.jsx";
import WhyZambeel from "../components/dropshiping_components/WhyZambeel.jsx";
import DeliveryCharges from "../components/DeliveryCharges.jsx";


const DropshippingPage = () => {
  const { t } = useTranslation();
  // Text carousel state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const carouselTexts = [
    t('dropshipping.hero.carousel.withoutInventory'),
    t('dropshipping.hero.carousel.fromAnywhere'),
    t('dropshipping.hero.carousel.noRegistration')
  ];

  // Auto-rotate text every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [carouselTexts.length, t]);
  return (
    <div
      className="min-h-screen m-0 p-0 overflow-x-hidden"
      style={{
        background: `linear-gradient(186.57deg, rgba(89, 10, 10, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(48, 41, 90, 0.897201) 31.86%, rgba(125, 20, 20, 0.793286) 47.98%, rgba(75, 72, 147, 0.918182) 63.78%, #4A61C4 81.76%)`,
      }}
    >
      {/* ================= HERO SECTION ================= */}
      <section className="pb-8 md:pb-8 text-center relative pt-24 md:pt-28 overflow-hidden">
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
        <h3 className="text-[26px] md:text-[44px] font-[700] leading-[100%] tracking-[0.02em] text-center text-white mt-8 md:mt-0 mb-4 md:mb-6 relative z-10" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>{t('dropshipping.hero.title')}</h3>
        <p className="text-[20px] md:text-[30px] font-normal italic leading-[100%] tracking-[0] text-center text-white mb-2 md:mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t('dropshipping.hero.subtitle')}</p>
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
          <a href="https://portal.myzambeel.com/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-[#ffd24c] text-[#243a86] font-bold px-8 py-3 rounded-full hover:bg-[#ffc933] transition-all duration-300 shadow-lg text-base md:text-lg">
            <span>{t('common.getStarted')}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        {/* UAE/KSA Box */}
        <div className="px-4 md:px-0 relative z-10">
          <div className="mx-auto rounded-[32px] shadow-lg max-w-lg overflow-hidden w-full" style={{boxShadow: '0 8px 32px rgba(36,58,134,0.18)'}}>
          {/* Top: Dropshipping available */}
          <div className="bg-[#e3e7f6] px-4 pt-3 pb-2">
            <p className="text-[#243a86] font-bold text-lg mb-3 text-center">{t('dropshipping.hero.availableIn')}</p>
            <div className="flex items-center justify-center gap-6 md:gap-8">
              {/* UAE Flag */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-1 shadow-md">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="h-1/3 bg-green-600"></div>
                      <div className="h-1/3 bg-white"></div>
                      <div className="h-1/3 bg-black"></div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-600"></div>
                  </div>
                </div>
                <span className="mt-1 text-[#243a86] font-semibold text-sm">{t('countries.UAE')}</span>
              </div>
              {/* KSA Custom Icon */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-1 shadow-md">
                  <svg viewBox="0 0 96 96" className="w-[75px] h-[75px]" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="48" cy="48" r="34" fill="#6DA544" />
                    <path d="M34 58C34 60.7614 36.2386 63 39 63H53C53 65.2091 54.7909 67 57 67H61C63.2091 67 65 65.2091 65 63V58H34Z" fill="#F0F0F0" />
                    <path d="M65 36V46C65 47.6569 63.6569 49 62 49V53C65.866 53 69 49.866 69 46V36H65Z" fill="#F0F0F0" />
                    <path d="M32 46C32 47.6569 30.6569 49 29 49V53C32.866 53 36 49.866 36 46V36H32V46Z" fill="#F0F0F0" />
                    <path d="M56 36H60V46H56V36Z" fill="#F0F0F0" />
                    <path d="M50 42C50 42.5523 49.5523 43 49 43C48.4477 43 48 42.5523 48 42V36H44V42C44 42.5523 43.5523 43 43 43C42.4477 43 42 42.5523 42 42V36H38V42C38 44.7614 40.2386 47 43 47C44.1046 47 45.1046 46.6569 46 46C46.8954 46.6569 47.8954 47 49 47C49.1843 47 49.364 46.987 49.538 46.962C49.268 48.378 48.1 49.4 46.7 49.4V53C50.566 53 53.7 49.866 53.7 46V42H50Z" fill="#F0F0F0" />
                    <path d="M38 49H44V53H38V49Z" fill="#F0F0F0" />
                  </svg>
                </div>
                <span className="mt-1 text-[#243a86] font-semibold text-sm">{t('countries.KSA')}</span>
              </div>
              {/* Pakistan */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-1 shadow-md">
                  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className="w-[75px] h-[75px]">
                    <g clipPath="url(#clip-pk-top)">
                      <path d="M48 86C70.0914 86 88 68.0914 88 46C88 23.9086 70.0914 6 48 6C25.9086 6 8 23.9086 8 46C8 68.0914 25.9086 86 48 86Z" fill="#F0F0F0" />
                      <path d="M8 45.9997C8 61.1614 16.4358 74.3519 28.8695 81.1361V10.8633C16.4358 17.6475 8 30.838 8 45.9997Z" fill="#F0F0F0" />
                      <path d="M48.0035 6C41.0738 6 34.556 7.76297 28.873 10.8636V81.1363C34.556 84.237 41.0738 86 48.0035 86C70.0948 86 88.0035 68.0913 88.0035 46C88.0035 23.9087 70.0948 6 48.0035 6Z" fill="#496E2D" />
                      <path d="M65.1017 52.6155C60.0412 56.2719 52.9746 55.1338 49.3184 50.0735C45.6618 45.0129 46.8001 37.9465 51.8606 34.2902C53.4384 33.1502 55.2112 32.4763 57.0148 32.2421C53.5449 31.7232 49.877 32.5051 46.8087 34.7221C40.5806 39.2224 39.1795 47.9194 43.6796 54.1479C48.1798 60.3758 56.877 61.7771 63.1054 57.2765C66.174 55.0594 68.0679 51.823 68.6645 48.3654C67.876 50.0038 66.6796 51.4754 65.1017 52.6155Z" fill="#F0F0F0" />
                      <path d="M64.8824 32.0879L67.733 35.1599L71.5355 33.3987L69.4945 37.0587L72.3449 40.131L68.233 39.3209L66.1921 42.9812L65.692 38.8202L61.5801 38.0101L65.3827 36.2488L64.8824 32.0879Z" fill="#F0F0F0" />
                    </g>
                    <defs>
                      <clipPath id="clip-pk-top">
                        <rect width="80" height="80" transform="translate(8 6)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="mt-1 text-[#243a86] font-semibold text-sm">{t('countries.Pakistan')}</span>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="bg-[#e3e7f6] h-2"></div>
          {/* Bottom: Other services available */}
          <div className="bg-gray-100 px-4 pt-2 pb-3 rounded-b-[32px]" style={{ filter: 'grayscale(100%)', opacity: 0.6 }}>
            <p className="text-gray-500 font-bold text-lg mb-3 text-center">{t('dropshipping.hero.otherServices')}</p>
            <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
              {/* Qatar */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 shadow" style={{ filter: 'grayscale(100%)' }}>
                  <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gray-300" style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 30%, 0 50%, 100% 70%, 100% 80%, 0 100%)' }}></div>
                  </div>
                </div>
                <span className="text-gray-500 font-semibold text-xs">{t('countries.Qatar')}</span>
              </div>
              {/* Kuwait */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 shadow" style={{ filter: 'grayscale(100%)' }}>
                  <div className="w-9 h-9 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="h-1/3 bg-gray-500"></div>
                      <div className="h-1/3 bg-gray-200"></div>
                      <div className="h-1/3 bg-gray-600"></div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gray-700"></div>
                  </div>
                </div>
                <span className="text-gray-500 font-semibold text-xs">{t('countries.Kuwait')}</span>
              </div>
              {/* Oman */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 shadow overflow-hidden border border-gray-400" style={{ filter: 'grayscale(100%)' }}>
                  <Image
                    src="https://flagcdn.com/w80/om.png"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    alt="Oman"
                  />
                </div>
                <span className="text-gray-500 font-semibold text-xs">{t('countries.Oman')}</span>
              </div>
              {/* Bahrain */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 shadow overflow-hidden border border-gray-400" style={{ filter: 'grayscale(100%)' }}>
                  <Image
                    src="https://flagcdn.com/w80/bh.png"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    alt="Bahrain"
                  />
                </div>
                <span className="text-gray-500 font-semibold text-xs">{t('countries.Bahrain')}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ================= I GRID (Single Large Video Frame) ================= */}
      <section className="w-full py-4 md:py-4">
        <div className="max-w-[1150px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="rounded-xl overflow-hidden">
            <video
              className="w-full h-64 md:h-96 object-cover pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              poster="https://plus.unsplash.com/premium_photo-1661521056111-73d80cb1fd00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJvcHNoaXBwaW5nfGVufDB8MHwwfHx8MA%3D%3D"
            >
              <source src="/videos/dropshipping.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* ================= Trending products ================= */}
      <section>
        <TrendingProducts />
      </section>

      {/* ================= WHY DROPSHIPPING ================= */}
      <section>
        <WhyZambeel 
          description={t('dropshipping.whyZambeel.description')}
        />
      </section>

      {/* ================= WHERE TO START ================= */}
      <section>
        <Wts />
      </section>

      {/* ================= PRICING ================= */}
      <PricingSection 
        title={t('dropshipping.pricing.title')}
        subtitle={t('dropshipping.pricing.subtitle')}
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
            monthlyPrice: "$299",
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
        title={t('dropshipping.deliveryCharges.title')}
        subtitle={t('dropshipping.deliveryCharges.subtitle')}
        countries={[
          { code: "Pakistan", name: t('countries.Pakistan'), currency: "PKR" },
          { code: "UAE", name: t('countries.UAE'), currency: "AED" },
          { code: "KSA", name: t('countries.KSA'), currency: "SAR" }
        ]}
        charges={[
          {
            label: t('deliveryCharges.orderConfirmation'),
            values: {
              Pakistan: "200 PKR",
              UAE: "18 AED",
              KSA: "26 SAR"
            }
          },
          {
            label: t('deliveryCharges.return'),
            values: {
              Pakistan: "200 PKR",
              UAE: "5 AED",
              KSA: "7.5 SAR"
            }
          },
          {
            label: t('deliveryCharges.codTax'),
            values: {
              Pakistan: "4%",
              UAE: "0%",
              KSA: "0%"
            }
          },
          {
            label: t('deliveryCharges.deliveryTime'),
            icon: "⚡",
            values: {
              Pakistan: "1-3 Days",
              UAE: "1-2 Days",
              KSA: "1-3 Days"
            }
          }
        ]}
        importantInfo={[
          t('deliveryCharges.outskirtAreas')
        ]}
      />
    </div>
  );
};

export default DropshippingPage;


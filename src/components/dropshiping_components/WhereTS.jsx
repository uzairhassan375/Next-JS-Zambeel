'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

// Import your image assets
const connectionImg = '/assets/images/connection.png';
const databaseImg = '/assets/images/database.png';
const frameImg = '/assets/images/frame1.png';

const Wts = ({
  title,
  description,
  buttonText,
  buttonLink = null,
  showButton = true,
  steps
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  
  // Use translations as defaults if props are not provided
  const defaultTitle = title || t('whereToStart.title');
  const defaultDescription = description || t('whereToStart.description');
  const defaultButtonText = buttonText || t('whereToStart.startDropshipping');
  
  const getDesktopDescription = (desc) => {
    // Only apply formatting for Arabic; for English, return as-is for natural CSS wrapping
    if (!desc) return desc;
    
    if (currentLanguage === 'ar') {
      // Format for multi-line display - replace common patterns (Arabic-specific)
      return desc
        .replace(/ and /g, '\nand ')
        .replace(/ or /g, '\nor ')
        .replace(/ & /g, '\n& ')
        .replace(/, /g, ',\n')
        .replace(/ — /g, '\n— ')
        .replace(/ through /g, '\nthrough ')
        .replace(/ with /g, '\nwith ')
        .replace(/\. /g, '.\n')
        .replace(/\n\n/g, '\n'); // Remove double newlines
    }
    
    // For English, return text as-is - let CSS handle wrapping naturally
    return desc;
  };
  
  const defaultSteps = steps || [
    {
      number: 1,
      title: t('whereToStart.steps.createAccount.title'),
      description: t('whereToStart.steps.createAccount.desc'),
      desktopDescription: getDesktopDescription(t('whereToStart.steps.createAccount.desc')),
      icon: connectionImg,
      iconAlt: "connection"
    },
    {
      number: 2,
      title: t('whereToStart.steps.connectStore.title'),
      description: t('whereToStart.steps.connectStore.desc'),
      desktopDescription: getDesktopDescription(t('whereToStart.steps.connectStore.desc')),
      icon: frameImg,
      iconAlt: "frame"
    },
    {
      number: 3,
      title: t('whereToStart.steps.listProducts.title'),
      description: t('whereToStart.steps.listProducts.desc'),
      desktopDescription: getDesktopDescription(t('whereToStart.steps.listProducts.desc')),
      icon: databaseImg,
      iconAlt: "database"
    },
    {
      number: 4,
      title: t('whereToStart.steps.startSelling.title'),
      description: t('whereToStart.steps.startSelling.desc'),
      desktopDescription: getDesktopDescription(t('whereToStart.steps.startSelling.desc')),
      icon: null,
      iconAlt: null
    }
  ];
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalButtonText = buttonText || defaultButtonText;
  const finalSteps = steps || defaultSteps;
  
  const handleButtonClick = () => {
    if (buttonLink) {
      window.location.href = buttonLink;
    } else {
      // Default: redirect to login page
      window.location.href = 'https://portal.myzambeel.com/login';
    }
  };

  return (
    <section
      className="w-full mx-auto py-8 md:py-8 px-6 sm:px-10 lg:px-12"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        className="max-w-[1050px] mx-auto bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 text-center"
        style={{
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title */}
        <h2 className="text-[36px] font-bold leading-[100%] tracking-[0] text-center text-black mb-3 md:mb-4" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>
          {finalTitle}
        </h2>

        {/* Description */}
        <p className="text-gray-600 max-w-[750px] mx-auto mb-4 md:mb-6 text-base sm:text-lg">
          {finalDescription}
        </p>

        {/* Button */}
        {showButton && (
          <button 
            onClick={handleButtonClick}
            className="inline-flex items-center px-8 py-3.5 bg-[#243a86] text-white text-base font-semibold rounded-full hover:bg-[#1d2a69] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-4 md:mb-6"
          >
            <span>{finalButtonText}</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        )}

        {/* ==================== */}
        {/* DESKTOP VIEW (850px and above) */}
        {/* ==================== */}
        <div className="hidden min-[850px]:block relative">
          <div className="relative flex justify-between items-start pt-2">
            
            {/* Dashed Line Background */}
            <div
              className="absolute top-12 left-[12.5%] w-3/4 h-0.5"
              style={{
                borderBottom: "2px dashed #ccc",
                zIndex: 0,
              }}
            ></div>

            {finalSteps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* STEP */}
            <div className="flex flex-col items-center w-1/4 relative z-10 px-2">
              <div
                    className="w-16 h-16 bg-[#ffd24c] rounded-full grid place-items-center mb-2 font-extrabold text-2xl ring-4 ring-white shadow-lg"
                style={{ color: "#243a86" }}
              >
                    {step.number}
              </div>
                  <h3 className="font-semibold text-gray-800 text-base mb-1 text-center">
                    {step.title}
              </h3>
                  <p className="text-gray-500 text-sm leading-tight text-center whitespace-pre-line">
                    {step.desktopDescription}
              </p>
            </div>

                {/* Icon (Between steps) */}
                {index < finalSteps.length - 1 && step.icon && (
            <div
                    className="absolute top-12 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: `${(index + 1) * 25}%` }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-md border border-gray-100">
                <Image 
                        src={step.icon} 
                        alt={step.iconAlt} 
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ==================== */}
        {/* MOBILE VIEW (below 850px) */}
        {/* ==================== */}
        <div className="min-[850px]:hidden relative">
          <div className="flex flex-col items-center space-y-0">
            {finalSteps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* STEP */}
            <div className="relative w-full pb-2">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#ffd24c] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-gray-900 font-bold text-lg">{step.number}</span>
                  </div>
                      <h3 className="text-lg font-bold text-[#243a86]">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                </p>
              </div>
              {/* Connection Line and Icon */}
                  {index < finalSteps.length - 1 && step.icon && (
              <div className="flex justify-center py-2">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 border-l-2 border-dashed border-gray-300"></div>
                  <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center my-1">
                    <Image 
                            src={step.icon} 
                            alt={step.iconAlt} 
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="w-0.5 h-4 border-l-2 border-dashed border-gray-300"></div>
                </div>
              </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wts;

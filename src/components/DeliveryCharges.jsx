'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const DeliveryCharges = ({ 
  title, 
  subtitle, 
  countries, 
  charges
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const selectedCountry = countries[selectedCountryIndex];
  const flagsContainerRef = useRef(null);
  const flagRefs = useRef({});

  // Scroll selected flag into view
  useEffect(() => {
    if (flagsContainerRef.current && flagRefs.current[selectedCountryIndex]) {
      const flagElement = flagRefs.current[selectedCountryIndex];
      const container = flagsContainerRef.current;
      
      const flagTop = flagElement.offsetTop;
      const flagHeight = flagElement.offsetHeight;
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      
      // Calculate if flag is visible (showing ~4 flags at a time)
      const flagBottom = flagTop + flagHeight;
      const visibleTop = scrollTop;
      const visibleBottom = scrollTop + containerHeight;
      
      // Scroll to center the selected flag if it's not fully visible
      if (flagTop < visibleTop || flagBottom > visibleBottom) {
        const targetScroll = flagTop - (containerHeight / 2) + (flagHeight / 2);
        container.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedCountryIndex]);

  // Helper function to translate currency symbols and "Days" in values
  const translateValue = (value) => {
    if (!value || typeof value !== 'string') return value;
    
    if (currentLanguage === 'ar') {
      // Replace currency symbols
      value = value.replace(/\bAED\b/g, t('deliveryCharges.currencyAED'));
      value = value.replace(/\bSAR\b/g, t('deliveryCharges.currencySAR'));
      value = value.replace(/\bPKR\b/g, t('deliveryCharges.currencyPKR'));
      // Replace "Days"
      value = value.replace(/\bDays\b/g, t('deliveryCharges.days'));
    }
    
    return value;
  };

  // Helper function to translate currency code to Arabic name
  const translateCurrencyCode = (currencyCode) => {
    if (currentLanguage === 'ar') {
      const currencyMap = {
        'AED': t('deliveryCharges.currencyAED'),
        'SAR': t('deliveryCharges.currencySAR'),
        'PKR': t('deliveryCharges.currencyPKR')
      };
      return currencyMap[currencyCode] || currencyCode;
    }
    return currencyCode;
  };
  // Helper function to get country flag - mapping country codes to flagcdn.com codes
  const getCountryFlagCode = (countryCode) => {
    const codeMap = {
      'UAE': 'ae',
      'KSA': 'sa',
      'Kuwait': 'kw',
      'Qatar': 'qa',
      'Oman': 'om',
      'Bahrain': 'bh',
      'Pakistan': 'pk'
    };
    return codeMap[countryCode] || null;
  };

  // Helper function to get country flag
  const getCountryFlag = (countryCode) => {
    const flagCode = getCountryFlagCode(countryCode);
    if (!flagCode) return null;

    return (
      <Image
        src={`https://flagcdn.com/w160/${flagCode}.png`}
        width={160}
        height={120}
        className="w-full h-full object-cover"
        alt={countryCode}
      />
    );
  };

  return (
    <section className="w-full mx-auto py-3 md:py-8 lg:py-12 px-1 sm:px-2 md:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-3 md:mb-6 lg:mb-8">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-0.5 md:mb-2" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>
            {title}
          </h2>
          <p className="text-[9px] md:text-sm lg:text-base text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {subtitle}
          </p>
        </div>

        {/* Mobile Flag View (hidden on md and above) */}
        <div className="md:hidden">
          <div className="flex gap-3 items-stretch">
            {/* Country Flags - Left Side Panel */}
            <div 
              className="flex flex-col items-center justify-between flex-shrink-0 px-2 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(180deg, rgba(46, 59, 120, 0.9) 0%, rgba(74, 97, 196, 0.7) 50%, rgba(46, 59, 120, 0.9) 100%)',
                boxShadow: '0 4px 20px rgba(46, 59, 120, 0.3)'
              }}
            >
              <button
                onClick={() => {
                  const prevIndex = selectedCountryIndex === 0
                    ? countries.length - 1
                    : selectedCountryIndex - 1;
                  setSelectedCountryIndex(prevIndex);
                }}
                className="w-10 h-10 rounded-full bg-[#FCD64C] flex items-center justify-center shadow-lg hover:bg-[#E5C043] transition z-10 mb-2"
                style={{ boxShadow: '0 2px 10px rgba(252, 214, 76, 0.4)' }}
              >
                <i className="fa-solid fa-chevron-up text-[#2E3B78] text-sm font-bold"></i>
              </button>
              <div className="relative">
                {/* Top fade gradient */}
                <div 
                  className="absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(46, 59, 120, 0.9) 0%, rgba(46, 59, 120, 0) 100%)'
                  }}
                />
                {/* Scrollable flags container - shows exactly 4 flags */}
                <div 
                  ref={flagsContainerRef}
                  className="flex flex-col gap-2.5 items-center h-[220px] overflow-y-auto scrollbar-hide py-2 px-1.5 relative"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {countries.map((country, index) => (
                    <div
                      key={country.code}
                      ref={(el) => (flagRefs.current[index] = el)}
                      onClick={() => setSelectedCountryIndex(index)}
                      className={`w-14 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative flex-shrink-0 ${
                        selectedCountryIndex === index
                          ? "scale-105"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      style={{
                        boxShadow: selectedCountryIndex === index 
                          ? '0 0 0 3px #FCD64C, 0 0 15px rgba(252, 214, 76, 0.6), 0 2px 8px rgba(0, 0, 0, 0.2)' 
                          : '0 2px 6px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <div className="w-full h-full rounded-lg overflow-hidden bg-white">
                        {getCountryFlag(country.code)}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom fade gradient */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-6 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(0deg, rgba(46, 59, 120, 0.9) 0%, rgba(46, 59, 120, 0) 100%)'
                  }}
                />
              </div>
              <button
                onClick={() => {
                  const nextIndex = selectedCountryIndex === countries.length - 1
                    ? 0
                    : selectedCountryIndex + 1;
                  setSelectedCountryIndex(nextIndex);
                }}
                className="w-10 h-10 rounded-full bg-[#FCD64C] flex items-center justify-center shadow-lg hover:bg-[#E5C043] transition z-10 mt-2"
                style={{ boxShadow: '0 2px 10px rgba(252, 214, 76, 0.4)' }}
              >
                <i className="fa-solid fa-chevron-down text-[#2E3B78] text-sm font-bold"></i>
              </button>
            </div>

            {/* Selected Country Breakdown - Right Side Panel */}
            {selectedCountry && (
              <div 
                className="bg-white rounded-2xl overflow-hidden flex flex-col self-center flex-1 mr-2"
                style={{
                  boxShadow: '0 0 0 3px rgba(252, 214, 76, 0.6), 0 0 25px rgba(252, 214, 76, 0.3), 0 8px 30px rgba(46, 59, 120, 0.25)',
                  minHeight: '260px'
                }}
              >
                {/* Country Header */}
                <div 
                  className="text-white p-2 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(46, 59, 120, 1) 0%, rgba(74, 97, 196, 0.95) 100%)'
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-7 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border-2 border-white">
                      {getCountryFlag(selectedCountry.code)}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs font-bold">{selectedCountry.name}</div>
                      <div className="text-[9px] text-gray-300">{translateCurrencyCode(selectedCountry.currency)}</div>
                    </div>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="bg-[#FDE8E9] divide-y divide-pink-200 flex-1 overflow-hidden flex flex-col">
                  {charges.map((charge, index) => (
                    <div
                      key={index}
                      className="px-2.5 py-1.5 bg-[#FDE8E9] hover:bg-[#FCE0E1] transition-colors flex-1 flex items-center"
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          {charge.icon && (
                            <span className="text-[#FCD64C] text-xs flex-shrink-0" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
                              {charge.icon}
                            </span>
                          )}
                          <div className="flex flex-col min-w-0">
                            {charge.label.includes(' / ') ? (
                              charge.label.split(' / ').map((part, partIndex) => (
                                <span key={partIndex} className="text-xs text-gray-800 leading-tight font-bold">
                                  {part}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-800 leading-tight break-words font-bold">{charge.label}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-[#2E3B78] flex-shrink-0">
                          {translateValue(charge.values[selectedCountry.code]) || '-'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table View (hidden on mobile, shown on md and above) */}
        <div className="hidden md:block bg-white rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg overflow-hidden mb-4 md:mb-6 overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="bg-[#2E3B78] text-white">
              <div 
                className="grid gap-0.5 md:gap-2 lg:gap-4 items-center p-1 md:p-3 lg:p-6"
                style={{ gridTemplateColumns: `minmax(75px, 1.2fr) repeat(${countries.length}, minmax(45px, 1fr))` }}
              >
                <div className="font-bold text-[8px] md:text-xs lg:text-base leading-tight text-center">{t('deliveryCharges.breakdown')}</div>
                {countries.map((country) => (
                  <div key={country.code} className="flex flex-col items-center gap-0">
                    <div className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full overflow-hidden flex items-center justify-center bg-white p-0.5 md:p-1">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        {getCountryFlag(country.code)}
                      </div>
                    </div>
                    <div className="text-[7px] md:text-[10px] lg:text-sm font-semibold leading-tight mt-0.5">{country.name}</div>
                    <div className="text-[6px] md:text-[9px] lg:text-xs text-gray-300 leading-tight">{translateCurrencyCode(country.currency)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {charges.map((charge, index) => (
                <div
                  key={index}
                  className={`grid gap-0.5 md:gap-2 lg:gap-4 p-1 md:p-3 lg:p-6 items-center ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  style={{ gridTemplateColumns: `minmax(75px, 1.2fr) repeat(${countries.length}, minmax(45px, 1fr))` }}
                >
                  <div className="flex items-center justify-center gap-0.5 md:gap-1 lg:gap-2">
                    {charge.icon && <span className="text-yellow-500 text-[10px] md:text-sm lg:text-lg">{charge.icon}</span>}
                    <div className="flex flex-col items-center font-medium text-gray-800 leading-tight">
                      {charge.label.includes(' / ') ? (
                        charge.label.split(' / ').map((part, partIndex) => (
                          <span key={partIndex} className="text-[8px] md:text-xs lg:text-base text-center">
                            {part}
                          </span>
                        ))
                      ) : (
                        <span className="text-[8px] md:text-xs lg:text-base text-center">{charge.label}</span>
                      )}
                    </div>
                  </div>
                  {countries.map((country) => (
                    <div key={country.code} className="text-center text-[8px] md:text-xs lg:text-base text-gray-700 leading-tight font-bold">
                      {translateValue(charge.values[country.code]) || '-'}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default DeliveryCharges;


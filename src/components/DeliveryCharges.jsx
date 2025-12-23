import React from 'react';
import { useTranslation } from 'react-i18next';

const DeliveryCharges = ({ 
  title, 
  subtitle, 
  countries, 
  charges
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

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
  // Helper function to get country flag SVG
  const getCountryFlag = (countryCode) => {
    const flags = {
      UAE: (
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="h-1/3 bg-green-600"></div>
            <div className="h-1/3 bg-white"></div>
            <div className="h-1/3 bg-black"></div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-600"></div>
        </div>
      ),
      KSA: (
        <svg width="96" height="96" viewBox="0 0 96 96" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="48" cy="48" r="34" fill="#6DA544" />
          <path d="M34 58C34 60.7614 36.2386 63 39 63H53C53 65.2091 54.7909 67 57 67H61C63.2091 67 65 65.2091 65 63V58H34Z" fill="#F0F0F0" />
          <path d="M65 36V46C65 47.6569 63.6569 49 62 49V53C65.866 53 69 49.866 69 46V36H65Z" fill="#F0F0F0" />
          <path d="M32 46C32 47.6569 30.6569 49 29 49V53C32.866 53 36 49.866 36 46V36H32V46Z" fill="#F0F0F0" />
          <path d="M56 36H60V46H56V36Z" fill="#F0F0F0" />
          <path d="M50 42C50 42.5523 49.5523 43 49 43C48.4477 43 48 42.5523 48 42V36H44V42C44 42.5523 43.5523 43 43 43C42.4477 43 42 42.5523 42 42V36H38V42C38 44.7614 40.2386 47 43 47C44.1046 47 45.1046 46.6569 46 46C46.8954 46.6569 47.8954 47 49 47C49.1843 47 49.364 46.987 49.538 46.962C49.268 48.378 48.1 49.4 46.7 49.4V53C50.566 53 53.7 49.866 53.7 46V42H50Z" fill="#F0F0F0" />
          <path d="M38 49H44V53H38V49Z" fill="#F0F0F0" />
        </svg>
      ),
      Kuwait: (
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="h-1/3 bg-green-600"></div>
            <div className="h-1/3 bg-white"></div>
            <div className="h-1/3 bg-black"></div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-600" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
        </div>
      ),
      Qatar: (
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-[#8B1538]"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 20%, 100% 30%, 100% 70%, 0 80%)' }}></div>
        </div>
      ),
      Pakistan: (
        <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g clipPath="url(#clip-pk)">
            <path d="M48 86C70.0914 86 88 68.0914 88 46C88 23.9086 70.0914 6 48 6C25.9086 6 8 23.9086 8 46C8 68.0914 25.9086 86 48 86Z" fill="#F0F0F0" />
            <path d="M8 45.9997C8 61.1614 16.4358 74.3519 28.8695 81.1361V10.8633C16.4358 17.6475 8 30.838 8 45.9997Z" fill="#F0F0F0" />
            <path d="M48.0035 6C41.0738 6 34.556 7.76297 28.873 10.8636V81.1363C34.556 84.237 41.0738 86 48.0035 86C70.0948 86 88.0035 68.0913 88.0035 46C88.0035 23.9087 70.0948 6 48.0035 6Z" fill="#496E2D" />
            <path d="M65.1017 52.6155C60.0412 56.2719 52.9746 55.1338 49.3184 50.0735C45.6618 45.0129 46.8001 37.9465 51.8606 34.2902C53.4384 33.1502 55.2112 32.4763 57.0148 32.2421C53.5449 31.7232 49.877 32.5051 46.8087 34.7221C40.5806 39.2224 39.1795 47.9194 43.6796 54.1479C48.1798 60.3758 56.877 61.7771 63.1054 57.2765C66.174 55.0594 68.0679 51.823 68.6645 48.3654C67.876 50.0038 66.6796 51.4754 65.1017 52.6155Z" fill="#F0F0F0" />
            <path d="M64.8824 32.0879L67.733 35.1599L71.5355 33.3987L69.4945 37.0587L72.3449 40.131L68.233 39.3209L66.1921 42.9812L65.692 38.8202L61.5801 38.0101L65.3827 36.2488L64.8824 32.0879Z" fill="#F0F0F0" />
          </g>
          <defs>
            <clipPath id="clip-pk">
              <rect width="80" height="80" transform="translate(8 6)" />
            </clipPath>
          </defs>
        </svg>
      )
    };
    return flags[countryCode] || null;
  };

  return (
    <section className="w-full mx-auto py-3 md:py-8 lg:py-12 px-1 sm:px-2 md:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-3 md:mb-6 lg:mb-8">
          <h2 className="text-sm md:text-2xl lg:text-3xl font-bold text-white mb-0.5 md:mb-2" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>
            {title}
          </h2>
          <p className="text-[9px] md:text-sm lg:text-base text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {subtitle}
          </p>
        </div>

        {/* Delivery Charges Table */}
        <div className="bg-white rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg overflow-hidden mb-4 md:mb-6 overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="bg-[#243a86] text-white">
              <div 
                className="grid gap-0.5 md:gap-2 lg:gap-4 items-center p-1 md:p-3 lg:p-6"
                style={{ gridTemplateColumns: `minmax(75px, 1.2fr) repeat(${countries.length}, minmax(45px, 1fr))` }}
              >
                <div className="font-bold text-[8px] md:text-xs lg:text-base leading-tight text-center">{t('deliveryCharges.breakdown')}</div>
                {countries.map((country) => (
                  <div key={country.code} className="flex flex-col items-center gap-0">
                    <div className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full overflow-hidden flex items-center justify-center bg-white p-0.5 md:p-1">
                      {getCountryFlag(country.code)}
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
    </section>
  );
};

export default DeliveryCharges;


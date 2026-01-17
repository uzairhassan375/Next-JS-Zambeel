'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getLocalePath } from '../lib/localeUtils';

function AboutPage() {
  const { t } = useTranslation();
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-white">
      {/* About Zambeel Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Left side SVGs (theme icons) */}
        <div className="absolute left-[3%] top-[35%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute left-[3%] top-[50%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        {/* Right side SVGs (theme icons) */}
        <div className="absolute right-[3%] top-[20%] hidden md:block">
          <svg width="200" height="150" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 -2.57223e-06 153 -4.45854e-06C99.386 -6.80211e-06 1.33141e-05 44.4904 1.33141e-05 44.4904C61.4613 107.826 68.0003 217 115.078 217Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute right-[3%] top-[50%] hidden md:block">
          <svg width="200" height="150" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 -2.57223e-06 153 -4.45854e-06C99.386 -6.80211e-06 1.33141e-05 44.4904 1.33141e-05 44.4904C61.4613 107.826 68.0003 217 115.078 217Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        <div className="text-center mb-12 sm:mb-16 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e3a8a] mb-6">
            {t('about.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-gray-100 rounded-4xl p-8 sm:p-10 lg:p-12 max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-6">
            {t('about.mission.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {t('about.mission.text')}
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-gray-50 py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a8a] text-center mb-6 sm:mb-8">
            {t('about.whatWeDo.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Smart Selling Tools */}
            <div className="bg-sky-100 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col items-center text-center min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-5" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-bolt text-[#1e3a8a]"></i>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1e3a8a] mb-3 sm:mb-4">
                {t('about.whatWeDo.smartTools.title')}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed flex-grow">
                {t('about.whatWeDo.smartTools.desc')}
              </p>
            </div>

            {/* Flexible Fulfillment Options */}
            <div className="bg-gray-100 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col items-center text-center min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-5" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-truck-fast text-[#1e3a8a]"></i>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1e3a8a] mb-3 sm:mb-4">
                {t('about.whatWeDo.fulfillment.title')}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed flex-grow">
                {t('about.whatWeDo.fulfillment.desc')}
              </p>
            </div>

            {/* Local Solutions for Local Sellers */}
            <div className="bg-sky-100 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col items-center text-center min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-5" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-globe text-[#1e3a8a]"></i>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1e3a8a] mb-3 sm:mb-4">
                {t('about.whatWeDo.localSolutions.title')}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed flex-grow">
                {t('about.whatWeDo.localSolutions.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Zambeel? Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#F5FCFF' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] text-center mb-6">
            {t('about.whyZambeel.title')}
          </h2>
          <p className="text-center text-base sm:text-lg text-gray-700 mb-12 sm:mb-16">
            {t('about.whyZambeel.subtitle')}
          </p>

        {/* Metrics */}
        <div className="bg-white rounded-full p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-globe text-[#1e3a8a] text-xl"></i>
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#1e3a8a]">{t('about.whyZambeel.metrics.countriesCovered')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-truck-fast text-[#1e3a8a] text-xl"></i>
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#1e3a8a]">{t('about.whyZambeel.metrics.deliverySuccess')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-cart-shopping text-[#1e3a8a] text-xl"></i>
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#1e3a8a]">{t('about.whyZambeel.metrics.productsListed')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-regular fa-credit-card text-[#1e3a8a] text-xl"></i>
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#1e3a8a]">{t('about.whyZambeel.metrics.paymentGuarantee')}</p>
            </div>
          </div>
        </div>

        {/* Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Zambeel Dropshipping */}
          <div
            className="relative rounded-lg overflow-hidden shadow-md min-h-[280px] sm:min-h-[320px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1612452830710-97cd38a7b6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVjb21tZXJjZXxlbnwwfDF8MHx8fDA%3D"
              alt={t('about.whyZambeel.features.dropshipping.title')}
              width={500}
              height={320}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {t('about.whyZambeel.features.dropshipping.title')}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {t('about.whyZambeel.features.dropshipping.desc')}
              </p>
            </div>
          </div>

          {/* Cash on Delivery */}
          <div
            className="relative rounded-lg overflow-hidden shadow-md min-h-[280px] sm:min-h-[320px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaCUyMG9uJTIwZGVsaXZlcnl8ZW58MHwxfDB8fHww"
              alt={t('about.whyZambeel.features.cod.title')}
              width={500}
              height={320}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {t('about.whyZambeel.features.cod.title')}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {t('about.whyZambeel.features.cod.desc')}
              </p>
            </div>
          </div>

          {/* AI Enabled Economy */}
          <div
            className="relative rounded-lg overflow-hidden shadow-md min-h-[280px] sm:min-h-[320px]"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1677269465314-d5d2247a0b0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEFJfGVufDB8MXwwfHx8MA%3D%3D"
              alt={t('about.whyZambeel.features.ai.title')}
              width={500}
              height={320}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {t('about.whyZambeel.features.ai.title')}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {t('about.whyZambeel.features.ai.desc')}
              </p>
            </div>
          </div>

          {/* Dedicated Support */}
          <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow min-h-[280px] sm:min-h-[320px]">
            <Image
              src="https://plus.unsplash.com/premium_photo-1661508822147-810c368b0ea0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RGVkaWNhdGVkJTIwc3VwcG9ydHxlbnwwfDF8MHx8fDA%3D"
              alt={t('about.whyZambeel.features.support.title')}
              width={500}
              height={320}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {t('about.whyZambeel.features.support.title')}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {t('about.whyZambeel.features.support.desc')}
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;


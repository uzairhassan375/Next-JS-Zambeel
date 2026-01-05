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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <div className="relative inline-block mb-6">
            <div className="absolute -left-8 -top-2 w-4 h-4 bg-yellow-400 rounded-sm transform rotate-12"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e3a8a] relative z-10">
              {t('about.title')}
            </h1>
            <div className="absolute -right-8 -bottom-2 w-4 h-4 bg-yellow-400 rounded-sm transform -rotate-12"></div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-gray-100 rounded-4xl p-8 sm:p-10 lg:p-12 max-w-4xl mx-auto">
          <div className="relative inline-block mb-6">
            <div className="absolute -left-6 -top-1 w-3 h-3 bg-yellow-400 rounded-xl transform rotate-12"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] relative z-10">
              {t('about.mission.title')}
            </h2>
            <div className="absolute -right-6 -bottom-1 w-3 h-3 bg-yellow-400 rounded-full transform -rotate-12"></div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {t('about.mission.text')}
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] text-center mb-12 sm:mb-16">
            {t('about.whatWeDo.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Smart Selling Tools */}
            <div className="bg-sky-100 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center min-h-[320px] sm:min-h-[360px] lg:min-h-[400px]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-bolt text-[#1e3a8a]"></i>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-4 sm:mb-6">
                {t('about.whatWeDo.smartTools.title')}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed flex-grow">
                {t('about.whatWeDo.smartTools.desc')}
              </p>
            </div>

            {/* Flexible Fulfillment Options */}
            <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center min-h-[320px] sm:min-h-[360px] lg:min-h-[400px]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-truck-fast text-[#1e3a8a]"></i>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-4 sm:mb-6">
                {t('about.whatWeDo.fulfillment.title')}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed flex-grow">
                {t('about.whatWeDo.fulfillment.desc')}
              </p>
            </div>

            {/* Local Solutions for Local Sellers */}
            <div className="bg-sky-100 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center min-h-[320px] sm:min-h-[360px] lg:min-h-[400px]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8" style={{ backgroundColor: '#F0FAFF' }}>
                <i className="fa-solid fa-globe text-[#1e3a8a]"></i>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-4 sm:mb-6">
                {t('about.whatWeDo.localSolutions.title')}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed flex-grow">
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
          <Link
            href={getLocalePath('/blog/zambeel-dropshipping', pathname)}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow min-h-[280px] sm:min-h-[320px] block group"
          >
            <Image
              src="https://images.unsplash.com/photo-1612452830710-97cd38a7b6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVjb21tZXJjZXxlbnwwfDF8MHx8fDA%3D"
              alt={t('about.whyZambeel.features.dropshipping.title')}
              width={500}
              height={320}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#FCD64C] transition-colors">
                {t('about.whyZambeel.features.dropshipping.title')}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {t('about.whyZambeel.features.dropshipping.desc')}
              </p>
            </div>
          </Link>

          {/* Cash on Delivery */}
          <Link
            href={getLocalePath('/blog/cash-on-delivery', pathname)}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow min-h-[280px] sm:min-h-[320px] block group"
          >
            <Image
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaCUyMG9uJTIwZGVsaXZlcnl8ZW58MHwxfDB8fHww"
              alt={t('about.whyZambeel.features.cod.title')}
              width={500}
              height={320}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#FCD64C] transition-colors">
                {t('about.whyZambeel.features.cod.title')}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {t('about.whyZambeel.features.cod.desc')}
              </p>
            </div>
          </Link>

          {/* AI Enabled Economy */}
          <Link
            href={getLocalePath('/blog/ai-enabled-economy', pathname)}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow min-h-[280px] sm:min-h-[320px] block group"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1677269465314-d5d2247a0b0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEFJfGVufDB8MXwwfHx8MA%3D%3D"
              alt={t('about.whyZambeel.features.ai.title')}
              width={500}
              height={320}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#FCD64C] transition-colors">
                {t('about.whyZambeel.features.ai.title')}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {t('about.whyZambeel.features.ai.desc')}
              </p>
            </div>
          </Link>

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

        {/* View More Button */}
        <div className="flex justify-end">
          <Link
            href={getLocalePath('/blog', pathname)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] font-semibold rounded-lg hover:bg-[#1e3a8a] hover:text-white transition-colors"
          >
            {t('common.viewMore')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;


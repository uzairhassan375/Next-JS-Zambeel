'use client';

import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white">
      {/* About Zambeel Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative overflow-hidden">
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

        <div className="text-center mb-6 sm:mb-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e3a8a] mb-4">
            {t('about.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-4">
            {t('about.description')}
          </p>
          <p className="text-base sm:text-lg text-[#1e3a8a] max-w-4xl mx-auto leading-relaxed font-semibold bg-[#FCD64C] px-6 py-3 rounded-lg inline-block mt-2 mb-4">
            {t('about.subsidiary')}
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-4">
            {t('about.mission.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {t('about.mission.text')}
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;


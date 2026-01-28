'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

function PartnerAgenciesPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState({ diamond: 0, gold: 0, bronze: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock data for companies
  const companies = {
    diamond: [
      { id: 1, name: 'TechCorp Solutions', description: 'Leading technology solutions provider specializing in enterprise software and digital transformation.', contact: 'contact@techcorp.com', website: 'www.techcorp.com' },
      { id: 2, name: 'InnovateHub', description: 'Innovation consultancy helping businesses transform their digital landscape.', contact: 'info@innovatehub.com', website: 'www.innovatehub.com' },
      { id: 3, name: 'GlobalTrade Partners', description: 'International trade experts facilitating cross-border commerce and logistics.', contact: 'sales@globaltrade.com', website: 'www.globaltrade.com' },
      { id: 4, name: 'Digital Dynamics', description: 'Digital marketing agency driving growth through data-driven strategies.', contact: 'hello@digitaldynamics.com', website: 'www.digitaldynamics.com' },
      { id: 5, name: 'CloudSync Systems', description: 'Cloud infrastructure specialists providing scalable solutions for modern businesses.', contact: 'support@cloudsync.com', website: 'www.cloudsync.com' },
      { id: 6, name: 'SmartCommerce Pro', description: 'E-commerce platform developers creating seamless online shopping experiences.', contact: 'partners@smartcommerce.com', website: 'www.smartcommerce.com' },
      { id: 7, name: 'DataFlow Analytics', description: 'Business intelligence experts turning data into actionable insights.', contact: 'contact@dataflow.com', website: 'www.dataflow.com' },
      { id: 8, name: 'SecureNet Solutions', description: 'Cybersecurity specialists protecting businesses from digital threats.', contact: 'security@securenet.com', website: 'www.securenet.com' },
      { id: 9, name: 'MarketMasters Inc', description: 'Strategic marketing consultants helping brands reach their target audiences.', contact: 'info@marketmasters.com', website: 'www.marketmasters.com' },
      { id: 10, name: 'FutureWorks Agency', description: 'Creative agency specializing in brand development and digital campaigns.', contact: 'hello@futureworks.com', website: 'www.futureworks.com' },
    ],
    gold: [
      { id: 11, name: 'TechStart Ventures', description: 'Startup incubator supporting emerging technology companies.', contact: 'info@techstart.com', website: 'www.techstart.com' },
      { id: 12, name: 'Business Boosters', description: 'Business growth consultants providing strategic guidance and mentorship.', contact: 'contact@businessboosters.com', website: 'www.businessboosters.com' },
      { id: 13, name: 'Digital Edge Group', description: 'Digital transformation experts helping companies modernize their operations.', contact: 'hello@digitaledge.com', website: 'www.digitaledge.com' },
      { id: 14, name: 'ConnectPro Services', description: 'Networking and connectivity solutions for businesses worldwide.', contact: 'support@connectpro.com', website: 'www.connectpro.com' },
      { id: 15, name: 'Growth Partners LLC', description: 'Growth consulting firm focused on scaling businesses efficiently.', contact: 'partners@growthpartners.com', website: 'www.growthpartners.com' },
      { id: 16, name: 'Innovation Labs', description: 'Research and development lab creating cutting-edge solutions.', contact: 'labs@innovation.com', website: 'www.innovationlabs.com' },
      { id: 17, name: 'Elite Business Solutions', description: 'Premium business consultancy offering strategic planning and execution.', contact: 'contact@elitebusiness.com', website: 'www.elitebusiness.com' },
      { id: 18, name: 'NextGen Technologies', description: 'Next-generation technology solutions for forward-thinking companies.', contact: 'info@nextgen.com', website: 'www.nextgen.com' },
      { id: 19, name: 'Prime Solutions Group', description: 'Comprehensive solutions provider for enterprise-level challenges.', contact: 'sales@primesolutions.com', website: 'www.primesolutions.com' },
      { id: 20, name: 'Apex Consulting', description: 'Top-tier consulting services for strategic business decisions.', contact: 'consulting@apex.com', website: 'www.apexconsulting.com' },
    ],
    bronze: [
      { id: 21, name: 'StartUp Hub', description: 'Supporting startups with resources and networking opportunities.', contact: 'hub@startup.com', website: 'www.startuphub.com' },
      { id: 22, name: 'SmallBiz Advisors', description: 'Advisory services tailored for small business owners.', contact: 'advice@smallbiz.com', website: 'www.smallbiz.com' },
      { id: 23, name: 'LocalConnect Agency', description: 'Connecting local businesses with global opportunities.', contact: 'connect@localagency.com', website: 'www.localconnect.com' },
      { id: 24, name: 'Growth Essentials', description: 'Essential growth tools and strategies for growing businesses.', contact: 'info@growthessentials.com', website: 'www.growthessentials.com' },
      { id: 25, name: 'Business Basics Co', description: 'Fundamental business services for new entrepreneurs.', contact: 'basics@businessco.com', website: 'www.businessbasics.com' },
      { id: 26, name: 'Progressive Partners', description: 'Progressive approach to business partnership and collaboration.', contact: 'partners@progressive.com', website: 'www.progressivepartners.com' },
      { id: 27, name: 'Swift Solutions', description: 'Quick and efficient solutions for urgent business needs.', contact: 'swift@solutions.com', website: 'www.swiftsolutions.com' },
      { id: 28, name: 'Reliable Resources', description: 'Trusted resources for business development and expansion.', contact: 'resources@reliable.com', website: 'www.reliableresources.com' },
      { id: 29, name: 'Dynamic Developers', description: 'Custom development solutions for unique business requirements.', contact: 'dev@dynamic.com', website: 'www.dynamicdev.com' },
      { id: 30, name: 'Core Business Services', description: 'Core services that every business needs to succeed.', contact: 'core@businessservices.com', website: 'www.corebusiness.com' },
    ]
  };

  // Auto-slideshow for both mobile and desktop - rotate through all tiers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const newSlide = { ...prev };
        // Auto-advance diamond tier
        const diamondSlidesMobile = Math.ceil(companies.diamond.length / 2);
        const diamondSlidesDesktop = Math.ceil(companies.diamond.length / 5);
        const diamondSlides = isMobile ? diamondSlidesMobile : diamondSlidesDesktop;
        if (diamondSlides > 1) {
          newSlide.diamond = (newSlide.diamond + 1) % diamondSlides;
        }
        // Auto-advance gold tier
        const goldSlidesMobile = Math.ceil(companies.gold.length / 2);
        const goldSlidesDesktop = Math.ceil(companies.gold.length / 5);
        const goldSlides = isMobile ? goldSlidesMobile : goldSlidesDesktop;
        if (goldSlides > 1) {
          newSlide.gold = (newSlide.gold + 1) % goldSlides;
        }
        // Auto-advance bronze tier
        const bronzeSlidesMobile = Math.ceil(companies.bronze.length / 2);
        const bronzeSlidesDesktop = Math.ceil(companies.bronze.length / 5);
        const bronzeSlides = isMobile ? bronzeSlidesMobile : bronzeSlidesDesktop;
        if (bronzeSlides > 1) {
          newSlide.bronze = (newSlide.bronze + 1) % bronzeSlides;
        }
        return newSlide;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isMobile]);


  // Helper function to get initials from company name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleViewMore = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  const renderCompanySection = (tier, companies, tierColor, bgGradient) => {
    const companiesPerSlideDesktop = 5;
    const companiesPerSlideMobile = 2; // 1 row with 2 partners
    const tierKey = tier.toLowerCase();
    const totalSlidesDesktop = Math.ceil(companies.length / companiesPerSlideDesktop);
    const totalSlidesMobile = Math.ceil(companies.length / companiesPerSlideMobile);
    const currentSlideIndex = currentSlide[tierKey];
    const startIndexDesktop = currentSlideIndex * companiesPerSlideDesktop;
    const startIndexMobile = currentSlideIndex * companiesPerSlideMobile;
    const displayedCompaniesDesktop = companies.slice(startIndexDesktop, startIndexDesktop + companiesPerSlideDesktop);
    const displayedCompaniesMobile = companies.slice(startIndexMobile, startIndexMobile + companiesPerSlideMobile);
    const totalSlides = isMobile ? totalSlidesMobile : totalSlidesDesktop;

    const goToSlide = (index) => {
      setCurrentSlide({ ...currentSlide, [tierKey]: index });
    };

    const nextSlide = () => {
      const maxSlides = isMobile ? totalSlidesMobile : totalSlidesDesktop;
      goToSlide((currentSlideIndex + 1) % maxSlides);
    };

    const prevSlide = () => {
      const maxSlides = isMobile ? totalSlidesMobile : totalSlidesDesktop;
      goToSlide((currentSlideIndex - 1 + maxSlides) % maxSlides);
    };

    return (
      <div className={`${bgGradient} w-full max-w-7xl mx-auto rounded-3xl p-6 md:p-8 lg:p-10 mb-6 md:mb-8 relative overflow-hidden border border-white/20`}>
        <div className="flex items-center justify-center gap-4 mb-6 md:mb-8 relative z-10">
          <h2 
            className={`text-2xl md:text-3xl lg:text-4xl font-bold ${tierColor} uppercase tracking-wide`}
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}
          >
            {tier === 'Diamond' ? t('partnerAgencies.diamondPartners') : 
             tier === 'Gold' ? t('partnerAgencies.goldPartners') : 
             t('partnerAgencies.bronzePartners')}
          </h2>
        </div>
        
        {/* Companies Grid/Scroll */}
        <div className="relative z-10 flex items-center gap-2 md:gap-4">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="flex p-2 md:p-3 rounded-full hover:opacity-80 transition-opacity flex-shrink-0 bg-white/20 backdrop-blur-sm border border-white/30"
            style={{ color: 'white' }}
            aria-label={currentLanguage === 'ar' ? 'الشريحة السابقة' : 'Previous slide'}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Companies Container */}
          <div className="flex-1">
            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-5 gap-6 md:gap-8">
              {displayedCompaniesDesktop.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Pedestal */}
              <div 
                className="w-full h-2 md:h-3 mb-2 rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: tier === 'Diamond' ? '#243a86' : tier === 'Gold' ? '#ffd24c' : '#ff8c00',
                  opacity: 0.3
                }}
              ></div>
              
              {/* Logo Container */}
              <div 
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative overflow-hidden shadow-lg"
                style={{ 
                  boxShadow: tier === 'Diamond' 
                    ? '0 4px 20px rgba(36, 58, 134, 0.4)'
                    : tier === 'Gold'
                    ? '0 4px 20px rgba(255, 210, 76, 0.4)'
                    : '0 4px 20px rgba(255, 140, 0, 0.4)'
                }}
              >
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center text-white font-bold text-xl md:text-2xl lg:text-3xl rounded-xl"
                    style={{ 
                      backgroundColor: tier === 'Diamond' ? '#243a86' : tier === 'Gold' ? '#ffd24c' : '#ff8c00',
                      color: tier === 'Gold' ? '#243a86' : 'white',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-xl"></div>
                    <span className="relative z-10">{getInitials(company.name)}</span>
                  </div>
                )}
              </div>
              
              {/* Company Name */}
              <h3 
                className={`text-sm md:text-base font-semibold ${tierColor} mb-3 line-clamp-2 min-h-[2.5rem]`}
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {company.name}
              </h3>
              
              {/* View More Button */}
              <button
                onClick={() => handleViewMore(company)}
                className="px-4 py-2 rounded-full text-xs md:text-sm font-medium hover:opacity-90 transition-all duration-300 mt-auto"
                style={{ 
                  backgroundColor: tier === 'Diamond' ? '#243a86' : tier === 'Gold' ? '#ffd24c' : '#ff8c00',
                  color: tier === 'Gold' ? '#243a86' : 'white',
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                {t('partnerAgencies.viewMore')}
              </button>
                </div>
              ))}
            </div>

            {/* Mobile: 1 Row (2 partners) with Auto Slideshow */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-4 transition-all duration-500">
                {displayedCompaniesMobile.map((company) => (
                  <div
                    key={company.id}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Pedestal */}
                    <div 
                      className="w-full h-2 mb-2 rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: tier === 'Diamond' ? '#243a86' : tier === 'Gold' ? '#ffd24c' : '#ff8c00',
                        opacity: 0.3
                      }}
                    ></div>
                    
                    {/* Logo Container */}
                    <div 
                      className="w-20 h-20 mb-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative overflow-hidden shadow-lg"
                      style={{ 
                        boxShadow: tier === 'Diamond' 
                          ? '0 4px 20px rgba(36, 58, 134, 0.4)'
                          : tier === 'Gold'
                          ? '0 4px 20px rgba(255, 210, 76, 0.4)'
                          : '0 4px 20px rgba(255, 140, 0, 0.4)'
                      }}
                    >
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center text-white font-bold text-lg rounded-xl"
                          style={{ 
                            backgroundColor: tier === 'Diamond' ? '#243a86' : tier === 'Gold' ? '#ffd24c' : '#ff8c00',
                            color: tier === 'Gold' ? '#243a86' : 'white',
                            fontFamily: 'DM Sans, sans-serif'
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-xl"></div>
                          <span className="relative z-10">{getInitials(company.name)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Company Name */}
                    <h3 
                      className={`text-xs font-semibold ${tierColor} mb-2 line-clamp-2 min-h-[2rem]`}
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {company.name}
                    </h3>
                    
                    {/* View More Button */}
                    <button
                      onClick={() => handleViewMore(company)}
                      className="px-3 py-1.5 rounded-full text-[10px] font-medium hover:opacity-90 transition-all duration-300 mt-auto"
                      style={{ 
                        backgroundColor: tier === 'Diamond' ? '#243a86' : tier === 'Gold' ? '#ffd24c' : '#ff8c00',
                        color: tier === 'Gold' ? '#243a86' : 'white',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    >
                      {t('partnerAgencies.viewMore')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="flex p-2 md:p-3 rounded-full hover:opacity-80 transition-opacity flex-shrink-0 bg-white/20 backdrop-blur-sm border border-white/30"
            style={{ color: 'white' }}
            aria-label={currentLanguage === 'ar' ? 'الشريحة التالية' : 'Next slide'}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6 md:mt-8 relative z-10">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlideIndex ? 'w-6 md:w-10 bg-[#ffd24c]' : 'bg-white/30'
              }`}
              aria-label={currentLanguage === 'ar' ? `انتقل إلى الشريحة ${index + 1}` : `Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Country Count */}
        <div className="text-center mt-6 md:mt-8 relative z-10">
          <p 
            className={`text-base md:text-lg font-semibold ${tierColor}`}
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {companies.length} {t('partnerAgencies.partnersCount')}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen m-0 p-0 overflow-x-hidden"
      style={{
        background: `linear-gradient(186.57deg, rgba(18, 75, 61, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(28, 54, 89, 0.911419) 31.95%, rgba(22, 81, 66, 0.793286) 47.98%, rgba(51, 88, 140, 0.913498) 70.93%, #4A61C4 81.76%)`,
      }}
    >
      {/* Hero Section */}
      <section className="pb-8 md:pb-8 text-center relative pt-24 md:pt-28 overflow-hidden">
        {/* Decorative SVGs */}
        <div className="absolute left-[3%] top-[30%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute right-[3%] top-[40%] hidden md:block">
          <svg width="100" height="110" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
          <h1 
            className="text-[32px] md:text-[48px] font-bold leading-tight tracking-tight text-center text-white mb-6 md:mb-8"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('partnerAgencies.title')}
          </h1>
          <p 
            className="text-[16px] md:text-[20px] font-normal leading-relaxed text-center text-white/95 max-w-3xl mx-auto mb-8 md:mb-10"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('partnerAgencies.subtitle')}
          </p>
          <button
            className="bg-[#ffd24c] text-[#243a86] font-bold px-8 py-3 rounded-full hover:bg-[#ffc933] transition-all duration-300 shadow-lg text-base md:text-lg inline-block"
            // Form link will be added here later
          >
            {t('pages.partnerAgencies.becomePartner')}
          </button>
        </div>
      </section>

      {/* Partner Tiers Section */}
      <section className="w-full py-8 md:py-12 px-4 md:px-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 md:gap-4 mb-4">
            <div className="h-px w-12 md:w-16 bg-[#ffd24c]"></div>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700', letterSpacing: '0.02em' }}
            >
              {t('partnerAgencies.ourEsteemedPartners')}
            </h2>
            <div className="h-px w-12 md:w-16 bg-[#ffd24c]"></div>
          </div>
          <p 
            className="text-sm md:text-base text-white/80 max-w-2xl mx-auto"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('partnerAgencies.partnersSubtitle')}
          </p>
        </div>

        {renderCompanySection('Diamond', companies.diamond, 'text-white', 'bg-white/10 backdrop-blur-sm')}
        {renderCompanySection('Gold', companies.gold, 'text-white', 'bg-white/10 backdrop-blur-sm')}
        {renderCompanySection('Bronze', companies.bronze, 'text-white', 'bg-white/10 backdrop-blur-sm')}
      </section>

      {/* Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center overflow-hidden"
                  >
                    {selectedCompany.logo ? (
                      <Image
                        src={selectedCompany.logo}
                        alt={selectedCompany.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center text-white font-bold text-xl md:text-2xl rounded-lg"
                        style={{ 
                          backgroundColor: companies.diamond.find(c => c.id === selectedCompany.id) ? '#FFD700' :
                                         companies.gold.find(c => c.id === selectedCompany.id) ? '#C0C0C0' : '#CD7F32' 
                        }}
                      >
                        {getInitials(selectedCompany.name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 
                      className="text-2xl md:text-3xl font-bold text-gray-800"
                      style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}
                    >
                      {selectedCompany.name}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 
                    className="text-lg font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {t('partnerAgencies.about')}
                  </h3>
                  <p 
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {selectedCompany.description}
                  </p>
                </div>

                <div>
                  <h3 
                    className="text-lg font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {t('pages.partnerAgencies.contact')}
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {selectedCompany.contact}
                  </p>
                </div>

                <div>
                  <h3 
                    className="text-lg font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {t('partnerAgencies.website')}
                  </h3>
                  <a
                    href={`https://${selectedCompany.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#243a86] hover:underline"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {selectedCompany.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerAgenciesPage;

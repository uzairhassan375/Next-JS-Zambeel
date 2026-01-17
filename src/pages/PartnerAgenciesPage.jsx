'use client';

import { useState } from 'react';

function PartnerAgenciesPage() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState({ diamond: 0, gold: 0, bronze: 0 });

  // Helper function to get initials from company name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

  const handleViewMore = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  const renderCompanySection = (tier, companies, tierColor, bgGradient) => {
    const companiesPerSlide = 5;
    const tierKey = tier.toLowerCase();
    const totalSlides = Math.ceil(companies.length / companiesPerSlide);
    const currentSlideIndex = currentSlide[tierKey];
    const startIndex = currentSlideIndex * companiesPerSlide;
    const displayedCompanies = companies.slice(startIndex, startIndex + companiesPerSlide);

    const goToSlide = (index) => {
      setCurrentSlide({ ...currentSlide, [tierKey]: index });
    };

    const nextSlide = () => {
      goToSlide((currentSlideIndex + 1) % totalSlides);
    };

    const prevSlide = () => {
      goToSlide((currentSlideIndex - 1 + totalSlides) % totalSlides);
    };

    // Different pedestal styles for each tier
    const getPedestalStyle = () => {
      if (tier === 'Diamond') {
        return {
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(147, 197, 253, 0.3)',
        };
      } else if (tier === 'Gold') {
        return {
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.4) 0%, rgba(217, 119, 6, 0.4) 100%)',
          boxShadow: '0 8px 32px rgba(234, 179, 8, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(251, 191, 36, 0.4)',
        };
      } else {
        return {
          background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.4) 0%, rgba(217, 119, 6, 0.4) 100%)',
          boxShadow: '0 8px 32px rgba(234, 88, 12, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(251, 146, 60, 0.4)',
        };
      }
    };

    return (
      <div className={`${bgGradient} w-full p-8 md:p-10 lg:p-12 mb-8 md:mb-10 relative overflow-hidden`} style={{
        backgroundImage: tier === 'Diamond' 
          ? 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(147, 197, 253, 0.2) 0%, transparent 50%)'
          : tier === 'Gold'
          ? 'radial-gradient(circle at 20% 50%, rgba(234, 179, 8, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 50%, rgba(234, 88, 12, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)'
      }}>
        {/* Sparkling stars effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            ></div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-8 md:mb-10 relative z-10">
          <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${tierColor} animate-pulse`}></div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${tierColor} uppercase tracking-wide`}>
            {tier} Partners
          </h2>
          <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${tierColor} animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        {/* Companies Grid/Scroll */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Left Arrow (Desktop) */}
          <button
            onClick={prevSlide}
            className={`hidden md:flex ${tierColor} p-3 rounded-full hover:opacity-80 transition-opacity flex-shrink-0`}
            style={{ backgroundColor: tier === 'Diamond' ? '#3b82f6' : tier === 'Gold' ? '#eab308' : '#ea580c', color: 'white' }}
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Companies Container */}
          <div className="flex-1">
            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-5 gap-6 md:gap-8">
              {displayedCompanies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Pedestal */}
              <div 
                className="w-full h-2 md:h-3 mb-2 rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                style={getPedestalStyle()}
              ></div>
              
              {/* Logo Container */}
              <div 
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-4 rounded-xl flex items-center justify-center text-white font-bold text-xl md:text-2xl lg:text-3xl transition-transform duration-300 group-hover:scale-110 relative overflow-hidden"
                style={{ 
                  backgroundColor: tier === 'Diamond' ? '#1e40af' : tier === 'Gold' ? '#d97706' : '#9a3412',
                  boxShadow: tier === 'Diamond' 
                    ? '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(147, 197, 253, 0.3)'
                    : tier === 'Gold'
                    ? '0 0 20px rgba(234, 179, 8, 0.6), inset 0 0 20px rgba(251, 191, 36, 0.3)'
                    : '0 0 20px rgba(234, 88, 12, 0.6), inset 0 0 20px rgba(251, 146, 60, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                <span className="relative z-10">{getInitials(company.name)}</span>
              </div>
              
              {/* Company Name */}
              <h3 className={`text-sm md:text-base font-semibold ${tierColor} mb-3 line-clamp-2 min-h-[2.5rem]`}>
                {company.name}
              </h3>
              
              {/* View More Button */}
              <button
                onClick={() => handleViewMore(company)}
                className="px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity mt-auto"
                style={{ 
                  backgroundColor: tier === 'Diamond' ? '#3b82f6' : tier === 'Gold' ? '#eab308' : '#ea580c',
                  color: 'white'
                }}
              >
                View More
              </button>
                </div>
              ))}
            </div>

            {/* Mobile: Scrollable */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
            <div className="flex gap-6" style={{ width: `${companies.length * 280}px` }}>
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex-shrink-0 w-[260px] flex flex-col items-center text-center group"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Pedestal */}
                  <div 
                    className="w-full h-2 mb-2 rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                    style={getPedestalStyle()}
                  ></div>
                  
                  {/* Logo Container */}
                  <div 
                    className="w-24 h-24 mb-4 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform duration-300 group-hover:scale-110 relative overflow-hidden"
                    style={{ 
                      backgroundColor: tier === 'Diamond' ? '#1e40af' : tier === 'Gold' ? '#d97706' : '#9a3412',
                      boxShadow: tier === 'Diamond' 
                        ? '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(147, 197, 253, 0.3)'
                        : tier === 'Gold'
                        ? '0 0 20px rgba(234, 179, 8, 0.6), inset 0 0 20px rgba(251, 191, 36, 0.3)'
                        : '0 0 20px rgba(234, 88, 12, 0.6), inset 0 0 20px rgba(251, 146, 60, 0.3)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                    <span className="relative z-10">{getInitials(company.name)}</span>
                  </div>
                  
                  {/* Company Name */}
                  <h3 className={`text-sm font-semibold ${tierColor} mb-3 line-clamp-2 min-h-[2.5rem]`}>
                    {company.name}
                  </h3>
                  
                  {/* View More Button */}
                  <button
                    onClick={() => handleViewMore(company)}
                    className="px-4 py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity mt-auto"
                    style={{ 
                      backgroundColor: tier === 'Diamond' ? '#3b82f6' : tier === 'Gold' ? '#eab308' : '#ea580c',
                      color: 'white'
                    }}
                  >
                    View More
                  </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Arrow (Desktop) */}
          <button
            onClick={nextSlide}
            className={`hidden md:flex ${tierColor} p-3 rounded-full hover:opacity-80 transition-opacity flex-shrink-0`}
            style={{ backgroundColor: tier === 'Diamond' ? '#3b82f6' : tier === 'Gold' ? '#eab308' : '#ea580c', color: 'white' }}
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                index === currentSlideIndex ? 'w-8 md:w-10' : ''
              }`}
              style={{ 
                backgroundColor: index === currentSlideIndex 
                  ? (tier === 'Diamond' ? '#3b82f6' : tier === 'Gold' ? '#eab308' : '#ea580c')
                  : 'rgba(255, 255, 255, 0.3)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Country Count */}
        <div className="text-center mt-6 md:mt-8 relative z-10">
          <p className={`text-base md:text-lg font-semibold ${tierColor}`}>
            {companies.length} Partners Across 7 Countries
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2E3B78] to-[#4A61C4] text-white py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
            Partner Agencies
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto opacity-90">
            Connect with trusted partners who can help grow your business
          </p>
          <button
            className="bg-[#FCD64C] text-[#2E3B78] px-8 md:px-12 py-3 md:py-4 rounded-lg text-lg md:text-xl font-bold hover:bg-yellow-400 transition-colors"
            // Form link will be added here later
          >
            Become a Partner
          </button>
        </div>
      </section>

      {/* Partner Tiers Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ 
            background: 'linear-gradient(to right, #FFD700, #C0C0C0, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Our Esteemed Partners
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {renderCompanySection('Diamond', companies.diamond, 'text-white', 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900')}
        {renderCompanySection('Gold', companies.gold, 'text-yellow-300', 'bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900')}
        {renderCompanySection('Bronze', companies.bronze, 'text-orange-200', 'bg-gradient-to-br from-orange-900 via-orange-800 to-amber-800')}
      </section>

      {/* Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center text-white font-bold text-xl md:text-2xl"
                    style={{ 
                      backgroundColor: companies.diamond.find(c => c.id === selectedCompany.id) ? '#FFD700' :
                                     companies.gold.find(c => c.id === selectedCompany.id) ? '#C0C0C0' : '#CD7F32' 
                    }}
                  >
                    {getInitials(selectedCompany.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
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
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCompany.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact</h3>
                  <p className="text-gray-600">{selectedCompany.contact}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Website</h3>
                  <a
                    href={`https://${selectedCompany.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2E3B78] hover:underline"
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

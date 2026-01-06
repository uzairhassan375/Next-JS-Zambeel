'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "./I18nProvider";
import { getLocalePath } from "../lib/localeUtils";
const white_logoImage = "/white_logo.png";
const blue_logoImage = "/blue_logo.png";

export default function Header({ theme = "dark" }) {
  const { t, i18n } = useTranslation();
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showJoinUsDropdown, setShowJoinUsDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = i18n.language || 'en';

  // Social media links based on language
  const getWhatsAppLink = () => {
    return currentLanguage === 'ar' 
      ? 'https://whatsapp.com/channel/0029Vb1chFnH5JLr8lKoXE2I' // Arabic WhatsApp channel link
      : 'https://whatsapp.com/channel/0029VaZgjwHIN9iiX6YpEj0w'; // English WhatsApp channel link
  };

  const getFacebookLink = () => {
     return currentLanguage === 'ar'
     ? 'https://www.facebook.com/share/g/1Akg1x5P4G/?mibextid=wwXIfr' // Arabic Facebook channel link
     : 'https://www.facebook.com/share/g/1DAxzz9dQo/?mibextid=wwXIfr'; // English Facebook channel link
 };

  const getLinkedInLink = () => {
    return 'https://www.linkedin.com/company/myzambeel/'; // LinkedIn company page
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setShowLanguageDropdown(false);
    
    // Navigate to the correct route based on language
    const currentPath = pathname;
    let newPath = '';
    
    if (lang === 'ar') {
      // Switch to Arabic: add /ar prefix
      if (currentPath === '/') {
        newPath = '/ar';
      } else {
        // Remove leading slash, add /ar prefix
        const pathWithoutSlash = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
        newPath = `/ar/${pathWithoutSlash}`;
      }
    } else {
      // Switch to English: remove /ar prefix
      if (currentPath === '/ar') {
        newPath = '/';
      } else if (currentPath.startsWith('/ar/')) {
        // Remove /ar prefix
        newPath = currentPath.replace(/^\/ar/, '') || '/';
      } else {
        // Already on English route
        newPath = currentPath;
      }
    }
    
    // Only navigate if path changed
    if (newPath !== currentPath) {
      router.push(newPath);
    }
  };

  const handleSectionClick = (sectionId) => {
    setShowMobileMenu(false);
    if (pathname !== "/") {
      router.push(`/?scrollTo=${sectionId}`);
    } else {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showLanguageDropdown && !e.target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false);
      }
      if (showServicesDropdown && !e.target.closest('.services-dropdown')) {
        setShowServicesDropdown(false);
      }
      if (showJoinUsDropdown && !e.target.closest('.joinus-dropdown')) {
        setShowJoinUsDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLanguageDropdown, showServicesDropdown, showJoinUsDropdown]);

  const isLightTheme = theme === "light";
  const navBgColor = isLightTheme ? "bg-[#E8F0FE]" : "bg-[#2D3E7E]";
  const textColor = isLightTheme ? "text-[#2E3B78]" : "text-white";
  const logoImage = isLightTheme ? blue_logoImage : white_logoImage;
  const hoverColor = isLightTheme ? "hover:text-[#2E3B78]" : "hover:text-yellow-300";
  const dropdownHoverColor = isLightTheme ? "hover:bg-[#2E3B78] hover:text-white" : "hover:bg-[#FCD64C]";
  const servicesHoverColor = isLightTheme ? "hover:text-[#2E3B78]" : "hover:text-[#FCD64C]";


  return (
    <>
      <nav className={`w-[96%] max-w-[1400px] ${navBgColor} rounded-full px-4 md:px-5 py-2.5 flex justify-between items-center shadow-xl fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mx-auto`}>
        <div className="flex items-center gap-3 pl-4">
          <Link href={getLocalePath('/', pathname)} className="mt-1">
            <Image
              src={logoImage}
              alt="Zambeel Logo"
              width={200}
              height={48}
              className="h-10 md:h-12 object-contain"
            />
          </Link>
        </div>
        <div className={`hidden lg:flex items-center gap-6 ${textColor} text-[15px] font-medium tracking-wide`}>
          <div
            className="relative services-dropdown"
            onMouseEnter={() => setShowServicesDropdown(true)}
            onMouseLeave={() => setShowServicesDropdown(false)}
          >
            <button className={`transition flex items-center gap-2 ${showServicesDropdown ? (isLightTheme ? 'text-[#2E3B78]' : 'text-[#FCD64C]') : servicesHoverColor}`}>
              {t('header.services')}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {showServicesDropdown && (
              <div className="absolute top-full left-0 pt-2 bg-transparent min-w-[200px] z-50">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  <Link
                    href={getLocalePath('/pages/dropshipping-uae-and-ksa', pathname)}
                    className={`block px-4 py-3 ${isLightTheme ? 'text-[#2E3B78]' : 'text-[#2E3B78]'} ${dropdownHoverColor} transition text-sm font-medium w-full`}
                  >
                    {t('header.dropshipping')}
                  </Link>
                  <Link
                    href={getLocalePath('/pages/zambeel-360', pathname)}
                    className={`block px-4 py-3 ${isLightTheme ? 'text-[#2E3B78]' : 'text-[#2E3B78]'} ${dropdownHoverColor} transition text-sm font-medium w-full`}
                  >
                    {t('header.zambeel360')}
                  </Link>
                  <Link
                    href={getLocalePath('/pages/warehousing-3pl', pathname)}
                    className={`block px-4 py-3 ${isLightTheme ? 'text-[#2E3B78]' : 'text-[#2E3B78]'} ${dropdownHoverColor} transition text-sm font-medium w-full`}
                  >
                    {t('header.zambeel3PL')}
                  </Link>
                  <Link
                    href={getLocalePath('/learn-ecommerce', pathname)}
                    className={`block px-4 py-3 ${isLightTheme ? 'text-[#2E3B78]' : 'text-[#2E3B78]'} ${dropdownHoverColor} transition text-sm font-medium w-full`}
                  >
                    {t('header.learnEcomm')}
                  </Link>
                </div>
              </div>
            )}
          </div>
          <a 
            href="https://products.myzambeel.com" 
            target="_blank"
            rel="noopener noreferrer"
            className={`${hoverColor} transition cursor-pointer`}
          >
            {t('header.dropshippingProducts')}
          </a>
          <button
            onClick={() => handleSectionClick("where-to-sell")}
            className={`${hoverColor} transition cursor-pointer`}
          >
            {t('header.whereCanYouSell')}
          </button>
          <div
            className="relative joinus-dropdown"
            onMouseEnter={() => setShowJoinUsDropdown(true)}
            onMouseLeave={() => setShowJoinUsDropdown(false)}
          >
            <button className={`transition flex items-center gap-2 ${showJoinUsDropdown ? (isLightTheme ? 'text-[#2E3B78]' : 'text-[#FCD64C]') : servicesHoverColor}`}>
              {t('header.joinUs')}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${showJoinUsDropdown ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {showJoinUsDropdown && (
              <div className="absolute top-full right-0 pt-2 bg-transparent min-w-[180px] z-50">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-4 py-3 ${isLightTheme ? 'text-[#2E3B78]' : 'text-[#2E3B78]'} ${dropdownHoverColor} transition text-sm font-medium w-full flex items-center gap-2`}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    {t('header.whatsapp')}
                  </a>
                  <a
                    href={getFacebookLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-4 py-3 ${isLightTheme ? 'text-[#2E3B78]' : 'text-[#2E3B78]'} ${dropdownHoverColor} transition text-sm font-medium w-full flex items-center gap-2`}
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                    {t('header.facebook')}
                  </a>
                </div>
              </div>
            )}
          </div>
          <Link href={getLocalePath('/supplier', pathname)} className={`${hoverColor} transition`}>
            {t('header.becomeASupplier')}
          </Link>
        </div>

        {/* Language Dropdown */}
        <div className="relative hidden md:block language-dropdown">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowLanguageDropdown(!showLanguageDropdown);
            }}
            className={`${textColor} p-2 rounded-full hover:bg-white/10 transition flex items-center gap-2`}
            aria-label={t('header.selectLanguage')}
          >
            <span className="text-sm font-medium">
              {currentLanguage === 'en' ? t('header.languageArabic') : t('header.languageEnglish')}
            </span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {showLanguageDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[160px] z-50 border border-gray-100">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left ${currentLanguage === 'en' ? 'bg-blue-50' : ''
                  }`}
              >
                <span className={`text-sm font-medium ${currentLanguage === 'en' ? 'text-[#2E3B78]' : 'text-gray-700'}`}>
                  {t('header.languageEnglish')}
                </span>
              </button>
              <button
                onClick={() => handleLanguageChange('ar')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left ${currentLanguage === 'ar' ? 'bg-blue-50' : ''
                  }`}
              >
                <span className={`text-sm font-medium ${currentLanguage === 'ar' ? 'text-[#2E3B78]' : 'text-gray-700'}`}>
                  {t('header.languageArabic')}
                </span>
              </button>
            </div>
          )}
        </div>

        <div className={`${isLightTheme ? 'bg-white' : 'bg-white'} rounded-full p-[4px] pl-6 hidden md:flex items-center gap-3 shadow-md`}>
          <a href="https://portal.myzambeel.com/login" target="_blank" rel="noopener noreferrer" className={`${isLightTheme ? 'text-[#2E3B78]' : 'text-[#2D3E7E]'} font-bold text-sm`}>
            {t('common.signIn')}
          </a>
          <a href="https://portal.myzambeel.com/register" target="_blank" rel="noopener noreferrer" className="bg-[#FCD64C] text-[#2D3E7E] px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap">
            {t('common.signUp')}
          </a>
        </div>

        {/* Mobile Language Toggle & Menu Button Group */}
        <div className="flex items-center gap-1 lg:hidden">
          <div className="relative md:hidden language-dropdown">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowLanguageDropdown(!showLanguageDropdown);
              }}
              className={`${textColor} p-2 rounded-full hover:bg-white/10 transition flex items-center gap-1`}
              aria-label={t('header.selectLanguage')}
            >
              <span className="text-sm font-medium">
                {currentLanguage === 'en' ? t('header.languageArabic') : t('header.languageEnglish')}
              </span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[160px] z-50 border border-gray-100">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left ${currentLanguage === 'en' ? 'bg-blue-50' : ''
                    }`}
                >
                  <span className={`text-sm font-medium ${currentLanguage === 'en' ? 'text-[#2E3B78]' : 'text-gray-700'}`}>
                    {t('header.languageEnglish')}
                  </span>
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left ${currentLanguage === 'ar' ? 'bg-blue-50' : ''
                    }`}
                >
                  <span className={`text-sm font-medium ${currentLanguage === 'ar' ? 'text-[#2E3B78]' : 'text-gray-700'}`}>
                    {t('header.languageArabic')}
                  </span>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`lg:hidden ${textColor} p-2`}
            aria-label={t('header.toggleMenu')}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {showMobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <a href="https://portal.myzambeel.com/register" target="_blank" rel="noopener noreferrer" className="hidden md:block lg:hidden bg-[#FCD64C] text-[#2D3E7E] px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shadow-md">
          {t('common.signUp')}
        </a>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={`lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 w-[96%] max-w-[1400px] ${isLightTheme ? 'bg-[#E8F0FE]' : 'bg-[#2D3E7E]'} rounded-2xl shadow-2xl z-40 mt-2 overflow-hidden`}>
          <div className="flex flex-col p-6 space-y-4">
            <div className="relative services-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowServicesDropdown(!showServicesDropdown);
                }}
                className={`w-full flex items-center justify-between ${isLightTheme ? 'text-[#2E3B78]' : 'text-white'} text-[15px] font-medium py-3 ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition`}
              >
                <span>{t('header.services')}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showServicesDropdown ? "rotate-180" : ""
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {showServicesDropdown && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link
                    href={getLocalePath('/pages/dropshipping-uae-and-ksa', pathname)}
                    className={`block ${isLightTheme ? 'text-[#2E3B78]/80' : 'text-white/80'} ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition py-2 text-sm`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t('header.dropshipping')}
                  </Link>
                  <Link
                    href={getLocalePath('/pages/zambeel-360', pathname)}
                    className={`block ${isLightTheme ? 'text-[#2E3B78]/80' : 'text-white/80'} ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition py-2 text-sm`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t('header.zambeel360')}
                  </Link>
                  <Link
                    href={getLocalePath('/pages/warehousing-3pl', pathname)}
                    className={`block ${isLightTheme ? 'text-[#2E3B78]/80' : 'text-white/80'} ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition py-2 text-sm`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t('header.zambeel3PL')}
                  </Link>
                  <Link
                    href={getLocalePath('/learn-ecommerce', pathname)}
                    className={`block ${isLightTheme ? 'text-[#2E3B78]/80' : 'text-white/80'} ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition py-2 text-sm`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t('header.learnEcomm')}
                  </Link>
                </div>
              )}
            </div>
            <a
              href="https://products.myzambeel.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMobileMenu(false)}
              className={`${isLightTheme ? 'text-[#2E3B78]' : 'text-white'} text-[15px] font-medium py-3 ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition text-left w-full`}
            >
              {t('header.dropshippingProducts')}
            </a>
            <button
              onClick={() => handleSectionClick("where-to-sell")}
              className={`${isLightTheme ? 'text-[#2E3B78]' : 'text-white'} text-[15px] font-medium py-3 ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition text-left w-full`}
            >
              {t('header.whereCanYouSell')}
            </button>
            <div className="relative joinus-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowJoinUsDropdown(!showJoinUsDropdown);
                }}
                className={`w-full flex items-center justify-between ${isLightTheme ? 'text-[#2E3B78]' : 'text-white'} text-[15px] font-medium py-3 ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition`}
              >
                <span>{t('header.joinUs')}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showJoinUsDropdown ? "rotate-180" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {showJoinUsDropdown && (
                <div className="mt-2 pl-4 space-y-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${isLightTheme ? 'text-[#2E3B78]/80' : 'text-white/80'} ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition py-2 text-sm flex items-center gap-2`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    {t('header.whatsapp')}
                  </a>
                  <a
                    href={getFacebookLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${isLightTheme ? 'text-[#2E3B78]/80' : 'text-white/80'} ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition py-2 text-sm flex items-center gap-2`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                    {t('header.facebook')}
                  </a>
                </div>
              )}
            </div>
            <Link
              href={getLocalePath('/supplier', pathname)}
              onClick={() => setShowMobileMenu(false)}
              className={`${isLightTheme ? 'text-[#2E3B78]' : 'text-white'} text-[15px] font-medium py-3 ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition`}
            >
              {t('header.becomeASupplier')}
            </Link>
            <div className={`pt-4 border-t ${isLightTheme ? 'border-[#2E3B78]/20' : 'border-white/20'}`}>
              {/* Language Dropdown for Mobile */}

              <a
                href="https://portal.myzambeel.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${isLightTheme ? 'text-[#2E3B78]' : 'text-white'} text-[15px] font-medium py-3 ${isLightTheme ? 'hover:text-[#2E3B78]' : 'hover:text-[#FCD64C]'} transition`}
              >
                {t('common.signIn')}
              </a>
              <a href="https://portal.myzambeel.com/register" target="_blank" rel="noopener noreferrer" className="w-full bg-[#FCD64C] text-[#2D3E7E] px-6 py-3 rounded-full text-sm font-bold mt-2 text-center block">
                {t('common.signUp')}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


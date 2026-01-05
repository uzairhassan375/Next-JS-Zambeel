'use client';

import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en/translation.json';
import arTranslations from '../locales/ar/translation.json';

// Cookie utility functions - using 'lang' cookie only
const setCookie = (name, value, days = 365) => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

// Initialize i18n only once - this happens at module load, before any components render
// The server-provided locale is used to initialize i18n synchronously
let i18nInitialized = false;
const initializeI18n = (locale) => {
  if (!i18nInitialized) {
    i18nInitialized = true;
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: enTranslations,
          },
          ar: {
            translation: arTranslations,
          },
        },
        lng: locale, // Use server-provided locale from cookie
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        initImmediate: true, // Initialize immediately, synchronously
      });
  }
};

export const changeLanguage = (lang) => {
  // Validate language
  if (lang !== 'en' && lang !== 'ar') {
    lang = 'en';
  }
  
  // Change language in i18n
  i18n.changeLanguage(lang);
  
  // Update HTML tag immediately
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  
  // Save preference to cookie - using 'lang' cookie only
  if (typeof window !== 'undefined') {
    setCookie('lang', lang, 365); // Store for 1 year
  }
};

export default function I18nProvider({ children, initialLocale = 'en' }) {
  // Validate locale from server
  const locale = (initialLocale === 'en' || initialLocale === 'ar') ? initialLocale : 'en';
  
  // Initialize i18n synchronously with server locale BEFORE first render
  // This ensures translations are loaded before any component renders
  if (!i18nInitialized) {
    initializeI18n(locale);
  } else if (i18n.language !== locale) {
    // If already initialized but locale doesn't match, update it synchronously
    i18n.changeLanguage(locale);
  }
  
  useEffect(() => {
    // Update HTML tag attributes when locale changes (client-side only)
    if (typeof document !== 'undefined' && locale) {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
    
    // Ensure language stays in sync
    if (i18n.isInitialized && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
}


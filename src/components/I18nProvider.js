'use client';

import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en/translation.json';
import arTranslations from '../locales/ar/translation.json';

// Cookie utility functions
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const setCookie = (name, value, days = 365) => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

// Get initial locale - prioritize server-provided locale to prevent hydration mismatch
const getInitialLocale = (serverLocale) => {
  // If server provided locale, use it (prevents hydration mismatch)
  if (serverLocale && (serverLocale === 'en' || serverLocale === 'ar')) {
    return serverLocale;
  }
  // Fallback to cookie if available (only on client)
  if (typeof window !== 'undefined') {
    const savedLocale = getCookie('zambeel-locale');
    if (savedLocale === 'en' || savedLocale === 'ar') {
      return savedLocale;
    }
  }
  return 'en'; // Default to English
};

// Initialize i18n only once with the server locale
// This must happen synchronously before any components render
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
        lng: locale,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        initImmediate: true, // Initialize immediately, don't wait
      });
  }
};

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  
  // Update HTML tag immediately
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  
  // Save preference to cookies
  if (typeof window !== 'undefined') {
    setCookie('zambeel-locale', lang, 365); // Store for 1 year
  }
};

export default function I18nProvider({ children, initialLocale = 'en' }) {
  // Get the locale from server (prevents hydration mismatch)
  const locale = getInitialLocale(initialLocale);
  
  // Initialize i18n synchronously with server locale before first render
  // This ensures server and client render with the same language
  if (!i18nInitialized) {
    initializeI18n(locale);
  } else if (i18n.language !== locale) {
    // If already initialized but locale doesn't match, update it synchronously
    i18n.changeLanguage(locale);
  }
  
  useEffect(() => {
    // Update HTML tag attributes when locale changes
    if (typeof document !== 'undefined' && locale) {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
    
    // Ensure language stays in sync (in case of race conditions)
    if (i18n.isInitialized && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
}


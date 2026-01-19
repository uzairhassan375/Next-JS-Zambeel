'use client';

import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en/translation.json';
import arTranslations from '../locales/ar/translation.json';

// Cookie utility - using 'lang' cookie only
const setCookie = (name, value, days = 365) => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

// Initialize i18n once at module level (before any components)
if (!i18n.isInitialized) {
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
      lng: 'en', // Default, will be synced in useEffect
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

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
    setCookie('lang', lang, 365);
  }
};

// Client component - only syncs i18n in useEffect
// No rendering logic, no state updates in render
export default function I18nProvider({ children, initialLocale = 'en' }) {
  // Validate locale from server (set by middleware)
  const locale = (initialLocale === 'en' || initialLocale === 'ar') ? initialLocale : 'en';
  
  // Only sync i18n in useEffect - no rendering logic, no state updates in render
  useEffect(() => {
    // Sync i18n language with server-provided locale
    if (i18n.isInitialized && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
}


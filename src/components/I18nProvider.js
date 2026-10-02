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
      lng: 'en', // Default; I18nProvider syncs to initialLocale before children render
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

function syncI18nLanguage(locale, { emit = false } = {}) {
  if (!i18n.isInitialized) return;
  const current = (i18n.resolvedLanguage || i18n.language || '').split('-')[0];
  if (current === locale) return;

  if (emit) {
    i18n.changeLanguage(locale);
    return;
  }

  // Sync immediately for this render (SSR + hydration) without waiting on effects.
  // Resources are already bundled for en/ar.
  i18n.language = locale;
  i18n.resolvedLanguage = locale;
}

// Sync language from the server (middleware x-locale / /ar path) BEFORE children call t(),
// so SSR HTML and the first client render match (avoids hydration mismatch).
export default function I18nProvider({ children, initialLocale = 'en' }) {
  const locale = (initialLocale === 'en' || initialLocale === 'ar') ? initialLocale : 'en';

  syncI18nLanguage(locale);

  useEffect(() => {
    syncI18nLanguage(locale, { emit: true });
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
  }, [locale]);

  return <>{children}</>;
}

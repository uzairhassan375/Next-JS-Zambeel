'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { getDefaultTickerItem } from '../lib/tickerPages';
import { useTickerBlinkSubtree } from '../lib/tickerBlinkRaf';
function sanitizeTickerHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

function TickerHtml({ html, isArabic }) {
  return (
    <span
      className="inline-block ticker-content"
      dir={isArabic ? 'rtl' : 'ltr'}
      dangerouslySetInnerHTML={{ __html: sanitizeTickerHtml(html) }}
    />
  );
}

function TickerStrip({ isArabic, html, variant = 'blue' }) {
  const isYellow = variant === 'yellow';
  return (
    <div
      className={`mx-6 flex items-center whitespace-nowrap text-sm md:mx-10 md:text-base ${
        isYellow ? 'text-black' : 'text-white'
      }`}
    >
      <span className="whitespace-nowrap" dir={isArabic ? 'rtl' : 'ltr'}>
        <TickerHtml isArabic={isArabic} html={html} />
      </span>
      <span className={`mx-4 md:mx-6 ${isYellow ? 'text-black/50' : 'text-white/60'}`} aria-hidden>
        •
      </span>
    </div>
  );
}

export default function Ticker({ pageId = 'home', variant = 'blue', className = '' }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isArabic = String(currentLanguage).toLowerCase().startsWith('ar');
  const tickerRootRef = useRef(null);
  const defaults = getDefaultTickerItem(pageId);
  const [ticker, setTicker] = useState({
    textEn: defaults.textEn,
    textAr: defaults.textAr,
  });

  useEffect(() => {
    let cancelled = false;
    const pageDefaults = getDefaultTickerItem(pageId);
    fetch(`/api/tickers?pageId=${encodeURIComponent(pageId)}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setTicker({
            textEn: String(data.textEn ?? pageDefaults.textEn),
            textAr: String(data.textAr ?? pageDefaults.textAr),
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pageId]);

  const text = useMemo(() => {
    if (isArabic) {
      return ticker.textAr?.trim() || ticker.textEn?.trim() || defaults.textAr;
    }
    return ticker.textEn?.trim() || defaults.textEn;
  }, [isArabic, ticker.textAr, ticker.textEn, defaults.textAr, defaults.textEn]);

  useTickerBlinkSubtree(tickerRootRef, text);

  const isYellow = variant === 'yellow';

  return (
    <div
      ref={tickerRootRef}
      className={`relative z-10 w-screen overflow-hidden py-2 md:py-3 ${
        isYellow ? 'bg-[#FCD64C] text-black' : 'bg-[#2E3B78] text-white'
      } ${className || 'mt-4 md:mt-0'}`}
      style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
      dir="ltr"
    >
      <Marquee
        key={isArabic ? 'ar' : 'en'}
        speed={50}
        gradient
        gradientColor={isYellow ? [252, 214, 76] : [46, 59, 120]}
        gradientWidth={50}
        pauseOnHover
        direction={isArabic ? 'right' : 'left'}
        autoFill
      >
        <TickerStrip isArabic={isArabic} html={text} variant={variant} />
        <TickerStrip isArabic={isArabic} html={text} variant={variant} />
        <TickerStrip isArabic={isArabic} html={text} variant={variant} />
      </Marquee>
    </div>
  );
}

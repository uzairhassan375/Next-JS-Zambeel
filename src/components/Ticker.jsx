'use client';

import { useEffect, useMemo, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TICKER_TEXT_AR, DEFAULT_TICKER_TEXT_EN } from '../lib/tickerPages';
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
      className="inline-block"
      dir={isArabic ? 'rtl' : 'ltr'}
      dangerouslySetInnerHTML={{ __html: sanitizeTickerHtml(html) }}
    />
  );
}

function TickerStrip({ isArabic, html }) {
  return (
    <div className="mx-6 flex items-center whitespace-nowrap text-sm text-white md:mx-10 md:text-base">
      <span className="whitespace-nowrap" dir={isArabic ? 'rtl' : 'ltr'}>
        <TickerHtml isArabic={isArabic} html={html} />
      </span>
      <span className="mx-4 text-white/60 md:mx-6" aria-hidden>
        •
      </span>
    </div>
  );
}

export default function Ticker({ pageId = 'home' }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isArabic = String(currentLanguage).toLowerCase().startsWith('ar');
  const [ticker, setTicker] = useState({
    textEn: DEFAULT_TICKER_TEXT_EN,
    textAr: DEFAULT_TICKER_TEXT_AR,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/tickers?pageId=${encodeURIComponent(pageId)}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setTicker({
            textEn: String(data.textEn ?? DEFAULT_TICKER_TEXT_EN),
            textAr: String(data.textAr ?? DEFAULT_TICKER_TEXT_AR),
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
      return ticker.textAr?.trim() || ticker.textEn?.trim() || DEFAULT_TICKER_TEXT_AR;
    }
    return ticker.textEn?.trim() || DEFAULT_TICKER_TEXT_EN;
  }, [isArabic, ticker.textAr, ticker.textEn]);

  return (
    <div
      className="relative z-10 mt-4 w-screen overflow-hidden bg-[#2E3B78] py-2 text-white md:mt-0 md:py-3"
      style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
    >
      <Marquee
        key={isArabic ? 'ar' : 'en'}
        speed={50}
        gradient
        gradientColor={[46, 59, 120]}
        gradientWidth={50}
        pauseOnHover
        direction={isArabic ? 'right' : 'left'}
        autoFill
      >
        <TickerStrip isArabic={isArabic} html={text} />
        <TickerStrip isArabic={isArabic} html={text} />
        <TickerStrip isArabic={isArabic} html={text} />
      </Marquee>
    </div>
  );
}

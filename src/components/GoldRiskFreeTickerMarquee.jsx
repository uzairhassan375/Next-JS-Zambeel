'use client';

import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TICKER_TEXT_AR, DEFAULT_TICKER_TEXT_EN } from '../lib/tickerPages';
import { startBlinkOnElement, useTickerBlinkSubtree } from '../lib/tickerBlinkRaf';

/** Opacity blink driven by rAF — CSS keyframes fail inside react-fast-marquee. */
export function GoldTickerBlinkLead({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    return startBlinkOnElement(el, { periodMs: 1400, min: 0.22, max: 1 });
  }, []);

  return (
    <span ref={ref} className={`inline-block ${className}`.trim()} style={{ opacity: 1 }}>
      {children}
    </span>
  );
}

function sanitizeTickerHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

function StyledTickerText({ html, isArabic }) {
  return (
    <span
      className="inline-block ticker-content"
      dir={isArabic ? 'rtl' : 'ltr'}
      dangerouslySetInnerHTML={{ __html: sanitizeTickerHtml(html) }}
    />
  );
}

export default function GoldRiskFreeTickerMarquee({ pageId = 'dropshipping' }) {
  const { i18n } = useTranslation();
  const isArabic = String(i18n.language || 'en').toLowerCase().startsWith('ar');
  const tickerRootRef = useRef(null);
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

  const text = isArabic
    ? (ticker.textAr?.trim() || ticker.textEn?.trim() || DEFAULT_TICKER_TEXT_AR)
    : (ticker.textEn?.trim() || DEFAULT_TICKER_TEXT_EN);

  useTickerBlinkSubtree(tickerRootRef, text);

  return (
    <div ref={tickerRootRef} className="w-full bg-[#FCD64C] text-black py-2 overflow-hidden" dir="ltr">
      <Marquee speed={50} gradient={false} pauseOnHover autoFill direction="left">
        <span className="mx-6 whitespace-nowrap text-sm md:text-base">
          <StyledTickerText html={text} isArabic={isArabic} />
        </span>
        <span className="mx-6 text-black/60">•</span>
      </Marquee>
    </div>
  );
}

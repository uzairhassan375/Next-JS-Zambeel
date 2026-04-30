'use client';

import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TICKER_TEXT_AR, DEFAULT_TICKER_TEXT_EN } from '../lib/tickerPages';

/** Opacity blink driven by rAF — CSS keyframes often fail inside react-fast-marquee’s animated subtree. */
export function GoldTickerBlinkLead({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.style.opacity = '1';
      return;
    }

    const periodMs = 1400;
    const min = 0.22;
    const max = 1;
    const start = performance.now();
    let frameId;
    let cancelled = false;

    const tick = (now) => {
      if (cancelled) return;
      const t = (now - start) % periodMs;
      const phase = (t / periodMs) * Math.PI * 2;
      const o = min + (max - min) * (0.5 + 0.5 * Math.cos(phase));
      el.style.opacity = String(o);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
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
      className="inline-block"
      dir={isArabic ? 'rtl' : 'ltr'}
      dangerouslySetInnerHTML={{ __html: sanitizeTickerHtml(html) }}
    />
  );
}

export default function GoldRiskFreeTickerMarquee({ pageId = 'dropshipping' }) {
  const { i18n } = useTranslation();
  const isArabic = String(i18n.language || 'en').toLowerCase().startsWith('ar');
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

  return (
    <div className="w-full bg-[#FCD64C] text-black py-2 overflow-hidden">
      <Marquee speed={50} gradient={false} pauseOnHover autoFill direction="left">
        <span className="mx-6 whitespace-nowrap text-sm md:text-base">
          <StyledTickerText html={text} isArabic={isArabic} />
        </span>
        <span className="mx-6 text-black/60">•</span>
      </Marquee>
    </div>
  );
}

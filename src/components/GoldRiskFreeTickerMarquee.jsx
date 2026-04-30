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

function StyledTickerText({ text, styleConfig }) {
  const classes = [
    styleConfig.isBold ? 'font-bold' : 'font-normal',
    styleConfig.isUnderline ? 'underline' : '',
    styleConfig.isHighlight ? 'bg-white/70 px-2 py-0.5 rounded' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (styleConfig.isBlink) {
    return <GoldTickerBlinkLead className={classes}>{text}</GoldTickerBlinkLead>;
  }
  return <span className={classes}>{text}</span>;
}

export default function GoldRiskFreeTickerMarquee({ pageId = 'dropshipping' }) {
  const { i18n } = useTranslation();
  const isArabic = String(i18n.language || 'en').toLowerCase().startsWith('ar');
  const [ticker, setTicker] = useState({
    textEn: DEFAULT_TICKER_TEXT_EN,
    textAr: DEFAULT_TICKER_TEXT_AR,
    isBold: false,
    isUnderline: false,
    isHighlight: false,
    isBlink: false,
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
            isBold: data.isBold === true,
            isUnderline: data.isUnderline === true,
            isHighlight: data.isHighlight === true,
            isBlink: data.isBlink === true,
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pageId]);

  const text = isArabic ? (ticker.textAr?.trim() || DEFAULT_TICKER_TEXT_AR) : (ticker.textEn?.trim() || DEFAULT_TICKER_TEXT_EN);

  return (
    <div className="w-full bg-[#FCD64C] text-black py-2 overflow-hidden">
      <Marquee speed={50} gradient={false} pauseOnHover autoFill direction="left">
        <span className="mx-6 whitespace-nowrap text-sm md:text-base">
          <StyledTickerText text={text} styleConfig={ticker} />
        </span>
        <span className="mx-6 text-black/60">•</span>
      </Marquee>
    </div>
  );
}

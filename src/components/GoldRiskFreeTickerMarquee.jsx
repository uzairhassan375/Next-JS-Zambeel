'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { getDefaultTickerItem } from '../lib/tickerPages';
import { startBlinkOnElement, useTickerBlinkSubtree } from '../lib/tickerBlinkRaf';
import {
  barEffectClass,
  fontScaleClass,
  normalizeTickerStyle,
} from '../lib/tickerStyle';

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

function StyledTickerText({ html, isArabic, textColor }) {
  return (
    <span
      className="inline-block ticker-content"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={textColor ? { color: textColor } : undefined}
      dangerouslySetInnerHTML={{ __html: sanitizeTickerHtml(html) }}
    />
  );
}

export default function GoldRiskFreeTickerMarquee({ pageId = 'dropshipping' }) {
  const { i18n } = useTranslation();
  const isArabic = String(i18n.language || 'en').toLowerCase().startsWith('ar');
  const tickerRootRef = useRef(null);
  const defaults = getDefaultTickerItem(pageId);
  const [ticker, setTicker] = useState(defaults);

  useEffect(() => {
    let cancelled = false;
    const pageDefaults = getDefaultTickerItem(pageId);
    fetch(`/api/tickers?pageId=${encodeURIComponent(pageId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setTicker({
            ...pageDefaults,
            ...data,
            ...normalizeTickerStyle(data, pageId),
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pageId]);

  const style = useMemo(() => normalizeTickerStyle(ticker, pageId), [ticker, pageId]);

  const text = isArabic
    ? ticker.textAr?.trim() || ticker.textEn?.trim() || defaults.textAr
    : ticker.textEn?.trim() || defaults.textEn;

  useTickerBlinkSubtree(tickerRootRef, text);

  return (
    <div
      ref={tickerRootRef}
      className={`w-full py-2 ${barEffectClass(style.barEffect)}`}
      style={{ backgroundColor: style.barColor, color: style.textColor }}
      dir="ltr"
    >
      <div className="ticker-bar-content">
        <Marquee
          key={`${isArabic ? 'ar' : 'en'}-${style.speed}-${style.textColor}`}
          speed={style.speed}
          gradient={style.showGradient}
          pauseOnHover={style.pauseOnHover}
          autoFill
          direction={isArabic ? 'right' : 'left'}
        >
          <span
            className={`mx-6 whitespace-nowrap ${fontScaleClass(style.fontScale)} ${
              style.uppercase ? 'uppercase tracking-wide' : ''
            }`}
            style={{ color: style.textColor }}
          >
            {style.emojiPrefix ? <span className="me-2">{style.emojiPrefix}</span> : null}
            <StyledTickerText html={text} isArabic={isArabic} textColor={style.textColor} />
          </span>
          <span className="mx-6 opacity-60" aria-hidden>
            {style.separator || '•'}
          </span>
        </Marquee>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { getDefaultTickerItem } from '../lib/tickerPages';
import { useTickerBlinkSubtree } from '../lib/tickerBlinkRaf';
import {
  barEffectClass,
  fontScaleClass,
  hexToRgbArray,
  normalizeTickerStyle,
} from '../lib/tickerStyle';

function sanitizeTickerHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

function TickerHtml({ html, isArabic, textColor }) {
  return (
    <span
      className="inline-block ticker-content"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={textColor ? { color: textColor } : undefined}
      dangerouslySetInnerHTML={{ __html: sanitizeTickerHtml(html) }}
    />
  );
}

function TickerStrip({ isArabic, html, textColor, separator, fontScale, uppercase, emojiPrefix }) {
  return (
    <div
      className={`mx-6 flex items-center whitespace-nowrap md:mx-10 ${fontScaleClass(fontScale)} ${
        uppercase ? 'uppercase tracking-wide' : ''
      }`}
      style={{ color: textColor }}
    >
      <span className="whitespace-nowrap" dir={isArabic ? 'rtl' : 'ltr'}>
        {emojiPrefix ? <span className="me-2">{emojiPrefix}</span> : null}
        <TickerHtml isArabic={isArabic} html={html} textColor={textColor} />
      </span>
      <span className="mx-4 opacity-60 md:mx-6" aria-hidden>
        {separator || '•'}
      </span>
    </div>
  );
}

/**
 * @param {string} pageId
 * @param {'blue'|'yellow'} variant - fallback when API style not loaded yet
 * @param {string} className
 */
export default function Ticker({ pageId = 'home', variant = 'blue', className = '' }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isArabic = String(currentLanguage).toLowerCase().startsWith('ar');
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

  const text = useMemo(() => {
    if (isArabic) {
      return ticker.textAr?.trim() || ticker.textEn?.trim() || defaults.textAr;
    }
    return ticker.textEn?.trim() || defaults.textEn;
  }, [isArabic, ticker.textAr, ticker.textEn, defaults.textAr, defaults.textEn]);

  useTickerBlinkSubtree(tickerRootRef, text);

  // Fallback while loading: respect legacy variant prop
  const barColor =
    ticker.barColor || (variant === 'yellow' ? '#FCD64C' : style.barColor);
  const textColor =
    ticker.textColor || (variant === 'yellow' ? '#000000' : style.textColor);
  const gradientRgb = hexToRgbArray(barColor);

  return (
    <div
      ref={tickerRootRef}
      className={`relative z-10 w-screen py-2 md:py-3 ${barEffectClass(
        style.barEffect
      )} ${className || 'mt-4 md:mt-0'}`}
      style={{
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        backgroundColor: barColor,
        color: textColor,
      }}
      dir="ltr"
    >
      <div className="ticker-bar-content">
        <Marquee
          key={`${isArabic ? 'ar' : 'en'}-${style.speed}-${style.showGradient}-${textColor}`}
          speed={style.speed}
          gradient={style.showGradient}
          gradientColor={gradientRgb}
          gradientWidth={50}
          pauseOnHover={style.pauseOnHover}
          direction={isArabic ? 'right' : 'left'}
          autoFill
        >
          <TickerStrip
            isArabic={isArabic}
            html={text}
            textColor={textColor}
            separator={style.separator}
            fontScale={style.fontScale}
            uppercase={style.uppercase}
            emojiPrefix={style.emojiPrefix}
          />
          <TickerStrip
            isArabic={isArabic}
            html={text}
            textColor={textColor}
            separator={style.separator}
            fontScale={style.fontScale}
            uppercase={style.uppercase}
            emojiPrefix={style.emojiPrefix}
          />
          <TickerStrip
            isArabic={isArabic}
            html={text}
            textColor={textColor}
            separator={style.separator}
            fontScale={style.fontScale}
            uppercase={style.uppercase}
            emojiPrefix={style.emojiPrefix}
          />
        </Marquee>
      </div>
    </div>
  );
}

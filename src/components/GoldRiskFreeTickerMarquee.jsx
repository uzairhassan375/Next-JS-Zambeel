'use client';

import { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

/** Opacity blink driven by rAF — CSS keyframes often fail inside react-fast-marquee’s animated subtree. */
export function GoldTickerBlinkLead({ children }) {
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
    <span ref={ref} className="inline-block font-bold" style={{ opacity: 1 }}>
      {children}
    </span>
  );
}

export default function GoldRiskFreeTickerMarquee() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#FCD64C] text-black py-2 overflow-hidden">
      <Marquee speed={50} gradient={false} pauseOnHover autoFill direction="left">
        <span className="mx-6 whitespace-nowrap text-sm md:text-base">
          <GoldTickerBlinkLead>{t('pricing.goldRiskFreeTickerLead')}</GoldTickerBlinkLead>
          <span className="font-normal">{t('pricing.goldRiskFreeTickerMiddle')}</span>
          <span className="ms-1 inline-block font-bold md:ms-1.5">
            {t('pricing.goldRiskFreeTickerRefund')}
          </span>
        </span>
        <span className="mx-6 text-black/60">•</span>
      </Marquee>
    </div>
  );
}

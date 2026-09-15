'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

function readCookie(name) {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

function trackBrowserPageView(eventId) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', 'PageView', {}, { eventID: eventId });
}

function sendServerPageView({ eventId, eventSourceUrl }) {
  const payload = {
    eventId,
    eventSourceUrl,
    fbp: readCookie('_fbp') || undefined,
    fbc: readCookie('_fbc') || undefined,
  };

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/meta/pageview', blob);
      return;
    }
  } catch {
    // fall through to fetch
  }

  fetch('/api/meta/pageview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

/**
 * Meta Pixel for every public page.
 * - First paint: uses server-provided eventId (CAPI already sent from layout)
 * - Client route changes: new eventId → fbq + /api/meta/pageview (same id)
 */
function MetaPixelTracker({ initialEventId }) {
  const pathname = usePathname();
  const isFirstNavigation = useRef(true);
  const lastPathRef = useRef('');

  useEffect(() => {
    if (!PIXEL_ID) return;
    if (pathname?.startsWith('/admin')) return;

    const eventSourceUrl = window.location.href;

    // Avoid double-fire for the same path in Strict Mode remounts
    if (lastPathRef.current === pathname && !isFirstNavigation.current) return;
    lastPathRef.current = pathname;

    if (isFirstNavigation.current) {
      isFirstNavigation.current = false;
      const eventId = initialEventId || crypto.randomUUID();

      const fire = () => trackBrowserPageView(eventId);
      if (typeof window.fbq === 'function') {
        fire();
      } else {
        // Script may still be loading — retry briefly
        let tries = 0;
        const timer = setInterval(() => {
          tries += 1;
          if (typeof window.fbq === 'function') {
            clearInterval(timer);
            fire();
          } else if (tries > 40) {
            clearInterval(timer);
          }
        }, 50);
      }

      // If layout somehow skipped CAPI (no initialEventId), still send server event
      if (!initialEventId) {
        sendServerPageView({ eventId, eventSourceUrl });
      }
      return;
    }

    // Client-side route change: shared new id for browser + CAPI
    const eventId = crypto.randomUUID();
    trackBrowserPageView(eventId);
    sendServerPageView({ eventId, eventSourceUrl });
  }, [pathname, initialEventId]);

  return null;
}

export default function MetaPixel({ initialEventId }) {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        /* PageView is fired manually with eventID for CAPI deduplication */
      `}</Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelTracker initialEventId={initialEventId} />
      </Suspense>
    </>
  );
}

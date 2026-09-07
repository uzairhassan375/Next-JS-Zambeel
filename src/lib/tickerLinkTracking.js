'use client';

import { useEffect } from 'react';
import { trackTickerLinkClick } from './analytics';

/**
 * Event delegation for links inside ticker HTML (dangerouslySetInnerHTML).
 * Tracks any <a> click — works for current and future ticker links.
 */
export function handleTickerLinkClick(event, { pageId } = {}) {
  const anchor = event.target?.closest?.('a');
  if (!anchor || !event.currentTarget?.contains?.(anchor)) return;

  const href = anchor.getAttribute('href') || anchor.href || '';
  if (!href || href === '#' || href.startsWith('javascript:')) return;

  const linkText = (anchor.getAttribute('title') || anchor.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);

  trackTickerLinkClick({
    href,
    linkText,
    pageId: pageId || undefined,
  });
}

/** Attach click tracking to a ticker root element via ref. */
export function useTickerLinkTracking(rootRef, pageId) {
  useEffect(() => {
    const root = rootRef?.current;
    if (!root) return undefined;

    const onClick = (event) => handleTickerLinkClick(event, { pageId });
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [rootRef, pageId]);
}

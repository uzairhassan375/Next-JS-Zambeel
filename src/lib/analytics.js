'use client';

import posthog from 'posthog-js';

/**
 * Safe PostHog helper — never throws if PostHog is missing/uninitialized.
 * Website-only (admin routes are ignored).
 */
export function track(event, properties = {}) {
  try {
    if (typeof window === 'undefined') return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
    if (window.location.pathname.startsWith('/admin')) return;
    posthog.capture(event, {
      path: window.location.pathname,
      ...properties,
    });
  } catch {
    // ignore analytics failures
  }
}

/**
 * Map href → stable nav_key so dashboard cards stay language-independent.
 */
export function navKeyFromHref(href = '') {
  const h = String(href).toLowerCase();
  if (h.includes('portal.myzambeel.com/login') || h.endsWith('/login')) return 'login';
  if (h.includes('portal.myzambeel.com/register') || h.includes('/register')) return 'register';
  if (h.includes('products.myzambeel.com')) return 'products';
  if (h.includes('whatsapp.com') || h.includes('wa.me')) return 'whatsapp';
  if (h.includes('facebook.com')) return 'facebook';
  if (h.includes('linkedin.com')) return 'linkedin';
  // Check more-specific paths before generic "dropshipping"
  if (h.includes('usa-dropshipping')) return 'usa_dropshipping';
  if (h.includes('dropshipping-uae') || h.includes('dropshipping')) return 'dropshipping';
  if (h.includes('zambeel-360') || h.includes('zambeel360')) return 'zambeel_360';
  if (h.includes('warehousing') || h.includes('3pl')) return 'warehousing_3pl';
  if (h.includes('amazon-usa') || h.includes('amazon')) return 'amazon_usa';
  if (h.includes('partner-agencies') || h.includes('partner')) return 'partner_agencies';
  if (h.includes('learn-ecommerce') || h.includes('learn')) return 'learn_ecommerce';
  if (h.includes('#pricing')) return 'pricing_anchor';
  if (h === '/' || h.endsWith('/ar') || /\/(en)?\/?$/.test(h)) return 'home';
  return 'other';
}

/** Every navbar link click (desktop + mobile), including WhatsApp / portal / social. */
export function trackNavClick({ item, href, area = 'desktop', link_type = 'internal', nav_key }) {
  track('navbar_clicked', {
    item,
    href,
    area,
    link_type,
    nav_key: nav_key || navKeyFromHref(href),
  });
}

export function trackLanguageSwitch({ from, to }) {
  track('language_switched', { from_language: from, to_language: to });
}

export function trackButtonClick({ name, href, page, location }) {
  track('button_clicked', {
    button_name: name,
    href: href || undefined,
    page: page || undefined,
    location: location || undefined,
  });
}

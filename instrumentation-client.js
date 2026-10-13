import posthog from 'posthog-js';

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function isAdminPath(path = typeof window !== 'undefined' ? window.location?.pathname : '') {
  return String(path || '').startsWith('/admin');
}

let posthogReady = false;
let navigationWatchInstalled = false;

function applyAdminGate() {
  if (!posthogReady || typeof window === 'undefined') return;
  try {
    if (isAdminPath()) {
      // Fully pause analytics on admin — no pageviews, no replay, no reject warnings
      posthog.set_config({
        disable_session_recording: true,
        capture_pageview: false,
        capture_pageleave: false,
        autocapture: false,
      });
      posthog.stopSessionRecording?.();
    } else {
      posthog.set_config({
        disable_session_recording: false,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      });
      posthog.startSessionRecording?.();
    }
  } catch {
    // ignore
  }
}

function watchSpaNavigations() {
  if (typeof window === 'undefined' || navigationWatchInstalled) return;
  navigationWatchInstalled = true;

  const notify = () => {
    setTimeout(() => {
      if (!posthogReady && !isAdminPath()) {
        initPosthog();
      } else {
        applyAdminGate();
      }
    }, 0);
  };

  window.addEventListener('popstate', notify);

  const wrap = (method) => {
    const original = history[method];
    if (typeof original !== 'function') return;
    history[method] = function patchedHistoryMethod(...args) {
      const result = original.apply(this, args);
      notify();
      return result;
    };
  };

  wrap('pushState');
  wrap('replaceState');
}

function initPosthog() {
  if (posthogReady || !projectToken || !host) return;
  if (typeof window !== 'undefined' && isAdminPath()) return;

  posthog.init(projectToken, {
    api_host: host,
    defaults: '2026-01-30',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
    loaded: () => {
      posthogReady = true;
      applyAdminGate();
    },
    // Belt-and-suspenders if an admin event is ever queued
    before_send: (event) => {
      try {
        if (typeof window !== 'undefined' && isAdminPath()) return null;
        const path = event?.properties?.$pathname || '';
        const url = event?.properties?.$current_url || '';
        if (String(path).startsWith('/admin') || String(url).includes('/admin')) {
          return null;
        }
      } catch {
        // keep
      }
      return event;
    },
  });

  posthogReady = true;
  applyAdminGate();
}

if (!projectToken || !host) {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      `NEXT_PUBLIC_POSTHOG_${projectToken ? 'HOST' : 'PROJECT_TOKEN'} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_${projectToken ? 'HOST' : 'PROJECT_TOKEN'} is configured`
    );
  }
} else if (typeof window !== 'undefined') {
  watchSpaNavigations();
  // Skip PostHog entirely when the first paint is an admin page
  if (!isAdminPath()) {
    initPosthog();
  }
}

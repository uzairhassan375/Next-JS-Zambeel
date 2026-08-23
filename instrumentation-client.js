import posthog from 'posthog-js';

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!projectToken || !host) {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      `NEXT_PUBLIC_POSTHOG_${projectToken ? 'HOST' : 'PROJECT_TOKEN'} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_${projectToken ? 'HOST' : 'PROJECT_TOKEN'} is configured`
    );
  }
} else {
  posthog.init(projectToken, {
    api_host: host,
    defaults: '2026-01-30',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
    // Website analytics only — drop all admin-panel events
    before_send: (event) => {
      try {
        const path =
          (typeof window !== 'undefined' && window.location?.pathname) ||
          event?.properties?.$pathname ||
          '';
        const url = event?.properties?.$current_url || '';
        if (String(path).startsWith('/admin') || String(url).includes('/admin')) {
          return null;
        }
      } catch {
        // keep event if filter fails
      }
      return event;
    },
  });
}

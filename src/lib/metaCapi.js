import 'server-only';

/**
 * Send a PageView to Meta Conversions API.
 * Uses the same event_id as the browser Pixel for deduplication.
 */
export async function sendMetaPageView({
  eventId,
  eventSourceUrl,
  clientIpAddress,
  clientUserAgent,
  fbp,
  fbc,
}) {
  const pixelId =
    process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
  const accessToken = process.env.META_CAPI_TOKEN || '';
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE || '';

  if (!pixelId || !accessToken || !eventId) {
    return { ok: false, skipped: true, reason: 'missing_config_or_event_id' };
  }

  const userData = {};
  if (clientIpAddress) userData.client_ip_address = clientIpAddress;
  if (clientUserAgent) userData.client_user_agent = clientUserAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const body = {
    data: [
      {
        event_name: 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        event_id: String(eventId),
        event_source_url: eventSourceUrl || undefined,
        action_source: 'website',
        user_data: userData,
      },
    ],
  };

  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${encodeURIComponent(pixelId)}/events`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      // Avoid hanging the render if Meta is slow
      signal: AbortSignal.timeout(8000),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[meta-capi] PageView failed', res.status, json);
      return { ok: false, status: res.status, json };
    }
    return { ok: true, json };
  } catch (error) {
    console.error('[meta-capi] PageView error', error?.message || error);
    return { ok: false, error: String(error?.message || error) };
  }
}

/** Best-effort client IP from Next.js request headers. */
export function getClientIpFromHeaders(headersList) {
  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || '';
  }
  return (
    headersList.get('x-real-ip') ||
    headersList.get('cf-connecting-ip') ||
    headersList.get('true-client-ip') ||
    ''
  );
}

/** Build absolute page URL for event_source_url. */
export function getEventSourceUrlFromHeaders(headersList) {
  const explicit = headersList.get('x-event-source-url');
  if (explicit) return explicit;

  const host =
    headersList.get('x-forwarded-host') ||
    headersList.get('host') ||
    'www.myzambeel.com';
  const proto = headersList.get('x-forwarded-proto') || 'https';
  const path = headersList.get('x-pathname') || '/';
  return `${proto}://${host}${path}`;
}

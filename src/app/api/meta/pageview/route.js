import { NextResponse } from 'next/server';
import {
  getClientIpFromHeaders,
  sendMetaPageView,
} from '../../../../lib/metaCapi';

export const dynamic = 'force-dynamic';

/**
 * Client-side navigations call this so CAPI PageView uses the same event_id
 * as fbq('track', 'PageView', {}, { eventID }).
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const eventId = String(body.eventId || '').trim();
    const eventSourceUrl = String(body.eventSourceUrl || '').trim();

    if (!eventId) {
      return NextResponse.json({ error: 'eventId required' }, { status: 400 });
    }

    // Don't track admin panel
    try {
      const url = new URL(eventSourceUrl || 'https://www.myzambeel.com/');
      if (url.pathname.startsWith('/admin')) {
        return NextResponse.json({ ok: true, skipped: true });
      }
    } catch {
      // ignore bad URL
    }

    const headersList = request.headers;
    const result = await sendMetaPageView({
      eventId,
      eventSourceUrl,
      clientIpAddress: getClientIpFromHeaders(headersList),
      clientUserAgent: headersList.get('user-agent') || '',
      fbp: body.fbp || undefined,
      fbc: body.fbc || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[api/meta/pageview]', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

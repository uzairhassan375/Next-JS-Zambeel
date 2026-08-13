import { NextResponse } from 'next/server';
import { getCachedHomepageBlogSelection } from '../../../lib/blog';
import { PUBLIC_JSON_CACHE_HEADERS } from '../../../lib/contentCache';

export const revalidate = 60;

// Public: the blogs the homepage shows, already split per viewport.
export async function GET() {
  try {
    const selection = await getCachedHomepageBlogSelection();
    return NextResponse.json(selection, { headers: PUBLIC_JSON_CACHE_HEADERS });
  } catch (e) {
    console.error('GET /api/homepage-blogs', e);
    return NextResponse.json({ error: 'Failed to fetch homepage blogs' }, { status: 500 });
  }
}

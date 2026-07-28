import { NextResponse } from 'next/server';
import { getHomepageBlogSelection } from '../../../lib/blog';

export const dynamic = 'force-dynamic';

// Public: the blogs the homepage shows, already split per viewport.
export async function GET() {
  try {
    const selection = await getHomepageBlogSelection();
    return NextResponse.json(selection);
  } catch (e) {
    console.error('GET /api/homepage-blogs', e);
    return NextResponse.json({ error: 'Failed to fetch homepage blogs' }, { status: 500 });
  }
}

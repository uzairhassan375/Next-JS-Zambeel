import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/adminAuth';
import Blog from '../../../../models/Blog';
import HomepageBlogSelection from '../../../../models/HomepageBlogSelection';
import { HOMEPAGE_BLOGS_CACHE_TAG } from '../../../../lib/contentCache';
import {
  HOMEPAGE_MOBILE_LIMIT,
  HOMEPAGE_SELECTION_KEY,
  HOMEPAGE_WEB_LIMIT,
  normalizeSlugList,
} from '../../../../lib/homepageBlogs';

export const dynamic = 'force-dynamic';

// Admin: current selection plus the published blogs available to pick from.
export async function GET() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const [selection, blogs] = await Promise.all([
      HomepageBlogSelection.findOne({ key: HOMEPAGE_SELECTION_KEY }).lean(),
      Blog.find({ status: { $ne: 'draft' } })
        .select('slug titleEn image sortOrder createdAt')
        .sort({ sortOrder: 1, createdAt: -1 })
        .lean(),
    ]);
    const available = blogs.map((b) => ({
      slug: b.slug,
      titleEn: b.titleEn || b.slug,
      // Base64 thumbnails would bloat this payload; the admin list shows a placeholder instead.
      image: typeof b.image === 'string' && b.image.startsWith('data:') ? '' : b.image || '',
    }));
    const availableSlugs = new Set(available.map((b) => b.slug));
    return NextResponse.json({
      webSlugs: normalizeSlugList(selection?.webSlugs, HOMEPAGE_WEB_LIMIT).filter((s) => availableSlugs.has(s)),
      mobileSlugs: normalizeSlugList(selection?.mobileSlugs, HOMEPAGE_MOBILE_LIMIT).filter((s) => availableSlugs.has(s)),
      webLimit: HOMEPAGE_WEB_LIMIT,
      mobileLimit: HOMEPAGE_MOBILE_LIMIT,
      blogs: available,
    });
  } catch (e) {
    console.error('GET /api/admin/homepage-blogs', e);
    return NextResponse.json({ error: 'Failed to fetch homepage blog selection' }, { status: 500 });
  }
}

export async function PUT(request) {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const [, body] = await Promise.all([connectDB(), request.json()]);
    const webSlugs = normalizeSlugList(body?.webSlugs, HOMEPAGE_WEB_LIMIT);
    const mobileSlugs = normalizeSlugList(body?.mobileSlugs, HOMEPAGE_MOBILE_LIMIT);

    // Never persist a slug that no longer resolves to a published blog.
    const referenced = [...new Set([...webSlugs, ...mobileSlugs])];
    const existing = referenced.length
      ? await Blog.find({ slug: { $in: referenced }, status: { $ne: 'draft' } }).select('slug').lean()
      : [];
    const validSlugs = new Set(existing.map((b) => b.slug));
    const invalid = referenced.filter((slug) => !validSlugs.has(slug));
    if (invalid.length) {
      return NextResponse.json(
        { error: `Unknown or unpublished blog(s): ${invalid.join(', ')}` },
        { status: 400 }
      );
    }

    await HomepageBlogSelection.findOneAndUpdate(
      { key: HOMEPAGE_SELECTION_KEY },
      { key: HOMEPAGE_SELECTION_KEY, webSlugs, mobileSlugs },
      { upsert: true, new: true }
    );
    revalidateTag(HOMEPAGE_BLOGS_CACHE_TAG);
    return NextResponse.json({ ok: true, webSlugs, mobileSlugs });
  } catch (e) {
    console.error('PUT /api/admin/homepage-blogs', e);
    return NextResponse.json({ error: 'Failed to save homepage blog selection' }, { status: 500 });
  }
}

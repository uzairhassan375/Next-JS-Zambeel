import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Blog from '../../../models/Blog';
import { getAdminSession } from '../../../lib/adminAuth';
import { blogsForResponse, blogForResponse } from '../../../lib/blogResponse';

export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB

// Validate base64 image size (approximate - base64 is ~33% larger than binary)
function validateBase64ImageSize(base64String) {
  if (!base64String || !base64String.startsWith('data:image/')) {
    return { valid: false, error: 'Invalid image format' };
  }
  // Base64 string length approximation: actual size ≈ (base64Length * 3) / 4
  const base64Length = base64String.length - (base64String.indexOf(',') + 1);
  const estimatedSize = (base64Length * 3) / 4;
  if (estimatedSize > MAX_IMAGE_SIZE) {
    return { valid: false, error: 'Image must be 3MB or less' };
  }
  return { valid: true };
}

export async function GET(request) {
  try {
    await connectDB();
    // Check if this is an admin request (for admin dashboard)
    const { searchParams } = new URL(request.url);
    const isAdminList = searchParams.get('admin') === 'true';
    
    if (isAdminList) {
      // For admin list: only fetch minimal fields needed for the table
      // Exclude large content fields (contentEn, contentAr) to dramatically improve performance
      // Only fetch: slug, titleEn, image, createdAt, updatedAt
      const blogs = await Blog.find({})
        .select('slug titleEn image createdAt updatedAt')
        .sort({ createdAt: -1 })
        .lean();
      return NextResponse.json(blogsForResponse(blogs));
    } else {
      // For public blog listing: fetch title, description, image (no content)
      // Optional ?limit=N for homepage / faster first load
      const limitParam = searchParams.get('limit');
      const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10) || 0), 100) : 0;
      const query = Blog.find({})
        .select('slug titleEn titleAr descriptionEn descriptionAr image createdAt updatedAt')
        .sort({ createdAt: -1 });
      if (limit > 0) query.limit(limit);
      const blogs = await query.lean();
      return NextResponse.json(blogsForResponse(blogs));
    }
  } catch (e) {
    console.error('GET /api/blogs', e);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const { slug, titleEn, titleAr, descriptionEn, descriptionAr, metaTitleEn, metaTitleAr, metaDescriptionEn, metaDescriptionAr, image, contentEn, contentAr } = body;
    if (!slug || !titleEn) {
      return NextResponse.json({ error: 'slug and titleEn are required' }, { status: 400 });
    }
    const normalizedSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
    const existing = await Blog.findOne({ slug: normalizedSlug });
    if (existing) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 });
    }
    
    // Validate base64 image if provided
    if (image && image.startsWith('data:image/')) {
      const validation = validateBase64ImageSize(image);
      if (!validation.valid) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
    }
    
    const doc = {
      slug: normalizedSlug,
      titleEn: titleEn || '',
      titleAr: titleAr || '',
      descriptionEn: descriptionEn || '',
      descriptionAr: descriptionAr || '',
      metaTitleEn: metaTitleEn || '',
      metaTitleAr: metaTitleAr || '',
      metaDescriptionEn: metaDescriptionEn || '',
      metaDescriptionAr: metaDescriptionAr || '',
      image: image || '', // Store base64 string directly
      contentEn: contentEn || '',
      contentAr: contentAr || '',
    };
    
    const blog = await Blog.create(doc);
    return NextResponse.json(blogForResponse(blog.toObject ? blog.toObject() : blog));
  } catch (e) {
    console.error('POST /api/blogs', e);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

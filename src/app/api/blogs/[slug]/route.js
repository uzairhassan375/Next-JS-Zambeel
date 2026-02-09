import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Blog from '../../../../models/Blog';
import { getAdminSession } from '../../../../lib/adminAuth';
import { blogForResponse } from '../../../../lib/blogResponse';

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

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    // Explicitly exclude imageFile field to avoid Buffer serialization issues
    const blog = await Blog.findOne({ slug }).select('-imageFile').lean();
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blogForResponse(blog), {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
      },
    });
  } catch (e) {
    console.error('GET /api/blogs/[slug]', e);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { slug } = await params;
    await connectDB();
    const body = await request.json();
    const { titleEn, titleAr, descriptionEn, descriptionAr, image, contentEn, contentAr } = body;
    const $set = {
      ...(titleEn != null && { titleEn }),
      ...(titleAr != null && { titleAr }),
      ...(descriptionEn != null && { descriptionEn }),
      ...(descriptionAr != null && { descriptionAr }),
      ...(contentEn != null && { contentEn }),
      ...(contentAr != null && { contentAr }),
    };
    
    // Handle image updates - image is now base64 string
    if (image !== undefined) {
      if (image && image.startsWith('data:image/')) {
        // Validate base64 image size
        const validation = validateBase64ImageSize(image);
        if (!validation.valid) {
          return NextResponse.json({ error: validation.error }, { status: 400 });
        }
      }
      $set.image = image || '';
    }
    // If image is not provided, keep existing image (don't modify image field)
    
    // Explicitly exclude imageFile field and also unset it if it exists
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $set, $unset: { imageFile: 1 } },
      { new: true }
    ).select('-imageFile').lean();
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blogForResponse(blog));
  } catch (e) {
    console.error('PUT /api/blogs/[slug]', e);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { slug } = await params;
    await connectDB();
    const blog = await Blog.findOneAndDelete({ slug }).lean();
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ deleted: true });
  } catch (e) {
    console.error('DELETE /api/blogs/[slug]', e);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}

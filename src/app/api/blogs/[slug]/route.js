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

function normalizeStatus(status) {
  return status === 'draft' ? 'draft' : 'published';
}

function normalizeSortOrder(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const wantsAdmin = searchParams.get('admin') === 'true';
    const isAdmin = wantsAdmin ? await getAdminSession() : false;
    await connectDB();
    // Explicitly exclude imageFile field to avoid Buffer serialization issues
    // Make sure to include meta fields in the response
    const query = { slug };
    if (!isAdmin) {
      query.status = { $ne: 'draft' };
    }
    const blog = await Blog.findOne(query).select('-imageFile').lean();
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    
    // Ensure meta fields exist (for old blogs that might not have them)
    const blogWithMeta = {
      ...blog,
      metaTitleEn: blog.metaTitleEn || '',
      metaTitleAr: blog.metaTitleAr || '',
      metaDescriptionEn: blog.metaDescriptionEn || '',
      metaDescriptionAr: blog.metaDescriptionAr || '',
    };

    return NextResponse.json(blogForResponse(blogWithMeta), {
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
    const { slug: currentSlug } = await params;
    const [_, body] = await Promise.all([connectDB(), request.json()]);
    const {
      slug: newSlug,
      titleEn,
      titleAr,
      descriptionEn,
      descriptionAr,
      metaTitleEn,
      metaTitleAr,
      metaDescriptionEn,
      metaDescriptionAr,
      image,
      imageAr,
      contentEn,
      contentAr,
      status,
      sortOrder,
    } = body;

    // Normalize new slug
    const normalizedNewSlug = newSlug ? newSlug.trim().toLowerCase().replace(/\s+/g, '-') : currentSlug;
    
    // Check if slug is being changed
    if (normalizedNewSlug !== currentSlug) {
      // Check if new slug already exists
      const existing = await Blog.findOne({ slug: normalizedNewSlug });
      if (existing && existing.slug !== currentSlug) {
        return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 });
      }
    }
    
    // Build the update object - ALWAYS include meta fields
    const $set = {};
    
    // Set regular fields if provided
    if (titleEn != null) $set.titleEn = titleEn;
    if (titleAr != null) $set.titleAr = titleAr;
    if (descriptionEn != null) $set.descriptionEn = descriptionEn;
    if (descriptionAr != null) $set.descriptionAr = descriptionAr;
    if (contentEn != null) $set.contentEn = contentEn;
    if (contentAr != null) $set.contentAr = contentAr;
    if (status != null) $set.status = normalizeStatus(status);
    if (sortOrder != null) $set.sortOrder = normalizeSortOrder(sortOrder);
    
    // ALWAYS set meta fields - explicitly convert to string, never skip them
    // Even if empty, we want to save them to the database
    $set.metaTitleEn = String(metaTitleEn ?? '');
    $set.metaTitleAr = String(metaTitleAr ?? '');
    $set.metaDescriptionEn = String(metaDescriptionEn ?? '');
    $set.metaDescriptionAr = String(metaDescriptionAr ?? '');

    // Handle slug update if changed
    if (normalizedNewSlug !== currentSlug) {
      $set.slug = normalizedNewSlug;
    }
    
    // Handle image updates - image fields are base64 strings or external URLs
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

    if (imageAr !== undefined) {
      if (imageAr && imageAr.startsWith('data:image/')) {
        const validationAr = validateBase64ImageSize(imageAr);
        if (!validationAr.valid) {
          return NextResponse.json({ error: validationAr.error }, { status: 400 });
        }
      }
      $set.imageAr = imageAr || '';
    }
    // If imageAr is not provided, keep existing Arabic image (don't modify imageAr field)

    // Explicitly exclude imageFile field and also unset it if it exists
    // Use runValidators to ensure schema validation runs
    // Use setDefaultsOnInsert to ensure defaults are applied
    const updateResult = await Blog.findOneAndUpdate(
      { slug: currentSlug },
      { 
        $set: $set,
        $unset: { imageFile: 1 }
      },
      { 
        new: true, 
        runValidators: true, 
        upsert: false,
        setDefaultsOnInsert: true,
        strict: false
      }
    );
    
    if (!updateResult) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    
    // Convert to plain object
    const blog = updateResult.toObject ? updateResult.toObject() : updateResult;
    delete blog.imageFile;

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

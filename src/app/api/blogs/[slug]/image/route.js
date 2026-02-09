import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Blog from '../../../../../models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const blog = await Blog.findOne({ slug }).select('imageFile').lean();
    if (!blog || !blog.imageFile || !blog.imageFile.data) {
      return new NextResponse(null, { status: 404 });
    }
    const { data, contentType } = blog.imageFile;
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    console.error('GET /api/blogs/[slug]/image', e);
    return new NextResponse(null, { status: 500 });
  }
}

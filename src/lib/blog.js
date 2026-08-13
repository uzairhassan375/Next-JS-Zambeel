import 'server-only';
import { unstable_cache } from 'next/cache';
import { connectDB } from './db';
import Blog from '../models/Blog';
import HomepageBlogSelection from '../models/HomepageBlogSelection';
import { blogForResponse, blogsForResponse } from './blogResponse';
import {
  HOMEPAGE_MOBILE_LIMIT,
  HOMEPAGE_SELECTION_KEY,
  HOMEPAGE_WEB_LIMIT,
  pickSelectedBlogs,
} from './homepageBlogs';
import { CONTENT_CACHE_SECONDS, HOMEPAGE_BLOGS_CACHE_TAG } from './contentCache';

/**
 * Convert Mongoose document to plain JSON-serializable object.
 * Converts _id (ObjectId) to string and Date objects to ISO strings.
 * Image is stored as base64 string directly in image field.
 * Optimized for performance with minimal object creation.
 */
function serializeBlog(doc) {
  if (!doc) return null;
  const obj = { ...doc };
  // Convert _id ObjectId to string
  if (obj._id && typeof obj._id.toString === 'function') {
    obj._id = obj._id.toString();
  } else if (obj._id && obj._id._id) {
    // Handle nested ObjectId structure
    obj._id = String(obj._id._id || obj._id);
  }
  // Convert Date objects to ISO strings
  if (obj.createdAt instanceof Date) {
    obj.createdAt = obj.createdAt.toISOString();
  }
  if (obj.updatedAt instanceof Date) {
    obj.updatedAt = obj.updatedAt.toISOString();
  }
  // Image is now stored as base64 string directly in image field, no conversion needed
  // Remove imageFile (old Buffer field) and __v (non-serializable)
  delete obj.imageFile;
  delete obj.__v;
  return obj;
}

/**
 * Fetch all blogs for listing. Server-only; use in Server Components.
 * Only fetches fields needed for listing (excludes content to improve performance).
 * @returns {Promise<Array>} Blogs sorted by createdAt desc, with image as base64 string.
 */
export async function getBlogs() {
  await connectDB();
  // Only fetch fields needed for listing page - exclude large content fields
  const blogs = await Blog.find({ status: { $ne: 'draft' } })
    .select('slug titleEn titleAr descriptionEn descriptionAr image imageAr sortOrder createdAt updatedAt')
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
  return blogs.map(serializeBlog);
}

/**
 * Fetch first N blogs for homepage above-the-fold. Server-only.
 * Use in Server Components to avoid client fetch for first view.
 * @param {number} limit - Max number of blogs (default 6)
 * @returns {Promise<Array>} Blogs with minimal fields, sorted by createdAt desc.
 */
export async function getBlogsForHomepage(limit = 6) {
  await connectDB();
  const blogs = await Blog.find({ status: { $ne: 'draft' } })
    .select('slug titleEn titleAr descriptionEn descriptionAr image imageAr sortOrder createdAt updatedAt')
    .sort({ sortOrder: 1, createdAt: -1 })
    .limit(limit)
    .lean();
  return blogs.map(serializeBlog);
}

/**
 * Resolve the blogs the homepage should show. Server-only.
 * Admins pick these in /admin/blogs/homepage; when a list is empty we fall
 * back to the most recent blogs so the homepage is never blank.
 * @returns {Promise<{web: Array, mobile: Array}>}
 */
export async function getHomepageBlogSelection() {
  await connectDB();
  const [selection, blogs] = await Promise.all([
    HomepageBlogSelection.findOne({ key: HOMEPAGE_SELECTION_KEY }).lean(),
    Blog.find({ status: { $ne: 'draft' } })
      .select('slug titleEn titleAr descriptionEn descriptionAr image imageAr sortOrder createdAt updatedAt')
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean(),
  ]);
  const serialized = blogs.map(serializeBlog);
  return {
    web: pickSelectedBlogs(serialized, selection?.webSlugs, HOMEPAGE_WEB_LIMIT),
    mobile: pickSelectedBlogs(serialized, selection?.mobileSlugs, HOMEPAGE_MOBILE_LIMIT),
  };
}

/** Cached homepage blog lists — 60s server-side revalidation. */
export async function getCachedHomepageBlogSelection() {
  return unstable_cache(
    getHomepageBlogSelection,
    ['homepage-blog-selection'],
    { revalidate: CONTENT_CACHE_SECONDS, tags: [HOMEPAGE_BLOGS_CACHE_TAG] },
  )();
}

/**
 * Fetch a single blog by slug. Server-only; use in Server Components.
 * @param {string} slug
 * @returns {Promise<Object|null>} Blog or null if not found.
 */
export async function getBlogBySlug(slug) {
  if (!slug) return null;
  await connectDB();
  const blog = await Blog.findOne({ slug, status: { $ne: 'draft' } }).lean();
  if (!blog) return null;
  return serializeBlog(blog);
}

/**
 * Return all blog slugs for generateStaticParams. Server-only.
 * @returns {Promise<Array<{ slug: string }>>}
 */
export async function getAllBlogSlugs() {
  await connectDB();
  const docs = await Blog.find({ status: { $ne: 'draft' } }).select('slug').lean();
  return docs.map((d) => ({ slug: String(d.slug || d._id?.toString() || '') }));
}

/**
 * Return blog slugs with their last-modified dates, for sitemap <lastmod>.
 * Kept separate from getAllBlogSlugs() because generateStaticParams() needs
 * objects whose keys match the route params exactly.
 * @returns {Promise<Array<{ slug: string, lastModified: string|null }>>}
 */
export async function getAllBlogSlugsWithDates() {
  await connectDB();
  const docs = await Blog.find({ status: { $ne: 'draft' } })
    .select('slug updatedAt createdAt')
    .lean();
  return docs.map((d) => {
    const modified = d.updatedAt || d.createdAt || null;
    return {
      slug: String(d.slug || d._id?.toString() || ''),
      lastModified: modified instanceof Date ? modified.toISOString() : modified || null,
    };
  });
}

/**
 * Transform a blog document for API response.
 * Image is now stored as base64 string directly in the image field.
 * Removes old imageFile field if it exists (from legacy documents).
 */
export function blogForResponse(blog) {
  if (!blog) return blog;
  const b = { ...blog };
  // Remove imageFile if it exists (legacy field with Buffer data)
  delete b.imageFile;
  // Image is already stored as base64 string in image field, no transformation needed
  return b;
}

export function blogsForResponse(blogs) {
  return Array.isArray(blogs) ? blogs.map(blogForResponse) : blogs;
}

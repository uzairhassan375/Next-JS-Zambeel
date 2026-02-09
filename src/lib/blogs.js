/**
 * Fetches blog list from API. Use in client components.
 * Returns array of blogs (from DB) or null on failure.
 */
export async function fetchBlogList() {
  try {
    const res = await fetch('/api/blogs', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

/**
 * Fetches a single blog by slug from API.
 * Uses cache-busting so the public view always gets the latest saved content.
 */
export async function fetchBlogBySlug(slug) {
  try {
    const url = `/api/blogs/${encodeURIComponent(slug)}?_t=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store', headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

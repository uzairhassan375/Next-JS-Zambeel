'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function truncateMiddle(str, maxLen = 50) {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  const half = Math.floor((maxLen - 3) / 2);
  return `${str.slice(0, half)}...${str.slice(str.length - half)}`;
}

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reordering, setReordering] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState('');

  function handleCopyUrl(url, slug) {
    if (!url) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug((c) => (c === slug ? '' : c)), 1500);
  }

  useEffect(() => {
    // Add ?admin=true to fetch only fields needed for admin list (faster loading)
    fetch('/api/blogs?admin=true', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else setError('Failed to load blogs');
      })
      .catch(() => setError('Failed to load blogs'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(slug, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    } else {
      alert('Failed to delete');
    }
  }

  async function updateBlogOrder(slug, sortOrder) {
    const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sortOrder }),
    });
    if (!res.ok) {
      throw new Error('Failed to update order');
    }
  }

  function withSequentialOrder(items) {
    return items.map((item, index) => ({ ...item, sortOrder: index }));
  }

  async function moveBlog(index, direction) {
    if (reordering) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blogs.length) return;

    const previousBlogs = blogs;

    const reordered = [...blogs];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    const nextBlogs = withSequentialOrder(reordered);
    setBlogs(nextBlogs);

    setReordering(true);
    try {
      await Promise.all(nextBlogs.map((blog, order) => updateBlogOrder(blog.slug, order)));
    } catch {
      setBlogs(previousBlogs);
      alert('Failed to change blog order');
    } finally {
      setReordering(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading blogs...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (blogs.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        <p>No blogs yet. Create one or run &quot;Seed from existing blogs&quot; to import current hardcoded blogs.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Image</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Title (EN)</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Slug</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Image URL</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Order</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.slug} className="border-b border-gray-100 hover:bg-gray-50/50">
              <td className="py-3 px-4">
                <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.titleEn || blog.slug}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-gray-800">{blog.titleEn || '—'}</td>
              <td className="py-3 px-4 text-gray-600 font-mono text-sm">{blog.slug}</td>
              <td className="py-3 px-4 text-xs">
                {blog.image ? (
                  <div className="flex items-center gap-2 max-w-[260px]">
                    <span
                      className="font-mono text-gray-700 truncate"
                      title={blog.image}
                    >
                      {truncateMiddle(blog.image, 36)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(blog.image, blog.slug)}
                      className="px-2 py-0.5 border border-gray-300 rounded hover:bg-gray-100 text-gray-700 whitespace-nowrap"
                      title="Copy image URL"
                    >
                      {copiedSlug === blog.slug ? 'Copied!' : 'Copy'}
                    </button>
                    <a
                      href={blog.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1e3a8a] hover:underline whitespace-nowrap"
                      title="Open image in new tab"
                    >
                      Open
                    </a>
                  </div>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${blog.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  {blog.status === 'draft' ? 'Draft' : 'Published'}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-700">
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveBlog(index, 'up')}
                    disabled={reordering || index === 0}
                    className="w-7 h-7 rounded border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlog(index, 'down')}
                    disabled={reordering || index === blogs.length - 1}
                    className="w-7 h-7 rounded border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <span>{Number(blog.sortOrder) || 0}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                {blog.status === 'published' ? (
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1e3a8a] hover:underline mr-3"
                  >
                    View
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400 mr-3">Draft</span>
                )}
                <Link
                  href={`/admin/blogs/${blog.slug}/edit`}
                  className="text-sm text-[#1e3a8a] hover:underline mr-3"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(blog.slug, blog.titleEn)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

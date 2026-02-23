'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Add ?admin=true to fetch only fields needed for admin list (faster loading)
    fetch('/api/blogs?admin=true')
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
            <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.slug} className="border-b border-gray-100 hover:bg-gray-50/50">
              <td className="py-3 px-4">
                <div className="w-16 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">—</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-800">{blog.titleEn || '—'}</td>
              <td className="py-3 px-4 text-gray-600 font-mono text-sm">{blog.slug}</td>
              <td className="py-3 px-4 text-right">
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#1e3a8a] hover:underline mr-3"
                >
                  View
                </Link>
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

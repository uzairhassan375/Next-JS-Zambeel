'use client';

import { useEffect, useState } from 'react';
import AdminBlogForm from '../../AdminBlogForm';

export default function AdminBlogEditPage({ slug }) {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/blogs/${encodeURIComponent(slug)}?admin=true`, { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setInitialData)
      .catch(() => setError('Blog not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-6"><p className="text-gray-500">Loading...</p></div>;
  if (error) return <div className="p-6"><p className="text-red-600">{error}</p></div>;
  if (!initialData) return null;

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog</h1>
        <AdminBlogForm slug={slug} initialData={initialData} />
      </div>
    </div>
  );
}

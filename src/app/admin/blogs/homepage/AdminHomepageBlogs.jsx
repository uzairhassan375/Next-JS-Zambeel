'use client';

import { useEffect, useState } from 'react';

function SelectionList({ title, hint, limit, selected, blogsBySlug, onMove, onRemove }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span className={`text-sm font-medium ${selected.length === limit ? 'text-green-600' : 'text-gray-500'}`}>
          {selected.length} / {limit}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-4">{hint}</p>

      {selected.length === 0 ? (
        <p className="text-sm text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-lg p-4">
          Nothing selected — the homepage will fall back to the most recent blogs.
        </p>
      ) : (
        <ol className="space-y-2">
          {selected.map((slug, index) => (
            <li
              key={slug}
              className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-[#1e3a8a] text-white text-xs font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <span className="flex-1 min-w-0 truncate text-sm text-gray-800">
                {blogsBySlug[slug]?.titleEn || slug}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onMove(index, 'up')}
                  disabled={index === 0}
                  className="w-7 h-7 rounded border border-gray-200 text-gray-600 disabled:opacity-30 hover:bg-gray-50"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => onMove(index, 'down')}
                  disabled={index === selected.length - 1}
                  className="w-7 h-7 rounded border border-gray-200 text-gray-600 disabled:opacity-30 hover:bg-gray-50"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(slug)}
                  className="w-7 h-7 rounded border border-red-200 text-red-600 hover:bg-red-50"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function AdminHomepageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [webSlugs, setWebSlugs] = useState([]);
  const [mobileSlugs, setMobileSlugs] = useState([]);
  const [webLimit, setWebLimit] = useState(5);
  const [mobileLimit, setMobileLimit] = useState(2);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/homepage-blogs', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          return;
        }
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
        setWebSlugs(Array.isArray(data.webSlugs) ? data.webSlugs : []);
        setMobileSlugs(Array.isArray(data.mobileSlugs) ? data.mobileSlugs : []);
        if (data.webLimit) setWebLimit(data.webLimit);
        if (data.mobileLimit) setMobileLimit(data.mobileLimit);
      })
      .catch(() => setError('Failed to load homepage selection'))
      .finally(() => setLoading(false));
  }, []);

  const blogsBySlug = Object.fromEntries(blogs.map((b) => [b.slug, b]));

  function toggle(target, slug) {
    setSaved(false);
    const [list, setList, limit] =
      target === 'web' ? [webSlugs, setWebSlugs, webLimit] : [mobileSlugs, setMobileSlugs, mobileLimit];
    if (list.includes(slug)) {
      setList(list.filter((s) => s !== slug));
    } else {
      if (list.length >= limit) return;
      setList([...list, slug]);
    }
  }

  function move(target, index, direction) {
    setSaved(false);
    const [list, setList] = target === 'web' ? [webSlugs, setWebSlugs] : [mobileSlugs, setMobileSlugs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const next = [...list];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    setList(next);
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/admin/homepage-blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webSlugs, mobileSlugs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to save');
      setSaved(true);
    } catch (e) {
      setError(e.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="space-y-6">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SelectionList
          title="Web (desktop carousel)"
          hint="Shown in the “Why Zambeel?” carousel on desktop, in this order."
          limit={webLimit}
          selected={webSlugs}
          blogsBySlug={blogsBySlug}
          onMove={(i, d) => move('web', i, d)}
          onRemove={(slug) => toggle('web', slug)}
        />
        <SelectionList
          title="Mobile"
          hint="Shown stacked under “Why Zambeel?” on phones and small tablets."
          limit={mobileLimit}
          selected={mobileSlugs}
          blogsBySlug={blogsBySlug}
          onMove={(i, d) => move('mobile', i, d)}
          onRemove={(slug) => toggle('mobile', slug)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Blog</th>
              <th className="py-3 px-4 font-semibold text-gray-700 w-32">Web</th>
              <th className="py-3 px-4 font-semibold text-gray-700 w-32">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 px-4 text-center text-gray-500">
                  No published blogs yet.
                </td>
              </tr>
            )}
            {blogs.map((blog) => {
              const onWeb = webSlugs.includes(blog.slug);
              const onMobile = mobileSlugs.includes(blog.slug);
              const webFull = !onWeb && webSlugs.length >= webLimit;
              const mobileFull = !onMobile && mobileSlugs.length >= mobileLimit;
              return (
                <tr key={blog.slug} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-800">{blog.titleEn}</div>
                    <div className="text-xs text-gray-500">{blog.slug}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={onWeb}
                      disabled={webFull}
                      onChange={() => toggle('web', blog.slug)}
                      className="w-5 h-5 accent-[#1e3a8a] disabled:opacity-30"
                      title={webFull ? `Web selection is full (${webLimit})` : ''}
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={onMobile}
                      disabled={mobileFull}
                      onChange={() => toggle('mobile', blog.slug)}
                      className="w-5 h-5 accent-[#1e3a8a] disabled:opacity-30"
                      title={mobileFull ? `Mobile selection is full (${mobileLimit})` : ''}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e3a8a]/90 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save selection'}
        </button>
        {saved && <span className="text-green-600 text-sm">Saved — the homepage is updated.</span>}
      </div>
    </div>
  );
}

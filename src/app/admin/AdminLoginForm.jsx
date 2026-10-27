'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function formatRetryWait(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  if (s < 60) return `${s} second${s === 1 ? '' : 's'}`;
  const minutes = Math.floor(s / 60);
  const rem = s % 60;
  if (rem === 0) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  return `${minutes}m ${rem}s`;
}

export default function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [lockedUntil, setLockedUntil] = useState(0);
  const router = useRouter();
  const isLocked = lockedUntil > Date.now();

  useEffect(() => {
    fetch('/api/admin/me')
      .then((r) => r.ok)
      .then(setAlreadyLoggedIn)
      .catch(() => setAlreadyLoggedIn(false))
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!lockedUntil) return undefined;

    const tick = () => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(0);
        setError('');
        return;
      }
      setError(`Too many login attempts. Try again in ${formatRetryWait(remaining)}.`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLocked) return;
    setError('');
    setLockedUntil(0);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const retryHeader = Number(res.headers.get('Retry-After'));
        const retryAfter = Number(data.retryAfter) || (Number.isFinite(retryHeader) ? retryHeader : 0);
        if (res.status === 429 && retryAfter > 0) {
          setLockedUntil(Date.now() + retryAfter * 1000);
          setError(`Too many login attempts. Try again in ${formatRetryWait(retryAfter)}.`);
        } else {
          setError(data.error || 'Invalid password');
        }
        return;
      }
      // Use replace so back button doesn't return to login; then refresh to load dashboard
      router.replace('/admin/blogs');
      router.refresh();
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logout: true }),
    });
    setAlreadyLoggedIn(false);
    router.refresh();
  }

  if (checking) {
    return <p className="text-gray-500 text-sm">Checking...</p>;
  }

  if (alreadyLoggedIn) {
    return (
      <div className="space-y-4">
        <p className="text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          You are already logged in. Your session stays active for 24 hours on this browser.
        </p>
        <div className="flex gap-3">
          <a
            href="/admin/blogs"
            className="flex-1 bg-[#1e3a8a] text-white py-2 rounded-lg font-medium hover:bg-[#1e3a8a]/90 text-center inline-block"
          >
            Go to dashboard
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
          placeholder="Admin password"
          required
          autoComplete="current-password"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || isLocked}
        className="w-full bg-[#1e3a8a] text-white py-2 rounded-lg font-medium hover:bg-[#1e3a8a]/90 disabled:opacity-50"
      >
        {loading ? 'Signing in...' : isLocked ? 'Try again later' : 'Sign in'}
      </button>
    </form>
  );
}

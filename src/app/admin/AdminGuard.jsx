'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const isLoginPage = pathname === '/admin' || pathname === '/admin/login';

  useEffect(() => {
    fetch('/api/admin/me')
      .then((r) => r.ok)
      .then((ok) => {
        setAuthenticated(ok);
        setChecked(true);
      })
      .catch(() => {
        setAuthenticated(false);
        setChecked(true);
      });
  }, []);

  useEffect(() => {
    if (!checked) return;
    if (!isLoginPage && !authenticated) {
      router.replace('/admin');
    }
  }, [checked, authenticated, isLoginPage, router]);

  if (!checked && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  const navItems = [
    { href: '/admin/blogs', label: 'Blogs', icon: '📝' },
    { href: '/admin/blogs/new', label: 'New Blog', icon: '➕' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar: fixed height, scrollable nav, footer always visible */}
      <aside className="w-64 h-screen bg-[#1e3a8a] text-white flex flex-col shrink-0 overflow-hidden">
        <div className="p-5 border-b border-white/20 shrink-0">
          <Link href="/admin/blogs" className="text-xl font-bold tracking-tight">
            Zambeel Admin
          </Link>
          <p className="text-xs text-blue-200 mt-1">Content dashboard</p>
        </div>
        <nav className="p-3 flex-1 min-h-0 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
            Content
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin/blogs' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-3 border-t border-white/20 space-y-1 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span>🔗</span> View site
          </a>
          <button
            type="button"
            onClick={async () => {
              await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ logout: true }),
              });
              router.push('/admin');
              router.refresh();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-colors"
          >
            <span>🚪</span> Log out
          </button>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 min-h-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}

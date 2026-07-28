'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/admin/blogs', label: 'All blogs' },
  { href: '/admin/blogs/homepage', label: 'Homepage selection' },
];

export default function BlogsTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 border-b border-gray-200 mb-6">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              isActive
                ? 'border-[#1e3a8a] text-[#1e3a8a]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

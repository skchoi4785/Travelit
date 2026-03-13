/**
 * Navigation 컴포넌트 (Next.js 12 호환)
 * usePathname 대신 useRouter를 사용합니다.
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { href: '/plans', label: '내 계획' },
  { href: '/plans/new', label: '새 계획 만들기' },
];

interface NavigationProps {
  vertical?: boolean;
}

export default function Navigation({ vertical = false }: NavigationProps) {
  const { pathname } = useRouter();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav className={vertical ? 'flex flex-col gap-1' : 'flex flex-row gap-4'} aria-label="주 네비게이션">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <a className={[
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ].join(' ')} aria-current={isActive ? 'page' : undefined}>
              {item.label}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}

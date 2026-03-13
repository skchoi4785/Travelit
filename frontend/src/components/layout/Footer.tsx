/**
 * Footer 컴포넌트 (Next.js 12 호환)
 */

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xl font-bold text-white">Travelit</span>
            <span className="text-sm text-gray-500">AI와 함께하는 스마트한 여행 계획</span>
          </div>

          <nav className="flex gap-6 text-sm">
            <Link href="/"><a className="hover:text-white transition-colors">홈</a></Link>
            <Link href="/plans"><a className="hover:text-white transition-colors">내 계획</a></Link>
            <Link href="/login"><a className="hover:text-white transition-colors">로그인</a></Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
          © {currentYear} Travelit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

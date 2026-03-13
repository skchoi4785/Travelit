/**
 * Footer 컴포넌트
 * 사이트 하단에 표시되는 푸터입니다.
 * 서비스 정보와 링크를 포함합니다.
 */

import React from "react";
import Link from "next/link";

/** Footer 컴포넌트 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 로고와 슬로건 */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xl font-bold text-white">Travelit</span>
            <span className="text-sm text-gray-500">
              AI와 함께하는 스마트한 여행 계획
            </span>
          </div>

          {/* 링크 */}
          <nav className="flex gap-6 text-sm">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              홈
            </Link>
            <Link
              href="/plans"
              className="hover:text-white transition-colors"
            >
              내 계획
            </Link>
            <Link
              href="/login"
              className="hover:text-white transition-colors"
            >
              로그인
            </Link>
          </nav>
        </div>

        {/* 저작권 */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
          © {currentYear} Travelit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

"use client";

/**
 * Header 컴포넌트 (Next.js 12 호환)
 */

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, isLoading, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-teal-600">Travelit</span>
            </a>
          </Link>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-3">
            {isLoading ? (
              <div className="flex gap-3">
                <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
                <div className="w-24 h-9 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            ) : user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">
                  <span className="font-medium text-teal-700">{user.username}</span>님
                </span>
                <Link href="/plans">
                  <a className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    내 계획
                  </a>
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    로그인
                  </a>
                </Link>
                <Link href="/register">
                  <a className="px-3 py-1.5 text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                    회원가입
                  </a>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

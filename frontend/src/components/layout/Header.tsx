"use client";

/**
 * Header 컴포넌트
 * 로고("Travelit")와 로그인 상태에 따른 네비게이션을 표시합니다.
 * - 비로그인 상태: 로그인/회원가입 버튼
 * - 로그인 상태: 내 계획/로그아웃 버튼
 */

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/common/Button";

/** Header 컴포넌트 */
export default function Header() {
  const { user, isLoading, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* 비행기 아이콘 */}
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-ocean-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              Travelit
            </span>
          </Link>

          {/* 네비게이션 영역 */}
          <nav className="flex items-center gap-3">
            {/* 로딩 중일 때는 스켈레톤 표시 */}
            {isLoading ? (
              <div className="flex gap-3">
                <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
                <div className="w-24 h-9 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            ) : user ? (
              /* 로그인 상태: 내 계획 + 로그아웃 */
              <>
                {/* 사용자 환영 메시지 */}
                <span className="text-sm text-gray-600 hidden sm:block">
                  <span className="font-medium text-primary-700">{user.username}</span>님
                </span>
                <Link href="/plans">
                  <Button variant="outline" size="sm">
                    내 계획
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" onClick={logout}>
                  로그아웃
                </Button>
              </>
            ) : (
              /* 비로그인 상태: 로그인 + 회원가입 */
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

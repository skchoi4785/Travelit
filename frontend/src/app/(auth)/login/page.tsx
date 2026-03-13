/**
 * 로그인 페이지 (/login)
 * LoginForm 컴포넌트를 렌더링합니다.
 * 로그인 성공 시 /plans 페이지로 리다이렉트합니다.
 */

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "Travelit에 로그인하여 여행 계획을 관리하세요.",
};

/** 로그인 페이지 컴포넌트 */
export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md animate-fade-in">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          {/* 로고 링크 */}
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-ocean-600 rounded-xl flex items-center justify-center shadow-md">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              Travelit
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            로그인
          </h1>
          <p className="mt-2 text-gray-600">
            계정에 로그인하여 여행 계획을 관리하세요
          </p>
        </div>

        {/* 로그인 폼 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

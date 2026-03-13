/**
 * 회원가입 페이지 (/register)
 */

import React from 'react';
import Link from 'next/link';
import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <Link href="/">
            <a className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-teal-600">Travelit</span>
            </a>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="mt-2 text-gray-600">무료로 가입하고 AI 여행 플래너를 시작하세요</p>
        </div>

        {/* 회원가입 폼 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

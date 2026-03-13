/**
 * 여행 계획 목록 페이지 (/plans)
 * Sprint 1: 빈 상태 UI + Mock 데이터로 렌더링 확인
 */

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function PlansPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">내 여행 계획</h1>
          {user && (
            <p className="mt-1 text-gray-600">
              <span className="font-medium text-teal-700">{user.username}</span>님의 여행 계획 목록
            </p>
          )}
        </div>
        <Link href="/plans/new">
          <a className="hidden sm:inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 계획 만들기
          </a>
        </Link>
      </div>

      {/* 빈 상태 UI */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">첫 여행 계획을 만들어보세요!</h2>
          <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
            아직 만든 여행 계획이 없습니다.
            <br />
            AI가 맞춤형 여행 일정을 추천해드릴게요.
          </p>

          <Link href="/plans/new">
            <a className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              새 계획 만들기
            </a>
          </Link>
        </div>
      </div>

      {/* Sprint 2 예고 배너 */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-800">Sprint 2 개발 예정</p>
          <p className="text-sm text-blue-600 mt-0.5">여행 계획 생성 및 AI 추천 기능은 Sprint 2에서 구현될 예정입니다.</p>
        </div>
      </div>
    </div>
  );
}

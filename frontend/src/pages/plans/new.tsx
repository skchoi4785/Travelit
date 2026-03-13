/**
 * 새 여행 계획 페이지 (/plans/new)
 * Sprint 2에서 LLM 기반 여행지 추천 위자드가 구현됩니다.
 */

import React from 'react';
import Link from 'next/link';

export default function NewPlanPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      {/* 아이콘 */}
      <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">새 여행 계획 만들기</h1>
      <p className="text-gray-500 mb-2">
        이 기능은 <span className="font-semibold text-teal-700">Sprint 2</span>에서 구현될 예정입니다.
      </p>
      <p className="text-sm text-gray-400 mb-8">
        성격/선호도 기반 AI 여행지 추천 위자드가 추가될 예정입니다.
      </p>

      {/* 예정 기능 목록 */}
      <div className="bg-gray-50 rounded-xl p-6 text-left mb-8 space-y-3">
        <p className="text-sm font-semibold text-gray-700 mb-3">Sprint 2 구현 예정 기능</p>
        {[
          'Step 1: 여행 기본 정보 입력 (기간, 동반자 유형)',
          'Step 2: 여행 스타일 선호도 입력 (카드 선택 UI)',
          'Step 3: AI 여행지 추천 결과 (3~5개 카드)',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-5 h-5 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {i + 1}
            </span>
            {item}
          </div>
        ))}
      </div>

      <Link href="/plans">
        <a className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          내 여행 계획 목록으로 돌아가기
        </a>
      </Link>
    </div>
  );
}

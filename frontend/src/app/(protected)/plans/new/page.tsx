/**
 * 새 여행 계획 생성 페이지 (/plans/new)
 * Sprint 1에서는 빈 상태 UI를 표시합니다.
 * 실제 계획 생성 기능은 Sprint 2에서 구현됩니다.
 */

"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

/** 새 여행 계획 페이지 컴포넌트 */
export default function NewPlanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 페이지 헤더 */}
      <div className="flex items-center gap-4 mb-8">
        {/* 뒤로 가기 버튼 */}
        <Link
          href="/plans"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          내 계획으로 돌아가기
        </Link>
      </div>

      {/* 메인 카드 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          {/* 아이콘 */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-ocean-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>

          {/* 타이틀 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            새 여행 계획 만들기
          </h1>

          {/* Sprint 2 예고 메시지 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 mb-8 max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-5 h-5 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold text-amber-800 text-sm">Sprint 2에서 구현 예정</span>
            </div>
            <p className="text-amber-700 text-sm leading-relaxed">
              AI 기반 여행 계획 생성 기능은 Sprint 2에서 구현될 예정입니다.
              <br />
              조금만 기다려주세요!
            </p>
          </div>

          {/* Sprint 2 기능 미리보기 */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl w-full mb-8">
            {[
              { icon: "🗺️", title: "목적지 설정", desc: "여행지와 기간 입력" },
              { icon: "🤖", title: "AI 일정 생성", desc: "최적 코스 자동 추천" },
              { icon: "✏️", title: "계획 수정", desc: "원하는 대로 커스터마이즈" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium text-gray-700">{item.title}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* 내 계획으로 돌아가기 버튼 */}
          <Link href="/plans">
            <Button variant="outline" size="md" className="gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              내 계획 목록으로
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * 랜딩 페이지 (/)
 * Travelit 서비스 소개와 "여행 계획 시작하기" CTA 버튼을 표시합니다.
 */

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travelit - AI와 함께하는 스마트 여행 계획",
  description:
    "AI가 맞춤형 여행 일정을 추천해드립니다. 지금 바로 나만의 완벽한 여행 계획을 시작하세요.",
};

/** 기능 소개 카드 데이터 */
const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "AI 맞춤 추천",
    description: "취향과 일정에 맞는 여행 코스를 AI가 자동으로 추천해드립니다.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    title: "스마트 일정 관리",
    description: "여행 날짜, 장소, 예산을 한눈에 관리하고 언제든지 수정할 수 있습니다.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "다양한 여행지",
    description: "국내외 수천 개의 여행지 정보를 바탕으로 최적의 코스를 설계합니다.",
  },
];

/** 랜딩 페이지 컴포넌트 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-travel text-white overflow-hidden">
        {/* 배경 장식 요소 */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            {/* 배지 */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AI 기반 여행 플래너
            </div>

            {/* 메인 타이틀 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI와 함께하는
              <br />
              <span className="text-teal-200">스마트한 여행 계획</span>
            </h1>

            {/* 서브 타이틀 */}
            <p className="text-lg md:text-xl text-teal-100 mb-10 leading-relaxed">
              목적지만 입력하면 AI가 최적의 여행 일정을 만들어드립니다.
              <br className="hidden sm:block" />
              지금 바로 나만의 완벽한 여행을 시작해보세요.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-teal-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                여행 계획 시작하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition-all duration-200 text-lg"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>

        {/* 물결 구분선 */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
              fill="rgb(249 250 251)"
            />
          </svg>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 Travelit인가요?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              복잡한 여행 준비를 Travelit이 대신 해드립니다.
              <br />
              AI 기술로 누구나 전문 여행 플래너처럼 계획할 수 있습니다.
            </p>
          </div>

          {/* 기능 카드 그리드 */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 group"
              >
                {/* 아이콘 */}
                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                  {feature.icon}
                </div>
                {/* 제목 */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                {/* 설명 */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            지금 바로 시작해보세요
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            무료로 가입하고 나만의 여행 계획을 만들어보세요.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-10 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-lg"
          >
            무료로 시작하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

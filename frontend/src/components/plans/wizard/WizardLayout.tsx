/**
 * 위자드 공통 레이아웃
 * 프로그레스 바, 단계 타이틀, 취소 링크를 포함합니다.
 */

import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';

const STEP_TITLES = [
  '기본 정보를 입력해주세요',
  '여행 스타일을 선택해주세요',
  'AI가 추천하는 여행지',
  '여행 계획을 확인해주세요',
];

const STEP_SUBTITLES = [
  '언제, 누구와 여행하실 건가요?',
  '어떤 스타일의 여행을 원하시나요?',
  '입력하신 선호도를 바탕으로 추천 여행지를 선정했어요',
  '선택하신 내용을 확인하고 여행 계획을 만들어 보세요',
];

interface WizardLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

export default function WizardLayout({ currentStep, children }: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/plans">
            <a className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              취소하고 돌아가기
            </a>
          </Link>
          <span className="text-sm text-gray-400">{currentStep} / 4</span>
        </div>

        {/* 프로그레스 바 */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <ProgressBar currentStep={currentStep} />
        </div>

        {/* 단계 타이틀 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{STEP_TITLES[currentStep - 1]}</h1>
          <p className="mt-1 text-gray-500 text-sm">{STEP_SUBTITLES[currentStep - 1]}</p>
        </div>

        {/* 단계별 컨텐츠 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

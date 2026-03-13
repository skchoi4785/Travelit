"use client";

/**
 * Step 3: AI 여행지 추천 결과
 * 로딩 중 스켈레톤, 완료 후 추천 여행지 카드 목록을 표시합니다.
 */

import React from 'react';
import { Destination } from '@/types/plan';
import DestinationCard from '../DestinationCard';
import SkeletonCard from '@/components/common/SkeletonCard';

interface Step3Props {
  recommendations: Destination[];
  selectedDestination: Destination | null;
  isLoading: boolean;
  onSelect: (dest: Destination) => void;
  onNext: () => void;
  onPrev: () => void;
  onRetry: () => Promise<void>;
}

export default function Step3Recommendations({
  recommendations,
  selectedDestination,
  isLoading,
  onSelect,
  onNext,
  onPrev,
  onRetry,
}: Step3Props) {
  return (
    <div className="p-6 space-y-6">
      {/* 추천 결과 목록 */}
      <div>
        {isLoading ? (
          <>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <svg className="animate-spin w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI가 최적의 여행지를 분석하고 있어요...
            </p>
            <div className="grid grid-cols-1 gap-4">
              <SkeletonCard count={3} />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                총 <span className="font-semibold text-teal-600">{recommendations.length}개</span>의 여행지를 추천해요
              </p>
              <button
                type="button"
                onClick={onRetry}
                className="text-xs text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
              >
                다시 추천받기
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {recommendations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  isSelected={selectedDestination?.id === dest.id}
                  onSelect={() => onSelect(dest)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={isLoading}
          className="flex-1 py-3.5 rounded-xl text-base font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          ← 이전
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedDestination || isLoading}
          className={[
            'flex-[2] py-3.5 rounded-xl text-base font-semibold transition-all duration-200',
            selectedDestination && !isLoading
              ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          ].join(' ')}
        >
          {selectedDestination ? `${selectedDestination.name} 선택 →` : '여행지를 선택해주세요'}
        </button>
      </div>
    </div>
  );
}

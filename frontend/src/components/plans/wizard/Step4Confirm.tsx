/**
 * Step 4: 여행지 선택 확인
 * 선택된 여행지를 확인하고 "일정 생성하기"를 누르면 itinerary/숙소/맛집을 병렬 로드합니다.
 */

import React, { useState } from 'react';
import { Destination, WizardFormData } from '@/types/plan';

const COMPANION_LABELS: Record<string, string> = {
  solo: '혼자',
  couple: '커플',
  family: '가족',
  friends: '친구',
};

const TRAVEL_STYLE_LABELS: Record<string, string> = {
  active: '활동적인 여행',
  relaxed: '여유로운 휴식',
};

const ENVIRONMENT_LABELS: Record<string, string> = {
  nature: '자연 / 아웃도어',
  city: '도시 / 문화',
};

const DESTINATION_GRADIENTS: Record<string, string> = {
  '제주도': 'from-emerald-400 to-teal-500',
  '부산': 'from-blue-400 to-cyan-500',
  '경주': 'from-amber-400 to-orange-500',
  '강릉': 'from-sky-400 to-blue-500',
  '전주': 'from-orange-400 to-red-400',
};

interface Step4Props {
  selectedDestination: Destination;
  formData: WizardFormData;
  isLoading: boolean;
  onPrev: () => void;
  /** 일정/숙소/맛집 병렬 로드 후 다음 단계로 이동 */
  onNext: () => Promise<void>;
}

export default function Step4Confirm({ selectedDestination, formData, isLoading, onPrev, onNext }: Step4Props) {
  const [isFetching, setIsFetching] = useState(false);

  const gradient = DESTINATION_GRADIENTS[selectedDestination.name] || 'from-teal-400 to-blue-500';

  const endDate = (() => {
    const start = new Date(formData.startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + formData.duration - 1);
    return end.toISOString().split('T')[0];
  })();

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const handleNext = async () => {
    setIsFetching(true);
    try {
      await onNext();
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* 선택된 여행지 요약 카드 */}
      <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className="p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl font-bold opacity-80">{selectedDestination.name[0]}</span>
            <div>
              <h3 className="text-xl font-bold">{selectedDestination.name}</h3>
              <p className="text-sm text-white/80">{selectedDestination.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedDestination.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 여행 정보 요약 */}
      <div className="bg-gray-50 rounded-xl p-5 space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">여행 정보</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">출발일</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(formData.startDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">복귀일</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(endDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">여행 기간</p>
            <p className="text-sm font-medium text-gray-900">{formData.duration - 1}박 {formData.duration}일</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">동반자</p>
            <p className="text-sm font-medium text-gray-900">
              {COMPANION_LABELS[formData.companionType] || formData.companionType}
            </p>
          </div>
        </div>
      </div>

      {/* 선호도 요약 */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">선호도</h4>
        <div className="flex flex-wrap gap-2">
          {formData.travelStyle && (
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
              🏃 {TRAVEL_STYLE_LABELS[formData.travelStyle]}
            </span>
          )}
          {formData.environment && (
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              🌍 {ENVIRONMENT_LABELS[formData.environment]}
            </span>
          )}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFetching}
          className="flex-1 py-3.5 rounded-xl text-base font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          ← 다시 선택
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isFetching || isLoading}
          className="flex-[2] py-3.5 rounded-xl text-base font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI가 일정을 생성 중…
            </span>
          ) : (
            '🗺️ 일정 생성하기'
          )}
        </button>
      </div>
    </div>
  );
}

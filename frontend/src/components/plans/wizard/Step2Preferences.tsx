"use client";

/**
 * Step 2: 여행 스타일 선호도 선택
 * 여행 스타일(활동적/휴식)과 선호 환경(자연/도시)을 카드로 선택합니다.
 */

import React from 'react';
import { TravelStyle, Environment, WizardFormData } from '@/types/plan';

const TRAVEL_STYLE_OPTIONS: { value: TravelStyle; label: string; icon: string; desc: string }[] = [
  {
    value: 'active',
    label: '활동적인 여행',
    icon: '🏃',
    desc: '트레킹, 스포츠, 다양한 액티비티로 가득 찬 여행',
  },
  {
    value: 'relaxed',
    label: '여유로운 휴식',
    icon: '☕',
    desc: '카페, 산책, 힐링으로 재충전하는 여행',
  },
];

const ENVIRONMENT_OPTIONS: { value: Environment; label: string; icon: string; desc: string }[] = [
  {
    value: 'nature',
    label: '자연 / 아웃도어',
    icon: '🏔️',
    desc: '산, 바다, 숲 등 자연과 함께하는 여행',
  },
  {
    value: 'city',
    label: '도시 / 문화',
    icon: '🏙️',
    desc: '맛집, 카페, 관광지가 가득한 도시 여행',
  },
];

interface Step2Props {
  formData: WizardFormData;
  onUpdate: (partial: Partial<WizardFormData>) => void;
  onNext: () => Promise<void>;
  onPrev: () => void;
  isLoading: boolean;
}

export default function Step2Preferences({ formData, onUpdate, onNext, onPrev, isLoading }: Step2Props) {
  const isValid = formData.travelStyle !== '' && formData.environment !== '';

  return (
    <div className="p-6 space-y-8">
      {/* 여행 스타일 */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-3">
          여행 스타일 <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          {TRAVEL_STYLE_OPTIONS.map((opt) => {
            const isSelected = formData.travelStyle === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate({ travelStyle: opt.value })}
                className={[
                  'flex flex-col items-center gap-2 p-5 rounded-xl border-2 text-center transition-all duration-150',
                  isSelected
                    ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                    : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50',
                ].join(' ')}
              >
                <span className="text-3xl">{opt.icon}</span>
                <p className={`text-sm font-semibold ${isSelected ? 'text-teal-700' : 'text-gray-800'}`}>
                  {opt.label}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 선호 환경 */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-3">
          선호 환경 <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ENVIRONMENT_OPTIONS.map((opt) => {
            const isSelected = formData.environment === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate({ environment: opt.value })}
                className={[
                  'flex flex-col items-center gap-2 p-5 rounded-xl border-2 text-center transition-all duration-150',
                  isSelected
                    ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                    : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50',
                ].join(' ')}
              >
                <span className="text-3xl">{opt.icon}</span>
                <p className={`text-sm font-semibold ${isSelected ? 'text-teal-700' : 'text-gray-800'}`}>
                  {opt.label}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3.5 rounded-xl text-base font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← 이전
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid || isLoading}
          className={[
            'flex-[2] py-3.5 rounded-xl text-base font-semibold transition-all duration-200',
            isValid && !isLoading
              ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          ].join(' ')}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI가 추천 중...
            </span>
          ) : (
            '✨ 추천 받기'
          )}
        </button>
      </div>
    </div>
  );
}

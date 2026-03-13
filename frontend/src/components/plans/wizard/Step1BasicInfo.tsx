"use client";

/**
 * Step 1: 여행 기본 정보 입력
 * 출발일, 여행 기간, 동반자 유형을 입력받습니다.
 */

import React from 'react';
import { CompanionType, WizardFormData } from '@/types/plan';

const DURATION_OPTIONS = [
  { value: 2, label: '1박 2일' },
  { value: 3, label: '2박 3일' },
  { value: 4, label: '3박 4일' },
  { value: 5, label: '4박 5일' },
  { value: 6, label: '5박 6일' },
  { value: 7, label: '6박 7일' },
];

const COMPANION_OPTIONS: { value: CompanionType; label: string; icon: string; desc: string }[] = [
  { value: 'solo', label: '혼자', icon: '🧍', desc: '나만의 자유로운 여행' },
  { value: 'couple', label: '커플', icon: '👫', desc: '둘이서 떠나는 로맨틱 여행' },
  { value: 'family', label: '가족', icon: '👨‍👩‍👧', desc: '온 가족이 함께하는 여행' },
  { value: 'friends', label: '친구', icon: '👯', desc: '친구들과 즐기는 신나는 여행' },
];

interface Step1Props {
  formData: WizardFormData;
  onUpdate: (partial: Partial<WizardFormData>) => void;
  onNext: () => void;
}

export default function Step1BasicInfo({ formData, onUpdate, onNext }: Step1Props) {
  const today = new Date().toISOString().split('T')[0];
  const isValid =
    formData.startDate !== '' &&
    formData.duration > 0 &&
    formData.companionType !== '';

  return (
    <div className="p-6 space-y-8">
      {/* 출발일 선택 */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          출발일
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="date"
          min={today}
          value={formData.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
          className={[
            'w-full px-4 py-3 rounded-xl border text-gray-900 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent',
            'transition-colors cursor-pointer',
            formData.startDate ? 'border-teal-300 bg-teal-50/30' : 'border-gray-200 bg-white hover:border-gray-300',
          ].join(' ')}
        />
      </div>

      {/* 여행 기간 선택 */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          여행 기간
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onUpdate({ duration: opt.value })}
              className={[
                'py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all duration-150',
                formData.duration === opt.value
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-teal-300 hover:text-teal-600',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 동반자 유형 선택 */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          동반자 유형
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {COMPANION_OPTIONS.map((opt) => {
            const isSelected = formData.companionType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate({ companionType: opt.value })}
                className={[
                  'flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150',
                  isSelected
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 bg-white hover:border-teal-300',
                ].join(' ')}
              >
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <p className={`text-sm font-semibold ${isSelected ? 'text-teal-700' : 'text-gray-800'}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </div>
                {isSelected && (
                  <div className="ml-auto w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 다음 단계 버튼 */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={[
            'w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200',
            isValid
              ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          ].join(' ')}
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
}

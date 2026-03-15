/**
 * 위자드 진행 상태 표시 프로그레스 바
 * 4단계 원형 인디케이터 + 연결선
 */

import React from 'react';

const STEP_LABELS = ['기본 정보', '선호도', '추천 결과', '확인'];

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  return (
    <div className="w-full px-2">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <React.Fragment key={step}>
              {/* 단계 원형 인디케이터 */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div
                  className={[
                    'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200',
                    isCompleted
                      ? 'bg-teal-500 text-white'
                      : isActive
                      ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                      : 'bg-gray-200 text-gray-500',
                  ].join(' ')}
                >
                  {isCompleted ? (
                    /* 완료 체크 아이콘 */
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={[
                    'text-xs font-medium hidden sm:block',
                    isActive ? 'text-teal-600' : isCompleted ? 'text-teal-500' : 'text-gray-400',
                  ].join(' ')}
                >
                  {STEP_LABELS[i]}
                </span>
              </div>

              {/* 연결선 (마지막 단계 제외) */}
              {step < totalSteps && (
                <div className="flex-1 mx-2 mb-5 sm:mb-0">
                  <div
                    className={[
                      'h-1 rounded-full transition-all duration-300',
                      isCompleted ? 'bg-teal-400' : 'bg-gray-200',
                    ].join(' ')}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

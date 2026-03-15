/**
 * 추천 여행지 카드 컴포넌트
 * 여행지 정보와 선택 상태를 표시합니다.
 */

import React from 'react';
import { Destination } from '@/types/plan';

/** 여행지별 그라디언트 색상 */
const DESTINATION_GRADIENTS: Record<string, string> = {
  '제주도': 'from-emerald-400 to-teal-500',
  '부산': 'from-blue-400 to-cyan-500',
  '경주': 'from-amber-400 to-orange-500',
  '강릉': 'from-sky-400 to-blue-500',
  '전주': 'from-orange-400 to-red-400',
};

const DEFAULT_GRADIENT = 'from-teal-400 to-blue-500';

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DestinationCard({ destination, isSelected, onSelect }: DestinationCardProps) {
  const gradient = DESTINATION_GRADIENTS[destination.name] || DEFAULT_GRADIENT;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'w-full text-left bg-white rounded-xl border-2 overflow-hidden transition-all duration-200',
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2',
        isSelected
          ? 'border-teal-500 shadow-md ring-2 ring-teal-200'
          : 'border-gray-100 hover:border-teal-200',
      ].join(' ')}
    >
      {/* 이미지 / 그라디언트 영역 */}
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-4xl font-bold text-white/80">{destination.name[0]}</span>

        {/* 선택 체크 아이콘 */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* 컨텐츠 영역 */}
      <div className="p-4">
        {/* 여행지 이름 */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{destination.name}</h3>

        {/* 설명 (1줄 말줄임) */}
        <p className="text-sm text-gray-600 truncate mb-2">{destination.description}</p>

        {/* 추천 이유 */}
        <p className="text-xs text-gray-500 italic line-clamp-2 mb-3">&ldquo;{destination.reason}&rdquo;</p>

        {/* 태그 배지 */}
        <div className="flex flex-wrap gap-1.5">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

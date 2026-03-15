/**
 * Step 5: 일자별 동선 추천
 * usePlanWizard에서 itinerary, isLoading을 받아 UI만 담당
 */

import { useState } from 'react';
import { ItineraryDay } from '@/types/plan';

/** 이동 수단별 아이콘 */
const transportIcon = (transport: string): string => {
  if (transport.includes('렌터카') || transport.includes('택시')) return '🚗';
  if (transport.includes('페리') || transport.includes('배')) return '⛴️';
  if (transport.includes('도보') || transport.includes('걷기')) return '🚶';
  if (transport.includes('버스')) return '🚌';
  if (transport.includes('지하철')) return '🚇';
  return '🚗';
};

interface Props {
  itinerary: ItineraryDay[];
  isLoading: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step5Itinerary({ itinerary, isLoading, onNext, onPrev }: Props) {
  const [activeDay, setActiveDay] = useState(0);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* 스켈레톤 탭 */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-16 rounded-full bg-gray-200 animate-pulse" />
          ))}
        </div>
        {/* 스켈레톤 카드 */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 animate-pulse">
            <div className="w-14 h-5 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
        <p className="text-center text-sm text-gray-400 mt-2">AI가 최적 동선을 구성 중입니다…</p>
      </div>
    );
  }

  if (itinerary.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">🗺️</p>
        <p>일정을 불러올 수 없습니다.</p>
      </div>
    );
  }

  const current = itinerary[activeDay];

  return (
    <div className="space-y-4">
      {/* Day 탭 */}
      <div className="flex gap-2 flex-wrap">
        {itinerary.map((day, idx) => (
          <button
            key={day.day}
            onClick={() => setActiveDay(idx)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeDay === idx
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      {/* 날짜 표시 */}
      <p className="text-xs text-gray-400">{current.date}</p>

      {/* 활동 타임라인 */}
      <div className="space-y-3">
        {current.activities.map((activity, idx) => (
          <div key={idx} className="flex gap-3 p-4 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors">
            {/* 시간 배지 */}
            <span className="shrink-0 text-xs font-mono font-semibold text-teal-700 bg-teal-100 rounded px-2 py-1 h-fit">
              {activity.time}
            </span>

            {/* 내용 */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{activity.place}</p>
              {activity.description && (
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{activity.description}</p>
              )}
              <div className="flex gap-3 mt-1.5 text-xs text-gray-400">
                <span>{transportIcon(activity.transport)} {activity.transport}</span>
                <span>⏱ {activity.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          이전
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
        >
          숙소 선택하기
        </button>
      </div>
    </div>
  );
}

/**
 * 일자별 타임라인 컴포넌트
 * 일자별 탭과 시간순 활동 목록을 표시합니다.
 */

import React, { useState } from 'react';
import { ItineraryDay } from '@/types/plan';

const TRANSPORT_ICONS: Record<string, string> = {
  '렌터카': '🚗',
  '페리': '⛴️',
  '도보': '🚶',
  '버스': '🚌',
  '기차': '🚂',
  '지하철': '🚇',
  '택시': '🚕',
};

interface ItineraryTimelineProps {
  days: ItineraryDay[];
}

export default function ItineraryTimeline({ days }: ItineraryTimelineProps) {
  const [activeDay, setActiveDay] = useState(0);

  const currentDay = days[activeDay];

  return (
    <div>
      {/* 일자별 탭 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {days.map((day, idx) => (
          <button
            key={day.day}
            type="button"
            onClick={() => setActiveDay(idx)}
            className={[
              'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150',
              idx === activeDay
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ].join(' ')}
          >
            Day {day.day}
            <span className="ml-1.5 text-xs opacity-75">
              {new Date(day.date).getMonth() + 1}/{new Date(day.date).getDate()}
            </span>
          </button>
        ))}
      </div>

      {/* 타임라인 */}
      {currentDay && (
        <div className="relative">
          {/* 세로선 */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-4">
            {currentDay.activities.map((activity, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {/* 원형 마커 */}
                <div className="flex-shrink-0 w-[4.5rem] flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-teal-500 ring-2 ring-white ring-offset-1 mt-1.5 z-10" />
                  <span className="text-xs font-semibold text-teal-600 mt-1">{activity.time}</span>
                </div>

                {/* 활동 카드 */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm mb-1">
                  <h4 className="text-sm font-semibold text-gray-900">{activity.place}</h4>
                  {activity.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{activity.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {activity.duration}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <span>{TRANSPORT_ICONS[activity.transport] || '🚌'}</span>
                      {activity.transport}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 여행 계획 카드 컴포넌트
 * 여행 계획 목록에서 각 계획을 카드 형태로 표시합니다.
 */

import React from 'react';
import Link from 'next/link';
import { TravelPlan } from '@/types/plan';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  planning: { label: '계획 중', className: 'bg-blue-100 text-blue-700' },
  itinerary_ready: { label: '일정 완성', className: 'bg-yellow-100 text-yellow-700' },
  completed: { label: '완료', className: 'bg-green-100 text-green-700' },
};

const COMPANION_LABELS: Record<string, string> = {
  solo: '혼자',
  couple: '커플',
  family: '가족',
  friends: '친구',
};

const DESTINATION_GRADIENTS: Record<string, string> = {
  '제주도': 'from-emerald-400 to-teal-500',
  '부산': 'from-blue-400 to-cyan-500',
  '경주': 'from-amber-400 to-orange-500',
  '강릉': 'from-sky-400 to-blue-500',
  '전주': 'from-orange-400 to-red-400',
};

const DEFAULT_GRADIENT = 'from-teal-400 to-blue-500';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

interface PlanCardProps {
  plan: TravelPlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const status = STATUS_CONFIG[plan.status] || STATUS_CONFIG.planning;
  const gradient = DESTINATION_GRADIENTS[plan.destination] || DEFAULT_GRADIENT;

  return (
    <Link href={`/plans/${plan.id}`}>
      <a className="block group">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-teal-200">
          {/* 색상 배너 */}
          <div className={`h-3 bg-gradient-to-r ${gradient}`} />

          <div className="p-5">
            {/* 상태 배지 + 날짜 */}
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                {status.label}
              </span>
              <span className="text-xs text-gray-400">{formatDate(plan.createdAt)} 생성</span>
            </div>

            {/* 여행 제목 */}
            <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
              {plan.title}
            </h3>

            {/* 여행 기간 */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(plan.startDate)} ~ {formatDate(plan.endDate)}</span>
            </div>

            {/* 동반자 유형 */}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-500">
                {COMPANION_LABELS[plan.companionType] || plan.companionType}와 함께
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

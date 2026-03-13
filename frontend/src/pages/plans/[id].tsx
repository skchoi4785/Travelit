/**
 * 여행 계획 상세 페이지 (/plans/[id])
 * 일자별 타임라인, 숙소/맛집 추천 카드를 표시합니다.
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import ItineraryTimeline from '@/components/plans/ItineraryTimeline';
import { TravelPlan } from '@/types/plan';
import { mockItinerary, mockAccommodations, mockRestaurants, PLANS_STORAGE_KEY } from '@/data/mockData';

const COMPANION_LABELS: Record<string, string> = {
  solo: '혼자',
  couple: '커플',
  family: '가족',
  friends: '친구',
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

export default function PlanDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading: authLoading } = useAuth();
  const [plan, setPlan] = useState<TravelPlan | null | undefined>(undefined);

  // 인증 가드
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // 계획 데이터 로드
  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(PLANS_STORAGE_KEY);
    const plans: TravelPlan[] = stored ? JSON.parse(stored) : [];
    const found = plans.find((p) => p.id === id) || null;
    setPlan(found);
  }, [id]);

  if (authLoading || !user || plan === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // 404 UI
  if (plan === null) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">계획을 찾을 수 없어요</h1>
        <p className="text-gray-500 mb-6">요청하신 여행 계획이 존재하지 않습니다.</p>
        <Link href="/plans">
          <a className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            계획 목록으로 돌아가기
          </a>
        </Link>
      </div>
    );
  }

  // 일정 일수에 맞게 타임라인 데이터 슬라이스
  const itinerary = mockItinerary.slice(0, plan.duration);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 뒤로가기 */}
      <Link href="/plans">
        <a className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          내 여행 계획
        </a>
      </Link>

      {/* 여행 기본 정보 헤더 */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-4">{plan.title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-white/70 mb-1">목적지</p>
            <p className="font-semibold">{plan.destination}</p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">여행 기간</p>
            <p className="font-semibold text-sm">
              {formatDate(plan.startDate)}<br />~ {formatDate(plan.endDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">동반자</p>
            <p className="font-semibold">{COMPANION_LABELS[plan.companionType] || plan.companionType}</p>
          </div>
        </div>
      </div>

      {/* 일자별 타임라인 */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">여행 일정</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <ItineraryTimeline days={itinerary} />
        </div>
      </section>

      {/* 숙소 추천 */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">추천 숙소</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockAccommodations.map((acc) => (
            <div key={acc.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{acc.name}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {acc.type}
                  </span>
                </div>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-lg whitespace-nowrap">
                  {acc.priceRange}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">{acc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 맛집 추천 */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">추천 맛집</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockRestaurants.map((rest) => (
            <div key={rest.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{rest.name}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                    {rest.cuisine}
                  </span>
                </div>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-lg whitespace-nowrap">
                  {rest.priceRange}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">{rest.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

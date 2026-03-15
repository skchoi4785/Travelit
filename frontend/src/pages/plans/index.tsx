/**
 * 여행 계획 목록 페이지 (/plans)
 * localStorage에서 계획 목록을 로드하고 카드 그리드로 표시합니다.
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import PlanCard from '@/components/plans/PlanCard';
import { TravelPlan } from '@/types/plan';
import { mockTravelPlans, PLANS_STORAGE_KEY } from '@/data/mockData';

export default function PlansPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  // 인증 가드
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // localStorage에서 계획 로드 (Mock 기본 데이터 포함)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(PLANS_STORAGE_KEY);
    if (stored) {
      setPlans(JSON.parse(stored) as TravelPlan[]);
    } else {
      // 처음 방문 시 Mock 데이터로 초기화
      setPlans(mockTravelPlans);
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(mockTravelPlans));
    }
    setIsLoadingPlans(false);
  }, []);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">내 여행 계획</h1>
          {user && (
            <p className="mt-1 text-gray-600">
              <span className="font-medium text-teal-700">{user.username}</span>님의 여행 계획 목록
              {!isLoadingPlans && plans.length > 0 && (
                <span className="ml-2 text-sm text-gray-400">({plans.length}개)</span>
              )}
            </p>
          )}
        </div>
        <Link href="/plans/new">
          <a className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">새 계획 만들기</span>
            <span className="sm:hidden">새 계획</span>
          </a>
        </Link>
      </div>

      {/* 로딩 상태 */}
      {isLoadingPlans ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-3 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        /* 빈 상태 UI */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">첫 여행 계획을 만들어보세요!</h2>
            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
              아직 만든 여행 계획이 없습니다.
              <br />
              AI가 맞춤형 여행 일정을 추천해드릴게요.
            </p>
            <Link href="/plans/new">
              <a className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                새 계획 만들기
              </a>
            </Link>
          </div>
        </div>
      ) : (
        /* 계획 카드 그리드 */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}

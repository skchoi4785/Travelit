/**
 * 로딩 스켈레톤 카드 컴포넌트
 * 데이터 로딩 중 animate-pulse로 플레이스홀더를 표시합니다.
 */

import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

function SkeletonItem() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      {/* 이미지 영역 */}
      <div className="h-40 bg-gray-200" />
      {/* 컨텐츠 영역 */}
      <div className="p-4 space-y-3">
        {/* 제목 */}
        <div className="h-5 bg-gray-200 rounded w-1/2" />
        {/* 설명 */}
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
        {/* 태그 */}
        <div className="flex gap-2 pt-1">
          <div className="h-5 bg-gray-200 rounded-full w-12" />
          <div className="h-5 bg-gray-200 rounded-full w-14" />
          <div className="h-5 bg-gray-200 rounded-full w-10" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonCard({ count = 3 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonItem key={i} />
      ))}
    </>
  );
}

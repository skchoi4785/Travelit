/**
 * Step 7: 맛집 선택
 * 5개 맛집 카드 중 복수 선택 가능 (다중 선택)
 */

import { Restaurant } from '@/types/plan';

interface Props {
  restaurants: Restaurant[];
  selectedRestaurants: Restaurant[];
  isLoading: boolean;
  onToggle: (rest: Restaurant) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step7Restaurants({
  restaurants,
  selectedRestaurants,
  isLoading,
  onToggle,
  onNext,
  onPrev,
}: Props) {
  const isSelected = (id: string) => selectedRestaurants.some((r) => r.id === id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 p-4 space-y-3 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="flex gap-2">
              {[1, 2].map((j) => (
                <div key={j} className="h-5 w-12 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>
        ))}
        <p className="text-center text-sm text-gray-400">AI가 맛집을 추천 중입니다…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">원하는 맛집을 모두 선택하세요 (복수 선택 가능)</p>

      <div className="space-y-3">
        {restaurants.map((rest) => {
          const selected = isSelected(rest.id);
          return (
            <button
              key={rest.id}
              onClick={() => onToggle(rest)}
              className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                selected
                  ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                  : 'border-gray-200 bg-white hover:border-teal-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{rest.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{rest.cuisine}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-orange-700 bg-orange-100 rounded-lg px-2 py-1">
                  {rest.priceRange}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{rest.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {/* 추천 일자 배지 */}
                {rest.recommendedDays.map((day) => (
                  <span
                    key={day}
                    className="text-xs bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5 font-medium"
                  >
                    Day {day}
                  </span>
                ))}
                {/* 특징 태그 */}
                {rest.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              {selected && (
                <p className="text-xs text-teal-600 font-semibold mt-2">✓ 선택됨</p>
              )}
            </button>
          );
        })}
      </div>

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
          최종 확인
        </button>
      </div>
    </div>
  );
}

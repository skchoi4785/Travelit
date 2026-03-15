/**
 * Step 6: 숙소 선택
 * 3개 숙소 카드 중 하나를 선택 (단일 선택)
 */

import { Accommodation } from '@/types/plan';

interface Props {
  accommodations: Accommodation[];
  selectedAccommodation: Accommodation | null;
  isLoading: boolean;
  onSelect: (acc: Accommodation) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step6Accommodations({
  accommodations,
  selectedAccommodation,
  isLoading,
  onSelect,
  onNext,
  onPrev,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 p-4 space-y-3 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-6 w-16 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>
        ))}
        <p className="text-center text-sm text-gray-400">AI가 최적 숙소를 추천 중입니다…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {accommodations.map((acc) => {
          const isSelected = selectedAccommodation?.id === acc.id;
          return (
            <button
              key={acc.id}
              onClick={() => onSelect(acc)}
              className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                  : 'border-gray-200 bg-white hover:border-teal-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{acc.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{acc.type} · {acc.location}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-teal-700 bg-teal-100 rounded-lg px-2 py-1">
                  {acc.priceRange}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{acc.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {acc.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              {isSelected && (
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
          disabled={!selectedAccommodation}
          className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          맛집 선택하기
        </button>
      </div>
    </div>
  );
}

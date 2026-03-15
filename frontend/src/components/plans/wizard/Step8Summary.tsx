/**
 * Step 8: 최종 확인 & 계획 저장
 * 전체 선택 내용을 요약하고 localStorage에 저장 후 /plans로 이동
 */

import { useRouter } from 'next/router';
import { WizardFormData, Destination, Accommodation, Restaurant, ItineraryDay } from '@/types/plan';

/** 동반자 유형 한글 표시 */
const companionLabel: Record<string, string> = {
  solo: '혼자',
  couple: '커플',
  family: '가족',
  friends: '친구',
};

/** 여행 스타일 한글 표시 */
const styleLabel: Record<string, string> = {
  active: '활동적',
  relaxed: '여유로운 휴식',
};

/** 선호 환경 한글 표시 */
const envLabel: Record<string, string> = {
  nature: '자연',
  city: '도시',
};

interface Props {
  formData: WizardFormData;
  selectedDestination: Destination | null;
  selectedAccommodation: Accommodation | null;
  selectedRestaurants: Restaurant[];
  itinerary: ItineraryDay[];
  onSave: () => void; // createPlan 실행
  onPrev: () => void;
}

export default function Step8Summary({
  formData,
  selectedDestination,
  selectedAccommodation,
  selectedRestaurants,
  itinerary,
  onSave,
  onPrev,
}: Props) {
  const router = useRouter();

  const handleSave = () => {
    onSave();
    router.push('/plans');
  };

  return (
    <div className="space-y-5">
      {/* 여행지 배너 */}
      {selectedDestination && (
        <div className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 p-5 text-white">
          <p className="text-sm opacity-80">목적지</p>
          <p className="text-2xl font-bold mt-1">{selectedDestination.name}</p>
          <p className="text-sm opacity-90 mt-1">{selectedDestination.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {selectedDestination.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white/20 rounded-full px-2.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 기본 정보 */}
      <div className="rounded-xl border border-gray-200 p-4 space-y-3">
        <p className="font-semibold text-gray-700">기본 정보</p>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-gray-400">출발일</span>
          <span className="text-gray-800 font-medium">{formData.startDate}</span>
          <span className="text-gray-400">여행 기간</span>
          <span className="text-gray-800 font-medium">{formData.duration - 1}박 {formData.duration}일</span>
          <span className="text-gray-400">동반자</span>
          <span className="text-gray-800 font-medium">{companionLabel[formData.companionType] ?? formData.companionType}</span>
          <span className="text-gray-400">여행 스타일</span>
          <span className="text-gray-800 font-medium">{styleLabel[formData.travelStyle] ?? formData.travelStyle}</span>
          <span className="text-gray-400">선호 환경</span>
          <span className="text-gray-800 font-medium">{envLabel[formData.environment] ?? formData.environment}</span>
        </div>
      </div>

      {/* 일정 요약 */}
      {itinerary.length > 0 && (
        <div className="rounded-xl border border-gray-200 p-4 space-y-2">
          <p className="font-semibold text-gray-700">일정 요약</p>
          {itinerary.map((day) => (
            <div key={day.day} className="flex gap-2 text-sm">
              <span className="shrink-0 text-teal-600 font-semibold w-12">Day {day.day}</span>
              <span className="text-gray-600">
                {day.activities.map((a) => a.place).join(' → ')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 숙소 */}
      {selectedAccommodation && (
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="font-semibold text-gray-700 mb-2">선택한 숙소</p>
          <p className="text-gray-800">{selectedAccommodation.name}</p>
          <p className="text-sm text-gray-400 mt-0.5">{selectedAccommodation.type} · {selectedAccommodation.location} · {selectedAccommodation.priceRange}</p>
        </div>
      )}

      {/* 맛집 */}
      {selectedRestaurants.length > 0 && (
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="font-semibold text-gray-700 mb-2">선택한 맛집 ({selectedRestaurants.length}곳)</p>
          <div className="space-y-1">
            {selectedRestaurants.map((rest) => (
              <div key={rest.id} className="flex items-center gap-2 text-sm">
                <span className="text-gray-800">{rest.name}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{rest.cuisine}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 버튼 */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          이전
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors shadow-md"
        >
          여행 계획 저장 🎉
        </button>
      </div>
    </div>
  );
}

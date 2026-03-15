/**
 * 여행 계획 관련 TypeScript 타입 정의
 */

/** 여행 스타일: 활동적 / 여유로운 휴식 */
export type TravelStyle = 'active' | 'relaxed';

/** 선호 환경: 자연 / 도시 */
export type Environment = 'nature' | 'city';

/** 동반자 유형 */
export type CompanionType = 'solo' | 'couple' | 'family' | 'friends';

/** 여행 계획 상태 */
export type PlanStatus = 'planning' | 'itinerary_ready' | 'completed';

/** 추천 여행지 */
export interface Destination {
  id: string;
  name: string;
  description: string;
  reason: string;
  imageUrl?: string;
  tags: string[];
}

/** 여행 계획 */
export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  destinationId?: string;
  startDate: string;
  endDate: string;
  duration: number;
  companionType: CompanionType;
  travelStyle?: TravelStyle;
  environment?: Environment;
  status: PlanStatus;
  createdAt: string;
}

/** 위자드 단계별 입력 데이터 통합 */
export interface WizardFormData {
  /** Step 1 */
  startDate: string;
  duration: number;
  companionType: CompanionType | '';
  /** Step 2 */
  travelStyle: TravelStyle | '';
  environment: Environment | '';
}

/** 일정 내 개별 활동 */
export interface Activity {
  time: string;
  place: string;
  description?: string;
  duration: string;
  transport: string;
}

/** 일자별 일정 */
export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

/** 숙소 추천 */
export interface Accommodation {
  id: string;
  name: string;
  type: string;
  priceRange: string;
  description: string;
  features: string[];
  location: string;
}

/** 맛집 추천 */
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  description: string;
  features: string[];
  recommendedDays: number[];
}

/** 위자드 Step 5~8 선택 데이터 */
export interface WizardSelections {
  selectedAccommodation: Accommodation | null;
  selectedRestaurants: Restaurant[];
  itinerary: ItineraryDay[];
}

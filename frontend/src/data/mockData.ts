/**
 * Sprint 2 Mock 데이터
 * 실제 LLM API 연동 전까지 사용하는 임시 데이터
 */

import {
  Destination,
  TravelPlan,
  ItineraryDay,
  Accommodation,
  Restaurant,
} from '@/types/plan';

/** 추천 여행지 Mock 데이터 */
export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: '제주도',
    description: '자연과 문화가 어우러진 섬',
    reason: '활동적인 여행과 자연 경관을 선호하는 분께 추천',
    imageUrl: undefined,
    tags: ['자연', '해변', '트레킹'],
  },
  {
    id: '2',
    name: '부산',
    description: '해양 도시의 활기찬 매력',
    reason: '도시 문화와 해변을 함께 즐길 수 있는 최적의 도시',
    imageUrl: undefined,
    tags: ['도시', '해변', '미식'],
  },
  {
    id: '3',
    name: '경주',
    description: '천년 역사의 문화 도시',
    reason: '역사 문화 탐방을 즐기는 분께 완벽한 여행지',
    imageUrl: undefined,
    tags: ['역사', '문화', '힐링'],
  },
  {
    id: '4',
    name: '강릉',
    description: '바다와 커피 향이 가득한 도시',
    reason: '여유로운 휴식과 바다 분위기를 원하는 분께 추천',
    imageUrl: undefined,
    tags: ['해변', '카페', '힐링'],
  },
  {
    id: '5',
    name: '전주',
    description: '한옥마을과 맛의 도시',
    reason: '전통 문화와 미식 탐방을 동시에 즐기고 싶은 분께 추천',
    imageUrl: undefined,
    tags: ['전통', '한옥', '미식'],
  },
];

/** 여행 계획 목록 Mock 데이터 */
export const mockTravelPlans: TravelPlan[] = [
  {
    id: 'plan-1',
    title: '제주도 3박 4일 여행',
    destination: '제주도',
    destinationId: '1',
    startDate: '2026-04-01',
    endDate: '2026-04-04',
    duration: 4,
    companionType: 'couple',
    travelStyle: 'active',
    environment: 'nature',
    status: 'completed',
    createdAt: '2026-03-01',
  },
  {
    id: 'plan-2',
    title: '부산 2박 3일 여행',
    destination: '부산',
    destinationId: '2',
    startDate: '2026-04-15',
    endDate: '2026-04-17',
    duration: 3,
    companionType: 'friends',
    travelStyle: 'relaxed',
    environment: 'city',
    status: 'planning',
    createdAt: '2026-03-05',
  },
];

/** 일자별 일정 Mock 데이터 (제주도 기준) */
export const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: '2026-04-01',
    activities: [
      { time: '10:00', place: '성산일출봉', duration: '2시간', transport: '렌터카' },
      { time: '13:00', place: '섭지코지', duration: '1시간 30분', transport: '렌터카' },
      { time: '15:00', place: '우도', duration: '3시간', transport: '페리' },
      { time: '19:00', place: '동문시장', duration: '2시간', transport: '렌터카' },
    ],
  },
  {
    day: 2,
    date: '2026-04-02',
    activities: [
      { time: '09:00', place: '한라산 영실 코스', duration: '4시간', transport: '렌터카' },
      { time: '14:00', place: '천지연 폭포', duration: '1시간', transport: '렌터카' },
      { time: '17:00', place: '서귀포 매일올레시장', duration: '2시간', transport: '도보' },
    ],
  },
  {
    day: 3,
    date: '2026-04-03',
    activities: [
      { time: '10:00', place: '협재 해수욕장', duration: '3시간', transport: '렌터카' },
      { time: '14:00', place: '오설록 티 뮤지엄', duration: '1시간 30분', transport: '렌터카' },
      { time: '17:00', place: '제주 돌문화공원', duration: '1시간 30분', transport: '렌터카' },
    ],
  },
  {
    day: 4,
    date: '2026-04-04',
    activities: [
      { time: '09:00', place: '제주 민속촌', duration: '2시간', transport: '렌터카' },
      { time: '12:00', place: '제주공항', duration: '2시간', transport: '렌터카' },
    ],
  },
];

/** 숙소 추천 Mock 데이터 */
export const mockAccommodations: Accommodation[] = [
  {
    id: 'acc-1',
    name: '제주 해비치 호텔 & 리조트',
    type: '리조트',
    priceRange: '30~50만원/박',
    description: '성산일출봉 근처의 럭셔리 리조트. 오션뷰 객실과 야외 수영장 보유.',
  },
  {
    id: 'acc-2',
    name: '서귀포 힐링 게스트하우스',
    type: '게스트하우스',
    priceRange: '5~8만원/박',
    description: '서귀포 중심가에 위치한 깨끗한 게스트하우스. 여행자들의 커뮤니티 공간 운영.',
  },
];

/** 맛집 추천 Mock 데이터 */
export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: '흑돼지 거리 맛집',
    cuisine: '제주 흑돼지',
    priceRange: '3~5만원/인',
    description: '제주 특산 흑돼지 구이 전문점. 제주 여행에서 꼭 먹어야 할 메뉴.',
  },
  {
    id: 'rest-2',
    name: '해녀의 집',
    cuisine: '해산물',
    priceRange: '2~4만원/인',
    description: '해녀가 직접 잡은 신선한 해산물 요리. 성게비빔밥과 전복죽이 유명.',
  },
  {
    id: 'rest-3',
    name: '제주 향토 음식점',
    cuisine: '제주 향토음식',
    priceRange: '1~2만원/인',
    description: '제주 고유의 향토 음식을 맛볼 수 있는 전통 식당. 몸국과 옥돔구이 추천.',
  },
];

/** localStorage 키 상수 */
export const PLANS_STORAGE_KEY = 'travelit_mock_plans';

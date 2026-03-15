/**
 * 여행 추천 서비스
 * TODO: Sprint 1-B 완료 후 ILlmService 주입 및 실제 LLM 호출로 교체
 */

import { Injectable } from '@nestjs/common';
import { RecommendDestinationsDto } from './dto/recommend-destinations.dto';
import { RecommendItineraryDto } from './dto/recommend-itinerary.dto';
import { RecommendAccommodationsDto } from './dto/recommend-accommodations.dto';
import { RecommendRestaurantsDto } from './dto/recommend-restaurants.dto';
import {
  DestinationResult,
  ItineraryDayResult,
  AccommodationResult,
  RestaurantResult,
} from './interfaces/llm-service.interface';

/** Mock 여행지 데이터 */
const MOCK_DESTINATIONS: DestinationResult[] = [
  { id: '1', name: '제주도', description: '자연과 문화가 어우러진 섬', reason: '활동적인 여행과 자연 경관을 선호하는 분께 추천', tags: ['자연', '해변', '트레킹'] },
  { id: '2', name: '부산', description: '해양 도시의 활기찬 매력', reason: '도시 문화와 해변을 함께 즐길 수 있는 최적의 도시', tags: ['도시', '해변', '미식'] },
  { id: '3', name: '경주', description: '천년 역사의 문화 도시', reason: '역사 문화 탐방을 즐기는 분께 완벽한 여행지', tags: ['역사', '문화', '힐링'] },
  { id: '4', name: '강릉', description: '바다와 커피 향이 가득한 도시', reason: '여유로운 휴식과 바다 분위기를 원하는 분께 추천', tags: ['해변', '카페', '힐링'] },
  { id: '5', name: '전주', description: '한옥마을과 맛의 도시', reason: '전통 문화와 미식 탐방을 동시에 즐기고 싶은 분께 추천', tags: ['전통', '한옥', '미식'] },
];

/** Mock 일정 데이터 (4일치) */
const MOCK_ITINERARY: ItineraryDayResult[] = [
  {
    day: 1, date: '2026-04-01',
    activities: [
      { time: '10:00', place: '성산일출봉', description: '유네스코 세계자연유산 화산 분화구 탐방', duration: '2시간', transport: '렌터카' },
      { time: '13:00', place: '섭지코지', description: '드라마 촬영지로 유명한 해안 절경', duration: '1시간 30분', transport: '렌터카' },
      { time: '19:00', place: '동문시장', description: '제주 야시장 먹거리 탐방', duration: '2시간', transport: '렌터카' },
    ],
  },
  {
    day: 2, date: '2026-04-02',
    activities: [
      { time: '09:00', place: '한라산 영실 코스', description: '제주의 지붕, 영실 기암절벽 트레킹', duration: '4시간', transport: '렌터카' },
      { time: '14:00', place: '천지연 폭포', description: '높이 22m의 제주 3대 폭포', duration: '1시간', transport: '렌터카' },
      { time: '17:00', place: '서귀포 매일올레시장', description: '다양한 제주 먹거리와 기념품', duration: '2시간', transport: '도보' },
    ],
  },
  {
    day: 3, date: '2026-04-03',
    activities: [
      { time: '10:00', place: '협재 해수욕장', description: '에메랄드빛 바다와 백사장', duration: '3시간', transport: '렌터카' },
      { time: '14:00', place: '오설록 티 뮤지엄', description: '제주 녹차 브랜드 체험 공간', duration: '1시간 30분', transport: '렌터카' },
    ],
  },
  {
    day: 4, date: '2026-04-04',
    activities: [
      { time: '09:00', place: '제주 민속촌', description: '전통 제주 민속 문화 체험', duration: '2시간', transport: '렌터카' },
      { time: '12:00', place: '제주국제공항', description: '귀경 준비', duration: '2시간', transport: '렌터카' },
    ],
  },
];

/** Mock 숙소 데이터 */
const MOCK_ACCOMMODATIONS: AccommodationResult[] = [
  {
    id: 'acc-1', name: '제주 해비치 호텔 & 리조트', type: '리조트',
    priceRange: '30~50만원/박', description: '성산일출봉 근처의 럭셔리 리조트. 오션뷰 객실과 야외 수영장 보유.',
    features: ['오션뷰', '야외수영장', '스파', '레스토랑'], location: '서귀포시 성산읍',
  },
  {
    id: 'acc-2', name: '제주 신라 호텔', type: '호텔',
    priceRange: '25~40만원/박', description: '중문관광단지 내 5성급 호텔. 다양한 부대시설과 편리한 접근성.',
    features: ['워터파크', '골프장', '피트니스', '조식포함'], location: '서귀포시 중문동',
  },
  {
    id: 'acc-3', name: '서귀포 힐링 게스트하우스', type: '게스트하우스',
    priceRange: '5~8만원/박', description: '서귀포 중심가에 위치한 깨끗한 게스트하우스. 여행자 커뮤니티 운영.',
    features: ['공용주방', '자전거 대여', '로컬 투어 연계', '무료주차'], location: '서귀포시 서귀동',
  },
];

/** Mock 맛집 데이터 */
const MOCK_RESTAURANTS: RestaurantResult[] = [
  {
    id: 'rest-1', name: '도민 흑돼지', cuisine: '제주 흑돼지', priceRange: '3~5만원/인',
    description: '제주 현지인이 즐겨 찾는 흑돼지 구이 전문점. 직화구이 방식.',
    features: ['현지인 맛집', '직화구이', '제주소주'], recommendedDays: [1, 2],
  },
  {
    id: 'rest-2', name: '해녀의 집', cuisine: '해산물', priceRange: '2~4만원/인',
    description: '해녀가 직접 잡은 신선한 해산물 요리. 성게비빔밥과 전복죽이 유명.',
    features: ['성게비빔밥', '전복죽', '해녀직접채취'], recommendedDays: [1],
  },
  {
    id: 'rest-3', name: '제주국수집', cuisine: '제주 향토음식', priceRange: '1~1.5만원/인',
    description: '고기국수와 비빔국수 전문점. 제주 향토 음식의 정수.',
    features: ['고기국수', '비빔국수', '현지맛'], recommendedDays: [2, 3],
  },
  {
    id: 'rest-4', name: '오래된 제주 밥집', cuisine: '제주 정식', priceRange: '1.5~2만원/인',
    description: '제주 전통 반찬과 함께 즐기는 가정식 백반. 몸국과 옥돔구이 추천.',
    features: ['몸국', '옥돔구이', '전통반찬'], recommendedDays: [3],
  },
  {
    id: 'rest-5', name: '카페 로스터리', cuisine: '카페', priceRange: '0.7~1.5만원/인',
    description: '오설록 근처 스페셜티 카페. 제주 감귤 음료와 녹차 디저트.',
    features: ['스페셜티커피', '감귤음료', '녹차디저트'], recommendedDays: [3, 4],
  },
];

@Injectable()
export class RecommendationsService {
  /**
   * 여행지 추천
   * TODO: ILlmService 주입 후 LLM 호출로 교체
   */
  async recommendDestinations(dto: RecommendDestinationsDto): Promise<DestinationResult[]> {
    return MOCK_DESTINATIONS;
  }

  /**
   * 일자별 동선 추천
   * TODO: ILlmService 주입 후 LLM 호출로 교체
   */
  async recommendItinerary(dto: RecommendItineraryDto): Promise<ItineraryDayResult[]> {
    return MOCK_ITINERARY.slice(0, dto.duration);
  }

  /**
   * 숙소 추천
   * TODO: ILlmService 주입 후 LLM 호출로 교체
   */
  async recommendAccommodations(dto: RecommendAccommodationsDto): Promise<AccommodationResult[]> {
    return MOCK_ACCOMMODATIONS;
  }

  /**
   * 맛집 추천
   * TODO: ILlmService 주입 후 LLM 호출로 교체
   */
  async recommendRestaurants(dto: RecommendRestaurantsDto): Promise<RestaurantResult[]> {
    return MOCK_RESTAURANTS;
  }
}

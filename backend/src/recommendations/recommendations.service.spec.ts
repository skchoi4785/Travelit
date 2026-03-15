/**
 * RecommendationsService 단위 테스트
 * 여행지/일정/숙소/맛집 추천 Mock 응답 검증
 */

import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  let service: RecommendationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationsService],
    }).compile();

    service = module.get<RecommendationsService>(RecommendationsService);
  });

  // ── 여행지 추천 ──────────────────────────────────────────────────────────

  describe('recommendDestinations', () => {
    it('여행지 목록 5개를 반환한다', async () => {
      const result = await service.recommendDestinations({
        travelStyle: 'active',
        environment: 'nature',
        duration: 4,
        companionType: 'couple',
        startDate: '2026-04-01',
      });

      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('tags');
    });
  });

  // ── 일자별 동선 추천 ─────────────────────────────────────────────────────

  describe('recommendItinerary', () => {
    it('요청된 duration 수만큼 일정을 반환한다', async () => {
      const result = await service.recommendItinerary({
        destinationId: '1',
        duration: 3,
        travelStyle: 'active',
        environment: 'nature',
        startDate: '2026-04-01',
      });

      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('day', 1);
      expect(result[0]).toHaveProperty('activities');
      expect(Array.isArray(result[0].activities)).toBe(true);
    });

    it('각 활동에 time, place, transport 필드가 있다', async () => {
      const result = await service.recommendItinerary({
        destinationId: '1',
        duration: 1,
        travelStyle: 'relaxed',
        environment: 'city',
        startDate: '2026-04-01',
      });

      const activity = result[0].activities[0];
      expect(activity).toHaveProperty('time');
      expect(activity).toHaveProperty('place');
      expect(activity).toHaveProperty('transport');
    });
  });

  // ── 숙소 추천 ────────────────────────────────────────────────────────────

  describe('recommendAccommodations', () => {
    it('숙소 목록을 반환하며 각 항목에 features와 location이 있다', async () => {
      const result = await service.recommendAccommodations({
        destinationId: '1',
        companionType: 'couple',
        duration: 3,
      });

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('features');
      expect(result[0]).toHaveProperty('location');
      expect(Array.isArray(result[0].features)).toBe(true);
    });
  });

  // ── 맛집 추천 ────────────────────────────────────────────────────────────

  describe('recommendRestaurants', () => {
    it('맛집 목록을 반환하며 각 항목에 recommendedDays가 있다', async () => {
      const result = await service.recommendRestaurants({
        destinationId: '1',
        duration: 4,
        travelStyle: 'active',
      });

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('recommendedDays');
      expect(Array.isArray(result[0].recommendedDays)).toBe(true);
    });

    it('맛집의 recommendedDays 값은 양수 정수이다', async () => {
      const result = await service.recommendRestaurants({
        destinationId: '1',
        duration: 4,
        travelStyle: 'relaxed',
      });

      result.forEach((rest) => {
        rest.recommendedDays.forEach((day) => {
          expect(day).toBeGreaterThan(0);
          expect(Number.isInteger(day)).toBe(true);
        });
      });
    });
  });
});

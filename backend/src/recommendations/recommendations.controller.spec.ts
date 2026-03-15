/**
 * RecommendationsController 단위 테스트
 * RecommendationsService를 Mock으로 주입하여 응답 구조 검증
 */

import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

/** RecommendationsService Mock */
const mockRecommendationsService = {
  recommendDestinations: jest.fn(),
  recommendItinerary: jest.fn(),
  recommendAccommodations: jest.fn(),
  recommendRestaurants: jest.fn(),
};

describe('RecommendationsController', () => {
  let controller: RecommendationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationsController],
      providers: [
        { provide: RecommendationsService, useValue: mockRecommendationsService },
      ],
    }).compile();

    controller = module.get<RecommendationsController>(RecommendationsController);
    jest.clearAllMocks();
  });

  // ── recommendDestinations ─────────────────────────────────────────────────

  describe('recommendDestinations', () => {
    it('success=true이고 data.destinations가 포함된 응답을 반환한다', async () => {
      const mockDestinations = [{ id: 'dest-1', name: '제주도' }];
      mockRecommendationsService.recommendDestinations.mockResolvedValue(mockDestinations);

      const result = await controller.recommendDestinations({
        companionType: 'couple',
        travelStyle: 'relaxed',
        environment: 'nature',
        duration: 3,
        startDate: '2026-05-01',
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('destinations');
      expect(result.data.destinations).toEqual(mockDestinations);
      expect(result).toHaveProperty('message');
    });
  });

  // ── recommendItinerary ────────────────────────────────────────────────────

  describe('recommendItinerary', () => {
    it('success=true이고 data.itinerary가 포함된 응답을 반환한다', async () => {
      const mockItinerary = [{ day: 1, activities: [] }];
      mockRecommendationsService.recommendItinerary.mockResolvedValue(mockItinerary);

      const result = await controller.recommendItinerary({
        destinationId: 'dest-1',
        duration: 3,
        travelStyle: 'relaxed',
        environment: 'nature',
        startDate: '2026-05-01',
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('itinerary');
      expect(result.data.itinerary).toEqual(mockItinerary);
    });
  });

  // ── recommendAccommodations ───────────────────────────────────────────────

  describe('recommendAccommodations', () => {
    it('success=true이고 data.accommodations가 포함된 응답을 반환한다', async () => {
      const mockAccommodations = [{ id: 'acc-1', name: '제주 호텔' }];
      mockRecommendationsService.recommendAccommodations.mockResolvedValue(mockAccommodations);

      const result = await controller.recommendAccommodations({
        destinationId: 'dest-1',
        duration: 3,
        companionType: 'couple',
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('accommodations');
      expect(result.data.accommodations).toEqual(mockAccommodations);
    });
  });

  // ── recommendRestaurants ──────────────────────────────────────────────────

  describe('recommendRestaurants', () => {
    it('success=true이고 data.restaurants가 포함된 응답을 반환한다', async () => {
      const mockRestaurants = [{ id: 'rest-1', name: '흑돼지 맛집' }];
      mockRecommendationsService.recommendRestaurants.mockResolvedValue(mockRestaurants);

      const result = await controller.recommendRestaurants({
        destinationId: 'dest-1',
        duration: 3,
        travelStyle: 'relaxed',
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('restaurants');
      expect(result.data.restaurants).toEqual(mockRestaurants);
    });
  });
});

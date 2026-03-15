/**
 * TravelPlansController 단위 테스트
 * TravelPlansService를 Mock으로 주입하여 응답 구조 검증
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlansService } from './travel-plans.service';

/** TravelPlansService Mock */
const mockTravelPlansService = {
  createPlan: jest.fn(),
  getPlans: jest.fn(),
};

/** Mock 여행 계획 객체 */
const mockPlan = {
  id: 'plan-uuid-1',
  userId: 'mock-user-id',
  title: '제주도 3박 4일',
  destination: '제주도',
  startDate: '2026-04-01',
  endDate: '2026-04-04',
  duration: 4,
  createdAt: new Date(),
};

describe('TravelPlansController', () => {
  let controller: TravelPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPlansController],
      providers: [
        { provide: TravelPlansService, useValue: mockTravelPlansService },
      ],
    }).compile();

    controller = module.get<TravelPlansController>(TravelPlansController);
    jest.clearAllMocks();
  });

  // ── createPlan ────────────────────────────────────────────────────────────

  describe('createPlan', () => {
    it('success=true이고 data에 생성된 계획이 포함된 응답을 반환한다', async () => {
      mockTravelPlansService.createPlan.mockResolvedValue(mockPlan);

      const result = await controller.createPlan(
        { user: { id: 'mock-user-id' } },
        {
          destinationId: 'dest-1',
          destinationName: '제주도',
          startDate: '2026-04-01',
          duration: 4,
          companionType: 'couple',
        },
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPlan);
      expect(result).toHaveProperty('message');
    });
  });

  // ── getPlans ──────────────────────────────────────────────────────────────

  describe('getPlans', () => {
    it('success=true이고 data.plans에 계획 목록이 포함된 응답을 반환한다', async () => {
      mockTravelPlansService.getPlans.mockResolvedValue([mockPlan]);

      const result = await controller.getPlans({ user: { id: 'mock-user-id' } });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('plans');
      expect(Array.isArray(result.data.plans)).toBe(true);
    });
  });
});

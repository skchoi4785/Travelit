/**
 * TravelPlansService 단위 테스트
 * 여행 계획 생성 및 조회 로직 검증
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlansService } from './travel-plans.service';

describe('TravelPlansService', () => {
  let service: TravelPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlansService],
    }).compile();

    service = module.get<TravelPlansService>(TravelPlansService);
  });

  // ── 여행 계획 생성 ────────────────────────────────────────────────────────

  describe('createPlan', () => {
    it('여행 계획 생성 시 id, title, status, createdAt을 반환한다', async () => {
      const result = await service.createPlan('user-1', {
        destinationId: '1',
        destinationName: '제주도',
        startDate: '2026-04-01',
        duration: 4,
        companionType: 'couple',
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('createdAt');
    });

    it('title은 여행지명과 기간을 포함한다', async () => {
      const result = await service.createPlan('user-1', {
        destinationId: '2',
        destinationName: '부산',
        startDate: '2026-05-01',
        duration: 3,
        companionType: 'friends',
      });

      expect(result.title).toContain('부산');
      expect(result.title).toContain('3일');
    });

    it('서로 다른 시점에 생성된 계획은 서로 다른 id를 가진다', async () => {
      const dto = {
        destinationId: '1',
        destinationName: '제주도',
        startDate: '2026-04-01',
        duration: 4,
        companionType: 'solo',
      };

      const plan1 = await service.createPlan('user-1', dto);
      // id가 타임스탬프 기반이므로 1ms 대기
      await new Promise((r) => setTimeout(r, 1));
      const plan2 = await service.createPlan('user-1', dto);

      expect(plan1.id).not.toBe(plan2.id);
    });
  });

  // ── 여행 계획 조회 ────────────────────────────────────────────────────────

  describe('getPlans', () => {
    it('사용자 계획 목록 조회 시 배열을 반환한다', async () => {
      const result = await service.getPlans('user-1');
      expect(Array.isArray(result)).toBe(true);
    });

    it('현재 Mock 구현은 빈 배열을 반환한다', async () => {
      const result = await service.getPlans('user-1');
      expect(result).toHaveLength(0);
    });
  });
});

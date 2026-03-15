/**
 * usePlanWizard 훅 단위 테스트
 * 위자드 상태 관리 로직 검증
 */

import { renderHook, act } from '@testing-library/react';
import { usePlanWizard, TOTAL_STEPS } from './usePlanWizard';

// localStorage Mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('usePlanWizard', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  // ── 초기 상태 ─────────────────────────────────────────────────────────────

  it('초기 상태: currentStep=1, formData 기본값, 빈 배열들', () => {
    const { result } = renderHook(() => usePlanWizard());

    expect(result.current.currentStep).toBe(1);
    expect(result.current.formData.startDate).toBe('');
    expect(result.current.formData.duration).toBe(0);
    expect(result.current.recommendations).toEqual([]);
    expect(result.current.selectedRestaurants).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  // ── goToNextStep ──────────────────────────────────────────────────────────

  it('goToNextStep: step 1 → 2로 증가한다', () => {
    const { result } = renderHook(() => usePlanWizard());

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe(2);
  });

  it('goToNextStep: TOTAL_STEPS에서 호출해도 초과하지 않는다', () => {
    const { result } = renderHook(() => usePlanWizard());

    // TOTAL_STEPS까지 이동
    act(() => {
      for (let i = 1; i < TOTAL_STEPS; i++) {
        result.current.goToNextStep();
      }
    });

    expect(result.current.currentStep).toBe(TOTAL_STEPS);

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe(TOTAL_STEPS);
  });

  // ── goToPrevStep ──────────────────────────────────────────────────────────

  it('goToPrevStep: step 2 → 1로 감소한다', () => {
    const { result } = renderHook(() => usePlanWizard());

    act(() => {
      result.current.goToNextStep(); // step → 2
    });

    act(() => {
      result.current.goToPrevStep(); // step → 1
    });

    expect(result.current.currentStep).toBe(1);
  });

  it('goToPrevStep: step=1에서 호출해도 1 미만으로 내려가지 않는다', () => {
    const { result } = renderHook(() => usePlanWizard());

    act(() => {
      result.current.goToPrevStep();
    });

    expect(result.current.currentStep).toBe(1);
  });

  // ── updateFormData ────────────────────────────────────────────────────────

  it('updateFormData: 기존 값을 유지하면서 새 값을 병합한다', () => {
    const { result } = renderHook(() => usePlanWizard());

    act(() => {
      result.current.updateFormData({ startDate: '2026-05-01' });
    });

    act(() => {
      result.current.updateFormData({ duration: 3 });
    });

    expect(result.current.formData.startDate).toBe('2026-05-01');
    expect(result.current.formData.duration).toBe(3);
  });

  // ── selectDestination ─────────────────────────────────────────────────────

  it('selectDestination: 선택 객체가 설정된다', () => {
    const { result } = renderHook(() => usePlanWizard());
    const mockDest = { id: 'dest-1', name: '제주도', description: '', reason: '자연 환경이 뛰어납니다', tags: [] };

    act(() => {
      result.current.selectDestination(mockDest);
    });

    expect(result.current.selectedDestination).toEqual(mockDest);
  });

  // ── selectAccommodation ───────────────────────────────────────────────────

  it('selectAccommodation: 선택 객체가 설정된다', () => {
    const { result } = renderHook(() => usePlanWizard());
    const mockAcc = { id: 'acc-1', name: '제주 호텔', type: 'hotel', priceRange: '10~15만원', description: '', features: [], location: '제주시' };

    act(() => {
      result.current.selectAccommodation(mockAcc);
    });

    expect(result.current.selectedAccommodation).toEqual(mockAcc);
  });

  // ── toggleRestaurant ──────────────────────────────────────────────────────

  it('toggleRestaurant: 빈 배열에서 추가하면 1개가 된다', () => {
    const { result } = renderHook(() => usePlanWizard());
    const mockRest = { id: 'rest-1', name: '흑돼지 맛집', cuisine: '한식', priceRange: '2~3만원', description: '', features: [], recommendedDays: [1] };

    act(() => {
      result.current.toggleRestaurant(mockRest);
    });

    expect(result.current.selectedRestaurants).toHaveLength(1);
    expect(result.current.selectedRestaurants[0].id).toBe('rest-1');
  });

  it('toggleRestaurant: 이미 있는 항목을 토글하면 제거된다', () => {
    const { result } = renderHook(() => usePlanWizard());
    const mockRest = { id: 'rest-1', name: '흑돼지 맛집', cuisine: '한식', priceRange: '2~3만원', description: '', features: [], recommendedDays: [1] };

    act(() => {
      result.current.toggleRestaurant(mockRest); // 추가
    });

    act(() => {
      result.current.toggleRestaurant(mockRest); // 제거
    });

    expect(result.current.selectedRestaurants).toHaveLength(0);
  });

  // ── fetchRecommendations ──────────────────────────────────────────────────

  it('fetchRecommendations: isLoading이 전환되고 결과 배열이 반환된다', async () => {
    const { result } = renderHook(() => usePlanWizard());

    await act(async () => {
      await result.current.fetchRecommendations();
    });

    expect(result.current.isLoading).toBe(false);
    expect(Array.isArray(result.current.recommendations)).toBe(true);
  });

  // ── createPlan ────────────────────────────────────────────────────────────

  it('createPlan: 여행지 선택 후 TravelPlan을 반환하고 localStorage.setItem을 호출한다', () => {
    const { result } = renderHook(() => usePlanWizard());
    const mockDest = { id: 'dest-1', name: '제주도', description: '', reason: '자연 환경이 뛰어납니다', tags: [] };
    const setItemSpy = jest.spyOn(localStorageMock, 'setItem');

    act(() => {
      result.current.selectDestination(mockDest);
      result.current.updateFormData({ startDate: '2026-05-01', duration: 3 });
    });

    let plan: any;
    act(() => {
      plan = result.current.createPlan();
    });

    expect(plan).toHaveProperty('id');
    expect(plan.destination).toBe('제주도');
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('createPlan: 여행지 미선택 시 Error를 던진다', () => {
    const { result } = renderHook(() => usePlanWizard());

    expect(() => {
      act(() => {
        result.current.createPlan();
      });
    }).toThrow(Error);
  });
});

/**
 * 여행 계획 생성 위자드 상태 관리 커스텀 훅
 * 4단계 위자드의 모든 상태를 보유하며, 각 Step 컴포넌트는 UI만 담당합니다.
 */

import { useState, useCallback } from 'react';
import { Destination, WizardFormData, TravelPlan, CompanionType, TravelStyle, Environment } from '@/types/plan';
import { mockDestinations, mockTravelPlans, PLANS_STORAGE_KEY } from '@/data/mockData';

/** 위자드 초기 폼 데이터 */
const initialFormData: WizardFormData = {
  startDate: '',
  duration: 0,
  companionType: '',
  travelStyle: '',
  environment: '',
};

/** usePlanWizard 훅 반환 타입 */
export interface UsePlanWizardReturn {
  currentStep: number;
  formData: WizardFormData;
  selectedDestination: Destination | null;
  recommendations: Destination[];
  isLoading: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateFormData: (partial: Partial<WizardFormData>) => void;
  selectDestination: (dest: Destination) => void;
  fetchRecommendations: () => Promise<void>;
  createPlan: () => TravelPlan;
}

export function usePlanWizard(): UsePlanWizardReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [recommendations, setRecommendations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /** 폼 데이터 부분 업데이트 */
  const updateFormData = useCallback((partial: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  }, []);

  /** 다음 단계로 이동 */
  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }, []);

  /** 이전 단계로 이동 */
  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  /** 여행지 선택 */
  const selectDestination = useCallback((dest: Destination) => {
    setSelectedDestination(dest);
  }, []);

  /**
   * 여행지 추천 목록 조회 (Mock)
   * 실제 LLM 연동 시 이 함수 내부만 수정하면 됩니다.
   * 2초 딜레이로 LLM 응답 대기 경험을 재현합니다.
   */
  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    // TODO: Sprint 1-B 완료 후 실제 API 호출로 교체
    // const response = await api.post('/recommendations/destinations', { ...formData });
    // setRecommendations(response.data.destinations);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // LLM 대기 시뮬레이션
    setRecommendations(mockDestinations);
    setIsLoading(false);
  }, []);

  /**
   * 여행 계획 생성 (Mock)
   * localStorage에 저장하여 페이지 새로고침 시에도 유지
   */
  const createPlan = useCallback((): TravelPlan => {
    if (!selectedDestination) throw new Error('여행지를 선택해주세요.');

    const startDate = new Date(formData.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + formData.duration - 1);

    const newPlan: TravelPlan = {
      id: `plan-${Date.now()}`,
      title: `${selectedDestination.name} ${formData.duration - 1}박 ${formData.duration}일 여행`,
      destination: selectedDestination.name,
      destinationId: selectedDestination.id,
      startDate: formData.startDate,
      endDate: endDate.toISOString().split('T')[0],
      duration: formData.duration,
      companionType: formData.companionType as CompanionType,
      travelStyle: formData.travelStyle as TravelStyle,
      environment: formData.environment as Environment,
      status: 'planning',
      createdAt: new Date().toISOString().split('T')[0],
    };

    // localStorage에 저장
    const existing = JSON.parse(
      typeof window !== 'undefined' ? localStorage.getItem(PLANS_STORAGE_KEY) || '[]' : '[]'
    ) as TravelPlan[];
    const updated = [newPlan, ...existing];
    if (typeof window !== 'undefined') {
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updated));
    }

    return newPlan;
  }, [selectedDestination, formData]);

  return {
    currentStep,
    formData,
    selectedDestination,
    recommendations,
    isLoading,
    goToNextStep,
    goToPrevStep,
    updateFormData,
    selectDestination,
    fetchRecommendations,
    createPlan,
  };
}

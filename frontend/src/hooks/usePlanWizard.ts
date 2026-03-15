/**
 * 여행 계획 생성 위자드 상태 관리 커스텀 훅 (Sprint 3: 8단계 확장)
 * 모든 위자드 상태를 보유하며, 각 Step 컴포넌트는 UI만 담당합니다.
 */

import { useState, useCallback } from 'react';
import {
  Destination, WizardFormData, TravelPlan,
  CompanionType, TravelStyle, Environment,
  Accommodation, Restaurant, ItineraryDay,
} from '@/types/plan';
import {
  mockDestinations, mockAccommodations, mockRestaurants,
  mockItinerary, PLANS_STORAGE_KEY,
} from '@/data/mockData';

export const TOTAL_STEPS = 8;

const initialFormData: WizardFormData = {
  startDate: '',
  duration: 0,
  companionType: '',
  travelStyle: '',
  environment: '',
};

export interface UsePlanWizardReturn {
  currentStep: number;
  totalSteps: number;
  formData: WizardFormData;
  selectedDestination: Destination | null;
  recommendations: Destination[];
  itinerary: ItineraryDay[];
  selectedAccommodation: Accommodation | null;
  selectedRestaurants: Restaurant[];
  accommodations: Accommodation[];
  restaurants: Restaurant[];
  isLoading: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateFormData: (partial: Partial<WizardFormData>) => void;
  selectDestination: (dest: Destination) => void;
  fetchRecommendations: () => Promise<void>;
  fetchItinerary: () => Promise<void>;
  fetchAccommodations: () => Promise<void>;
  fetchRestaurants: () => Promise<void>;
  selectAccommodation: (acc: Accommodation) => void;
  toggleRestaurant: (rest: Restaurant) => void;
  createPlan: () => TravelPlan;
}

export function usePlanWizard(): UsePlanWizardReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [recommendations, setRecommendations] = useState<Destination[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = useCallback((partial: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  }, []);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }, []);

  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const selectDestination = useCallback((dest: Destination) => {
    setSelectedDestination(dest);
  }, []);

  const selectAccommodation = useCallback((acc: Accommodation) => {
    setSelectedAccommodation(acc);
  }, []);

  const toggleRestaurant = useCallback((rest: Restaurant) => {
    setSelectedRestaurants((prev) => {
      const exists = prev.find((r) => r.id === rest.id);
      return exists ? prev.filter((r) => r.id !== rest.id) : [...prev, rest];
    });
  }, []);

  /** Step 2 → Step 3: 여행지 추천 (2초 Mock 딜레이) */
  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    // TODO: Sprint 1-B 완료 후 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRecommendations(mockDestinations);
    setIsLoading(false);
  }, []);

  /** Step 4 → Step 5: 일자별 동선 추천 (2초 Mock 딜레이) */
  const fetchItinerary = useCallback(async () => {
    setIsLoading(true);
    // TODO: POST /api/recommendations/itinerary 호출로 교체
    // TODO: Promise.all([fetchItinerary, fetchAccommodations, fetchRestaurants]) 병렬 처리 준비됨
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setItinerary(mockItinerary.slice(0, formData.duration));
    setIsLoading(false);
  }, [formData.duration]);

  /** 숙소 추천 로드 */
  const fetchAccommodations = useCallback(async () => {
    setIsLoading(true);
    // TODO: POST /api/recommendations/accommodations 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setAccommodations(mockAccommodations);
    setIsLoading(false);
  }, []);

  /** 맛집 추천 로드 */
  const fetchRestaurants = useCallback(async () => {
    setIsLoading(true);
    // TODO: POST /api/recommendations/restaurants 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRestaurants(mockRestaurants);
    setIsLoading(false);
  }, []);

  /** 여행 계획 생성 — localStorage 저장 */
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
      status: 'itinerary_ready',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const existing = JSON.parse(
      typeof window !== 'undefined' ? localStorage.getItem(PLANS_STORAGE_KEY) || '[]' : '[]'
    ) as TravelPlan[];
    if (typeof window !== 'undefined') {
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify([newPlan, ...existing]));
    }

    return newPlan;
  }, [selectedDestination, formData]);

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    selectedDestination,
    recommendations,
    itinerary,
    selectedAccommodation,
    selectedRestaurants,
    accommodations,
    restaurants,
    isLoading,
    goToNextStep,
    goToPrevStep,
    updateFormData,
    selectDestination,
    fetchRecommendations,
    fetchItinerary,
    fetchAccommodations,
    fetchRestaurants,
    selectAccommodation,
    toggleRestaurant,
    createPlan,
  };
}

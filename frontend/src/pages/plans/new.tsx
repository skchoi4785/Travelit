/**
 * 여행 계획 생성 위자드 진입 페이지 (/plans/new)
 * 8단계 위자드로 여행 계획을 생성합니다.
 */

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { usePlanWizard } from '@/hooks/usePlanWizard';
import WizardLayout from '@/components/plans/wizard/WizardLayout';
import Step1BasicInfo from '@/components/plans/wizard/Step1BasicInfo';
import Step2Preferences from '@/components/plans/wizard/Step2Preferences';
import Step3Recommendations from '@/components/plans/wizard/Step3Recommendations';
import Step4Confirm from '@/components/plans/wizard/Step4Confirm';
import Step5Itinerary from '@/components/plans/wizard/Step5Itinerary';
import Step6Accommodations from '@/components/plans/wizard/Step6Accommodations';
import Step7Restaurants from '@/components/plans/wizard/Step7Restaurants';
import Step8Summary from '@/components/plans/wizard/Step8Summary';

export default function NewPlanPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const {
    currentStep,
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
  } = usePlanWizard();

  // 인증 가드: 미로그인 시 /login으로 리다이렉트
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  /** Step 2 → Step 3: 여행지 추천 로드 후 단계 이동 */
  const handleFetchRecommendationsAndNext = async () => {
    await fetchRecommendations();
    goToNextStep();
  };

  /** Step 4 → Step 5: 일정/숙소/맛집 병렬 로드 후 단계 이동 */
  const handleFetchItineraryAndNext = async () => {
    await Promise.all([fetchItinerary(), fetchAccommodations(), fetchRestaurants()]);
    goToNextStep();
  };

  return (
    <WizardLayout currentStep={currentStep}>
      {currentStep === 1 && (
        <Step1BasicInfo
          formData={formData}
          onUpdate={updateFormData}
          onNext={goToNextStep}
        />
      )}

      {currentStep === 2 && (
        <Step2Preferences
          formData={formData}
          onUpdate={updateFormData}
          onNext={handleFetchRecommendationsAndNext}
          onPrev={goToPrevStep}
          isLoading={isLoading}
        />
      )}

      {currentStep === 3 && (
        <Step3Recommendations
          recommendations={recommendations}
          selectedDestination={selectedDestination}
          isLoading={isLoading}
          onSelect={selectDestination}
          onNext={goToNextStep}
          onPrev={goToPrevStep}
          onRetry={fetchRecommendations}
        />
      )}

      {currentStep === 4 && selectedDestination && (
        <Step4Confirm
          selectedDestination={selectedDestination}
          formData={formData}
          isLoading={isLoading}
          onPrev={goToPrevStep}
          onNext={handleFetchItineraryAndNext}
        />
      )}

      {currentStep === 5 && (
        <Step5Itinerary
          itinerary={itinerary}
          isLoading={isLoading}
          onNext={goToNextStep}
          onPrev={goToPrevStep}
        />
      )}

      {currentStep === 6 && (
        <Step6Accommodations
          accommodations={accommodations}
          selectedAccommodation={selectedAccommodation}
          isLoading={isLoading}
          onSelect={selectAccommodation}
          onNext={goToNextStep}
          onPrev={goToPrevStep}
        />
      )}

      {currentStep === 7 && (
        <Step7Restaurants
          restaurants={restaurants}
          selectedRestaurants={selectedRestaurants}
          isLoading={isLoading}
          onToggle={toggleRestaurant}
          onNext={goToNextStep}
          onPrev={goToPrevStep}
        />
      )}

      {currentStep === 8 && (
        <Step8Summary
          formData={formData}
          selectedDestination={selectedDestination}
          selectedAccommodation={selectedAccommodation}
          selectedRestaurants={selectedRestaurants}
          itinerary={itinerary}
          onSave={createPlan}
          onPrev={goToPrevStep}
        />
      )}
    </WizardLayout>
  );
}

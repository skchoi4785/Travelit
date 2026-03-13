/**
 * 여행 계획 생성 위자드 진입 페이지 (/plans/new)
 * 4단계 위자드로 여행 계획을 생성합니다.
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

export default function NewPlanPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const {
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

  /** Step 2 → Step 3: 추천 데이터 로드 후 단계 이동 */
  const handleFetchAndNext = async () => {
    await fetchRecommendations();
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
          onNext={handleFetchAndNext}
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
          onPrev={goToPrevStep}
          onConfirm={createPlan}
        />
      )}
    </WizardLayout>
  );
}

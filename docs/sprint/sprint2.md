# Sprint 2: 여행 계획 생성 위자드 + LLM 여행지 추천 (Mock)

## 메타 정보

| 항목 | 내용 |
|------|------|
| 스프린트 번호 | Sprint 2 |
| Phase | Phase 1 (MVP 핵심 여행 계획 기능) |
| 기간 | 2주 |
| 브랜치 | `sprint2` (sprint1 기반 분기) |
| 담당 | 전체 팀 |
| 상태 | 📋 계획 완료 |

---

## 스프린트 목표

> **사용자가 성격/선호도를 입력하면 LLM 기반 여행지 추천을 받고 선택할 수 있다**

이 스프린트는 Travelit의 핵심 가치인 AI 여행지 추천 경험을 사용자에게 처음으로 제공하는 스프린트입니다. Sprint 1에서 구축된 인증 시스템과 프로젝트 구조를 기반으로, 여행 계획 생성 위자드 UI와 여행지 추천 결과 화면을 완성합니다.

Sprint 1과 동일하게 **프론트엔드 화면 우선** 전략을 유지합니다. 실제 LLM API 연동 없이 Mock 데이터로 전체 UI 흐름을 완성하며, 실제 LLM API 연동은 Sprint 1-B(백엔드 환경 구성)와 함께 이후 진행합니다.

---

## 구현 범위

### Sprint 2-A: 프론트엔드 화면 구현 (이번 스프린트 범위)

- 여행 계획 생성 위자드 (`/plans/new`) — 4단계 Step-by-Step UI
  - Step 1: 여행 기본 정보 (출발일, 기간, 동반자 유형)
  - Step 2: 여행 스타일 선호도 (활동적/휴식, 도시/자연 카드 선택)
  - Step 3: AI 여행지 추천 결과 (Mock 데이터, 카드 3~5개) + 선택
  - Step 4: 선택 완료 확인 화면
- 여행 계획 목록 (`/plans`) — Mock 데이터 카드 리스트 + 로컬 상태 관리
- 여행 계획 상세 (`/plans/[id]`) — 일자별 타임라인 UI + 숙소/맛집 추천 카드 (Mock)
- 로딩 UI (스켈레톤/스피너, 2초 인위적 딜레이로 실제 LLM 대기 경험 재현)
- 위자드 프로그레스 바

### Sprint 2-B: 백엔드 코드 추가 (실행 없이 코드만 작성)

- `TravelPlan`, `Destination` Prisma 모델 추가
- `POST /api/recommendations/destinations` 엔드포인트 뼈대
- `ILlmService` 추상화 인터페이스 정의

### 제외 항목

- 실제 LLM API 연동 (OpenAI / Claude) — Sprint 1-B 환경 구성 후 진행
- 백엔드 실행 환경 구성 — Sprint 1-B에서 처리
- 지도 연동 — Sprint 5에서 구현
- 여행 계획 수정/삭제 — Sprint 4에서 구현
- OAuth 소셜 로그인 — Backlog

---

## 프로젝트 파일 구조

### 프론트엔드 (Next.js 12 Pages Router)

```
frontend/
├── src/
│   ├── pages/
│   │   ├── plans/
│   │   │   ├── index.tsx               # 여행 계획 목록 페이지
│   │   │   ├── new.tsx                 # 여행 계획 생성 위자드 진입점
│   │   │   └── [id].tsx                # 여행 계획 상세 페이지
│   ├── components/
│   │   ├── plans/
│   │   │   ├── wizard/
│   │   │   │   ├── WizardLayout.tsx    # 위자드 공통 레이아웃 (프로그레스 바 포함)
│   │   │   │   ├── ProgressBar.tsx     # 단계 진행 프로그레스 바
│   │   │   │   ├── Step1BasicInfo.tsx  # Step 1: 기본 정보 입력
│   │   │   │   ├── Step2Preferences.tsx # Step 2: 선호도 카드 선택
│   │   │   │   ├── Step3Recommendations.tsx # Step 3: 추천 여행지 결과
│   │   │   │   └── Step4Confirm.tsx    # Step 4: 선택 완료 확인
│   │   │   ├── PlanCard.tsx            # 여행 계획 카드 컴포넌트
│   │   │   ├── DestinationCard.tsx     # 추천 여행지 카드
│   │   │   └── ItineraryTimeline.tsx   # 일자별 타임라인
│   │   └── common/
│   │       ├── SkeletonCard.tsx        # 로딩 스켈레톤 카드
│   │       └── LoadingSpinner.tsx      # 로딩 스피너
│   ├── data/
│   │   └── mockData.ts                 # Mock 여행지/계획 데이터
│   ├── hooks/
│   │   └── usePlanWizard.ts            # 위자드 상태 관리 커스텀 훅
│   └── types/
│       └── plan.ts                     # 여행 계획 관련 TypeScript 타입 정의
```

### 백엔드 (NestJS — 코드만 추가, 실행 미검증)

```
backend/
├── src/
│   ├── recommendations/
│   │   ├── recommendations.controller.ts  # POST /api/recommendations/destinations 뼈대
│   │   ├── recommendations.service.ts     # 추천 비즈니스 로직 뼈대
│   │   ├── recommendations.module.ts
│   │   ├── dto/
│   │   │   └── recommend-destinations.dto.ts  # 추천 요청 DTO
│   │   └── interfaces/
│   │       └── llm-service.interface.ts   # ILlmService 추상화 인터페이스
│   ├── travel-plans/
│   │   ├── travel-plans.controller.ts     # POST /api/travel-plans 뼈대
│   │   ├── travel-plans.service.ts        # 여행 계획 CRUD 뼈대
│   │   └── travel-plans.module.ts
├── prisma/
│   └── schema.prisma                      # TravelPlan, Destination 모델 추가
```

---

## Mock 데이터 정의

### 여행지 추천 Mock 데이터

```typescript
// frontend/src/data/mockData.ts

export const mockDestinations = [
  {
    id: '1',
    name: '제주도',
    description: '자연과 문화가 어우러진 섬',
    reason: '활동적인 여행과 자연 경관을 선호하는 분께 추천',
    imageUrl: '/images/jeju.jpg',
    tags: ['자연', '해변', '트레킹'],
  },
  {
    id: '2',
    name: '부산',
    description: '해양 도시의 활기찬 매력',
    reason: '도시 문화와 해변을 함께 즐길 수 있는 최적의 도시',
    imageUrl: '/images/busan.jpg',
    tags: ['도시', '해변', '미식'],
  },
  {
    id: '3',
    name: '경주',
    description: '천년 역사의 문화 도시',
    reason: '역사 문화 탐방을 즐기는 분께 완벽한 여행지',
    imageUrl: '/images/gyeongju.jpg',
    tags: ['역사', '문화', '힐링'],
  },
  {
    id: '4',
    name: '강릉',
    description: '바다와 커피 향이 가득한 도시',
    reason: '여유로운 휴식과 바다 분위기를 원하는 분께 추천',
    imageUrl: '/images/gangneung.jpg',
    tags: ['해변', '카페', '힐링'],
  },
  {
    id: '5',
    name: '전주',
    description: '한옥마을과 맛의 도시',
    reason: '전통 문화와 미식 탐방을 동시에 즐기고 싶은 분께 추천',
    imageUrl: '/images/jeonju.jpg',
    tags: ['전통', '한옥', '미식'],
  },
];

export const mockTravelPlans = [
  {
    id: 'plan-1',
    title: '제주도 3박 4일 여행',
    destination: '제주도',
    startDate: '2026-04-01',
    endDate: '2026-04-04',
    companionType: '커플',
    status: 'completed',
    createdAt: '2026-03-01',
  },
  {
    id: 'plan-2',
    title: '부산 2박 3일 여행',
    destination: '부산',
    startDate: '2026-04-15',
    endDate: '2026-04-17',
    companionType: '친구',
    status: 'planning',
    createdAt: '2026-03-05',
  },
];

export const mockItinerary = [
  {
    day: 1,
    date: '2026-04-01',
    activities: [
      { time: '10:00', place: '성산일출봉', duration: '2시간', transport: '렌터카' },
      { time: '13:00', place: '섭지코지', duration: '1시간 30분', transport: '렌터카' },
      { time: '15:00', place: '우도', duration: '3시간', transport: '페리' },
      { time: '19:00', place: '동문시장', duration: '2시간', transport: '렌터카' },
    ],
  },
  {
    day: 2,
    date: '2026-04-02',
    activities: [
      { time: '09:00', place: '한라산 영실 코스', duration: '4시간', transport: '렌터카' },
      { time: '14:00', place: '천지연 폭포', duration: '1시간', transport: '렌터카' },
      { time: '17:00', place: '서귀포 매일올레시장', duration: '2시간', transport: '도보' },
    ],
  },
];
```

---

## API 스펙 (백엔드 뼈대)

### POST /api/recommendations/destinations — 여행지 추천

> Sprint 2-B에서 뼈대만 작성. 실제 LLM 연동은 Sprint 1-B 완료 후 진행.

**요청**

```json
{
  "travelStyle": "active",
  "environment": "nature",
  "duration": 4,
  "companionType": "couple",
  "startDate": "2026-04-01"
}
```

**요청 필드 설명**

| 필드 | 타입 | 값 범위 | 설명 |
|------|------|---------|------|
| `travelStyle` | string | `active` / `relaxed` | 활동적 / 휴식형 |
| `environment` | string | `nature` / `city` | 자연 / 도시 선호 |
| `duration` | number | 1~14 | 여행 기간 (일) |
| `companionType` | string | `solo` / `couple` / `family` / `friends` | 동반자 유형 |
| `startDate` | string | ISO 8601 날짜 | 출발일 |

**응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "destinations": [
      {
        "id": "1",
        "name": "제주도",
        "description": "자연과 문화가 어우러진 섬",
        "reason": "활동적인 여행과 자연 경관을 선호하는 분께 추천",
        "imageUrl": "/images/jeju.jpg",
        "tags": ["자연", "해변", "트레킹"]
      }
    ]
  },
  "message": "여행지 추천이 완료되었습니다"
}
```

### POST /api/travel-plans — 여행 계획 생성

**요청**

```json
{
  "destinationId": "1",
  "destinationName": "제주도",
  "startDate": "2026-04-01",
  "duration": 4,
  "companionType": "couple"
}
```

**응답 (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "제주도 4일 여행",
    "status": "planning",
    "createdAt": "2026-03-14T00:00:00.000Z"
  },
  "message": "여행 계획이 생성되었습니다"
}
```

---

## 데이터 모델 (Prisma Schema 추가분)

```prisma
// backend/prisma/schema.prisma 에 추가

model Destination {
  id          String   @id @default(uuid())
  name        String
  description String
  imageUrl    String?
  tags        String[]
  createdAt   DateTime @default(now())

  travelPlans TravelPlan[]

  @@map("destinations")
}

model TravelPlan {
  id             String      @id @default(uuid())
  userId         String
  user           User        @relation(fields: [userId], references: [id])
  destinationId  String
  destination    Destination @relation(fields: [destinationId], references: [id])
  title          String
  startDate      DateTime
  endDate        DateTime
  duration       Int
  companionType  String
  travelStyle    String?
  environment    String?
  status         PlanStatus  @default(PLANNING)
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  @@map("travel_plans")
}

enum PlanStatus {
  PLANNING
  ITINERARY_READY
  COMPLETED
}
```

---

## 태스크 분해 (Task Breakdown)

### Task 1: TypeScript 타입 정의 및 Mock 데이터 준비
**우선순위**: P0 (모든 태스크의 기반)
**예상 소요**: 1시간
**파일**: `frontend/src/types/plan.ts`, `frontend/src/data/mockData.ts`

- ⬜ `plan.ts` 타입 파일 작성:
  - `TravelStyle`: `'active' | 'relaxed'`
  - `Environment`: `'nature' | 'city'`
  - `CompanionType`: `'solo' | 'couple' | 'family' | 'friends'`
  - `Destination` 인터페이스 (id, name, description, reason, imageUrl, tags)
  - `TravelPlan` 인터페이스 (id, title, destination, startDate, endDate, companionType, status)
  - `WizardFormData` 인터페이스 (위자드 단계별 입력 데이터 통합)
  - `ItineraryDay` 인터페이스 (day, date, activities 배열)
  - `Activity` 인터페이스 (time, place, duration, transport)
- ⬜ `mockData.ts` 파일 작성: 위 Mock 데이터 정의 섹션의 전체 데이터 작성

---

### Task 2: 위자드 공통 레이아웃 및 프로그레스 바
**우선순위**: P0
**예상 소요**: 반나절
**파일**: `frontend/src/components/plans/wizard/WizardLayout.tsx`, `ProgressBar.tsx`
**의존성**: Task 1

- ⬜ `WizardLayout.tsx` 구현:
  - `currentStep` (1~4), `totalSteps` (4) props 수신
  - `ProgressBar` 컴포넌트 상단 배치
  - 단계 레이블 표시 (기본 정보 / 선호도 / 추천 결과 / 확인)
  - 이전/다음 버튼 공통 배치 영역 (자식 컴포넌트에서 주입)
  - 취소 링크 (`/plans`로 이동)

- ⬜ `ProgressBar.tsx` 구현:
  - 4단계 원형 인디케이터 + 연결선
  - 완료 단계: 채워진 색상 + 체크 아이콘
  - 현재 단계: 강조 색상
  - 미완료 단계: 회색

---

### Task 3: 위자드 상태 관리 커스텀 훅
**우선순위**: P0
**예상 소요**: 반나절
**파일**: `frontend/src/hooks/usePlanWizard.ts`
**의존성**: Task 1

- ⬜ `usePlanWizard` 훅 구현:
  - `currentStep` 상태 (초기값: 1)
  - `formData` 상태 (`WizardFormData` 타입)
  - `selectedDestination` 상태 (`Destination | null`)
  - `isLoading` 상태 (추천 결과 로딩 중)
  - `goToNextStep()`: 현재 단계 유효성 검사 후 다음 단계로 이동
  - `goToPrevStep()`: 이전 단계로 이동
  - `updateFormData(partial)`: 부분 업데이트
  - `selectDestination(dest)`: 여행지 선택
  - `fetchRecommendations()`: Mock 응답 반환 (2초 딜레이 적용)

  ```typescript
  // fetchRecommendations 구현 예시
  const fetchRecommendations = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // LLM 대기 시뮬레이션
    setIsLoading(false);
    return mockDestinations;
  };
  ```

---

### Task 4: Step 1 — 여행 기본 정보 입력
**우선순위**: P1
**예상 소요**: 반나절
**파일**: `frontend/src/components/plans/wizard/Step1BasicInfo.tsx`
**의존성**: Task 2, Task 3

- ⬜ `Step1BasicInfo.tsx` 구현:
  - **출발일 선택**: HTML `<input type="date">` (오늘 이후 날짜만 선택 가능, `min` 속성 설정)
  - **여행 기간 선택**: 드롭다운 또는 버튼 그룹 (`1박 2일` ~ `6박 7일`, 숫자 값으로 변환)
  - **동반자 유형 선택**: 카드형 선택 UI
    - 혼자 (solo)
    - 커플 (couple)
    - 가족 (family)
    - 친구 (friends)
    - 선택 시 카드 테두리 강조 + 체크 아이콘 표시
  - 다음 단계 버튼: 모든 항목 입력 시 활성화 (미입력 시 disabled)
  - `usePlanWizard`의 `updateFormData()` 및 `goToNextStep()` 연결

---

### Task 5: Step 2 — 여행 스타일 선호도 선택
**우선순위**: P1
**예상 소요**: 반나절
**파일**: `frontend/src/components/plans/wizard/Step2Preferences.tsx`
**의존성**: Task 2, Task 3

- ⬜ `Step2Preferences.tsx` 구현:
  - **여행 스타일** 이분 선택 카드 (둘 중 하나 선택):
    - 활동적인 여행 (active) — 아이콘: 트레킹/스포츠
    - 여유로운 휴식 (relaxed) — 아이콘: 커피/휴식
  - **선호 환경** 이분 선택 카드 (둘 중 하나 선택):
    - 자연/아웃도어 (nature) — 아이콘: 산/바다
    - 도시/문화 (city) — 아이콘: 빌딩/카페
  - 선택된 카드: 배경색 변경 + 테두리 강조 (Tailwind `ring-2 ring-primary`)
  - 두 항목 모두 선택 시 다음 단계 버튼 활성화
  - "추천 받기" 버튼 클릭 시 `fetchRecommendations()` 호출 후 Step 3으로 이동

---

### Task 6: Step 3 — AI 여행지 추천 결과
**우선순위**: P0 (핵심 기능)
**예상 소요**: 하루
**파일**: `frontend/src/components/plans/wizard/Step3Recommendations.tsx`, `frontend/src/components/plans/DestinationCard.tsx`
**의존성**: Task 3, Task 4 (SkeletonCard)

- ⬜ `SkeletonCard.tsx` 구현:
  - 카드 형태의 회색 플레이스홀더 (이미지 영역, 제목, 설명 2줄)
  - Tailwind `animate-pulse` 클래스 적용
  - 3개 카드 동시 표시

- ⬜ `DestinationCard.tsx` 구현:
  - props: `destination: Destination`, `isSelected: boolean`, `onSelect: () => void`
  - 이미지 영역 (없을 경우 그라디언트 플레이스홀더)
  - 여행지 이름 (h3)
  - 설명 텍스트 (1줄 말줄임)
  - 추천 이유 텍스트 (이탤릭, 2줄)
  - 태그 배지 목록 (Tailwind `badge` 스타일)
  - 선택 시 카드 테두리 강조 + 우측 하단 체크 아이콘
  - `onClick` 시 `onSelect()` 호출

- ⬜ `Step3Recommendations.tsx` 구현:
  - `isLoading` true: `SkeletonCard` 3개 표시
  - `isLoading` false: `DestinationCard` 목록 (3~5개) 표시
  - 여행지 선택 시 `selectDestination()` 호출
  - 하나라도 선택 시 "다음 단계" 버튼 활성화
  - "다시 추천받기" 링크 (Step 2로 돌아가지 않고 `fetchRecommendations()` 재호출)

---

### Task 7: Step 4 — 선택 완료 확인
**우선순위**: P1
**예상 소요**: 2시간
**파일**: `frontend/src/components/plans/wizard/Step4Confirm.tsx`
**의존성**: Task 3, Task 6

- ⬜ `Step4Confirm.tsx` 구현:
  - 선택된 여행지 요약 카드 (이름, 이미지, 태그)
  - 여행 기본 정보 요약 (출발일, 기간, 동반자 유형)
  - 선호도 요약 (여행 스타일, 선호 환경)
  - "여행 계획 만들기" 버튼:
    - 클릭 시 Mock 저장 처리 (로컬 상태에 새 계획 추가)
    - 완료 후 `/plans`로 라우터 이동 (`router.push('/plans')`)
  - "다시 선택하기" 링크 (Step 3으로 이동)

---

### Task 8: 위자드 진입 페이지
**우선순위**: P1
**예상 소요**: 1시간
**파일**: `frontend/src/pages/plans/new.tsx`
**의존성**: Task 2~7 모두

- ⬜ `new.tsx` 구현:
  - `usePlanWizard` 훅 사용
  - `currentStep` 에 따라 Step 컴포넌트 조건부 렌더링
  - `WizardLayout`으로 래핑 (프로그레스 바 표시)
  - 인증 가드: 미로그인 시 `/login`으로 리다이렉트 (Sprint 1 `AuthContext` 활용)

---

### Task 9: 여행 계획 목록 페이지
**우선순위**: P1
**예상 소요**: 반나절
**파일**: `frontend/src/pages/plans/index.tsx`, `frontend/src/components/plans/PlanCard.tsx`
**의존성**: Task 1

- ⬜ `PlanCard.tsx` 구현:
  - props: `plan: TravelPlan`
  - 여행지 이름, 여행 기간 (시작~종료일), 동반자 유형, 상태 배지
  - 상태 배지: `planning` → 파란색 "계획 중", `completed` → 초록색 "완료"
  - 카드 클릭 시 `/plans/[id]`로 이동

- ⬜ `plans/index.tsx` 구현:
  - `useState`로 `plans` 상태 관리 (초기값: `mockTravelPlans`)
  - 계획 카드 그리드 레이아웃 (2열, 모바일 1열)
  - 빈 상태 UI: 계획이 없을 때 "첫 여행 계획을 만들어보세요" 안내 + "새 계획 만들기" 버튼
  - "새 여행 계획 만들기" 버튼 (`/plans/new` 링크)
  - 인증 가드 적용

  **로컬 상태 관리 전략**: `Context API` 또는 `useState` + props drilling으로 위자드에서 새로 생성된 계획을 목록에 추가. `localStorage`에 임시 저장하여 페이지 새로고침 시에도 유지.

---

### Task 10: 여행 계획 상세 페이지
**우선순위**: P1
**예상 소요**: 하루
**파일**: `frontend/src/pages/plans/[id].tsx`, `frontend/src/components/plans/ItineraryTimeline.tsx`
**의존성**: Task 1, Task 9

- ⬜ `ItineraryTimeline.tsx` 구현:
  - props: `days: ItineraryDay[]`
  - 일자별 탭 (Day 1, Day 2, ...)
  - 선택된 일자의 활동 목록을 시간순 타임라인으로 표시
  - 각 활동 항목: 시간, 장소명, 소요시간, 이동수단 아이콘
  - 타임라인 선 (세로선 + 원형 마커)

- ⬜ `plans/[id].tsx` 구현:
  - URL 파라미터 `id`로 Mock 데이터에서 계획 조회 (`router.query.id`)
  - 존재하지 않는 id: 404 UI 표시
  - 상단: 여행 기본 정보 (목적지, 기간, 동반자 유형) 헤더
  - 중단: `ItineraryTimeline` 컴포넌트
  - 하단: 숙소 추천 카드 1~2개 (Mock), 맛집 추천 카드 2~3개 (Mock)
  - 숙소/맛집 카드: 이름, 유형, 가격대 (Mock 텍스트)
  - 인증 가드 적용

---

### Task 11: 백엔드 뼈대 코드 추가 (Sprint 2-B)
**우선순위**: P2 (프론트엔드 완료 후 진행)
**예상 소요**: 반나절
**파일**: 백엔드 관련 파일들
**의존성**: 없음 (실행 검증 불필요)

- ⬜ `prisma/schema.prisma` 에 `Destination`, `TravelPlan`, `PlanStatus` 추가
  - 위 데이터 모델 섹션 참조
  - `User` 모델에 `travelPlans TravelPlan[]` 관계 필드 추가

- ⬜ `ILlmService` 인터페이스 정의:
  ```typescript
  // backend/src/recommendations/interfaces/llm-service.interface.ts
  export interface ILlmService {
    recommendDestinations(params: RecommendParams): Promise<Destination[]>;
  }
  ```

- ⬜ `RecommendDestinationsDto` 작성 (class-validator 데코레이터 포함)

- ⬜ `RecommendationsController` 뼈대:
  - `@Post('destinations')` 엔드포인트
  - TODO 주석으로 LLM 연동 위치 명시

- ⬜ `RecommendationsService` 뼈대:
  - TODO 주석으로 ILlmService 주입 및 호출 위치 명시
  - 임시 Mock 응답 반환 (실제 LLM 연동 전까지)

- ⬜ `TravelPlansController` 뼈대:
  - `@Post()` 엔드포인트 — 여행 계획 생성
  - `@Get()` 엔드포인트 — 목록 조회 (인증 가드 적용)

---

### Task 12: 통합 검증
**우선순위**: P0 (완료 기준 확인)
**예상 소요**: 반나절
**의존성**: Task 1~10 완료 후

- ⬜ 전체 위자드 플로우 수동 검증 (Step 1 → 2 → 3 → 4 → `/plans` 이동)
- ⬜ 2초 로딩 딜레이 및 스켈레톤 UI 정상 표시 확인
- ⬜ 여행 계획 목록에 신규 계획 추가 확인 (새로고침 후에도 유지)
- ⬜ 여행 계획 상세 페이지 타임라인 및 숙소/맛집 카드 표시 확인
- ⬜ 브라우저 콘솔 에러 없음 확인
- ⬜ TypeScript 타입 에러 없음 확인 (`tsc --noEmit`)
- ⬜ 모바일 뷰포트 (375px) 레이아웃 깨짐 없음 확인

---

## 기술적 접근 방법

### 위자드 상태 관리 전략

위자드 4단계는 페이지 이동 없이 단일 `new.tsx` 페이지 내에서 컴포넌트 교체로 구현합니다. `usePlanWizard` 커스텀 훅이 모든 상태를 보유하며, 각 Step 컴포넌트는 순수하게 UI만 담당합니다. 이 설계는 단계 간 데이터 유실 방지와 뒤로가기 기능 구현을 단순화합니다.

### Mock LLM 응답 전략

실제 LLM 응답과 동일한 UX를 제공하기 위해 2초 `setTimeout` 딜레이를 적용합니다. 이를 통해 로딩 스켈레톤 UI를 사용자가 경험하게 하여, 향후 실제 LLM 연동 시 UX 충격을 최소화합니다.

나중에 실제 LLM API로 교체할 때는 `fetchRecommendations()` 함수 내부만 수정하면 되도록 인터페이스를 일관되게 설계합니다.

### 로컬 상태 영속성

백엔드 없이 생성된 여행 계획은 `localStorage`에 저장하여 페이지 새로고침 시에도 유지합니다. 실제 API 연동 시 `localStorage` 조회 로직을 API 호출로 교체합니다.

```typescript
// 로컬 스토리지 키 상수
const PLANS_STORAGE_KEY = 'travelit_mock_plans';
```

### Next.js 12 Pages Router 주의사항

- `useRouter`는 `next/router`에서 임포트 (`next/navigation` 아님)
- 동적 라우트 파라미터: `router.query.id` 사용 (`params` 객체 없음)
- `getServerSideProps` / `getStaticProps` 필요 시 Pages Router 방식 사용
- 이미지 최적화: `next/image` 사용 시 `next.config.js`에 `images.domains` 설정 필요

---

## 의존성 및 리스크

### 의존성

| 항목 | 내용 |
|------|------|
| Sprint 1-A | `AuthContext`, 공통 레이아웃 컴포넌트, `lib/api.ts`, Pages Router 구조 |
| Sprint 1-B (미완료) | 백엔드 실행 환경 — Sprint 2-A는 Mock으로 독립 진행 가능 |

### 리스크 및 대응 방안

| 리스크 | 영향도 | 대응 방안 |
|--------|--------|----------|
| Sprint 1-A 산출물 누락 (AuthContext 등) | 높음 | Sprint 2 시작 전 Sprint 1-A 결과물 확인 필수. 없을 경우 최소한의 Mock 인증으로 대체 |
| Node.js 14 호환성 문제 | 중간 | 신규 패키지 설치 시 `engines` 필드 확인. dnd-kit 등 최신 패키지는 Node 16+ 요구 가능 |
| TypeScript 타입 불일치 | 낮음 | 개발 중 `tsc --noEmit` 자주 실행. `any` 타입 사용 지양 |
| 모바일 레이아웃 깨짐 | 낮음 | 위자드 카드 UI는 모바일 1열 기준으로 설계 후 데스크탑 확장 |
| Mock → 실제 API 전환 시 인터페이스 불일치 | 중간 | TypeScript 타입을 백엔드 응답 스펙과 일치하도록 사전 정의 |

---

## 완료 기준 (Definition of Done)

- ✅ 기준: 모든 항목이 로컬 환경에서 검증되어야 스프린트 완료로 간주합니다.

| 번호 | 완료 기준 | 검증 방법 |
|------|----------|----------|
| 1 | 로그인한 사용자가 `/plans/new`에 접근하면 위자드 Step 1이 표시된다 | 브라우저에서 직접 URL 접근 |
| 2 | Step 1에서 출발일, 기간, 동반자 유형을 선택하면 Step 2로 이동한다 | 수동 클릭 테스트 |
| 3 | Step 2에서 여행 스타일과 선호 환경을 선택 후 "추천 받기"를 클릭하면 2초 로딩 후 Step 3에서 여행지 카드 3~5개가 표시된다 | 수동 클릭 테스트, 타이머 확인 |
| 4 | Step 3 로딩 중 스켈레톤 카드 3개가 `animate-pulse` 애니메이션으로 표시된다 | 브라우저 시각 확인 |
| 5 | Step 3에서 여행지 카드를 선택하면 카드가 강조되고 "다음 단계" 버튼이 활성화된다 | 수동 클릭 테스트 |
| 6 | Step 4에서 선택 내용 요약이 표시되고 "여행 계획 만들기" 클릭 시 `/plans`로 이동한다 | 수동 클릭 테스트 |
| 7 | `/plans`에서 새로 생성된 여행 계획 카드가 목록에 표시된다 | 페이지 이동 후 목록 확인 |
| 8 | `/plans/[id]` 접근 시 일자별 타임라인과 숙소/맛집 Mock 카드가 표시된다 | 브라우저에서 직접 URL 접근 |
| 9 | 프로그레스 바가 현재 단계를 정확히 표시한다 | 위자드 진행 중 시각 확인 |
| 10 | 브라우저 콘솔에 에러가 없다 | 개발자 도구 콘솔 확인 |
| 11 | TypeScript 컴파일 에러가 없다 | `tsc --noEmit` 실행 결과 확인 |

---

## Playwright MCP 검증 시나리오

Sprint 구현 완료 후 아래 시나리오로 자동화 검증을 수행합니다.

```
1.  browser_navigate  -> http://localhost:3000/login
    → 로그인 페이지 접속

2.  browser_type      -> 이메일/비밀번호 입력 (test@example.com / Password123!)

3.  browser_click     -> 로그인 버튼 클릭

4.  browser_snapshot  -> /plans 로 이동 확인

5.  browser_navigate  -> http://localhost:3000/plans/new

6.  browser_snapshot  -> Step 1 위자드 렌더링 확인 (출발일, 기간, 동반자 유형 입력 요소 존재)

7.  browser_click     -> 날짜 선택, 기간 선택 (4일), 동반자 유형 선택 (커플)

8.  browser_click     -> 다음 단계 버튼

9.  browser_snapshot  -> Step 2 선호도 입력 화면 확인 (활동/휴식 카드, 자연/도시 카드 존재)

10. browser_click     -> 활동적인 여행 카드 선택

11. browser_click     -> 자연/아웃도어 카드 선택

12. browser_click     -> 추천 받기 버튼

13. browser_snapshot  -> 로딩 스켈레톤 카드 3개 표시 확인 (animate-pulse)

14. (2초 대기 후)

15. browser_snapshot  -> Step 3 추천 여행지 카드 3~5개 표시 확인 (제주도, 부산 등)

16. browser_click     -> 제주도 카드 선택

17. browser_snapshot  -> 카드 강조 상태 및 다음 단계 버튼 활성화 확인

18. browser_click     -> 다음 단계 버튼

19. browser_snapshot  -> Step 4 선택 완료 확인 화면 (선택 여행지 요약 표시)

20. browser_click     -> 여행 계획 만들기 버튼

21. browser_snapshot  -> /plans 이동 및 새 계획 카드 목록 표시 확인

22. browser_click     -> 새로 생성된 여행 계획 카드 클릭

23. browser_snapshot  -> /plans/[id] 상세 페이지 — 타임라인, 숙소/맛집 카드 표시 확인

24. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인

25. browser_navigate  -> http://localhost:3000/plans/new
    → 미완성 단계 접근 시 Step 1부터 시작 확인

26. browser_snapshot  -> Step 1 초기 상태 렌더링 확인
```

---

## 예상 산출물

스프린트 완료 시 아래 결과물이 생성됩니다.

| 산출물 | 경로/위치 |
|--------|---------|
| TypeScript 타입 정의 | `frontend/src/types/plan.ts` |
| Mock 데이터 | `frontend/src/data/mockData.ts` |
| 위자드 커스텀 훅 | `frontend/src/hooks/usePlanWizard.ts` |
| 위자드 레이아웃 컴포넌트 | `frontend/src/components/plans/wizard/WizardLayout.tsx`, `ProgressBar.tsx` |
| 위자드 Step 컴포넌트 | `frontend/src/components/plans/wizard/Step1~4.tsx` |
| 여행지 카드 컴포넌트 | `frontend/src/components/plans/DestinationCard.tsx` |
| 로딩 스켈레톤 컴포넌트 | `frontend/src/components/common/SkeletonCard.tsx` |
| 여행 계획 카드 컴포넌트 | `frontend/src/components/plans/PlanCard.tsx` |
| 타임라인 컴포넌트 | `frontend/src/components/plans/ItineraryTimeline.tsx` |
| 위자드 진입 페이지 | `frontend/src/pages/plans/new.tsx` |
| 여행 계획 목록 페이지 | `frontend/src/pages/plans/index.tsx` |
| 여행 계획 상세 페이지 | `frontend/src/pages/plans/[id].tsx` |
| Prisma 스키마 추가 | `backend/prisma/schema.prisma` (TravelPlan, Destination 모델) |
| 백엔드 뼈대 코드 | `backend/src/recommendations/`, `backend/src/travel-plans/` |

---

## 참고 사항

- Sprint 2 구현은 `sprint1` 브랜치에서 `sprint2` 브랜치로 분기 후 진행합니다.
- Sprint 1-A에서 구축된 `AuthContext`, `Header`, `Button`, `Input` 등 공통 컴포넌트를 적극 재사용합니다.
- 위자드 단계를 완성한 후 실제 LLM API 연동은 Sprint 1-B 완료 이후 별도 작업으로 처리합니다.
- 이미지 파일(`/images/jeju.jpg` 등)이 없을 경우를 대비하여 `DestinationCard`에 그라디언트 플레이스홀더를 반드시 구현합니다.
- Sprint 3 시작 전 이 스프린트에서 정의한 `WizardFormData`, `Destination`, `TravelPlan` 타입이 Sprint 3 동선/숙소/맛집 추천 구현의 기반이 됩니다.

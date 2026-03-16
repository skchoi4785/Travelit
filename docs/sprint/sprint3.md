# Sprint 3: 동선/숙소/맛집 추천 고도화 + 백엔드 단위 테스트 (2주)

## 메타 정보

| 항목 | 내용 |
|------|------|
| 스프린트 번호 | Sprint 3 |
| Phase | Phase 1 (MVP 핵심 여행 계획 기능) |
| 기간 | 2주 |
| 브랜치 | `sprint3` (sprint2 기반 분기) |
| 담당 | 전체 팀 |
| 상태 | 📋 예정 |

---

## 스프린트 목표

> **선택한 여행지에 대해 일자별 동선, 숙소, 맛집 추천을 받아 완전한 여행 계획을 완성할 수 있다. 동시에 백엔드 핵심 비즈니스 로직에 대한 단위 테스트를 작성하여 코드 품질 기반을 마련한다.**

Sprint 2에서 완성된 4단계 위자드(기본정보 → 선호도 → 여행지 추천 → 확인)를 확장하여, Step 5(일자별 동선 타임라인), Step 6(숙소 추천), Step 7(맛집 추천), Step 8(최종 확인 및 저장)을 추가합니다.

프론트엔드는 Sprint 2와 동일하게 **Mock 데이터 우선** 전략을 유지합니다. 백엔드는 실행 환경 미구성 상태이므로 신규 API 엔드포인트 코드를 추가하되, 비즈니스 로직 함수에 대한 **단위 테스트(*.spec.ts)**를 함께 작성하여 테스트 커버리지 기반을 구축합니다.

---

## 구현 범위

### Sprint 3-A: 프론트엔드 위자드 확장 (이번 스프린트 범위)

- 위자드 Step 5~8 추가 (`/plans/new`)
  - Step 5: 일자별 동선 추천 타임라인 UI
  - Step 6: 숙소 추천 카드 리스트 + 선택
  - Step 7: 맛집 추천 카드 리스트 + 일자별 선택
  - Step 8: 전체 여행 계획 요약 + 저장
- 여행 계획 상세 페이지 (`/plans/[id]`) 고도화
  - 일자 탭 전환 UI
  - 동선 타임라인 컴포넌트 (시간 + 장소 + 이동수단)
  - 숙소/맛집 카드 컴포넌트 고도화 (가격대, 특징 정보 추가)
- Mock 데이터 확장 (동선/숙소/맛집 데이터)
- Pages Router `use client` 지시어 정리 (Sprint 2 기술 부채)

### Sprint 3-B: 백엔드 신규 API 코드 추가 (실행 없이 코드만 작성)

- `POST /api/recommendations/itinerary` 엔드포인트 뼈대
- `POST /api/recommendations/accommodations` 엔드포인트 뼈대
- `POST /api/recommendations/restaurants` 엔드포인트 뼈대
- 신규 DTO 및 인터페이스 정의

### Sprint 3-C: 백엔드 단위 테스트 작성 (테스트 전략 핵심)

- `AuthService` 단위 테스트 (`auth.service.spec.ts`)
- `RecommendationsService` 단위 테스트 (`recommendations.service.spec.ts`)
- `TravelPlansService` 단위 테스트 (`travel-plans.service.spec.ts`)
- 테스트 커버리지 목표: 핵심 비즈니스 로직 함수 80% 이상

### 제외 항목

- 실제 LLM API 연동 (OpenAI / Claude) — Sprint 1-B 환경 구성 후 진행
- 지도(Kakao/Google Maps) 연동 — Sprint 5에서 구현
- 여행 계획 수정/삭제 — Sprint 4에서 구현
- 프론트엔드 테스트 — ~~테스트 환경 미구성으로 이번 스프린트 제외~~ → Sprint 4 이후 완료 (73개 테스트 통과, 2026-03-16)
- OAuth 소셜 로그인 — Backlog

---

## 프로젝트 파일 구조

### 신규/수정 파일 목록

#### 프론트엔드 (Next.js 12 Pages Router)

```
frontend/
├── src/
│   ├── pages/
│   │   └── plans/
│   │       ├── new.tsx                      # [수정] Step 5~8 라우팅 추가
│   │       └── [id].tsx                     # [수정] 일자 탭 + 상세 타임라인 고도화
│   ├── components/
│   │   └── plans/
│   │       ├── wizard/
│   │       │   ├── Step5Itinerary.tsx        # [신규] 일자별 동선 타임라인 UI
│   │       │   ├── Step6Accommodations.tsx   # [신규] 숙소 추천 카드 리스트
│   │       │   ├── Step7Restaurants.tsx      # [신규] 맛집 추천 카드 리스트
│   │       │   └── Step8Summary.tsx          # [신규] 전체 계획 요약 및 저장
│   │       ├── AccommodationCard.tsx         # [신규] 숙소 카드 (가격대, 특징 포함)
│   │       ├── RestaurantCard.tsx            # [신규] 맛집 카드 (가격대, 일자 태그 포함)
│   │       ├── ItineraryTimeline.tsx         # [수정] 시간 + 장소 + 이동수단 + 소요시간 표시
│   │       └── DayTab.tsx                   # [신규] 일자 탭 전환 컴포넌트
│   ├── data/
│   │   └── mockData.ts                      # [수정] 동선/숙소/맛집 Mock 데이터 추가
│   ├── hooks/
│   │   └── usePlanWizard.ts                 # [수정] Step 5~8 상태 추가
│   └── types/
│       └── plan.ts                          # [수정] Itinerary, Accommodation, Restaurant 타입 추가
```

#### 백엔드 (NestJS — 코드만 추가, 실행 미검증)

```
backend/
├── src/
│   ├── auth/
│   │   └── auth.service.spec.ts             # [신규] AuthService 단위 테스트
│   ├── recommendations/
│   │   ├── recommendations.controller.ts    # [수정] 신규 3개 엔드포인트 추가
│   │   ├── recommendations.service.ts       # [수정] itinerary/accommodations/restaurants 메서드 추가
│   │   ├── recommendations.service.spec.ts  # [신규] RecommendationsService 단위 테스트
│   │   └── dto/
│   │       ├── recommend-itinerary.dto.ts   # [신규] 동선 추천 요청 DTO
│   │       ├── recommend-accommodations.dto.ts  # [신규] 숙소 추천 요청 DTO
│   │       └── recommend-restaurants.dto.ts     # [신규] 맛집 추천 요청 DTO
│   └── travel-plans/
│       ├── travel-plans.service.ts          # [수정] 여행 계획 완성 저장 메서드 추가
│       └── travel-plans.service.spec.ts     # [신규] TravelPlansService 단위 테스트
```

---

## 작업 분해 (Task Breakdown)

> 총 22개 태스크 (기능 15개 + 테스트 7개 = 테스트 비율 32%)

### [3-A] 프론트엔드: Mock 데이터 및 타입 확장 (우선순위: 높음)

**T01. 타입 정의 확장** (0.5일)
- `frontend/src/types/plan.ts`에 `ItineraryActivity`, `DayItinerary`, `Accommodation`, `Restaurant` 타입 추가
- `ItineraryActivity`: `{ time: string; place: string; description: string; transport: string; duration: string }`
- `DayItinerary`: `{ day: number; date: string; activities: ItineraryActivity[] }`
- `Accommodation`: `{ id: string; name: string; type: string; priceRange: string; features: string[]; location: string }`
- `Restaurant`: `{ id: string; name: string; cuisine: string; priceRange: string; features: string[]; recommendedDays: number[] }`

**T02. Mock 데이터 확장** (0.5일)
- `frontend/src/data/mockData.ts`에 여행지별 Mock 동선/숙소/맛집 데이터 추가
- 제주도 기준 3박 4일 Mock 동선 데이터 (Day 1~4, 각 3~5개 활동)
- Mock 숙소 데이터 3개 (호텔, 리조트, 게스트하우스)
- Mock 맛집 데이터 5개 (일자별 추천 태그 포함)

**T03. `usePlanWizard` 훅 확장** (0.5일)
- Step 5~8 상태 필드 추가: `selectedAccommodation`, `selectedRestaurants`, `itinerary`
- Step 이동 로직 확장 (totalSteps 4 → 8)
- 완료 핸들러: `handleComplete()` — localStorage에 완성된 여행 계획 저장

### [3-A] 프론트엔드: 위자드 Step 5~8 구현 (우선순위: 높음)

**T04. Step5Itinerary 컴포넌트 구현** (1일)
- 경로: `frontend/src/components/plans/wizard/Step5Itinerary.tsx`
- 일자별 탭 UI (Day 1, Day 2, ... 탭 버튼)
- 각 탭 선택 시 해당 일자 활동 타임라인 표시
- 각 활동 항목: 시간(Badge) + 장소명 + 설명 + 이동수단 아이콘 + 소요시간
- Mock 데이터 2초 딜레이 로딩 스피너 표시 (LLM 호출 경험 재현)
- Next.js 12 Pages Router 기준: `useRouter` from `next/router`

**T05. Step6Accommodations 컴포넌트 구현** (0.5일)
- 경로: `frontend/src/components/plans/wizard/Step6Accommodations.tsx`
- 숙소 추천 카드 3개 (그리드 레이아웃)
- 카드 클릭 시 선택 상태 표시 (선택된 카드 테두리 강조)
- 카드 내용: 숙소명, 유형(호텔/리조트/게스트하우스), 가격대, 특징 태그

**T06. Step7Restaurants 컴포넌트 구현** (0.5일)
- 경로: `frontend/src/components/plans/wizard/Step7Restaurants.tsx`
- 맛집 추천 카드 5개 (그리드 레이아웃)
- 일자별 추천 배지 표시 ("Day 1 추천", "Day 2 추천" 등)
- 다중 선택 가능 (숙소와 달리 여러 맛집 선택)

**T07. Step8Summary 컴포넌트 구현** (1일)
- 경로: `frontend/src/components/plans/wizard/Step8Summary.tsx`
- 전체 여행 계획 요약 표시:
  - 여행 기본 정보 (여행지, 기간, 동반자)
  - 선택된 동선 (일자별 대표 장소 2~3개 요약)
  - 선택된 숙소 1건
  - 선택된 맛집 목록
- "계획 저장" 버튼 클릭 시 localStorage 저장 + `/plans` 페이지로 이동
- Next.js 12: `router.push('/plans')` — `useRouter` from `next/router`

**T08. `new.tsx` 위자드 라우팅 확장** (0.5일)
- Step 5~8 컴포넌트 import 및 switch-case 추가
- `"use client"` 지시어 제거 (Pages Router 환경 정리 — Sprint 2 기술 부채)
- totalSteps prop을 8로 업데이트

### [3-A] 프론트엔드: 상세 페이지 고도화 (우선순위: 중간)

**T09. `DayTab` 컴포넌트 구현** (0.5일)
- 경로: `frontend/src/components/plans/DayTab.tsx`
- props: `days: number`, `activeDay: number`, `onDayChange: (day: number) => void`
- 선택된 탭 강조 스타일 (Tailwind 조건부 클래스)

**T10. `ItineraryTimeline` 컴포넌트 고도화** (0.5일)
- 경로: `frontend/src/components/plans/ItineraryTimeline.tsx` 수정
- 기존 Mock 타임라인에서 `DayItinerary[]` 타입 데이터 수신으로 변경
- 이동수단 아이콘 (도보/자동차/대중교통 텍스트 배지)
- 소요시간 표시

**T11. `AccommodationCard`, `RestaurantCard` 컴포넌트 구현** (0.5일)
- 경로: `frontend/src/components/plans/AccommodationCard.tsx`
- 경로: `frontend/src/components/plans/RestaurantCard.tsx`
- 가격대 표시 (₩ ~ ₩₩₩ 아이콘)
- 특징 태그 배지 (Tailwind 소형 Badge 컴포넌트)

**T12. `[id].tsx` 상세 페이지 고도화** (0.5일)
- DayTab 컴포넌트 통합
- 선택된 탭 일자에 맞는 ItineraryTimeline 데이터 렌더링
- 숙소 섹션: AccommodationCard 1개 표시
- 맛집 섹션: 해당 일자 추천 RestaurantCard 표시

### [3-B] 백엔드: 신규 API 코드 추가 (우선순위: 중간)

**T13. 신규 DTO 정의** (0.5일)
- `recommend-itinerary.dto.ts`: `destinationName`, `duration`, `companionType`
- `recommend-accommodations.dto.ts`: `destinationName`, `companionType`, `budgetRange`
- `recommend-restaurants.dto.ts`: `destinationName`, `companionType`, `duration`, `budgetRange`

**T14. `RecommendationsService` 메서드 추가** (1일)
- `recommendItinerary(dto)`: 일자별 동선 Mock 반환 메서드
- `recommendAccommodations(dto)`: 숙소 Mock 목록 반환 메서드
- `recommendRestaurants(dto)`: 맛집 Mock 목록 반환 메서드
- 각 메서드 반환 타입 인터페이스 정의 (`ItineraryResult`, `AccommodationResult`, `RestaurantResult`)

**T15. `RecommendationsController` 엔드포인트 추가** (0.5일)
- `POST /api/recommendations/itinerary`
- `POST /api/recommendations/accommodations`
- `POST /api/recommendations/restaurants`
- `@UseGuards(JwtAuthGuard)` 데코레이터 적용

### [3-C] 백엔드: 단위 테스트 작성 (우선순위: 높음 — 필수)

**T16. `AuthService` 단위 테스트** (1.5일)
- 경로: `backend/src/auth/auth.service.spec.ts`
- 테스트 대상 메서드:
  - `register(dto)`: 정상 가입, 이메일 중복 예외, 비밀번호 해싱 확인
  - `login(dto)`: 정상 로그인, 존재하지 않는 이메일 예외, 비밀번호 불일치 예외
  - `generateTokens(userId, email)`: accessToken/refreshToken 반환 검증
  - `validateUser(email, password)`: 유효/무효 자격증명 케이스
- 의존성 Mock: `UsersService`, `JwtService`, `ConfigService` 모두 `jest.fn()`으로 주입
- `beforeEach`에서 `Test.createTestingModule` 사용
- 예외 케이스는 `rejects.toThrow()` 패턴으로 검증

```typescript
// 테스트 구조 예시
describe('AuthService', () => {
  describe('register', () => {
    it('정상적인 회원가입 시 사용자를 생성하고 토큰을 반환해야 한다', ...);
    it('이미 존재하는 이메일로 가입 시 ConflictException을 던져야 한다', ...);
    it('비밀번호가 bcrypt로 해싱되어야 한다', ...);
  });
  describe('login', () => {
    it('올바른 자격증명으로 로그인 시 토큰 쌍을 반환해야 한다', ...);
    it('존재하지 않는 이메일로 로그인 시 UnauthorizedException을 던져야 한다', ...);
    it('비밀번호 불일치 시 UnauthorizedException을 던져야 한다', ...);
  });
  describe('generateTokens', () => {
    it('accessToken과 refreshToken을 모두 반환해야 한다', ...);
  });
});
```

**T17. `RecommendationsService` 단위 테스트** (1일)
- 경로: `backend/src/recommendations/recommendations.service.spec.ts`
- 테스트 대상 메서드:
  - `recommendDestinations(dto)`: 정상 반환, 결과 배열 길이 검증 (3~5개)
  - `recommendItinerary(dto)`: 일자 수와 동선 배열 length 일치 검증
  - `recommendAccommodations(dto)`: 반환 배열 타입 검증
  - `recommendRestaurants(dto)`: 반환 배열 타입 검증
- 현재 Mock 기반이므로 의존성 주입 없이 직접 인스턴스 생성 가능
- 입력 유효성: `duration`이 0 이하일 때 예외 처리 케이스 추가

**T18. `TravelPlansService` 단위 테스트** (1일)
- 경로: `backend/src/travel-plans/travel-plans.service.spec.ts`
- 테스트 대상 메서드:
  - `createPlan(userId, dto)`: 반환 객체의 필수 필드(`id`, `title`, `status`) 검증
  - `createPlan(userId, dto)`: `title`이 여행지명 + 기간으로 올바르게 조합되는지 검증
  - `getPlans(userId)`: 배열 반환 검증
  - `getPlanById(userId, planId)`: Mock 반환 객체 필드 검증, 존재하지 않는 ID 처리
- `PrismaService` Mock: `jest.fn()`으로 주입

**T19. Jest 설정 확인 및 테스트 실행 스크립트 검증** (0.5일)
- `backend/package.json`의 Jest 설정 확인 (`jest.config` 또는 `jest` 필드)
- `*.spec.ts` 파일이 올바른 경로에 포함되는지 glob 패턴 확인
- `npm test` 실행 시 3개 spec 파일이 모두 포함되는지 검증 (실행 환경 미구성이므로 설정 코드 레벨 검증)

**T20. 테스트 커버리지 리포트 설정** (0.5일)
- `backend/package.json`에 `coverage` 스크립트 추가: `jest --coverage`
- `collectCoverageFrom` 설정: `src/**/*.service.ts` 대상
- `coverageThreshold` 설정: `lines: 80`, `functions: 80`
- `coverageDirectory`: `coverage/`
- `.gitignore`에 `backend/coverage/` 추가 (미추가 시)

---

## 기술적 접근 방법

### 프론트엔드 Mock 데이터 전략

- Sprint 2와 동일: Mock 응답에 `setTimeout(resolve, 2000)` 딜레이 적용하여 LLM 호출 UX 재현
- 동선/숙소/맛집 Mock 데이터는 `mockData.ts`에서 `destinationId`를 key로 Map 구조로 관리하여 여행지별 데이터 분기
- `usePlanWizard` 훅에서 모든 위자드 상태를 단일 소스로 관리

### 백엔드 단위 테스트 전략

- NestJS Testing 모듈(`@nestjs/testing`)의 `Test.createTestingModule()` 활용
- 외부 의존성(Prisma, JWT, bcrypt)은 모두 `jest.fn()`으로 교체하여 순수 비즈니스 로직만 검증
- `jest.spyOn()`으로 bcrypt 해싱 호출 여부 검증 (실제 해싱 없이)
- 테스트 파일은 해당 서비스 파일과 동일 디렉토리에 `*.service.spec.ts` 패턴으로 배치

### Next.js 12 Pages Router 준수 사항

- `useRouter` import: `import { useRouter } from 'next/router'` (next/navigation 사용 금지)
- `Link` 컴포넌트: `<Link href="..."><a className="...">텍스트</a></Link>` 패턴
- 동적 파라미터: `const { id } = router.query` (useParams 사용 금지)
- `"use client"` 지시어 제거 (Pages Router는 모든 컴포넌트가 기본 SSR 대상)

---

## 의존성 및 리스크

### 의존성

| 의존 항목 | 영향 | 비고 |
|----------|------|------|
| Sprint 2 위자드 컴포넌트 | T04~T08 (Step 추가) | `WizardLayout`, `ProgressBar` 재사용 |
| Sprint 2 `usePlanWizard` 훅 | T03 | 기존 4단계 로직 확장 |
| Sprint 2 `mockData.ts` | T02 | 기존 Mock 구조에 필드 추가 |
| Sprint 2 `auth.service.ts` | T16 | 기존 코드 변경 없이 테스트만 추가 |
| Sprint 2 `recommendations.service.ts` | T17 | 기존 메서드 + 신규 메서드 테스트 |
| Sprint 2 `travel-plans.service.ts` | T18 | 기존 메서드 + 신규 메서드 테스트 |

### 리스크 및 대응 방안

| 리스크 | 영향도 | 대응 방안 |
|--------|--------|----------|
| 위자드 Step 수 증가로 UX 복잡도 상승 | 중간 | Step 5~8을 별도 "상세 계획" 섹션으로 분리하는 UX 대안 준비 |
| 백엔드 실행 불가 환경에서 테스트 코드 검증 한계 | 높음 | 설정 레벨 검증으로 범위 제한, 실제 실행 검증은 Sprint 1-B 이후 |
| Jest Mock 설정 오류로 spec 파일 실행 실패 | 중간 | `@nestjs/testing` 공식 문서 패턴 준수, 의존성 주입 최소화 |
| Sprint 2 `"use client"` 제거 시 기존 컴포넌트 동작 변화 | 낮음 | Pages Router에서 `"use client"`는 무시되므로 제거해도 동작 동일 |

---

## 완료 기준 (Definition of Done)

### 프론트엔드

- ⬜ `/plans/new` 에서 Step 5(동선) → Step 6(숙소) → Step 7(맛집) → Step 8(요약) 흐름이 동작한다
- ⬜ Step 5에서 일자별 탭 전환 시 해당 일자의 타임라인이 표시된다
- ⬜ Step 6에서 숙소 카드를 선택할 수 있고, 선택 상태가 시각적으로 구분된다
- ⬜ Step 7에서 맛집 카드를 복수 선택할 수 있다
- ⬜ Step 8에서 전체 계획 요약이 표시되고 저장 버튼이 동작한다
- ⬜ 저장 후 `/plans` 페이지로 이동하고 새 계획 카드가 목록에 표시된다
- ⬜ `/plans/[id]` 상세 페이지에서 일자 탭 전환이 동작한다
- ⬜ `"use client"` 지시어가 Pages Router 컴포넌트에서 모두 제거된다
- ⬜ 콘솔 에러 없음 (브라우저 개발자 도구 기준)

### 백엔드 API 코드

- ⬜ `POST /api/recommendations/itinerary`, `accommodations`, `restaurants` 엔드포인트 코드가 존재한다
- ⬜ 신규 DTO 3개가 class-validator 데코레이터와 함께 정의된다
- ⬜ `RecommendationsService`에 3개 신규 메서드가 Mock 반환으로 구현된다

### 백엔드 테스트 (핵심 기준)

- ⬜ `auth.service.spec.ts` 파일이 존재하고, `describe/it` 블록 최소 7개 이상이다
- ⬜ `recommendations.service.spec.ts` 파일이 존재하고, `describe/it` 블록 최소 6개 이상이다
- ⬜ `travel-plans.service.spec.ts` 파일이 존재하고, `describe/it` 블록 최소 5개 이상이다
- ⬜ 모든 spec 파일이 `@nestjs/testing`의 `Test.createTestingModule()` 또는 직접 인스턴스 생성 패턴을 사용한다
- ⬜ 각 spec 파일에 happy path + 예외 케이스가 모두 포함된다
- ⬜ `package.json`에 `coverage` 스크립트와 `coverageThreshold` 설정이 추가된다

---

## Playwright MCP 검증 시나리오

> 백엔드 미실행 환경이므로 프론트엔드 Mock 기반 플로우만 검증 가능합니다.

```
1. browser_navigate -> http://localhost:3000/plans/new
2. browser_snapshot -> Step 1 (기본 정보) 렌더링 확인
3. browser_click/browser_type -> Step 1~4 기존 플로우 진행 (Sprint 2 검증 동일)
4. browser_snapshot -> Step 5 (동선 추천) 로딩 스피너 → 타임라인 표시 확인
5. browser_click -> Day 2 탭 클릭
6. browser_snapshot -> Day 2 동선 타임라인으로 전환 확인
7. browser_click -> 다음 단계 버튼
8. browser_snapshot -> Step 6 (숙소 추천) 카드 3개 표시 확인
9. browser_click -> 숙소 카드 선택
10. browser_snapshot -> 선택 상태(테두리 강조) 확인
11. browser_click -> 다음 단계 버튼
12. browser_snapshot -> Step 7 (맛집 추천) 카드 표시 확인
13. browser_click -> 맛집 카드 2개 복수 선택
14. browser_click -> 다음 단계 버튼
15. browser_snapshot -> Step 8 (요약 화면): 여행지, 숙소, 맛집 요약 표시 확인
16. browser_click -> "계획 저장" 버튼
17. browser_snapshot -> /plans 페이지로 이동 + 새 계획 카드 표시 확인
18. browser_click -> 새로 생성된 여행 계획 카드 클릭
19. browser_snapshot -> 상세 페이지: 일자 탭 UI 표시 확인
20. browser_click -> Day 2 탭
21. browser_snapshot -> Day 2 동선 타임라인 전환 확인
22. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
```

---

## 예상 산출물

| 산출물 | 유형 | 경로 |
|--------|------|------|
| Step 5~8 위자드 컴포넌트 4개 | 프론트엔드 | `frontend/src/components/plans/wizard/Step5~8.tsx` |
| AccommodationCard, RestaurantCard | 프론트엔드 | `frontend/src/components/plans/` |
| DayTab 컴포넌트 | 프론트엔드 | `frontend/src/components/plans/DayTab.tsx` |
| 확장된 Mock 데이터 | 프론트엔드 | `frontend/src/data/mockData.ts` |
| 신규 DTO 3개 | 백엔드 | `backend/src/recommendations/dto/` |
| 신규 서비스 메서드 | 백엔드 | `backend/src/recommendations/recommendations.service.ts` |
| AuthService 단위 테스트 | 백엔드 | `backend/src/auth/auth.service.spec.ts` |
| RecommendationsService 단위 테스트 | 백엔드 | `backend/src/recommendations/recommendations.service.spec.ts` |
| TravelPlansService 단위 테스트 | 백엔드 | `backend/src/travel-plans/travel-plans.service.spec.ts` |
| Jest 커버리지 설정 | 백엔드 | `backend/package.json` |

---

## 기술 고려사항

- **위자드 단계 수 증가 대응**: `ProgressBar` 컴포넌트가 `totalSteps` prop을 동적으로 받도록 이미 설계되어 있으므로 props 값만 변경하면 됩니다.
- **LLM 병렬 호출 준비**: 실제 LLM 연동 시 동선/숙소/맛집 3개 API를 `Promise.all()`로 병렬 처리하도록 `Step5Itinerary` 내부에 주석 형태로 구조 예약합니다.
- **테스트 Mock 전략**: `bcrypt.compare` 등 실제 연산이 무거운 함수는 `jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)` 패턴으로 처리합니다.
- **Sprint 2 기술 부채 해소**: `"use client"` 지시어는 Next.js 12(Pages Router)에서 무시되지만, 코드 혼란을 방지하기 위해 이 스프린트에서 정리합니다.

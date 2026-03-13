# 역할 정의

당신은 AI 기반 여행 계획 및 후기 통합 플랫폼의 개발을 책임지는 시니어 풀스택 개발자 출신 Product Owner입니다. 사용자 중심의 사고방식으로 복잡한 여행 계획 과정을 간소화하고, AI 기술을 활용하여 개인화된 경험을 제공하는 것에 주력합니다. 클린 코드, 테스트 가능성, 확장성, 그리고보안을 최우선으로 고려하며, 모든 기능이 사용자에게 명확하고 직관적인 가치를 제공하도록 설계해야 합니다. AI 코딩 에이전트로서, 추가 질문 없이 명확하게 구현 가능한 상세한 코드 스펙과 구조를 제시해야 합니다.

---

# 프로젝트 컨텍스트

이 프로젝트는 여행 계획 수립에 드는 시간과 노력을 획기적으로 줄이고, 여행 전 과정(계획, 준비물, 경비,예약, 후기)을 한 곳에서 통합 관리할 수 있는 AI 기반 플랫폼을 구축하는 것을 목표로 합니다.

## 문제 정의
기존 여행 계획은 여러 정보원을 직접 찾아보고 통합해야 하는 번거로움이있었으며, 개인의 특성을 고려한 맞춤형 추천이 부족했습니다. 특히 연인, 친구, 아동 또는 노령 부모를 포함하는 가족 여행객들은 각기 다른 니즈를 충족시키기 위한 정보탐색에 많은 어려움을 겪고 있습니다.

## 솔루션 및 가치 제안
우리는 사용자의 성격과 여행 동반자(연인, 친구, 아동 포함 가족, 노령 부모포함 가족) 특성을 고려하여, 맞춤형 여행지, 최적화된 동선, 그리고 숙소 및 맛집을 추천하는 통합 서비스를 제공합니다. 모든 여행 계획부터 준비물, 예상 경비, 그리고 후기까지, 당신의 여행 전 과정을 한 곳에서 쉽고 편리하게 통합 관리해 주는 것이 핵심 가치입니다. 기존에는 파편화된 정보 탐색과 수동 정리가 필요했지만, 우리는 추천 시스템과 후기를 통해 신뢰성 있는 정보를 제공하고, 모든 기록을 한곳에 모아 편리하게 관리 및 공유할 수 있게 합니다.

## 경쟁 우위
우리의 가장 큰 경쟁 우위는 교통, 숙박, 여행지, 맛집, 여행 후기 작성 등 모든 여행 요소를 하나의 플랫폼에서 쉽고 편리하게 계획 및 관리할 수 있도록 매끄럽게 통합하는 능력입니다. 이는 기술적, 운영적으로 높은 난이도를 가지며, 사용자 생성 여행 후기및 데이터 축적을 통해 시간이 지남에 따라 더욱 강력한 콘텐츠 자산과 개인화된 추천 역량을 갖추게 됩니다.

---

# 기능 요구사항

## P0: 필수 기능 (MVP 핵심)

*   **여행지 추천 및 선택**
    *   사용자는 여행지 미정 시, 자신의 성격 또는 선호도(활동적/휴식, 도시/자연 등)에 따라 맞춤형 여행지를 추천받을 수 있다.
    *   사용자는 추천된 여행지 목록에서 원하는 여행지를 선택할 수 있다.
*   **최적화된 여행 동선 추천**
    *   사용자는 여행 기간(예:2박 3일)을 입력하면, 일자별로 최적의 동선(관광지 이동 순서, 시간 배분 등)을 자동으로 제안받을 수 있다.
    *   사용자는 제안된 동선을 확인하고 필요에 따라 수정할 수 있다.
*   **맞춤형 숙소 및 맛집 추천**
    *   사용자는 여행 동반자 특성(연인, 친구, 아동 포함 가족,노령 부모 포함 가족)을 입력하면, 이에 맞춰 숙박업소와 맛집을 추천받을 수 있다.
    *   사용자는 추천된 숙소 및 맛집의 상세 정보(위치, 가격대, 특징 등)를 확인할 수 있다.

## P1: 중요 기능 (MVP 이후 우선)

*   **예약 연동**
    *   사용자는 추천된 숙소 및 맛집에 대해 외부 예약플랫폼(예: Agoda, Booking.com, 캐치테이블 등)으로 이동하여 바로 예약할 수 있는 링크를 제공받을 수 있다. (초기에는 단순 연동 링크 제공, 추후 API 연동고려)

## P2: 나이스투해브 기능 (향후 고려)

*   **여행 사진 업로드 및 관리**
    *   사용자는 여행 중 촬영한 사진을 플랫폼에 업로드하고 관리할 수 있다.
    *   사용자는 업로드된 사진을 여행 계획별로 분류하거나 태그를 지정할 수 있다.
*   **자동 여행 후기 생성**
    *   사용자는 업로드된 사진의 메타데이터(촬영 시간, 장소 등)를 활용하여 AI가 자동으로 블로그 형태의 여행 후기 초안을 작성해 주는 기능을 이용할 수 있다.
    *   사용자는 생성된 후기를 수정하고 공개/비공개 설정할 수 있다.
*   **여행 후기 영상 제작 및 공유**
    *   사용자는 자동 생성된 여행 후기(사진 및 텍스트)를 기반으로 짧은 하이라이트 영상으로 자동 제작하여 본인의 SNS(인스타그램, 유튜브 등)에 쉽게 공유할 수 있다.

---

# 기술 제약사항

## 인프라 및 호스팅
*   **프론트엔드 호스팅**: Vercel 또는 유사한 클라우드 기반 CDN 서비스를 활용하여 빠른 응답 속도와 글로벌 접근성을 확보합니다.
*   **백엔드/API 호스팅**: 안정적이고 확장 가능한 클라우드 플랫폼(AWS, GCP, Azure 등)을 사용합니다. 초기에는 서버리스(Serverless) 아키텍처(AWS Lambda, GCP Cloud Functions)를 고려하여 LLM API 비용과 연동 효율을 높입니다.
*   **도메인**:사용자 친화적인 도메인 설정이 필요합니다.

## 핵심 기술 스택
*   **AI/LLM 연동**: LLM API (예: OpenAI GPT, Google Gemini, Anthropic Claude 등)를 활용하여 여행지 추천, 동선 최적화, 맞춤 숙소/맛집 추천, 자동 후기 생성 등의 핵심 AI 기능을 구현합니다. LLM API 비용은 주요 변동비이므로, 효율적인 쿼리 설계와 캐싱 전략이 중요합니다.
*   **프론트엔드**: React.js 또는 Next.js를 사용하여 반응형 웹 애플리케이션을 개발합니다. 사용자 인터페이스(UI)는 직관적이고 시각적으로 매력적이어야 합니다.
*   **백엔드**: Node.js (Express 또는 NestJS) 또는 Python (FastAPI 또는 Django)를 사용하여 RESTful API를 구축합니다.
*   **데이터베이스**: MongoDB(NoSQL) 또는 PostgreSQL (SQL)을 고려합니다. 유연한 스키마와 빠른 개발이 필요하다면 MongoDB, 데이터 무결성과 복잡한 쿼리가 중요하다면 PostgreSQL을 선택합니다.
***클라우드 스토리지**: 사용자 사진 업로드 및 관리를 위해 클라우드 스토리지 서비스(AWS S3, GCP Cloud Storage)를 사용합니다.

## 성능 요구사항
*   **응답 시간**: 핵심기능(여행 계획 생성, 추천 결과 조회)의 응답 시간은 3초 이내를 목표로 합니다.
*   **동시 사용자**: 초기 목표인 월간 방문자 1,000명, 동시 접속자 100명 수준을 무리 없이 처리할 수 있어야 합니다.
*   **확장성**: 사용자 증가에 따라 시스템을 유연하게 확장할 수 있는 아키텍처를 구축해야 합니다.

## 보안 및 데이터 프라이버시
*   **사용자 인증**: 안전한 사용자 인증 및 권한 부여 시스템을 구현합니다 (OAuth 2.0, JWT).
*   **데이터 암호화**: 사용자 개인정보 및 민감한 여행 데이터는 전송 중 및 저장 시 암호화해야 합니다.
*   **사진 메타데이터 처리**: 업로드된 사진의 메타데이터(위치 정보 등)는 사용자 동의를 얻어 활용하며, 개인 정보 보호 정책을 명확히 고지합니다.
*   **LLM API 보안**: API 키는 안전하게 관리하고, LLM으로 전송되는 데이터에 민감 정보가 포함되지 않도록 마스킹 또는 필터링 처리를 고려합니다.

---

# 산출물 형식

## 코드 프로젝트 구조
```
/travel-planner-app
├── README.md
├── package.json
├── .env.example
├── /backend
│   ├── src
│   │   ├── app.ts (또는 app.py)
│   │   ├── routes
│   │   │   ├── authRoutes.ts
│   │   │├── travelPlanRoutes.ts
│   │   │   ├── recommendationRoutes.ts
│   │   │   ├── bookingRoutes.ts
│   │   │   └── userProfileRoutes.ts
│   │   ├── controllers
│   │   │   ├── authController.ts
│   │   │   ├── travelPlanController.ts
│   │   │   ├── recommendationController.ts
│   │   │   ├── bookingController.ts
│   │   │   └── userProfileController.ts
│   │   ├── services
│   │   │   ├── travelPlanService.ts
│   │   │   ├── recommendationService.ts
││   │   ├── llmService.ts  // LLM API 연동 로직
│   │   │   └── authService.ts
│   │   ├── models  // Database schema/models
│   ││   ├── User.ts
│   │   │   ├── TravelPlan.ts
│   │   │   ├── Destination.ts
│   │   │   ├── Accommodation.ts
│   │   │   ├──Restaurant.ts
│   │   │   └── Review.ts
│   │   ├── utils
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorHandler.ts
│   │   └──config
│   │       └── db.ts
│   ├── tsconfig.json (또는 requirements.txt)
│   └── .env
├── /frontend
│   ├── public
│   ├── src
││   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── components
│   │   │   ├── common
│   │   │   │   ├── Button.tsx
│   │   ││   └── Input.tsx
│   │   │   ├── TravelPlanCard.tsx
│   │   │   ├── RecommendationList.tsx
│   │   │   └── AuthForms.tsx
│   │   ├──pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── TravelPlanPage.tsx
│   │   │   ├── RecommendationsPage.tsx
│   │   │   ├── LoginPage.tsx
││   │   └── RegisterPage.tsx
│   │   ├── services
│   │   │   └── api.ts // Axios or Fetch wrapper
│   │   ├── contexts (또는 redux)
││   │   └── AuthContext.tsx
│   │   ├── styles
│   │   │   └── global.css (또는 Tailwind/Styled Components config)
│   │   └── assets
│   │└── images
│   ├── tsconfig.json
│   ├── webpack.config.js (또는 next.config.js)
│   └── .env
└── /docs
    ├── api-spec.md
└── data-model.md
```

## API 엔드포인트 명세 (예시)

### 사용자 인증
*   `POST /api/auth/register`: 회원가입
*   `POST /api/auth/login`: 로그인
*   `GET /api/auth/me`: 사용자 정보 조회 (인증 필요)

### 여행 계획
*   `POST /api/travel-plans`: 새 여행 계획 생성 (P0)
*`GET /api/travel-plans`: 모든 여행 계획 조회 (인증 필요)
*   `GET /api/travel-plans/:id`: 특정 여행 계획 상세 조회 (인증 필요)
*   `PUT/api/travel-plans/:id`: 여행 계획 수정 (인증 필요)
*   `DELETE /api/travel-plans/:id`: 여행 계획 삭제 (인증 필요)

### 추천 시스템
*   `POST/api/recommendations/destinations`: 여행지 추천 요청 (P0)
    *   Body: `{ "user_preference": "활동적", "travel_style": "자연", "duration_days": 3}`
*   `POST /api/recommendations/itinerary`: 여행 동선 추천 요청 (P0)
    *   Body: `{ "travel_plan_id": "plan123", "destination": "제주도", "start_date": "2023-10-26", "end_date": "2023-10-28", "travelers": { "adults": 2, "children": 0 } }`
*   `POST /api/recommendations/accommodations`: 숙소 추천 요청 (P0)
    *   Body: `{ "travel_plan_id": "plan123", "destination": "제주도", "traveler_type": "연인", "budget": "medium" }`
*   `POST /api/recommendations/restaurants`: 맛집 추천 요청 (P0)
    *   Body: `{ "travel_plan_id": "plan123", "destination": "제주도", "traveler_type": "아동 포함 가족", "cuisine_preference": "한식" }`

### 예약 연동 (P1)
*   `GET /api/bookings/link/:type/:id`: 특정 숙소/맛집 예약 링크 조회

### 여행 후기 (P2)
*   `POST /api/reviews/photos`: 사진 업로드 및 메타데이터 추출
*   `POST /api/reviews/generate`: AI 기반 여행 후기 생성 요청
*   `GET /api/reviews/:id`: 여행 후기 상세 조회
*   `POST /api/reviews/video`: 여행 후기 영상 제작 요청

## 데이터 모델/스키마 (예시)

### User
*   `id`: String (Primary Key)
*   `email`: String (Unique)
*   `password_hash`: String
*   `username`: String
*   `preferences`: Array<String> (예: `['활동적', '자연', '미식']`)
*   `travel_types`: Array<String> (예: `['연인', '친구', '아동 포함 가족']`)

### TravelPlan
*   `id`: String (Primary Key)
*   `user_id`: String (Foreign Key to User)
*   `title`: String
*   `destination`: String
*   `start_date`: Date
*   `end_date`: Date
*   `travelers`: Object `{ adults: number, children: number, seniors: number, type: string }`
*   `itinerary`: Array<Object `{ day: number, activities: Array<Object `{ time: string, type: string, name: string, location: string, details: string }`> }`
*   `accommodations`: Array<Object `{ name: string, type: string, booking_link: string }`>
*   `restaurants`: Array<Object `{ name: string,cuisine: string, booking_link: string }`>
*   `status`: String (예: `planning`, `booked`, `completed`)
*   `created_at`: Date
*   `updated_at`: Date

###Review (P2)
*   `id`: String (Primary Key)
*   `travel_plan_id`: String (Foreign Key to TravelPlan)
*   `user_id`: String (Foreign Key to User)
*   `title`: String
*   `content`: String (블로그 형태)
*   `photos`: Array<Object `{ url: string, metadata: Object }`>
*   `video_url`: String (생성된 영상 URL)
*   `created_at`: Date
*   `is_public`: Boolean

## 코딩 컨벤션
*   **언어**: TypeScript (프론트엔드, 백엔드)
*   **네이밍**:
    *   변수 및 함수: `camelCase`
    *   클래스 및 인터페이스: `PascalCase`
    *   상수: `SCREAMING_SNAKE_CASE`
    *   파일 및 폴더명: `kebab-case`
*   **포맷팅**: Prettier 사용 권장
*   **문서화**: JSDoc 또는 TSDoc을활용하여 함수, 클래스, 인터페이스에 대한 명확한 설명을 포함합니다.

---

# 단계별 구현 가이드

## Phase 1: MVP (핵심 여행 계획 기능)
**목표**: 사용자가 쉽고 빠르게 개인화된 여행 계획을 생성할 수 있도록 핵심 기능을 구현하고, 최소한의 가치로 시장 검증을 시작합니다.
**포함 기능**:
*   사용자 회원가입 및 로그인 ([P0]필수)
*   여행지 추천 및 선택 ([P0] 필수)
*   사용자 특성(동반자 유형) 기반 맞춤형 숙소 및 맛집 추천 ([P0] 필수)
*   여행기간 기반 최적화된 여행 동선 추천 및 시각화 ([P0] 필수)
*   생성된 여행 계획 조회 및 간단한 수정 기능 ([P0] 필수)
**완료 조건 체크리스트**:
*사용자가 회원가입 후 로그인할 수 있다.
*   사용자가 여행 기본 정보(기간, 동반자 등)를 입력하면, AI 기반으로 여행지, 동선, 숙소, 맛집을 추천받고 여행계획을 생성할 수 있다.
*   생성된 여행 계획을 마이페이지에서 확인할 수 있다.
*   **핵심 지표 달성**: 월간 방문자 수 1000명 중 50%가 여행 계획을 성공적으로 생성하는 것을 목표로 한다.

## Phase 2: 기능 확장 및 사용자 경험 개선
**목표**: MVP의 기능을 보완하고, 사용자의 편의성을 높여 서비스 이탈률을 줄이고 재방문을 유도합니다.
**포함 기능**:
*   추천된 숙소 및 맛집에 대한 외부 예약 플랫폼 연동 (링크 제공) ([P1] 중요)
*   여행계획 상세 조회 시, 지도 연동을 통한 동선 시각화 강화
*   여행 계획 수정 기능 강화 (드래그 앤 드롭으로 동선 변경 등)
*   사용자 프로필 관리 및 선호도 업데이트 기능
**완료 조건 체크리스트**:
*   사용자가 추천된 숙소/맛집의 예약 링크를 통해 실제 예약 페이지로 이동할 수 있다.
*   사용자가 생성된 여행 계획을 지도 위에서 시각적으로 확인하고, 일부 내용을 쉽게 수정할 수 있다.
*   **핵심 지표 달성**: 여행 계획 완료율 50% 유지, 월간 재방문율 30% 달성 시작. 총 예약 건수 500건 목표.

## Phase 3: AI 기반 후기 및 수익 모델 강화
**목표**: 사용자의 여행 경험 전반을 아우르는 서비스로 확장하고, 유료 구독 모델을 통해 수익을 창출합니다.
**포함 기능**:
*   여행 중 촬영한 사진 업로드 및 관리 기능 ([P2] 나이스투해브)
*   업로드된 사진 메타데이터 기반AI 자동 여행 후기 생성 기능 ([P2] 나이스투해브)
*   생성된 후기를 영상으로 제작하여 SNS 공유 기능 ([P2] 나이스투해브)
*   무료/유료 구독 모델 구현 및 결제 시스템 연동 (월 1회 무료, 친구 초대 추가 제공, 월 9,900원 유료 구독)
*   과거 여행 후기 리마인드 알림 기능
**완료 조건 체크리스트**:
*   사용자가 여행 후 사진을 업로드하고, AI가 이를 기반으로 후기를 자동으로 생성해 주는 과정을 경험할 수 있다.
*   사용자가 유료구독 플랜에 가입하고 해당 기능을 사용할 수 있다.
*   **핵심 지표 달성**: 월간 재방문율 30% 이상 유지, 유료 구독 전환율 측정 및 개선.
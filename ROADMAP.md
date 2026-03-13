# Travelit — 프로젝트 로드맵

## 개요

- **서비스명**: Travelit
- **프로젝트 목표**: AI 기반 맞춤형 여행 계획 및 후기 통합 플랫폼 구축
- **전체 예상 기간**: 약 20주 (Phase 0~3, 10 스프린트)
- **현재 진행 단계**: Phase 0 완료, Phase 1 준비 중

## 진행 상태 범례

- ✅ 완료
- 🔄 진행 중
- 📋 예정
- ⏸️ 보류

---

## 📊 프로젝트 현황 대시보드

| 항목 | 내용 |
|------|------|
| 전체 진행률 | 5% (Phase 0 완료) |
| 현재 Phase | Phase 0 완료 |
| 다음 마일스톤 | Phase 1 Sprint 1 시작 |
| 팀 규모 | 소규모 2~4명 기준 |

---

## 🏗️ 기술 아키텍처 결정 사항

| 영역 | 기술 선택 | 선택 이유 |
|------|----------|----------|
| 프론트엔드 | Next.js + TypeScript | SSR/SSG 지원, React 생태계, SEO 최적화 |
| UI 프레임워크 | Tailwind CSS | 빠른 프로토타이핑, 커스터마이징 용이 |
| 백엔드 | Node.js + NestJS + TypeScript | 프론트엔드와 언어 통일, 구조화된 아키텍처 |
| 데이터베이스 | PostgreSQL | 데이터 무결성, 복잡한 여행 계획 쿼리 지원 |
| ORM | Prisma | TypeScript 친화적, 마이그레이션 관리 용이 |
| 인증 | OAuth 2.0 + JWT | PRD 요구사항, 소셜 로그인 확장성 |
| LLM API | OpenAI GPT / Claude (교체 가능 설계) | 여행 추천 핵심 엔진, 추상화 레이어로 교체 용이하게 |
| 지도 | Kakao Maps API 또는 Google Maps | 국내 여행지 커버리지, 동선 시각화 |
| 배포 | GitHub Actions -> GHCR -> 서버 | CI/CD 이미 구성됨 (Phase 0) |
| 클라우드 스토리지 | AWS S3 | 사진 업로드 (Phase 3) |

---

## Phase 0: 프로젝트 초기 설정 ✅

- ✅ 저장소 생성 및 브랜치 전략 설정
- ✅ Claude Code 에이전트 설정
- ✅ CI/CD 파이프라인 구성
- ✅ 개발 프로세스 문서화

---

## Phase 1: MVP 핵심 여행 계획 기능 (Sprint 1~4) 📋

> **목표**: 사용자가 회원가입 후 성격/선호도 기반 여행지 추천을 받고, 동반자 유형에 맞는 숙소/맛집 추천과 일자별 최적 동선이 포함된 여행 계획을 생성/조회/수정할 수 있다.

### Sprint 1: 프로젝트 기반 구축 + 인증 UI/API (2주) 📋

**스프린트 목표**: 프론트엔드/백엔드 프로젝트 스캐폴딩 완료, 회원가입/로그인 기능 동작

**작업 목록**:

- ⬜ **프론트엔드 프로젝트 초기화**
  - Next.js + TypeScript 프로젝트 생성
  - Tailwind CSS 설정
  - ESLint + Prettier 설정
  - 공통 레이아웃 컴포넌트 (Header, Footer, Navigation)
  - 페이지 라우팅 구조 설정 (/, /login, /register, /plans, /plans/new)

- ⬜ **백엔드 프로젝트 초기화**
  - NestJS + TypeScript 프로젝트 생성
  - PostgreSQL + Prisma ORM 설정
  - 환경변수 관리 (.env.example)
  - 글로벌 에러 핸들러 및 응답 포맷 통일
  - CORS 설정

- ⬜ **사용자 인증 시스템 구현**
  - User 데이터 모델 설계 (Prisma schema)
  - `POST /api/auth/register`: 회원가입 API (이메일, 비밀번호, 사용자명)
  - `POST /api/auth/login`: 로그인 API (JWT 발급)
  - `GET /api/auth/me`: 현재 사용자 정보 조회
  - JWT 미들웨어 (인증 가드)
  - 비밀번호 해싱 (bcrypt)

- ⬜ **인증 프론트엔드 UI**
  - 회원가입 페이지 (이메일, 비밀번호, 사용자명 입력 폼)
  - 로그인 페이지 (이메일, 비밀번호 입력 폼)
  - AuthContext (JWT 토큰 관리, 로그인 상태 유지)
  - API 클라이언트 설정 (Axios 인스턴스, 토큰 자동 첨부)
  - 인증 필요 페이지 보호 (리다이렉트)

**완료 기준 (Definition of Done)**:
- 회원가입 폼 제출 시 계정이 생성되고 DB에 저장된다
- 로그인 시 JWT 토큰이 발급되고 클라이언트에 저장된다
- 인증되지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 리다이렉트된다
- 모든 API 응답이 통일된 포맷을 따른다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000 접속
2. browser_snapshot -> 랜딩 페이지 정상 렌더링 확인
3. browser_navigate -> http://localhost:3000/register 접속
4. browser_snapshot -> 회원가입 폼 요소(이메일, 비밀번호, 사용자명, 제출 버튼) 확인
5. browser_type -> 회원가입 폼 입력 (test@example.com, Password123!, 테스트유저)
6. browser_click -> 회원가입 버튼 클릭
7. browser_snapshot -> 로그인 페이지로 이동 또는 성공 메시지 확인
8. browser_navigate -> http://localhost:3000/login 접속
9. browser_type -> 로그인 폼 입력 (test@example.com, Password123!)
10. browser_click -> 로그인 버튼 클릭
11. browser_snapshot -> 메인 페이지(또는 대시보드)로 이동 확인
12. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
13. browser_network_requests -> API 호출 성공(200/201) 확인
```

**기술 고려사항**:
- JWT 토큰 만료 시간: Access Token 1시간, Refresh Token 7일
- 비밀번호 정책: 최소 8자, 영문+숫자 조합
- OAuth 2.0 소셜 로그인은 Sprint 1에서는 이메일/비밀번호만, 이후 확장 가능하도록 인증 레이어 추상화

---

### Sprint 2: 여행 계획 생성 플로우 + LLM 여행지 추천 (2주) 📋

**스프린트 목표**: 사용자가 성격/선호도를 입력하면 LLM 기반 여행지 추천을 받고 선택할 수 있다

**작업 목록**:

- ⬜ **LLM 서비스 추상화 레이어 구축**
  - LLM 프로바이더 인터페이스 정의 (OpenAI, Claude 교체 가능)
  - 프롬프트 템플릿 관리 시스템
  - LLM 응답 파싱 및 구조화 (JSON 모드 활용)
  - 에러 핸들링 (타임아웃, 재시도, 폴백)
  - 응답 캐싱 (동일 조건 추천 결과 캐시, Redis 또는 인메모리)

- ⬜ **여행지 추천 API 구현**
  - `POST /api/recommendations/destinations`: 성격/선호도 기반 여행지 추천
  - 입력: 여행 스타일(활동적/휴식), 환경 선호(도시/자연), 기간, 동반자 유형
  - 출력: 추천 여행지 3~5개 (이름, 설명, 추천 이유, 대표 이미지 URL)
  - LLM 프롬프트 설계 및 튜닝

- ⬜ **여행 계획 생성 플로우 프론트엔드**
  - 여행 계획 생성 위자드 (Step-by-Step UI)
    - Step 1: 여행 기본 정보 입력 (기간, 출발일, 동반자 유형 선택)
    - Step 2: 선호도 입력 (활동적/휴식, 도시/자연 등 카드 선택 UI)
    - Step 3: 여행지 추천 결과 표시 (카드 리스트) + 선택
  - 로딩 상태 UI (LLM 응답 대기 중 스켈레톤/스피너)

- ⬜ **TravelPlan 데이터 모델**
  - Prisma 스키마: TravelPlan, Destination 모델
  - `POST /api/travel-plans`: 여행 계획 초기 생성 (destination 선택 후)
  - 상태 관리: planning -> itinerary_ready -> completed

**완료 기준 (Definition of Done)**:
- 사용자가 선호도를 입력하면 3초 이내에 여행지 추천 결과가 표시된다
- 추천된 여행지 카드에 이름, 설명, 추천 이유가 표시된다
- 여행지를 선택하면 TravelPlan이 DB에 생성된다
- LLM API 장애 시 사용자에게 적절한 에러 메시지가 표시된다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인 수행
2. browser_navigate -> http://localhost:3000/plans/new
3. browser_snapshot -> 여행 계획 생성 위자드 Step 1 렌더링 확인
4. browser_type/browser_click -> 기간, 동반자 유형 입력
5. browser_click -> 다음 단계 버튼
6. browser_snapshot -> Step 2 선호도 입력 화면 확인
7. browser_click -> 선호도 카드 선택 (활동적, 자연 등)
8. browser_click -> 추천 받기 버튼
9. browser_snapshot -> 로딩 UI 또는 추천 결과 카드 표시 확인
10. browser_click -> 여행지 카드 선택
11. browser_snapshot -> 선택 완료 상태 확인
12. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
13. browser_network_requests -> /api/recommendations/destinations 호출 성공 확인
```

**기술 고려사항**:
- LLM API 비용 관리: 동일 조건 캐싱으로 중복 호출 방지
- LLM 응답 시간 3초 목표: 스트리밍 응답 또는 프롬프트 최적화 필요
- 할루시네이션 대응: 추천 결과에 실제 존재하는 여행지인지 검증 로직 고려

---

### Sprint 3: 동선/숙소/맛집 추천 + 여행 계획 완성 (2주) 📋

**스프린트 목표**: 선택한 여행지에 대해 일자별 동선, 숙소, 맛집 추천을 받아 완전한 여행 계획을 생성할 수 있다

**작업 목록**:

- ⬜ **여행 동선 추천 API**
  - `POST /api/recommendations/itinerary`: 일자별 최적 동선 자동 생성
  - 입력: 여행지, 기간, 동반자 유형
  - 출력: 일자별 활동 리스트 (시간, 장소명, 위치, 이동수단, 소요시간)
  - LLM 프롬프트 설계 (일자별 시간대 배분, 이동 효율 최적화)

- ⬜ **숙소/맛집 추천 API**
  - `POST /api/recommendations/accommodations`: 동반자 유형 기반 숙소 추천
  - `POST /api/recommendations/restaurants`: 동반자 유형 기반 맛집 추천
  - 입력: 여행지, 동반자 유형, 예산 범위
  - 출력: 숙소/맛집 목록 (이름, 유형, 가격대, 특징, 위치)

- ⬜ **여행 계획 상세 UI**
  - 여행 계획 생성 위자드 후속 단계
    - Step 4: 일자별 동선 추천 결과 타임라인 UI
    - Step 5: 숙소 추천 카드 리스트 + 선택
    - Step 6: 맛집 추천 카드 리스트 + 선택 (일자별)
    - 최종 확인: 전체 여행 계획 요약 화면
  - 여행 계획 생성 완료 처리 (DB 저장)

- ⬜ **동선 시각화 (기본)**
  - 일자별 타임라인 형태 렌더링 (시간순 활동 목록)
  - 일자 탭 전환 UI

**완료 기준 (Definition of Done)**:
- 여행지 선택 후 동선/숙소/맛집 추천이 각각 3초 이내에 반환된다
- 일자별 동선이 시간순 타임라인으로 표시된다
- 숙소와 맛집 카드에 이름, 가격대, 특징이 표시된다
- 모든 추천을 선택 후 여행 계획이 완성되어 DB에 저장된다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인
2. browser_navigate -> http://localhost:3000/plans/new -> 여행지 선택까지 진행
3. browser_snapshot -> 동선 추천 로딩/결과 화면 확인
4. browser_snapshot -> 일자별 타임라인 UI 확인 (Day 1, Day 2 등)
5. browser_click -> 숙소 카드 선택
6. browser_snapshot -> 선택된 숙소 표시 확인
7. browser_click -> 맛집 카드 선택
8. browser_snapshot -> 전체 여행 계획 요약 화면 확인
9. browser_click -> 계획 저장 버튼
10. browser_snapshot -> 저장 완료 메시지 또는 상세 페이지 이동 확인
11. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
12. browser_network_requests -> 추천 API 및 저장 API 호출 성공 확인
```

**기술 고려사항**:
- LLM 호출 3회 (동선, 숙소, 맛집)를 병렬 처리하여 응답 시간 단축
- 동선 추천 프롬프트에 이동 거리/시간 현실성 검증 로직 포함
- 숙소/맛집 추천 결과에 실제 존재 여부 후처리 검증 고려 (Google Places API 등)

---

### Sprint 4: 여행 계획 조회/수정 + MVP 안정화 (2주) 📋

**스프린트 목표**: 생성된 여행 계획을 목록/상세 조회하고 간단한 수정이 가능하며, MVP 전체 플로우가 안정적으로 동작한다

**작업 목록**:

- ⬜ **여행 계획 목록/상세 조회**
  - `GET /api/travel-plans`: 내 여행 계획 목록 조회 (페이지네이션)
  - `GET /api/travel-plans/:id`: 여행 계획 상세 조회
  - 마이페이지 / 대시보드: 여행 계획 카드 리스트
  - 여행 계획 상세 페이지: 일자별 동선 + 숙소 + 맛집 통합 뷰

- ⬜ **여행 계획 수정 기능**
  - `PUT /api/travel-plans/:id`: 여행 계획 수정
  - `DELETE /api/travel-plans/:id`: 여행 계획 삭제
  - 일정 내 활동 추가/삭제/순서 변경 (기본 수정)
  - 숙소/맛집 변경 (재추천 또는 수동 수정)

- ⬜ **MVP 안정화 및 폴리싱**
  - 전체 사용자 플로우 E2E 테스트
  - 에러 바운더리 및 에러 페이지
  - 로딩 상태 및 빈 상태 UI 보완
  - 반응형 디자인 점검 (모바일/태블릿)
  - API 응답 시간 모니터링 및 최적화
  - LLM 프롬프트 품질 최종 튜닝

- ⬜ **MVP 배포 준비**
  - Docker 이미지 빌드 확인
  - 환경변수 정리 (.env.production)
  - DB 마이그레이션 스크립트 검증
  - Lighthouse 성능 점수 80+ 확인

**완료 기준 (Definition of Done)**:
- 사용자가 마이페이지에서 생성한 여행 계획 목록을 확인할 수 있다
- 여행 계획 상세 페이지에서 일자별 동선, 숙소, 맛집 정보가 표시된다
- 일정 내 활동을 추가/삭제/수정할 수 있다
- 여행 계획을 삭제할 수 있다
- 모바일에서도 주요 플로우가 정상 동작한다
- Lighthouse 성능 점수 80 이상

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인
2. browser_navigate -> http://localhost:3000/plans
3. browser_snapshot -> 여행 계획 목록 카드 표시 확인
4. browser_click -> 여행 계획 카드 클릭
5. browser_snapshot -> 상세 페이지: 일자별 동선, 숙소, 맛집 표시 확인
6. browser_click -> 수정 버튼 클릭
7. browser_snapshot -> 수정 모드 UI 확인
8. browser_click -> 활동 삭제 버튼 클릭
9. browser_snapshot -> 활동 삭제 반영 확인
10. browser_click -> 저장 버튼
11. browser_snapshot -> 수정 완료 확인
12. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
13. browser_network_requests -> CRUD API 호출 성공(200) 확인
```

**공통 검증 항목**:
- `browser_navigate`로 각 페이지 접속 후 `browser_snapshot`으로 렌더링 확인
- `browser_console_messages(level: "error")`로 콘솔 에러 없음 확인
- `browser_network_requests`로 API 호출 성공(200) 확인

**기술 고려사항**:
- 여행 계획 수정 시 낙관적 업데이트(Optimistic Update) 적용으로 UX 향상
- 삭제 시 소프트 딜리트 고려 (실수 복구 가능)
- MVP 기술 부채: 테스트 커버리지 부족, LLM 프롬프트 하드코딩 등 Phase 2에서 해소

---

## Phase 2: 기능 확장 및 사용자 경험 개선 (Sprint 5~7) 📋

> **목표**: 예약 연동, 지도 기반 동선 시각화, 드래그 앤 드롭 일정 수정, 사용자 프로필 관리를 통해 서비스 완성도를 높인다.

### Sprint 5: 지도 연동 동선 시각화 + 사용자 프로필 (2주) 📋

**스프린트 목표**: 여행 동선을 지도 위에서 시각적으로 확인할 수 있고, 사용자 프로필/선호도를 관리할 수 있다

**작업 목록**:

- ⬜ **지도 기반 동선 시각화**
  - Kakao Maps 또는 Google Maps API 연동
  - 일자별 동선을 지도 위에 마커 + 경로 표시
  - 마커 클릭 시 장소 상세 정보 팝업
  - 일자 탭 전환 시 해당 일자 경로만 표시
  - 지도/리스트 뷰 토글

- ⬜ **사용자 프로필 관리**
  - `GET /api/users/profile`: 프로필 조회
  - `PUT /api/users/profile`: 프로필 수정
  - 프로필 페이지 UI (사용자명, 여행 선호도, 동반자 유형 등)
  - 선호도 업데이트 시 향후 추천에 반영되는 구조

- ⬜ **Phase 1 기술 부채 해소**
  - LLM 프롬프트 외부 설정 파일로 분리
  - API 주요 경로 단위 테스트 추가
  - 에러 로깅 시스템 구축 (구조화된 로그)

**완료 기준 (Definition of Done)**:
- 여행 계획 상세 페이지에서 지도 뷰로 전환 시 동선이 마커+경로로 표시된다
- 일자별로 경로 색상 또는 탭이 구분된다
- 사용자가 프로필 페이지에서 선호도를 수정하고 저장할 수 있다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인
2. browser_navigate -> http://localhost:3000/plans/{planId}
3. browser_snapshot -> 여행 계획 상세 페이지 확인
4. browser_click -> 지도 뷰 토글 버튼
5. browser_snapshot -> 지도 렌더링 및 마커 표시 확인
6. browser_click -> Day 2 탭
7. browser_snapshot -> Day 2 경로 표시 확인
8. browser_navigate -> http://localhost:3000/profile
9. browser_snapshot -> 프로필 페이지 렌더링 확인
10. browser_click -> 선호도 수정 후 저장
11. browser_snapshot -> 저장 완료 확인
12. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
```

**기술 고려사항**:
- 지도 API 키 보안 관리 (프론트엔드 노출 최소화, 도메인 제한)
- 지도 렌더링 성능: 마커 많을 경우 클러스터링 적용
- 선호도 데이터 구조를 확장 가능하게 설계 (향후 ML 기반 개인화 대비)

---

### Sprint 6: 드래그 앤 드롭 동선 수정 (2주) 📋

**스프린트 목표**: 사용자가 일정 내 활동을 드래그 앤 드롭으로 순서 변경하고, 일자 간 이동도 가능하다

**작업 목록**:

- ⬜ **드래그 앤 드롭 일정 수정**
  - dnd-kit 또는 react-beautiful-dnd 라이브러리 도입
  - 같은 일자 내 활동 순서 변경
  - 다른 일자로 활동 이동
  - 드래그 시 시각적 피드백 (드래그 프리뷰, 드롭 영역 하이라이트)
  - 변경사항 자동 저장 또는 저장 버튼

- ⬜ **일정 수정 강화**
  - 활동 직접 추가 (장소명 검색 + LLM 보조)
  - 활동 시간 수정
  - 숙소/맛집 개별 변경 (재추천 요청)

- ⬜ **UX 개선**
  - 변경 이력 Undo/Redo 기능
  - 수정 시 이동 시간 자동 재계산 표시

**완료 기준 (Definition of Done)**:
- 활동 카드를 드래그하여 같은 일자 내 순서를 변경할 수 있다
- 활동 카드를 다른 일자로 드래그하여 이동할 수 있다
- 변경 후 저장 시 서버에 반영된다
- Undo 버튼으로 직전 변경을 취소할 수 있다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인
2. browser_navigate -> http://localhost:3000/plans/{planId}/edit
3. browser_snapshot -> 편집 모드 UI 확인 (드래그 핸들 표시)
4. browser_drag -> 활동 카드 드래그 앤 드롭 (순서 변경)
5. browser_snapshot -> 순서 변경 반영 확인
6. browser_click -> 저장 버튼
7. browser_snapshot -> 저장 완료 확인
8. browser_navigate -> http://localhost:3000/plans/{planId}
9. browser_snapshot -> 변경된 순서가 상세 페이지에 반영 확인
10. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
```

**기술 고려사항**:
- 드래그 앤 드롭 라이브러리 선택: dnd-kit (가벼움, 접근성 지원) 권장
- 모바일 터치 드래그 지원 필수
- 낙관적 업데이트 + 실패 시 롤백 처리

---

### Sprint 7: 외부 예약 플랫폼 연동 (2주) 📋

**스프린트 목표**: 추천된 숙소/맛집에서 외부 예약 플랫폼으로 이동할 수 있는 링크를 제공한다

**작업 목록**:

- ⬜ **예약 링크 시스템**
  - `GET /api/bookings/link/:type/:id`: 예약 링크 생성/조회 API
  - 숙소: Agoda, Booking.com, 여기어때 등 예약 링크 매핑
  - 맛집: 캐치테이블, 네이버 예약 등 링크 매핑
  - LLM 추천 결과에 예약 링크 자동 매칭 로직

- ⬜ **예약 링크 UI**
  - 숙소/맛집 카드에 "예약하기" 버튼 추가
  - 예약 플랫폼 선택 모달 (여러 플랫폼 링크 제공 시)
  - 외부 링크 새 탭 열기 + 아이콘 표시

- ⬜ **Phase 2 종합 테스트 및 안정화**
  - 전체 사용자 플로우 E2E 재검증
  - 성능 최적화 (Lighthouse 85+ 목표)
  - 접근성 점검 (키보드 네비게이션, 스크린리더)

**완료 기준 (Definition of Done)**:
- 숙소 카드에서 "예약하기" 클릭 시 외부 예약 사이트가 새 탭에서 열린다
- 맛집 카드에서 "예약하기" 클릭 시 외부 예약 사이트가 새 탭에서 열린다
- 예약 링크가 없는 경우 버튼이 비활성화되거나 검색 링크를 제공한다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인
2. browser_navigate -> http://localhost:3000/plans/{planId}
3. browser_snapshot -> 숙소 카드에 "예약하기" 버튼 표시 확인
4. browser_click -> "예약하기" 버튼 클릭
5. browser_snapshot -> 예약 플랫폼 선택 모달 또는 새 탭 열림 확인
6. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
7. browser_network_requests -> /api/bookings/link 호출 성공 확인
```

**기술 고려사항**:
- 초기에는 검색 URL 기반 링크 (예: `booking.com/search?dest=제주도`)
- 추후 API 연동(어필리에이트 API) 확장 가능하도록 설계
- 예약 링크 클릭 트래킹 (향후 수익 모델 기반 데이터)

---

## Phase 3: AI 후기 및 수익 모델 (Sprint 8~10) 📋

> **목표**: 여행 사진 업로드, AI 기반 후기 자동 생성, 영상 제작/SNS 공유, 유료 구독 모델을 통해 서비스를 확장하고 수익을 창출한다.

### Sprint 8: 사진 업로드 + AI 후기 생성 (2주) 📋

**스프린트 목표**: 사용자가 여행 사진을 업로드하고, AI가 사진 메타데이터를 기반으로 블로그 형태의 후기를 자동 생성한다

**작업 목록**:

- ⬜ **사진 업로드 시스템**
  - AWS S3 연동 (Presigned URL 업로드)
  - `POST /api/reviews/photos`: 사진 업로드 + 메타데이터(EXIF) 추출
  - 사진 메타데이터에서 촬영 시간, GPS 위치 추출
  - 사진 리사이징/썸네일 생성
  - 여행 계획별 사진 분류

- ⬜ **사진 관리 UI**
  - 사진 업로드 영역 (드래그 앤 드롭 + 파일 선택)
  - 업로드 진행률 표시
  - 사진 갤러리 뷰 (그리드)
  - 사진 태그 지정 및 삭제

- ⬜ **AI 여행 후기 자동 생성**
  - `POST /api/reviews/generate`: 사진 메타데이터 기반 후기 생성
  - LLM 프롬프트: 촬영 시간/장소 순서로 스토리 구성
  - Review 데이터 모델 (Prisma)
  - 생성된 후기 에디터 (마크다운 또는 WYSIWYG)
  - 후기 공개/비공개 설정

**완료 기준 (Definition of Done)**:
- 사진을 드래그 앤 드롭으로 업로드할 수 있다
- 업로드된 사진의 촬영 시간/위치가 자동 추출된다
- "후기 생성" 버튼 클릭 시 AI가 블로그 형태 후기를 생성한다
- 생성된 후기를 수정하고 저장할 수 있다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인
2. browser_navigate -> http://localhost:3000/plans/{planId}/review
3. browser_snapshot -> 사진 업로드 영역 표시 확인
4. browser_file_upload -> 테스트 이미지 업로드
5. browser_snapshot -> 업로드된 사진 갤러리 표시 확인
6. browser_click -> "후기 생성" 버튼
7. browser_snapshot -> 생성된 후기 텍스트 표시 확인
8. browser_click -> 공개/비공개 토글
9. browser_click -> 저장 버튼
10. browser_snapshot -> 저장 완료 확인
11. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
```

**기술 고려사항**:
- 사진 업로드 용량 제한: 단일 파일 10MB, 총 100MB
- EXIF 메타데이터 파싱: exifr 또는 sharp 라이브러리
- GPS 좌표 -> 주소 변환: Reverse Geocoding API
- 사진 메타데이터 프라이버시: 사용자 동의 프로세스 필수

---

### Sprint 9: 후기 영상 제작 + SNS 공유 (2주) 📋

**스프린트 목표**: 생성된 후기를 기반으로 짧은 하이라이트 영상을 자동 제작하고 SNS에 공유할 수 있다

**작업 목록**:

- ⬜ **후기 영상 자동 제작**
  - `POST /api/reviews/video`: 사진+텍스트 기반 영상 생성 요청
  - 영상 생성 엔진 연동 (FFmpeg 서버사이드 또는 외부 API)
  - 사진 슬라이드쇼 + 텍스트 오버레이 + BGM
  - 영상 생성 비동기 처리 (큐 기반)
  - 생성 완료 알림

- ⬜ **영상 미리보기 + SNS 공유**
  - 영상 플레이어 UI
  - SNS 공유 버튼 (인스타그램, 유튜브, 카카오톡)
  - Open Graph 메타태그 설정 (공유 시 미리보기)
  - 공유 링크 생성

- ⬜ **과거 여행 후기 리마인드**
  - 여행 완료 후 일정 기간 경과 시 리마인드 알림 로직
  - 알림 UI (인앱 알림)

**완료 기준 (Definition of Done)**:
- "영상 만들기" 버튼 클릭 시 사진 기반 하이라이트 영상이 생성된다
- 생성된 영상을 플랫폼 내에서 미리보기할 수 있다
- SNS 공유 버튼 클릭 시 해당 플랫폼 공유 화면이 열린다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 로그인
2. browser_navigate -> http://localhost:3000/reviews/{reviewId}
3. browser_snapshot -> 후기 상세 페이지 확인
4. browser_click -> "영상 만들기" 버튼
5. browser_snapshot -> 영상 생성 진행 상태 UI 확인
6. (영상 생성 완료 후)
7. browser_snapshot -> 영상 플레이어 및 공유 버튼 표시 확인
8. browser_click -> SNS 공유 버튼
9. browser_snapshot -> 공유 모달/외부 링크 확인
10. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
```

**기술 고려사항**:
- 영상 생성은 서버 리소스 집약적: 비동기 큐(Bull/BullMQ) 처리 필수
- 영상 저장소: S3 + CloudFront CDN
- SNS API 연동 복잡도: 초기에는 공유 URL 방식, 추후 직접 업로드 API 연동

---

### Sprint 10: 유료 구독 모델 + 결제 시스템 (2주) 📋

**스프린트 목표**: 무료/유료 구독 구분, 결제 시스템 연동, 전체 서비스 안정화

**작업 목록**:

- ⬜ **구독 모델 구현**
  - 요금제 정의: 무료 (월 1회 계획 생성), 유료 (월 9,900원, 무제한)
  - 친구 초대 시 무료 횟수 추가 로직
  - 사용량 추적 (월간 여행 계획 생성 횟수)
  - 구독 상태 관리 (free, premium, expired)

- ⬜ **결제 시스템 연동**
  - PG사 연동 (토스페이먼츠 또는 아임포트)
  - 결제 페이지 UI
  - 구독 갱신/해지 처리
  - 결제 이력 조회

- ⬜ **기능 접근 제어**
  - 무료 사용자 기능 제한 UI (제한 안내 + 업그레이드 유도)
  - 유료 전용 기능 가드 (AI 후기, 영상 제작 등)
  - 요금제 비교 페이지

- ⬜ **Phase 3 종합 안정화**
  - 전체 서비스 E2E 테스트
  - 성능 최적화 (Lighthouse 90+ 목표)
  - 보안 점검 (OWASP Top 10 체크)
  - 사진/영상 스토리지 비용 모니터링

**완료 기준 (Definition of Done)**:
- 무료 사용자가 월 1회 이상 계획 생성 시 결제 안내가 표시된다
- 유료 구독 결제를 완료할 수 있다
- 유료 사용자가 AI 후기, 영상 제작 기능을 사용할 수 있다
- 구독 해지 프로세스가 동작한다

**Playwright MCP 검증 시나리오**:
```
1. browser_navigate -> http://localhost:3000/login -> 무료 계정 로그인
2. browser_navigate -> http://localhost:3000/plans/new -> 무료 횟수 초과 시도
3. browser_snapshot -> 업그레이드 안내 모달 표시 확인
4. browser_click -> "업그레이드" 버튼
5. browser_snapshot -> 요금제 비교 페이지 확인
6. browser_click -> 유료 구독 선택
7. browser_snapshot -> 결제 페이지 렌더링 확인
8. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인
```

**기술 고려사항**:
- PG 연동 테스트 환경 설정 (테스트 키)
- 결제 관련 법적 요구사항: 환불 정책, 전자상거래법 준수
- 구독 상태 변경 웹훅 처리 안정성

---

## 🔗 의존성 맵

```
Phase 0 (초기 설정) ✅
  └── Phase 1 (MVP)
        ├── Sprint 1: 프로젝트 기반 + 인증 ← Phase 0
        ├── Sprint 2: 여행지 추천 + LLM ← Sprint 1 (인증, 프로젝트 구조)
        ├── Sprint 3: 동선/숙소/맛집 추천 ← Sprint 2 (LLM 서비스, TravelPlan 모델)
        └── Sprint 4: 조회/수정 + 안정화 ← Sprint 3 (전체 데이터 모델)
              └── Phase 2 (기능 확장)
                    ├── Sprint 5: 지도 시각화 + 프로필 ← Sprint 4 (동선 데이터)
                    ├── Sprint 6: 드래그 앤 드롭 ← Sprint 5 (지도 뷰)
                    └── Sprint 7: 예약 연동 ← Sprint 4 (숙소/맛집 데이터)
                          └── Phase 3 (AI 후기 + 수익)
                                ├── Sprint 8: 사진 + AI 후기 ← Sprint 4 (여행 계획 완성)
                                ├── Sprint 9: 영상 + SNS ← Sprint 8 (사진/후기 데이터)
                                └── Sprint 10: 결제 + 구독 ← Sprint 9 (전체 기능 완성)
```

---

## ⚠️ 리스크 및 완화 전략

| 리스크 | 영향도 | 발생 가능성 | 완화 방안 |
|--------|--------|------------|----------|
| LLM API 비용 초과 | 높음 | 중간 | 응답 캐싱, 프롬프트 최적화, 사용량 제한, 비용 알림 설정 |
| LLM 응답 품질/할루시네이션 | 높음 | 높음 | 존재하지 않는 장소 필터링, 사용자 피드백 루프, 프롬프트 반복 튜닝 |
| LLM 응답 속도 (3초 목표) | 중간 | 중간 | 스트리밍 응답, 캐싱, 프롬프트 길이 최적화, 로딩 UX 개선 |
| 외부 예약 API 의존성 | 중간 | 중간 | 초기에는 검색 URL 링크 방식으로 시작, API 연동은 점진적 |
| 기술 스택 미확정 | 중간 | 낮음 | Sprint 1에서 확정, 본 로드맵에서 NestJS+PostgreSQL 권장 |
| 지도 API 비용 | 낮음 | 낮음 | Kakao Maps (무료 할당량 활용), 사용량 모니터링 |
| 영상 생성 서버 부하 | 중간 | 중간 | 비동기 큐 처리, 동시 처리 수 제한, 클라우드 스케일링 |
| 개인정보 보호 (사진 메타데이터) | 높음 | 낮음 | 사용자 동의 프로세스, 서버 측 메타데이터 제거 옵션 |

---

## 📈 마일스톤

| 마일스톤 | 목표 시점 | 포함 스프린트 | 상태 | 핵심 성과 |
|---------|----------|-------------|------|----------|
| Phase 0 완료 | 완료 | - | ✅ 완료 | CI/CD 구성, 개발 환경 세팅 |
| MVP 릴리스 | Sprint 4 종료 (약 8주차) | Sprint 1~4 | 📋 예정 | 회원가입~여행 계획 생성/조회/수정 전체 플로우 |
| Phase 2 릴리스 | Sprint 7 종료 (약 14주차) | Sprint 5~7 | 📋 예정 | 지도 시각화, D&D 수정, 예약 연동 |
| Phase 3 릴리스 | Sprint 10 종료 (약 20주차) | Sprint 8~10 | 📋 예정 | AI 후기, 영상, 구독 모델 |

---

## 🔮 향후 계획 (Backlog)

아래 항목은 Phase 3 이후 또는 사용자 피드백에 따라 우선순위가 결정될 기능입니다.

- **OAuth 소셜 로그인 확장**: Google, Kakao, Naver 소셜 로그인
- **다국어 지원**: 영어, 일본어 등 해외 사용자 대응
- **여행 계획 공유/협업**: 동행자와 실시간 여행 계획 공동 편집
- **커뮤니티 기능**: 다른 사용자의 공개 여행 계획/후기 탐색
- **AI 추천 고도화**: 사용자 이력 기반 ML 개인화 추천
- **오프라인 모드**: PWA 기반 오프라인 여행 계획 조회
- **경비 관리**: 여행 예산 설정 및 지출 추적
- **준비물 체크리스트**: 여행지/계절별 자동 생성
- **항공권/교통 예약 연동**: 직접 API 연동을 통한 원스톱 예약
- **네이티브 앱**: React Native 또는 Flutter 기반 모바일 앱

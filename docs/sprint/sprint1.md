# Sprint 1: 프로젝트 기반 구축 + 인증 UI/API

## 메타 정보

| 항목 | 내용 |
|------|------|
| 스프린트 번호 | Sprint 1 |
| Phase | Phase 1 (MVP 핵심 여행 계획 기능) |
| 기간 | 2주 |
| 브랜치 | `sprint1` (develop 기반 분기) |
| 담당 | 전체 팀 |
| 상태 | 🔄 진행 중 |

---

## 스프린트 목표

> **프론트엔드/백엔드 프로젝트 스캐폴딩 완료, 회원가입/로그인 기능 동작**

이 스프린트는 Travelit 서비스의 첫 번째 개발 스프린트로, 이후 모든 기능 개발의 토대가 되는 프로젝트 구조와 사용자 인증 시스템을 구축합니다. Sprint 2의 LLM 여행지 추천 기능은 이 스프린트에서 완성되는 인증 시스템과 프로젝트 구조에 의존합니다.

---

## 구현 범위

> **수정 사항 (2026-03-13)**: 화면 우선 확인 전략으로 변경.
> 백엔드 구현은 프론트엔드 화면 검증 완료 후 별도 진행합니다.

### Sprint 1-A: 프론트엔드 화면 구현 (완료) ✅

- 프론트엔드 프로젝트 초기화 (Next.js 12 + TypeScript + Tailwind CSS)
  - Node.js 14 호환: Next.js 14 → **12.3.4** 다운그레이드
  - App Router → **Pages Router** 전환
- Mock 인증 (백엔드 없이 UI 흐름 검증 가능)
- 인증 프론트엔드 UI (회원가입 페이지, 로그인 페이지, AuthContext)
- 공통 레이아웃 컴포넌트 (Header, Footer, Navigation)
- 여행 계획 목록/신규 페이지 뼈대

### Sprint 1-B: 백엔드 구현 (예정) 📋

- 백엔드 프로젝트 초기화 (NestJS + TypeScript + PostgreSQL + Prisma)
  - 코드는 `backend/` 디렉토리에 작성 완료, 실행 환경 준비 후 진행
- 사용자 인증 시스템 백엔드 (회원가입, 로그인, JWT, bcrypt)
- Mock 인증을 실제 API 호출로 교체
- Docker 환경 구성 (Node.js 20 + Docker Desktop 설치 필요)

### 제외 항목

- OAuth 소셜 로그인 (Google, Kakao, Naver) — 이후 확장 대상
- 여행 계획 관련 기능 — Sprint 2~4에서 구현
- LLM 연동 — Sprint 2에서 구현
- 이메일 인증 — Backlog

---

## 프로젝트 파일 구조

### 프론트엔드 (Next.js 14)

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # 로그인 페이지
│   │   │   └── register/
│   │   │       └── page.tsx          # 회원가입 페이지
│   │   ├── (protected)/
│   │   │   └── plans/
│   │   │       ├── page.tsx          # 여행 계획 목록 (빈 상태)
│   │   │       └── new/
│   │   │           └── page.tsx      # 새 여행 계획 (빈 상태)
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   └── page.tsx                  # 랜딩 페이지
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # 헤더 컴포넌트
│   │   │   ├── Footer.tsx            # 푸터 컴포넌트
│   │   │   └── Navigation.tsx        # 네비게이션
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx         # 로그인 폼
│   │   │   └── RegisterForm.tsx      # 회원가입 폼
│   │   └── common/
│   │       ├── Button.tsx            # 공통 버튼
│   │       └── Input.tsx             # 공통 입력 필드
│   ├── contexts/
│   │   └── AuthContext.tsx           # JWT 토큰 관리, 로그인 상태
│   ├── lib/
│   │   └── api.ts                    # Axios 인스턴스, 토큰 자동 첨부
│   ├── middleware.ts                  # 인증 필요 페이지 보호 미들웨어
│   └── types/
│       └── auth.ts                   # 인증 관련 TypeScript 타입 정의
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

### 백엔드 (NestJS)

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts        # /api/auth 엔드포인트
│   │   ├── auth.service.ts           # 인증 비즈니스 로직
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   │   ├── register.dto.ts       # 회원가입 요청 DTO
│   │   │   └── login.dto.ts          # 로그인 요청 DTO
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts     # JWT 인증 가드
│   │   └── strategies/
│   │       └── jwt.strategy.ts       # Passport JWT 전략
│   ├── users/
│   │   ├── users.service.ts          # 사용자 CRUD 로직
│   │   └── users.module.ts
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts  # 글로벌 에러 핸들러
│   │   ├── interceptors/
│   │   │   └── response.interceptor.ts   # 응답 포맷 통일
│   │   └── dto/
│   │       └── api-response.dto.ts       # 공통 응답 DTO
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts
│   └── main.ts                       # CORS, 전역 파이프 설정
├── prisma/
│   ├── schema.prisma                 # 데이터 모델 정의
│   └── migrations/                   # Prisma 마이그레이션 파일
├── .env.example
├── nest-cli.json
└── tsconfig.json
```

---

## API 스펙

### 공통 응답 포맷

모든 API 응답은 아래 형태를 따릅니다.

**성공 응답**

```json
{
  "success": true,
  "data": { ... },
  "message": "요청이 성공적으로 처리되었습니다"
}
```

**에러 응답**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "이메일 또는 비밀번호가 올바르지 않습니다"
  }
}
```

---

### POST /api/auth/register — 회원가입

**요청**

```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "username": "홍길동"
}
```

**유효성 검증 규칙**
- `email`: 이메일 형식
- `password`: 최소 8자, 영문 + 숫자 조합 필수
- `username`: 2자 이상 20자 이하

**응답 (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "홍길동",
    "createdAt": "2026-03-13T00:00:00.000Z"
  },
  "message": "회원가입이 완료되었습니다"
}
```

**에러 케이스**
- `409 Conflict`: 이미 존재하는 이메일 (`EMAIL_ALREADY_EXISTS`)
- `400 Bad Request`: 유효성 검증 실패 (`VALIDATION_ERROR`)

---

### POST /api/auth/login — 로그인

**요청**

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "홍길동"
    }
  },
  "message": "로그인되었습니다"
}
```

**에러 케이스**
- `401 Unauthorized`: 이메일 또는 비밀번호 불일치 (`INVALID_CREDENTIALS`)

---

### GET /api/auth/me — 현재 사용자 조회

**헤더**

```
Authorization: Bearer {accessToken}
```

**응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "홍길동",
    "createdAt": "2026-03-13T00:00:00.000Z"
  }
}
```

**에러 케이스**
- `401 Unauthorized`: 토큰 없음 또는 만료 (`UNAUTHORIZED`)

---

## 데이터 모델 (Prisma Schema)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  password     String   // bcrypt 해시값
  username     String
  refreshToken String?  // Refresh Token 해시값 (선택적 저장)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("users")
}
```

---

## 태스크 분해 (Task Breakdown)

### Task 1: 백엔드 프로젝트 초기화
**우선순위**: P0 (가장 먼저)
**예상 소요**: 반나절

- ⬜ NestJS CLI로 프로젝트 생성 (`nest new backend`)
- ⬜ TypeScript strict 모드 설정
- ⬜ Prisma 설치 및 초기화 (`prisma init`)
- ⬜ PostgreSQL 연결 설정 (`DATABASE_URL` 환경변수)
- ⬜ `.env.example` 파일 작성 (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET 등)
- ⬜ PrismaService, PrismaModule 생성
- ⬜ 글로벌 에러 핸들러 (`HttpExceptionFilter`) 구현
- ⬜ 응답 포맷 인터셉터 (`ResponseInterceptor`) 구현
- ⬜ `main.ts` CORS 설정 (프론트엔드 origin 허용)
- ⬜ ValidationPipe 전역 설정 (class-validator 연동)

---

### Task 2: User 데이터 모델 및 Prisma 마이그레이션
**우선순위**: P0
**예상 소요**: 1시간
**의존성**: Task 1

- ⬜ `prisma/schema.prisma`에 User 모델 작성
- ⬜ 초기 마이그레이션 생성 및 적용 (`prisma migrate dev --name init`)
- ⬜ Prisma Client 생성 확인

---

### Task 3: 인증 백엔드 구현
**우선순위**: P0
**예상 소요**: 하루
**의존성**: Task 2

- ⬜ `@nestjs/passport`, `passport-jwt`, `@nestjs/jwt`, `bcrypt` 패키지 설치
- ⬜ `UsersService`: 이메일로 사용자 조회, 사용자 생성 메서드 구현
- ⬜ `AuthService` 구현:
  - `register()`: 이메일 중복 확인, bcrypt 해싱, DB 저장
  - `login()`: 이메일/비밀번호 검증, JWT Access/Refresh 토큰 발급
  - `getProfile()`: 현재 사용자 정보 반환
- ⬜ `JwtStrategy` 구현 (토큰 페이로드에서 userId 추출)
- ⬜ `JwtAuthGuard` 구현
- ⬜ `AuthController` 구현 (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- ⬜ `RegisterDto`, `LoginDto` 작성 (class-validator 데코레이터 포함)

**기술 세부사항**
- bcrypt salt rounds: 10
- Access Token 만료: 1시간 (`1h`)
- Refresh Token 만료: 7일 (`7d`)
- JWT_SECRET, JWT_REFRESH_SECRET은 반드시 환경변수에서 주입

---

### Task 4: 프론트엔드 프로젝트 초기화
**우선순위**: P1 (백엔드 Task 1과 병렬 진행 가능)
**예상 소요**: 반나절

- ⬜ Next.js 14 App Router 프로젝트 생성 (`create-next-app`)
  - TypeScript, Tailwind CSS, ESLint 포함 옵션 선택
- ⬜ Prettier 설정 (`.prettierrc`)
- ⬜ `axios` 설치
- ⬜ Axios 인스턴스 생성 (`src/lib/api.ts`)
  - baseURL: 환경변수 `NEXT_PUBLIC_API_URL`
  - 요청 인터셉터: `Authorization` 헤더 자동 첨부 (localStorage의 accessToken)
  - 응답 인터셉터: 401 수신 시 로그아웃 처리
- ⬜ `.env.local.example` 파일 작성
- ⬜ 루트 레이아웃 설정 (`src/app/layout.tsx`)
- ⬜ Tailwind 기본 설정 확인 (색상 팔레트, 폰트)

---

### Task 5: 공통 레이아웃 컴포넌트
**우선순위**: P1
**예상 소요**: 반나절
**의존성**: Task 4

- ⬜ `Header.tsx`: 로고, 네비게이션 링크, 로그인/로그아웃 버튼
- ⬜ `Navigation.tsx`: 인증 상태에 따른 메뉴 분기
- ⬜ `Footer.tsx`: 기본 푸터
- ⬜ `Button.tsx`: 공통 버튼 (variant: primary, secondary, outline)
- ⬜ `Input.tsx`: 공통 입력 필드 (에러 메시지 표시 포함)

---

### Task 6: AuthContext 및 인증 상태 관리
**우선순위**: P1
**예상 소요**: 반나절
**의존성**: Task 4

- ⬜ `AuthContext.tsx` 구현:
  - `user` 상태 (로그인한 사용자 정보)
  - `isLoading` 상태 (초기화 중 여부)
  - `login(email, password)` 함수: API 호출, 토큰 저장, 상태 업데이트
  - `register(email, password, username)` 함수
  - `logout()` 함수: 토큰 삭제, 상태 초기화
- ⬜ 토큰 저장 방식: `localStorage` (Access Token), `httpOnly cookie` 대안 검토 후 결정
- ⬜ 앱 초기 마운트 시 저장된 토큰으로 `/api/auth/me` 호출하여 로그인 상태 복원
- ⬜ `AuthProvider`를 루트 레이아웃에 적용

---

### Task 7: 인증 페이지 UI 구현
**우선순위**: P1
**예상 소요**: 하루
**의존성**: Task 5, Task 6

- ⬜ **회원가입 페이지** (`/register`):
  - 이메일, 비밀번호, 비밀번호 확인, 사용자명 입력 필드
  - 클라이언트 사이드 유효성 검증 (비밀번호 규칙, 이메일 형식)
  - 제출 시 `AuthContext.register()` 호출
  - 성공 시 `/login`으로 리다이렉트
  - 에러 메시지 표시 (이메일 중복 등)

- ⬜ **로그인 페이지** (`/login`):
  - 이메일, 비밀번호 입력 필드
  - 제출 시 `AuthContext.login()` 호출
  - 성공 시 `/plans` 또는 이전 페이지로 리다이렉트
  - 에러 메시지 표시

---

### Task 8: 인증 미들웨어 및 페이지 보호
**우선순위**: P1
**예상 소요**: 2시간
**의존성**: Task 6

- ⬜ `src/middleware.ts` 작성:
  - `/plans`, `/plans/new` 등 보호된 경로에서 토큰 없으면 `/login`으로 리다이렉트
  - 로그인 상태에서 `/login`, `/register` 접근 시 `/plans`로 리다이렉트
- ⬜ 보호된 경로 목록 상수로 관리

---

### Task 9: 랜딩 페이지 및 기본 페이지 뼈대
**우선순위**: P2
**예상 소요**: 반나절
**의존성**: Task 5

- ⬜ 랜딩 페이지 (`/`): 서비스 소개, 시작하기 버튼 (간단한 구조)
- ⬜ `/plans` 페이지 뼈대: 빈 상태 UI ("첫 여행 계획을 만들어보세요" 안내)
- ⬜ `/plans/new` 페이지 뼈대: 빈 상태 (Sprint 2에서 구현)

---

### Task 10: 통합 테스트 및 검증
**우선순위**: P0 (완료 기준 확인)
**예상 소요**: 반나절
**의존성**: 모든 Task 완료 후

- ⬜ 로컬 환경에서 전체 플로우 수동 검증 (아래 완료 기준 항목 확인)
- ⬜ API 응답 포맷 통일 확인 (Postman 또는 curl)
- ⬜ 콘솔 에러 없음 확인
- ⬜ 네트워크 요청 성공 (200/201) 확인

---

## 기술적 접근 방법

### JWT 토큰 전략

Sprint 1에서는 소셜 로그인 없이 이메일/비밀번호 인증만 구현하되, 인증 레이어를 추상화하여 Sprint 이후 OAuth 2.0 확장이 용이하도록 설계합니다.

- Access Token (1시간): API 요청 시 `Authorization: Bearer` 헤더로 전달
- Refresh Token (7일): 추후 자동 갱신 구현을 위해 DB 저장 구조 준비 (Sprint 1에서는 재발급 API 생략, 만료 시 재로그인)
- JWT 서명 비밀키는 반드시 환경변수로 관리, 코드에 하드코딩 금지

### 비밀번호 보안

- bcrypt를 사용하여 salt rounds 10으로 해싱 후 저장
- 비밀번호 원문은 어떤 경우에도 로그에 출력되지 않도록 주의
- 비밀번호 정책: 최소 8자, 영문 + 숫자 조합 (class-validator `@Matches` 데코레이터 사용)

### 프론트엔드 API 통신

- Axios 인스턴스를 단일 파일(`lib/api.ts`)에서 관리하여 baseURL, 인터셉터를 중앙 집중 관리
- 401 에러 인터셉터: 자동 로그아웃 처리 (Sprint 2+에서 토큰 갱신 로직으로 확장 예정)
- 환경변수 `NEXT_PUBLIC_API_URL`로 백엔드 URL 분리 (개발/프로덕션 환경 분리)

### 에러 처리

- 백엔드: NestJS `HttpException` + 글로벌 `HttpExceptionFilter`로 모든 에러를 통일된 JSON 포맷으로 변환
- 프론트엔드: Axios 응답 인터셉터에서 에러를 파싱하여 컴포넌트에 일관된 에러 객체 전달

---

## 의존성 및 리스크

### 의존성

| 항목 | 내용 |
|------|------|
| Phase 0 | CI/CD 파이프라인, 브랜치 전략 설정 완료 (이미 완료) |
| PostgreSQL | 로컬 개발 환경에 Docker로 PostgreSQL 인스턴스 필요 |
| 환경변수 | `.env.local` (프론트), `.env` (백엔드) 설정 필요 |

### 리스크 및 대응 방안

| 리스크 | 영향도 | 대응 방안 |
|--------|--------|----------|
| PostgreSQL 로컬 설정 복잡도 | 낮음 | Docker Compose로 DB 컨테이너 실행 (`docker-compose.yml` 포함) |
| JWT 보안 설정 누락 (비밀키 하드코딩 등) | 높음 | 코드 리뷰 시 환경변수 사용 여부 확인 필수, `.env` 파일 `.gitignore` 확인 |
| 프론트/백엔드 CORS 오류 | 중간 | 백엔드 `main.ts`에서 개발 환경 origin 명시적 허용 |
| 토큰 저장소(localStorage vs Cookie) 보안 논쟁 | 낮음 | Sprint 1은 localStorage 사용, 추후 보안 강화 시 httpOnly cookie로 전환 검토 |

---

## 완료 기준 (Definition of Done)

- ✅ 기준: 모든 항목이 로컬 환경에서 검증되어야 스프린트 완료로 간주합니다.

| 번호 | 완료 기준 | 검증 방법 |
|------|----------|----------|
| 1 | 회원가입 폼 제출 시 계정이 생성되고 PostgreSQL DB에 저장된다 | DB 직접 조회 또는 `/api/auth/me` 호출 |
| 2 | 로그인 시 JWT Access Token과 Refresh Token이 발급되고 클라이언트에 저장된다 | 브라우저 localStorage 또는 응답 확인 |
| 3 | 인증되지 않은 사용자가 `/plans`에 접근 시 `/login`으로 리다이렉트된다 | 브라우저에서 직접 URL 접근 테스트 |
| 4 | 로그인 상태에서 `/login`에 접근 시 `/plans`로 리다이렉트된다 | 브라우저에서 직접 URL 접근 테스트 |
| 5 | 모든 API 응답이 `{ success, data, message }` 통일된 포맷을 따른다 | Postman으로 각 API 응답 확인 |
| 6 | 비밀번호가 DB에 bcrypt 해시 형태로 저장된다 | DB 직접 조회 (원문이 아닌 해시값 확인) |
| 7 | 콘솔 에러가 없다 | 브라우저 개발자도구 콘솔 확인 |

---

## Playwright MCP 검증 시나리오

Sprint 구현 완료 후 아래 시나리오로 자동화 검증을 수행합니다.

```
1.  browser_navigate  -> http://localhost:3000
    → 랜딩 페이지 접속

2.  browser_snapshot  -> 랜딩 페이지 정상 렌더링 확인 (로고, CTA 버튼 존재)

3.  browser_navigate  -> http://localhost:3000/plans
    → 인증 없이 보호 경로 접근

4.  browser_snapshot  -> /login 으로 리다이렉트 확인

5.  browser_navigate  -> http://localhost:3000/register

6.  browser_snapshot  -> 회원가입 폼 요소 확인
    (이메일, 비밀번호, 비밀번호 확인, 사용자명, 제출 버튼)

7.  browser_type      -> 회원가입 폼 입력
    (test@example.com / Password123! / Password123! / 테스트유저)

8.  browser_click     -> 회원가입 버튼 클릭

9.  browser_snapshot  -> /login 으로 이동 또는 성공 메시지 확인

10. browser_navigate  -> http://localhost:3000/login

11. browser_type      -> 로그인 폼 입력 (test@example.com / Password123!)

12. browser_click     -> 로그인 버튼 클릭

13. browser_snapshot  -> /plans 또는 메인 페이지로 이동 확인

14. browser_navigate  -> http://localhost:3000/login
    → 로그인 상태에서 로그인 페이지 접근

15. browser_snapshot  -> /plans 로 리다이렉트 확인

16. browser_console_messages(level: "error") -> 콘솔 에러 없음 확인

17. browser_network_requests
    -> POST /api/auth/register: 201 Created 확인
    -> POST /api/auth/login: 200 OK 확인
    -> GET /api/auth/me: 200 OK 확인
```

---

## 예상 산출물

스프린트 완료 시 아래 결과물이 생성됩니다.

| 산출물 | 경로/위치 |
|--------|---------|
| 프론트엔드 Next.js 프로젝트 | `frontend/` |
| 백엔드 NestJS 프로젝트 | `backend/` |
| Prisma 스키마 및 마이그레이션 | `backend/prisma/` |
| 환경변수 예시 파일 | `frontend/.env.local.example`, `backend/.env.example` |
| 회원가입/로그인 기능 (동작 상태) | 로컬 환경에서 검증 완료 |

---

## 참고 사항

- Sprint 2 시작 전 이 스프린트에서 구축한 `AuthContext`, Axios 인스턴스, 공통 컴포넌트를 Sprint 2 개발자가 바로 활용할 수 있어야 합니다.
- OAuth 소셜 로그인은 Backlog에 있으며, 인증 레이어를 추상화하여 향후 `PassportStrategy` 추가만으로 확장 가능하도록 설계합니다.
- 환경변수 파일(`.env`, `.env.local`)은 반드시 `.gitignore`에 포함되어 있어야 하며, 예시 파일(`.example`)만 커밋합니다.

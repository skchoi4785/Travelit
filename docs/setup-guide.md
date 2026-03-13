# 환경 설정 가이드

> Travelit 프로젝트 최초 시작 시 1회 수행하는 환경 설정 가이드입니다.

---

## 1. 사전 요구사항

- [ ] Git 2.x 이상
- [ ] Docker Desktop 4.x 이상
- [ ] Node.js 20.x (LTS)
- [ ] Claude Code CLI (`npm install -g @anthropic-ai/claude-code`)

---

## 2. 저장소 클론

```bash
git clone https://github.com/frogy95/choiji-guide-big.git
cd choiji-guide-big
```

---

## 3. 환경변수 설정

```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env
```

`.env` 파일을 열고 필요한 값을 입력합니다:

| 환경변수 | 설명 | 획득 방법 |
|---------|------|----------|
| `DATABASE_URL` | PostgreSQL 연결 URL | Docker Compose 기본값 사용 가능 |
| `JWT_SECRET` | JWT 서명 비밀키 | 32자 이상 랜덤 문자열 |
| `JWT_REFRESH_SECRET` | Refresh Token 비밀키 | 32자 이상 랜덤 문자열 |
| `OPENAI_API_KEY` | OpenAI API 키 | [platform.openai.com](https://platform.openai.com) |
| `ANTHROPIC_API_KEY` | Anthropic Claude API 키 | [console.anthropic.com](https://console.anthropic.com) |
| `KAKAO_MAP_API_KEY` | 카카오 지도 API 키 | [developers.kakao.com](https://developers.kakao.com) |
| `AWS_ACCESS_KEY_ID` | AWS 액세스 키 | AWS IAM 콘솔 |
| `AWS_SECRET_ACCESS_KEY` | AWS 시크릿 키 | AWS IAM 콘솔 |
| `AWS_S3_BUCKET` | S3 버킷명 | AWS S3 콘솔 |
| `AWS_REGION` | AWS 리전 | 예: `ap-northeast-2` |

---

## 4. 로컬 개발 환경 실행

```bash
# Docker Compose로 전체 스택 실행 (프론트엔드 + 백엔드 + PostgreSQL)
docker compose up --build

# 백엔드 DB 마이그레이션 (최초 1회 또는 스키마 변경 시)
docker compose exec backend npx prisma migrate dev

# 초기 데이터 시드 (필요한 경우)
docker compose exec backend npx ts-node prisma/seed.ts
```

서비스 접속:
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:8000
- API 문서 (Swagger): http://localhost:8000/api/docs

---

## 5. 외부 서비스 설정

### 5.1 OpenAI API (LLM 여행 추천 핵심)

1. [platform.openai.com](https://platform.openai.com)에서 계정 생성
2. API Keys 메뉴에서 새 API 키 발급
3. `.env`의 `OPENAI_API_KEY`에 입력
4. 사용량 알림 설정 권장 (비용 관리)

### 5.2 Kakao Maps API (동선 시각화)

1. [developers.kakao.com](https://developers.kakao.com)에서 애플리케이션 생성
2. 플랫폼 > Web 등록 (`http://localhost:3000` 추가)
3. JavaScript 키를 `.env`의 `KAKAO_MAP_API_KEY`에 입력

### 5.3 AWS S3 (사진 업로드 — Phase 3)

1. AWS IAM에서 S3 전용 사용자 생성 (최소 권한 원칙)
2. S3 버킷 생성 (리전: `ap-northeast-2` 권장)
3. CORS 정책 설정 (프론트엔드 도메인 허용)
4. 액세스 키/시크릿을 `.env`에 입력

---

## 6. 개발 도구 설정

### VS Code 권장 익스텐션

- **ESLint** (`dbaeumer.vscode-eslint`) — TypeScript 린팅
- **Prettier** (`esbenp.prettier-vscode`) — 코드 포맷팅
- **Prisma** (`Prisma.prisma`) — Prisma 스키마 문법 지원
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — Tailwind 자동완성
- **REST Client** (`humao.rest-client`) — API 테스트

---

## 7. Claude Code 설정

이 프로젝트는 Claude Code와 함께 사용하도록 설계되었습니다.

### 전제 조건

- Claude Code 설치: https://claude.ai/claude-code
- MCP 서버 설정 (권장): Playwright (UI 자동 검증용)

### 에이전트 활용

| 에이전트 | 트리거 시점 |
|---------|-----------|
| `sprint-planner` | 새 스프린트 계획 수립 시 |
| `sprint-close` | 스프린트 구현 완료 후 마무리 시 |
| `hotfix-close` | 핫픽스 구현 완료 후 마무리 시 |
| `deploy-prod` | develop QA 완료 후 프로덕션 배포 시 |
| `prd-to-roadmap` | PRD 기반 ROADMAP.md 생성/갱신 시 |

자세한 내용은 `README.md` 및 `docs/dev-process.md` 참조.

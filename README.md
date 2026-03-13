# Travelit

> AI 기반 맞춤형 여행 계획 및 후기 통합 플랫폼

여행지 추천부터 일자별 동선, 숙소/맛집 추천, 여행 후기 자동 생성까지 — 여행 전 과정을 한 곳에서 AI와 함께 계획하세요.

---

## 서비스 소개

Travelit은 사용자의 성격과 동반자 유형(연인, 친구, 아동 포함 가족, 노령 부모 포함 가족)을 기반으로 개인화된 여행 계획을 자동으로 생성해주는 AI 여행 플래너입니다.

**핵심 기능**:
- 성격/선호도 기반 여행지 추천 (LLM)
- 일자별 최적 동선 자동 생성
- 동반자 유형 맞춤 숙소/맛집 추천
- 외부 예약 플랫폼 연동 링크
- AI 여행 후기 자동 생성 및 영상 제작

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | Next.js 14 + TypeScript + Tailwind CSS |
| 백엔드 | Node.js + NestJS + TypeScript |
| 데이터베이스 | PostgreSQL + Prisma ORM |
| 인증 | OAuth 2.0 + JWT |
| LLM | OpenAI GPT / Claude (교체 가능 설계) |
| 지도 | Kakao Maps API |
| 스토리지 | AWS S3 |
| 배포 | GitHub Actions → GHCR → 프로덕션 서버 |

---

## 프로젝트 구조

```
travelit/
├── .claude/
│   ├── agents/             # Claude 에이전트 정의
│   └── agent-memory/       # 에이전트 영구 메모리
├── .github/
│   └── workflows/
│       ├── ci.yml          # PR 체크 (테스트, Docker 빌드)
│       └── deploy.yml      # main merge 시 프로덕션 자동 배포
├── docs/
│   ├── prd.md              # 제품 요구사항 문서
│   ├── dev-process.md      # 개발 프로세스 가이드
│   ├── ci-policy.md        # CI/CD 정책
│   ├── setup-guide.md      # 환경 설정 가이드
│   ├── sprint/             # 스프린트 계획/완료 문서
│   └── deploy-history/     # 배포/검증 기록 아카이브
├── CLAUDE.md               # Claude Code 프로젝트 지시 파일
├── ROADMAP.md              # 프로젝트 로드맵 (Phase 0~3)
├── deploy.md               # 현재 미완료 수동 작업 목록
└── .env.example            # 환경변수 템플릿
```

---

## 로드맵 요약

| Phase | 스프린트 | 핵심 내용 | 상태 |
|-------|---------|----------|------|
| Phase 0 | — | 초기 설정, CI/CD, 개발 프로세스 | ✅ 완료 |
| Phase 1 (MVP) | Sprint 1~4 (8주) | 인증, LLM 여행지 추천, 동선/숙소/맛집, 계획 CRUD | 📋 예정 |
| Phase 2 (확장) | Sprint 5~7 (6주) | 지도 시각화, D&D 수정, 예약 연동, 프로필 | 📋 예정 |
| Phase 3 (AI+수익) | Sprint 8~10 (6주) | AI 후기, 영상 제작, SNS 공유, 유료 구독 결제 | 📋 예정 |

자세한 내용은 [ROADMAP.md](./ROADMAP.md) 참조.

---

## 개발 환경 설정

[docs/setup-guide.md](./docs/setup-guide.md) 참조.

```bash
# 저장소 클론
git clone https://github.com/frogy95/choiji-guide-big.git
cd choiji-guide-big

# 환경변수 설정
cp .env.example .env
# .env 파일에 필요한 값 입력

# Docker Compose로 전체 스택 실행
docker compose up --build
```

서비스 접속:
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:8000

---

## 개발 워크플로우

### Sprint 흐름

```
1. sprint-planner → docs/sprint/sprint{N}.md 생성
2. git checkout -b sprint{N}
3. 구현 작업...
4. sprint-close → develop PR + 검증
5. QA 통과 후 deploy-prod → main 배포
```

### Hotfix 흐름

```
1. git checkout -b hotfix/{설명} (main 기반)
2. 긴급 수정...
3. hotfix-close → main PR + 타겟 검증 + develop 역머지 안내
```

자세한 내용은 [docs/dev-process.md](./docs/dev-process.md) 참조.

---

## 참고 문서

- [docs/prd.md](./docs/prd.md) — 제품 요구사항 문서
- [docs/dev-process.md](./docs/dev-process.md) — 개발 프로세스 전체 가이드
- [docs/ci-policy.md](./docs/ci-policy.md) — CI/CD 정책 상세
- [docs/setup-guide.md](./docs/setup-guide.md) — 환경 설정 가이드
- [ROADMAP.md](./ROADMAP.md) — 프로젝트 로드맵

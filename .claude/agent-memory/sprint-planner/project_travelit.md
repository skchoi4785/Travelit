---
name: Travelit 프로젝트 현황
description: Travelit 프로젝트의 기술 스택, 아키텍처, 스프린트 진행 현황 정보
type: project
---

## 프로젝트 개요

- 서비스명: Travelit
- 목표: AI 기반 맞춤형 여행 계획 및 후기 통합 플랫폼
- 전체 예상 기간: 약 20주 (Phase 0~3, Sprint 1~10)
- 현재 상태: Phase 0 완료, Sprint 1 계획 완료 (2026-03-13)

**Why:** 프로젝트 컨텍스트를 기억하여 이후 스프린트 계획 수립 시 연속성 유지
**How to apply:** 새 스프린트 계획 수립 시 이전 스프린트 번호 및 달성 사항 확인

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | Next.js 14 + TypeScript + Tailwind CSS |
| 백엔드 | NestJS + TypeScript |
| 데이터베이스 | PostgreSQL + Prisma ORM |
| 인증 | JWT (Access 1h, Refresh 7d) + bcrypt |
| LLM | OpenAI GPT / Claude (교체 가능 추상화 레이어) |
| 지도 | Kakao Maps API 또는 Google Maps |
| 배포 | GitHub Actions → GHCR → 서버 자동 배포 |
| 클라우드 스토리지 | AWS S3 (Phase 3) |

## 스프린트 진행 현황

| 스프린트 | 상태 | 주요 목표 |
|---------|------|---------|
| Phase 0 | ✅ 완료 | CI/CD, 브랜치 전략, 개발 환경 |
| Sprint 1 | 📋 계획 완료 | 프로젝트 스캐폴딩 + 인증 UI/API |
| Sprint 2 | 📋 예정 | 여행 계획 생성 플로우 + LLM 여행지 추천 |
| Sprint 3 | 📋 예정 | 동선/숙소/맛집 추천 + 여행 계획 완성 |
| Sprint 4 | 📋 예정 | 여행 계획 조회/수정 + MVP 안정화 |
| Sprint 5~7 | 📋 예정 | Phase 2: 지도, D&D, 예약 연동 |
| Sprint 8~10 | 📋 예정 | Phase 3: AI 후기, 영상, 구독 모델 |

## 주요 아키텍처 결정 사항

- 프로젝트 구조: `frontend/` (Next.js), `backend/` (NestJS) 분리
- 스프린트 문서 경로: `docs/sprint/sprint{n}.md`
- API 응답 포맷: `{ success, data, message }` 통일
- 인증 레이어: 이메일/비밀번호 먼저, OAuth 소셜 로그인은 Backlog (PassportStrategy 추상화로 확장 용이하게 설계)
- JWT 토큰 저장: localStorage (Sprint 1), 추후 httpOnly cookie 전환 검토

## 반복 패턴

- 각 스프린트는 Playwright MCP 검증 시나리오를 포함
- `writing-plans` 스킬은 이 프로젝트에 존재하지 않음 → 일반 애자일 방법론 적용
- 체크리스트는 이모지(`- ✅`, `- ⬜`) 형식 사용 (GFM `[x]`/`[ ]` 금지)

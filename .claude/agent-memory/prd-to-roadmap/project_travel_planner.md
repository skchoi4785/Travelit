---
name: 여행 계획 플랫폼 프로젝트 상태
description: AI 기반 여행 계획 플랫폼의 현재 진행 상태, 기술 결정사항, Phase 구성
type: project
---

AI 기반 맞춤형 여행 계획 및 후기 통합 플랫폼 프로젝트.

**현재 상태 (2026-03-13 기준)**: Phase 0 완료, Phase 1 미착수.

**기술 스택 결정**:
- 프론트엔드: Next.js + TypeScript + Tailwind CSS
- 백엔드: NestJS + TypeScript
- DB: PostgreSQL + Prisma ORM
- LLM: 교체 가능한 추상화 레이어 (OpenAI/Claude)
- 지도: Kakao Maps 또는 Google Maps
- CI/CD: GitHub Actions -> GHCR (이미 구성됨)

**Phase 구성**: 총 4 Phase, 10 스프린트 (약 20주)
- Phase 0: 초기 설정 (완료)
- Phase 1: MVP - 인증, 여행지/동선/숙소/맛집 추천, 계획 CRUD (Sprint 1~4)
- Phase 2: 지도 시각화, D&D, 예약 연동, 프로필 (Sprint 5~7)
- Phase 3: 사진/AI 후기, 영상/SNS, 구독/결제 (Sprint 8~10)

**Why:** PRD에서 P0(필수) -> P1(중요) -> P2(나이스투해브) 순서로 우선순위 명시됨.
**How to apply:** 스프린트 계획 시 Phase 순서와 의존성 맵을 준수할 것.

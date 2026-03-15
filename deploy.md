# 배포 후 수동 작업 가이드

> **목적**: 현재 완료되지 않은 수동 검증/작업 항목만 유지합니다.
> 완료된 기록은 `docs/deploy-history/YYYY-MM-DD.md`로 이동됩니다.

---

## 현재 미완료 항목

### Sprint 3 — 동선/숙소/맛집 추천 위자드 확장 및 백엔드 단위 테스트 (2026-03-15)

**브랜치**: `sprint3` → `develop` PR #1 생성 완료
**PR URL**: https://github.com/skchoi4785/Travelit/pull/1

#### 자동 검증 결과

- ✅ TypeScript 컴파일 에러 없음 (`tsc --noEmit` 통과)
- ✅ 프론트엔드 빌드 성공 (`npm run build` 사전 확인됨)
- ✅ 프론트엔드 개발 서버 HTTP 응답 (`http://localhost:3000` → 200)
- ⬜ Docker 미실행으로 백엔드 pytest 자동 검증 미수행
- ⬜ Playwright UI 자동 검증 미수행 (Node.js 14 환경 — Playwright는 Node.js 18+ 필요)

#### 수동 검증 필요 항목

- ⬜ `docker compose up --build` — Docker 환경 전체 빌드 확인
- ⬜ `/plans/new` 위자드 Step 5~8 전체 플로우 수동 검증
  - Step 5: Day 탭 전환 + 타임라인 표시 확인
  - Step 6: 숙소 카드 단일 선택 확인
  - Step 7: 맛집 카드 다중 선택 + Day 배지 확인
  - Step 8: 전체 요약 + 저장 버튼 동작 확인
- ⬜ 저장 후 `/plans` 이동 및 새 계획 카드 목록 표시 확인
- ⬜ `/plans/[id]` 상세 페이지 일자 탭 전환 확인
- ⬜ 모바일 뷰포트 (375px) 레이아웃 확인
- ⬜ UI 디자인/시각적 품질 판단
- ⬜ develop → sprint3 PR 머지 후 로컬 Docker 스테이징 검증

---

## 참고

- 검증 원칙: `docs/dev-process.md` 섹션 5
- 배포 이력: `docs/deploy-history/`
- 롤백 방법: `docs/dev-process.md` 섹션 6.4

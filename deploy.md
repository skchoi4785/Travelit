# 배포 후 수동 작업 가이드

> **목적**: 현재 완료되지 않은 수동 검증/작업 항목만 유지합니다.
> 완료된 기록은 `docs/deploy-history/YYYY-MM-DD.md`로 이동됩니다.

---

## 현재 미완료 항목

### Sprint 4 — 테스트 코드 확충 (검증 계획 점수 향상) (2026-03-15)

**브랜치**: `sprint4` → `develop` PR #4 생성 완료
**PR URL**: https://github.com/skchoi4785/Travelit/pull/4

#### 자동 검증 결과

- ⬜ Docker 미실행으로 백엔드 테스트 자동 검증 미수행
- ⬜ Playwright UI 자동 검증 미수행 (서버 미실행)
- ⬜ 프론트엔드 서버 미실행으로 HTTP 응답 검증 미수행

#### 수동 검증 필요 항목

- ⬜ CI GitHub Actions 워크플로우 통과 확인 (Node.js 20 환경에서 테스트 실행)
- ⬜ 백엔드: `cd backend && npm install && npm test` → 34개 테스트 통과 확인
- ⬜ 프론트엔드: `cd frontend && npm install && npm test` → 18개 테스트 통과 확인
- ⬜ `frontend/jest.config.js`의 `setupFilesAfterFramework` 오타 영향 확인 (jest.setup.js 로드 여부)
- ⬜ develop → sprint4 PR 머지 후 로컬 Docker 스테이징 검증

---

## 참고

- 검증 원칙: `docs/dev-process.md` 섹션 5
- 배포 이력: `docs/deploy-history/`
- 롤백 방법: `docs/dev-process.md` 섹션 6.4

# 배포 후 수동 작업 가이드

> **목적**: 현재 완료되지 않은 수동 검증/작업 항목만 유지합니다.
> 완료된 기록은 `docs/deploy-history/YYYY-MM-DD.md`로 이동됩니다.

---

## 현재 미완료 항목

### Sprint 2 — 여행 계획 생성 위자드 + LLM 여행지 추천(Mock) (2026-03-14)

**브랜치**: `sprint2` → `develop` PR 생성 필요 (원격 저장소 push 권한 필요)

#### 자동 검증 결과

- ✅ TypeScript 컴파일 에러 없음 (`tsc --noEmit` 통과)
- ✅ 프론트엔드 개발 서버 HTTP 200 응답 (`http://localhost:3000`)
- ✅ `/plans/new` 페이지 HTTP 응답 정상 (307 리다이렉트 → 200)
- ✅ `/plans` 페이지 HTTP 응답 정상 (307 리다이렉트 → 200)
- ⬜ Docker 미실행으로 백엔드 pytest 자동 검증 미수행
- ⬜ Playwright UI 자동 검증 미수행 (Node.js 14 환경 — Playwright는 Node.js 18+ 필요)

#### 수동 검증 필요 항목

- ⬜ `docker compose up --build` — Docker 환경 전체 빌드 확인
- ⬜ 위자드 전체 플로우 수동 검증 (Step 1 → 2 → 3 → 4 → `/plans` 이동)
- ⬜ 2초 로딩 딜레이 및 스켈레톤 UI 시각적 확인
- ⬜ 여행 계획 목록에 신규 계획 추가 확인 (새로고침 후에도 localStorage 유지)
- ⬜ 여행 계획 상세 페이지 타임라인 및 숙소/맛집 카드 시각적 확인
- ⬜ 모바일 뷰포트 (375px) 레이아웃 확인
- ⬜ UI 디자인/시각적 품질 판단
- ⬜ develop → sprint2 PR 머지 후 로컬 Docker 스테이징 검증

#### PR 생성 안내

원격 저장소 push 권한 확보 후 아래 명령어로 진행:

```bash
# develop 브랜치 원격 푸시
git checkout develop
git push -u origin develop

# sprint2 원격 푸시
git checkout sprint2
git push -u origin sprint2

# PR 생성 (gh CLI)
gh pr create --base develop --head sprint2 \
  --title "feat: Sprint 2 완료 - 여행 계획 생성 위자드 및 LLM 여행지 추천(Mock) 구현"
```

---

## 참고

- 검증 원칙: `docs/dev-process.md` 섹션 5
- 배포 이력: `docs/deploy-history/`
- 롤백 방법: `docs/dev-process.md` 섹션 6.4

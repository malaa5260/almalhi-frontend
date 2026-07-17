# Tasks: About System Support Page

**Input**: Design documents from `/specs/001-about-system-support/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/about-page-ui.md, quickstart.md

**Tests**: Focused client `*.spec.ts` tasks are included because the plan requires route/page tests and the feature changes app routing and visible UI.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **App shell**: `apps/client/src/app/`
- **About page**: `apps/client/src/app/pages/about/`
- **Tests**: beside changed code as `*.spec.ts`
- **Design docs**: `specs/001-about-system-support/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm ownership, route scope, and create the page workspace.

- [ ] T001 Confirm app-shell ownership and no new feature/shared/data-access library work in `specs/001-about-system-support/plan.md`
- [ ] T002 Create About page directory at `apps/client/src/app/pages/about/`
- [ ] T003 [P] Confirm no new package or runtime dependency is needed in `specs/001-about-system-support/research.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add the public route shell and test coverage that all user stories depend on.

**CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T004 Add a public lazy-loaded `/about` route without `canActivate` in `apps/client/src/app/app.routes.ts`
- [ ] T005 [P] Add route coverage asserting `/about` exists and has no guard in `apps/client/src/app/app.spec.ts`
- [ ] T006 [P] Create the About page component test scaffold in `apps/client/src/app/pages/about/about.spec.ts`
- [ ] T007 Create the standalone About page component shell with `ChangeDetectionStrategy.OnPush` in `apps/client/src/app/pages/about/about.ts`
- [ ] T008 Create the About page template shell with top-level semantic sections in `apps/client/src/app/pages/about/about.html`

**Checkpoint**: Foundation ready. `/about` route and About page shell are in place for story implementation.

---

## Phase 3: User Story 1 - Learn What The System Does (Priority: P1) MVP

**Goal**: A visitor or signed-in user can understand the system purpose, target users, and primary benefits from the About page.

**Independent Test**: Open `/about` and confirm the first visible content area explains the Almalhi system purpose, identifies intended users, and presents at least three capabilities or benefits without relying on other pages.

### Tests for User Story 1

- [ ] T009 [P] [US1] Add component tests for purpose summary, audience labels, and at least three capabilities in `apps/client/src/app/pages/about/about.spec.ts`

### Implementation for User Story 1

- [ ] T010 [US1] Define local readonly presentation models for hero, audiences, and capabilities in `apps/client/src/app/pages/about/about.ts`
- [ ] T011 [US1] Implement the hero purpose region and audience region in `apps/client/src/app/pages/about/about.html`
- [ ] T012 [US1] Implement the capabilities region with at least three benefits in `apps/client/src/app/pages/about/about.html`
- [ ] T013 [US1] Apply Tailwind-first responsive layout and scannable visual hierarchy for the purpose, audience, and capabilities regions in `apps/client/src/app/pages/about/about.html`

**Checkpoint**: User Story 1 is independently testable as the MVP.

---

## Phase 4: User Story 2 - Understand System Support (Priority: P2)

**Goal**: A user can understand account access, protected dashboard usage, reusable platform support, future service growth, and where to continue for support contact information.

**Independent Test**: Open `/about` and confirm the support section explains account entry points, protected access, dashboard visibility, future workflow support, and includes a visible support/contact path without collecting personal data.

### Tests for User Story 2

- [ ] T014 [P] [US2] Add component tests for support items, protected dashboard wording, visible support/contact action, and absence of form fields in `apps/client/src/app/pages/about/about.spec.ts`

### Implementation for User Story 2

- [ ] T015 [US2] Define local readonly presentation models for support items and contact action in `apps/client/src/app/pages/about/about.ts`
- [ ] T016 [US2] Implement the system support region covering account entry, protected access, dashboard visibility, and future service expansion in `apps/client/src/app/pages/about/about.html`
- [ ] T017 [US2] Implement a visible support/contact path that does not collect input or personal data in `apps/client/src/app/pages/about/about.html`
- [ ] T018 [US2] Keep auth copy aligned with public About access and protected dashboard rules in `apps/client/src/app/pages/about/about.html`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Navigate From The About Page (Priority: P3)

**Goal**: A visitor or user can continue to login, registration, support/contact, or the main public area without using browser back navigation.

**Independent Test**: Open `/about` and confirm next actions provide clear public or account-related journeys, including login or registration and return to the main public area.

### Tests for User Story 3

- [ ] T019 [P] [US3] Add component tests for next-action labels and hrefs to public/account-related routes in `apps/client/src/app/pages/about/about.spec.ts`

### Implementation for User Story 3

- [ ] T020 [US3] Define local readonly presentation models for next actions in `apps/client/src/app/pages/about/about.ts`
- [ ] T021 [US3] Implement next-action links for login, registration, support/contact, and home journeys in `apps/client/src/app/pages/about/about.html`
- [ ] T022 [US3] Ensure next-action layout remains readable and reachable after long content on mobile and desktop in `apps/client/src/app/pages/about/about.html`

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate quality gates, responsive UX, and documentation alignment.

- [ ] T023 [P] Review About page content against the UI contract in `specs/001-about-system-support/contracts/about-page-ui.md`
- [ ] T024 [P] Review UX requirements checklist findings before final delivery in `specs/001-about-system-support/checklists/ux.md`
- [ ] T025 Run `npx nx test client` from the repository root and record the result in `specs/001-about-system-support/quickstart.md`
- [ ] T026 Run `npx nx lint client` from the repository root and record the result in `specs/001-about-system-support/quickstart.md`
- [ ] T027 Run `npx nx build client` from the repository root and record the result in `specs/001-about-system-support/quickstart.md`
- [ ] T028 Perform desktop and mobile visual review for `/about` and record findings in `specs/001-about-system-support/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies. Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. Blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational completion. This is the MVP.
- **User Story 2 (Phase 4)**: Depends on Foundational completion. Can be implemented after or alongside US1, but should preserve independent testability.
- **User Story 3 (Phase 5)**: Depends on Foundational completion. Can be implemented after or alongside US1/US2, but should preserve independent testability.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other user stories after Phase 2.
- **User Story 2 (P2)**: No hard dependency on US1 after Phase 2, but shares the same About page component and template.
- **User Story 3 (P3)**: No hard dependency on US1 or US2 after Phase 2, but shares the same next-action model and template.

### Within Each User Story

- Write or update story-specific tests before implementation.
- Define local presentation models in `about.ts` before binding them in `about.html`.
- Keep support/contact behavior static and free of forms, backend calls, guards, or personal-data collection.
- Finish each story checkpoint before treating that story as complete.

### Parallel Opportunities

- T003 can run in parallel with T002 after T001.
- T005 and T006 can run in parallel after T004 is planned.
- T009, T014, and T019 touch the same test file, so they should be coordinated if parallelized.
- US1, US2, and US3 can be assigned independently after Phase 2, but `about.ts` and `about.html` changes require merge coordination.
- T023 and T024 can run in parallel after user story implementation.

---

## Parallel Example: User Story 1

```text
Task: "T009 [P] [US1] Add component tests for purpose summary, audience labels, and at least three capabilities in apps/client/src/app/pages/about/about.spec.ts"
Task: "T010 [US1] Define local readonly presentation models for hero, audiences, and capabilities in apps/client/src/app/pages/about/about.ts"
```

## Parallel Example: User Story 2

```text
Task: "T014 [P] [US2] Add component tests for support items, protected dashboard wording, visible support/contact action, and absence of form fields in apps/client/src/app/pages/about/about.spec.ts"
Task: "T015 [US2] Define local readonly presentation models for support items and contact action in apps/client/src/app/pages/about/about.ts"
```

## Parallel Example: User Story 3

```text
Task: "T019 [P] [US3] Add component tests for next-action labels and hrefs to public/account-related routes in apps/client/src/app/pages/about/about.spec.ts"
Task: "T020 [US3] Define local readonly presentation models for next actions in apps/client/src/app/pages/about/about.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational route and component shell.
3. Complete Phase 3: User Story 1.
4. Stop and validate User Story 1 with `apps/client/src/app/pages/about/about.spec.ts`.

### Incremental Delivery

1. Add public `/about` foundation.
2. Add US1 purpose, audience, and capabilities.
3. Add US2 support explanation and contact path.
4. Add US3 next actions.
5. Run client tests, lint, build, and desktop/mobile visual review.

### Parallel Team Strategy

1. Complete Setup and Foundational tasks together.
2. Split US1, US2, and US3 content work with explicit coordination for `about.ts`, `about.html`, and `about.spec.ts`.
3. Run Polish tasks after all targeted user stories are complete.

---

## Notes

- [P] tasks use different files or can be coordinated without depending on incomplete tasks.
- [US1], [US2], and [US3] labels map directly to user stories in `specs/001-about-system-support/spec.md`.
- Avoid adding backend services, route guards, forms, global CSS, or new dependencies for this static public page.
- Keep all implementation inside `apps/client` unless the plan is explicitly revised.

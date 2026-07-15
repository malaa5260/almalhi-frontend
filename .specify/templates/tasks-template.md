---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include focused `*.spec.ts` tasks for auth, guards, interceptors, services,
forms, routing, and shared UI behavior. For low-risk changes where tests are not
applicable, include a task or note documenting why.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **App shell**: `apps/client/src/app/`, `apps/client/src/styles.css`,
  `apps/client/public/`
- **Feature routes/pages**: `features/<feature-name>/src/lib/`
- **Reusable UI**: `shared/ui/src/lib/`
- **Cross-cutting infrastructure**: `shared/core/src/lib/`
- **API/data services and contracts**: `shared/data-access/src/lib/`
- **Tests**: beside the changed code as `*.spec.ts`

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit-tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Confirm affected Nx projects and exact layer ownership from plan.md
- [ ] T002 Confirm route ownership, data-access ownership, and validation commands
- [ ] T003 [P] Confirm no new dependency is required, or record explicit approval

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Define or update request/response types in `shared/data-access/src/lib/`
- [ ] T005 [P] Implement or update service APIs in `shared/data-access/src/lib/`
- [ ] T006 [P] Implement or update guards/interceptors/core services in `shared/core/src/lib/`
- [ ] T007 Create shared UI primitives in `shared/ui/src/lib/` only when reusable
- [ ] T008 Configure route entries in `apps/client/src/app/app.routes.ts` or feature routes
- [ ] T009 Add loading, empty, and error-state support needed by all stories

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1

> **NOTE: For constitution-required risk areas, write these tests before implementation
> and verify they fail for the intended reason where practical.**

- [ ] T010 [P] [US1] Unit test for [service/form/guard/component] in [exact-path].spec.ts
- [ ] T011 [P] [US1] Route or integration-style test for [user journey] in [exact-path].spec.ts

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create or update types in `shared/data-access/src/lib/[area]/types/`
- [ ] T013 [P] [US1] Create reusable UI component in `shared/ui/src/lib/[component]/`
- [ ] T014 [US1] Implement service behavior in `shared/data-access/src/lib/[area]/`
- [ ] T015 [US1] Implement page/component behavior in `features/[feature]/src/lib/`
- [ ] T016 [US1] Add validation, loading, success, and error states
- [ ] T017 [US1] Wire route or navigation behavior through Angular Router

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2

- [ ] T018 [P] [US2] Unit test for [service/form/guard/component] in [exact-path].spec.ts
- [ ] T019 [P] [US2] Route or integration-style test for [user journey] in [exact-path].spec.ts

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create or update types in `shared/data-access/src/lib/[area]/types/`
- [ ] T021 [US2] Implement service or core behavior in the owned shared layer
- [ ] T022 [US2] Implement page/component behavior in `features/[feature]/src/lib/`
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3

- [ ] T024 [P] [US3] Unit test for [service/form/guard/component] in [exact-path].spec.ts
- [ ] T025 [P] [US3] Route or integration-style test for [user journey] in [exact-path].spec.ts

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create or update types in `shared/data-access/src/lib/[area]/types/`
- [ ] T027 [US3] Implement service or core behavior in the owned shared layer
- [ ] T028 [US3] Implement page/component behavior in `features/[feature]/src/lib/`

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests beside changed code
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation
- [ ] TXXX Run required Nx checks from plan.md and record results

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests for constitution-required risk areas MUST be written before implementation
- Types before services
- Services before pages/components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for [service/form/guard/component] in [exact-path].spec.ts"
Task: "Route or integration-style test for [user journey] in [exact-path].spec.ts"

# Launch independent layer work for User Story 1 together:
Task: "Create or update types in shared/data-access/src/lib/[area]/types/"
Task: "Create reusable UI component in shared/ui/src/lib/[component]/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 -> I. Layered Nx Architecture
- Template principle 2 -> II. Angular Standalone Consistency
- Template principle 3 -> III. Data Access and Auth Boundaries
- Template principle 4 -> IV. Focused Testing and Quality Gates
- Template principle 5 -> V. Scoped, Dependency-Conscious Change
Added sections:
- Technology and Dependency Constraints
- Development Workflow and Review Gates
Removed sections:
- None
Templates requiring updates:
- Updated: .specify/templates/plan-template.md
- Updated: .specify/templates/spec-template.md
- Updated: .specify/templates/tasks-template.md
- Not present: .specify/templates/commands/*.md
- Reviewed: .specify/extensions/agent-context/commands/speckit.agent-context.update.md
- Reviewed: AGENTS.md
- Reviewed: PROJECT_OVERVIEW.md
- Reviewed: MONOREPO_COMPLETION_PLAN.md
Deferred follow-up items:
- None
-->
# Almalhi Frontend Constitution

## Core Principles

### I. Layered Nx Architecture
All production code MUST preserve the monorepo dependency direction:
`apps/client -> features/* -> shared/*`, with `apps/client -> shared/*` allowed for
application shell needs. Feature-specific pages, routes, and behavior MUST live under
`features/<feature-name>`. Reusable presentation components MUST live in `shared/ui`,
cross-cutting infrastructure in `shared/core`, and API-facing services and types in
`shared/data-access`. Cross-library imports MUST use the configured public aliases
instead of deep relative paths.

Rationale: Clear boundaries keep the Angular workspace scalable, make Nx project
dependencies understandable, and reduce coupling as the product grows.

### II. Angular Standalone Consistency
Angular code MUST use standalone components, Angular Router lazy loading, reactive forms
for form-heavy flows, signals for local UI state, RxJS for async service APIs, and
`ChangeDetectionStrategy.OnPush` for components unless a concrete exception is documented
in the implementation plan. Dependency injection SHOULD use `inject(...)` to match the
existing codebase. Styling MUST be Tailwind-first, with global CSS limited to application
setup and shared primitives that cannot be expressed cleanly with utilities.

Rationale: Consistent Angular patterns reduce maintenance cost and keep new features
aligned with the current app shell, auth feature, and shared component style.

### III. Data Access and Auth Boundaries
Page and feature components MUST NOT perform direct HTTP calls or duplicate API
contracts. Backend-facing requests, response types, token/session behavior, and mock API
compatibility MUST be centralized in `shared/data-access`. Guards, interceptors, toast
infrastructure, and similar app-wide behavior MUST live in `shared/core`. Protected routes
MUST use route guards, and auth flows MUST use the matching data-access service method
instead of local mock timers when such a method exists.

Rationale: Centralized data access keeps contracts typed, makes backend integration
replaceable, and prevents security-sensitive behavior from being scattered across pages.

### IV. Focused Testing and Quality Gates
Changes to auth, guards, interceptors, services, forms, routing, or shared UI behavior
MUST include focused `*.spec.ts` coverage beside the changed code unless the plan records
why tests are not applicable. The relevant Nx target MUST be run before delivery when
available, such as `npx nx test <project>`, `npx nx lint <project>`, or
`npx nx build client`. Failed or skipped validation MUST be reported with the reason and
remaining risk.

Rationale: The highest-risk frontend behavior is route protection, auth state, forms,
and reusable UI. Targeted tests and Nx validation catch regressions without requiring
unrelated broad rewrites.

### V. Scoped, Dependency-Conscious Change
Feature work MUST stay scoped to the requested behavior and MUST NOT introduce new npm
packages, Angular packages, Nx plugins, icon libraries, chart libraries, or runtime
dependencies without explicit approval. Responsibilities MUST NOT move between `apps`,
`features`, and `shared` unless the plan explains the intended dependency direction and
the change is required. Existing user changes MUST be preserved.

Rationale: Small, intentional changes keep the workspace reviewable and protect the
current architecture from accidental coupling or dependency growth.

## Technology and Dependency Constraints

The project standard stack is Angular 21, Nx 22, TypeScript 5.9, Tailwind CSS 4, Vite 8,
AnalogJS Angular/Vitest integration, Vitest 4 with jsdom and V8 coverage, ESLint 9,
Prettier 3, RxJS, and Font Awesome Free 7. Commands MUST be run from the repository root
using Nx directly because the package defines no npm scripts.

New implementation plans MUST identify affected projects, real source paths, route
ownership, service/data contracts, styling approach, and validation commands. Plans that
need backend integration MUST preserve mock-compatible service APIs until real endpoints
are available or explicitly remove that compatibility as a documented breaking change.

## Development Workflow and Review Gates

Specs MUST describe independently testable user journeys and measurable success criteria.
Plans MUST pass a constitution check before research and again after design. Tasks MUST be
organized by independently deliverable user story and include exact repository paths.

Pull requests and final implementation summaries MUST include affected projects,
validation results, and any known test gaps. Architecture changes that alter dependency
direction, route protection, data-access ownership, or shared UI coupling require explicit
plan justification before implementation.

## Governance

This constitution supersedes informal repository practices when there is a conflict.
Amendments MUST update this file, include a Sync Impact Report, and review dependent
Spec Kit templates plus runtime guidance files for consistency. Versioning follows
semantic versioning: MAJOR for incompatible governance or principle removals/redefinitions,
MINOR for new principles or materially expanded guidance, and PATCH for clarifications or
non-semantic wording changes.

Every implementation plan, task list, and code review MUST verify compliance with the
Core Principles. Any intentional violation MUST be documented in the plan's Complexity
Tracking section with the rejected simpler alternative and MUST be resolved or accepted
before delivery.

**Version**: 1.0.0 | **Ratified**: 2026-07-16 | **Last Amended**: 2026-07-16

# Implementation Plan: About System Support Page

**Branch**: `001-about-system-support` | **Date**: 2026-07-16 |
**Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-about-system-support/spec.md`

**Note**: This plan follows the Angular/Nx monorepo constitution and the user direction:
"MonoRepo App Using Angular Frame Work clean arch models".

## Summary

Add a public About page that explains the Almalhi system purpose, supported user groups,
key capabilities, how the system supports user workflows, and a visible support/contact
path. Implement as an Angular standalone, lazy-loaded app-shell page under `apps/client`
because the feature is static public content and does not require backend data,
feature-library ownership, route guards, or data-access services.

## Technical Context

**Language/Version**: TypeScript 5.9 with Angular 21

**Primary Dependencies**: Angular Router, standalone components, Tailwind CSS 4, Nx 22,
Vite 8, AnalogJS Angular/Vitest integration

**Storage**: N/A; the page is static informational content and stores no user data

**Testing**: Vitest 4 with jsdom through Nx targets

**Target Platform**: Browser-based Angular client application

**Project Type**: Nx Angular monorepo frontend

**Performance Goals**: Lazy-load the About page route; users can identify page purpose
from the first visible content area; content remains readable without horizontal
scrolling on common desktop and mobile viewports

**Constraints**: Preserve monorepo dependency direction; no new packages; Tailwind-first
styling; no direct HTTP calls; no personal-data collection; public route must not be
guarded

**Scale/Scope**: Affected project is `client`. Source changes are expected in
`apps/client/src/app/pages/about/` and `apps/client/src/app/app.routes.ts`; no changes
expected in `features/*`, `shared/core`, or `shared/data-access`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Layer ownership**: PASS. The About page is public app-shell content, so it belongs in
  `apps/client/src/app/pages/about/`.
- **Dependency direction**: PASS. The page may use existing app/shared UI imports through
  aliases where needed and does not introduce reverse dependencies.
- **Angular consistency**: PASS. Plan uses a standalone, lazy-loaded Angular page with
  `ChangeDetectionStrategy.OnPush`; reactive forms and RxJS service APIs are not
  applicable because there is no input or async service behavior.
- **Data/auth boundaries**: PASS. The page is static, public, and unguarded. No HTTP
  calls, API contracts, token behavior, guards, or interceptors are needed.
- **Testing and validation**: PASS. Plan includes route/page tests where practical plus
  `npx nx test client`, `npx nx lint client`, `npx nx build client`, and desktop/mobile
  visual review.
- **Dependency control**: PASS. No new runtime or dev dependencies are needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-about-system-support/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── about-page-ui.md
└── tasks.md
```

### Source Code (repository root)

```text
apps/client/src/app/
├── app.routes.ts
└── pages/
    └── about/
        ├── about.html
        ├── about.spec.ts
        └── about.ts
```

**Structure Decision**: Keep this page in `apps/client` because it is static public
application-shell content, similar in ownership to the existing home page. Use local
readonly view models in `about.ts` for content sections and support/contact actions so
the template stays maintainable without creating a data-access service or feature
library. Revisit extraction to `features/about` only if the About area gains its own
routes, dynamic backend data, or feature-specific behavior.

## Complexity Tracking

No constitution violations. No complexity exceptions are required.

## Phase 0: Research Summary

See [research.md](./research.md). Key decisions:

- Implement as an app-shell standalone page, not a new feature library.
- Model About content as local read-only view models, not API/domain entities.
- Provide the support/contact path as a navigation or contact action, without embedded
  forms or personal-data collection.

## Phase 1: Design Summary

See [data-model.md](./data-model.md) for the lightweight presentation models, and
[contracts/about-page-ui.md](./contracts/about-page-ui.md) for the UI contract.

Post-design constitution check remains PASS:

- The design does not add packages, services, backend calls, guards, or new shared-layer
  coupling.
- Route ownership remains in `apps/client/src/app/app.routes.ts`.
- Validation remains scoped to `client` plus visual review.

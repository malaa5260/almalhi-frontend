# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.9 with Angular 21

**Primary Dependencies**: Angular Router, reactive forms, signals, RxJS, Tailwind CSS 4,
Nx 22, Vite 8, AnalogJS Angular/Vitest integration

**Storage**: Browser storage only when needed for token/session state; otherwise N/A

**Testing**: Vitest 4 with jsdom through Nx targets

**Target Platform**: Browser-based Angular client application

**Project Type**: Nx Angular monorepo frontend

**Performance Goals**: Lazy-loaded routes and responsive UI without avoidable layout shift;
feature-specific metrics go here

**Constraints**: Preserve monorepo dependency direction; no new packages without approval;
Tailwind-first styling; no direct HTTP calls in page components

**Scale/Scope**: Identify affected app, feature, shared UI, core, and data-access projects

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Layer ownership**: Does each source change belong in `apps/client`, `features/*`,
  `shared/ui`, `shared/core`, or `shared/data-access` according to the constitution?
- **Dependency direction**: Are cross-library imports using public aliases and preserving
  `apps/client -> features/* -> shared/*` plus allowed `apps/client -> shared/*` paths?
- **Angular consistency**: Are standalone components, lazy routes, reactive forms,
  signals, RxJS service APIs, `inject(...)`, and `OnPush` used where applicable?
- **Data/auth boundaries**: Are HTTP calls, API contracts, token/session behavior, guards,
  and interceptors owned by the correct shared layer?
- **Testing and validation**: Are focused tests planned for changed auth, guard,
  interceptor, service, form, routing, or shared UI behavior, with Nx commands listed?
- **Dependency control**: Does the plan avoid new runtime/dev dependencies unless
  explicit approval is recorded?

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
apps/client/src/
├── app/
│   ├── pages/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
└── styles.css

features/<feature-name>/src/
├── index.ts
└── lib/
    ├── <feature>.routes.ts
    └── pages/

shared/ui/src/lib/
shared/core/src/lib/
shared/data-access/src/lib/
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

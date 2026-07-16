# Repository Guidelines

## Project Structure & Module Organization

This is an Nx Angular monorepo. The main app lives in `apps/client`, with app routes, shell components, global styles, and public assets under `apps/client/src` and `apps/client/public`.

Feature code is grouped under `features`, currently `features/auth` for authentication pages and auth child routes. Shared libraries live under `shared`: `shared/ui` for reusable standalone components, `shared/core` for guards, interceptors, and app-wide services, and `shared/data-access` for API-facing services and request/response types.

Use the configured aliases instead of deep relative imports where possible: `@almalhi-frontend/ui`, `@almalhi-frontend/core`, `@almalhi-frontend/data-access`, and `@almalhi-frontend/auth`.

## Tech Stack

- Angular 21 with standalone components, Angular Router, reactive forms, signals, and RxJS.
- Nx 22 monorepo tooling for project graph, builds, serving, linting, and tests.
- TypeScript 5.9 for application and library code.
- Tailwind CSS 4 with PostCSS for styling.
- Vite 8 and AnalogJS Angular/Vitest integration for the build and test pipeline.
- Vitest 4 with jsdom and V8 coverage for unit tests.
- ESLint 9, angular-eslint, typescript-eslint, and Prettier 3 for linting and formatting.
- Font Awesome Free 7 for icon assets where needed.

## Build, Test, and Development Commands

This package has no npm scripts, so use Nx directly:

- `npx nx serve client`: run the Angular app locally in development mode.
- `npx nx build client`: build the client app for production.
- `npx nx test client`: run unit tests for the app.
- `npx nx test ui`: run tests for the shared UI library.
- `npx nx lint client`: lint the client app.
- `npx nx graph`: inspect project dependencies visually.

Run commands from the repository root.

## Coding Style & Naming Conventions

Use TypeScript, Angular standalone components, and `ChangeDetectionStrategy.OnPush` for components unless there is a clear reason not to. Prefer `inject(...)` for dependency injection, Angular signals for local UI state, and reactive forms for form-heavy pages.

Component selectors follow project prefixes: app components use `app-*`, library components generally use `lib-*`, while existing shared UI components use `almalhi-*`. Keep filenames kebab-case, for example `forgot-password.ts`.

Styling is Tailwind-first. Global styles are in `apps/client/src/styles.css`.

### Naming Conventions

- Folders: use kebab-case for feature, page, and component folders, such as `forgot-password`, `otp-verification`, and `data-access`.
- Files: use kebab-case and keep the file name aligned with the main exported item, such as `auth-guard.ts`, `auth-interceptor.ts`, `auth.service.ts`, and `auth.routes.ts`.
- Components: use PascalCase class names, such as `Login`, `Register`, `Header`, and `Button`.
- Component selectors: use `app-*` for app-owned components, `almalhi-*` for current shared UI components, and `lib-*` only when following generated library defaults.
- Services: use PascalCase with the `Service` suffix, such as `AuthService` and `ToastService`.
- Guards: use camelCase function names with the `Guard` suffix, such as `authGuard`.
- Interceptors: use camelCase function names with the `Interceptor` suffix, such as `authInterceptor`.
- Routes: export route arrays in uppercase snake case, such as `AUTH_ROUTES`.
- Types and interfaces: use PascalCase names that describe the API or UI contract, such as `LoginRequest`, `RegisterRequest`, `AuthResponse`, and `NavItem`.
- Signals: name signal fields by the state they represent, such as `isAuthenticated` and `isMobileMenuOpen`.
- Booleans: prefer `is*`, `has*`, `can*`, or `should*` prefixes, such as `isLoading`, `hasError`, or `canSubmit`.
- Path aliases: prefer public aliases over deep relative imports for cross-library usage.

## Testing Guidelines

Testing uses Vitest through Nx and Angular test executors. Place tests beside the code they cover using `*.spec.ts`, as in `apps/client/src/app/app.spec.ts`.

Add focused tests for guards, services, form validation, and route behavior when changing those areas. Run the relevant `npx nx test <project>` command before opening a PR.

## Do And Don't

### Do

- Use Nx commands from the repository root.
- Use existing project aliases instead of deep relative imports across libraries.
- Follow the existing Angular standalone component style.
- Keep shared UI components reusable and mostly presentational.
- Put API-facing services, request types, and response types in `shared/data-access`.
- Put guards, interceptors, and cross-cutting app infrastructure in `shared/core`.
- Put feature-specific pages, routes, and behavior in `features/<feature-name>`.
- Add focused tests when changing auth, guards, services, forms, routing, or shared UI behavior.
- Keep changes scoped to the requested task.
- Ask before making architectural changes that move responsibilities between layers.

### Don't

- Do not add a new npm package, Angular package, Nx plugin, icon library, chart library, or runtime dependency without asking first.
- Do not move code between `apps`, `features`, and `shared` without checking the intended dependency direction.
- Do not make `shared/ui` depend on feature-specific logic or backend/data-access services.
- Do not put HTTP calls directly inside page components.
- Do not duplicate models or request/response types across features.
- Do not bypass route guards for protected pages.
- Do not leave mock `setTimeout` logic in pages when a matching data-access service method exists.
- Do not add global CSS when Tailwind utilities or a reusable UI component can handle the styling cleanly.
- Do not introduce unrelated refactors while implementing a focused feature or fix.
- Do not remove existing user changes or rewrite files broadly unless explicitly requested.

## Commit & Pull Request Guidelines

Recent commits mostly use short conventional-style messages such as `feat(auth): ...`, `feat(core): ...`, and `fix ...`. Prefer:

- `feat(scope): add new behavior`
- `fix(scope): correct broken behavior`
- `docs: update project guide`

Pull requests should include a concise summary, affected projects, test results, linked issue if applicable, and screenshots for visible UI changes.

## Architecture Notes

Keep feature behavior in `features/*`, reusable presentation pieces in `shared/ui`, cross-cutting infrastructure in `shared/core`, and API/data concerns in `shared/data-access`. Avoid adding new coupling from shared UI to feature-specific logic.

### Current Folder Structure

```text
almalhi-frontend/
├── apps/
│   └── client/
│       ├── public/
│       └── src/
│           ├── app/
│           │   ├── pages/
│           │   │   ├── dashboard/
│           │   │   └── home/
│           │   ├── app.config.ts
│           │   ├── app.routes.ts
│           │   └── app.ts
│           ├── main.ts
│           └── styles.css
├── features/
│   └── auth/
│       └── src/
│           ├── index.ts
│           └── lib/
│               ├── auth.routes.ts
│               └── pages/
│                   ├── forgot-password/
│                   ├── login/
│                   ├── otp-verification/
│                   ├── register/
│                   └── reset-password/
└── shared/
    ├── core/
    │   └── src/lib/
    │       ├── auth/
    │       │   ├── auth-guard.ts
    │       │   └── auth-interceptor.ts
    │       └── toast/
    ├── data-access/
    │   └── src/lib/
    │       └── auth/
    │           ├── auth.service.ts
    │           └── types/
    └── ui/
        └── src/lib/
            ├── button/
            ├── card/
            ├── footer/
            ├── header/
            ├── input/
            ├── layout/
            └── toast/
```

### Layers

- `apps/client`: application shell layer. Owns bootstrap, global providers, top-level routes, global styles, static assets, and app-level pages that have not yet been extracted into feature libraries.
- `features/auth`: feature layer. Owns authentication routes and pages under `/auth`.
- `shared/ui`: presentation layer. Contains reusable standalone UI components. Keep this layer as presentational as possible.
- `shared/core`: infrastructure layer. Contains app-wide guards, interceptors, toast infrastructure, and future cross-cutting utilities.
- `shared/data-access`: API/data layer. Contains services, request/response types, token/session access, and future backend integration code.

### Patterns Used

- Angular standalone components instead of NgModules.
- Centralized top-level routing in `apps/client/src/app/app.routes.ts`.
- Lazy loading with `loadComponent` for pages and `loadChildren` for feature routes.
- Feature child routes exposed from `features/auth/src/index.ts`.
- Reactive forms for form-heavy auth pages.
- Angular signals for local UI state and auth state.
- RxJS observables for async service APIs.
- Functional route guards and HTTP interceptors.
- Tailwind-first component styling with global styles in `apps/client/src/styles.css`.
- Public library imports through aliases: `@almalhi-frontend/ui`, `@almalhi-frontend/core`, `@almalhi-frontend/data-access`, and `@almalhi-frontend/auth`.

### Dependency Direction

Target dependency direction is:

```text
apps/client -> features/* -> shared/*
apps/client -> shared/*
features/* -> shared/ui, shared/core, shared/data-access
shared/core -> shared/data-access only when infrastructure needs auth/session state
shared/ui -> no feature or data-access dependencies
shared/data-access -> no app, feature, UI, or core dependencies
```

When adding new code, prefer moving user-facing business areas into `features/<name>`, reusable components into `shared/ui`, cross-cutting behavior into `shared/core`, and API-facing state/services/types into `shared/data-access`.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan:
`specs/001-about-system-support/plan.md`
<!-- SPECKIT END -->

# Almalhi Frontend Monorepo Completion Plan

## Summary

Turn this repo from a starter Angular/Nx app into a strong learning and portfolio monorepo that covers the important Nx monorepo topics: app/library structure, boundaries, lazy loading, shared UI, core services, data access, real API readiness, testing, linting, CI, and production build quality.

Assumption: the goal is to become good at Nx monorepo architecture while completing this project as a polished frontend. If no backend exists yet, use typed mock APIs first, then keep the code ready for real endpoints.

## Current Architecture

### Folder Structure

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
│           ├── index.html
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
├── shared/
│   ├── core/
│   │   └── src/lib/
│   │       ├── auth/
│   │       │   ├── auth-guard.ts
│   │       │   └── auth-interceptor.ts
│   │       └── toast/
│   │           └── toast.service.ts
│   ├── data-access/
│   │   └── src/lib/
│   │       └── auth/
│   │           ├── auth.service.ts
│   │           └── types/
│   └── ui/
│       └── src/lib/
│           ├── button/
│           ├── card/
│           ├── footer/
│           ├── header/
│           ├── input/
│           ├── layout/
│           └── toast/
├── nx.json
├── package.json
├── tsconfig.base.json
└── PROJECT_OVERVIEW.md
```

### Layers

- `apps/client`: application shell layer. It owns bootstrap, global providers, top-level routing, global styles, and app-level pages that have not yet been moved into feature libraries.
- `features/auth`: feature layer. It owns auth-specific pages and child routes under `/auth`.
- `shared/ui`: presentation layer. It contains reusable standalone UI components such as buttons, inputs, cards, layout, header, footer, and toast display.
- `shared/core`: application infrastructure layer. It contains cross-cutting logic such as route guards, HTTP interceptors, and app-wide services.
- `shared/data-access`: API and state access layer. It contains typed request/response models and services that communicate with mock or real backend APIs.

### Patterns Used

- Nx monorepo with one app and multiple libraries.
- Angular standalone components instead of NgModules.
- Lazy-loaded routes through `loadComponent` and `loadChildren`.
- Feature-based routing for auth through `AUTH_ROUTES`.
- Shared library aliases through `tsconfig.base.json`:
  - `@almalhi-frontend/ui`
  - `@almalhi-frontend/core`
  - `@almalhi-frontend/data-access`
  - `@almalhi-frontend/auth`
- Reactive forms for authentication pages.
- Angular signals for UI and auth state.
- RxJS observables for async service methods.
- Route guard pattern for protected dashboard access.
- HTTP interceptor pattern for bearer token attachment.
- Tailwind-first styling with global styles in `apps/client/src/styles.css`.

### Current Dependency Direction

```text
apps/client
├── features/auth
├── shared/ui
├── shared/core
└── shared/data-access

features/auth
├── shared/ui
└── shared/data-access

shared/core
└── shared/data-access

shared/ui
└── currently has some service coupling that should be reduced

shared/data-access
└── should stay independent from UI, feature, and app layers
```

The intended long-term direction is app -> feature -> shared, with shared UI kept presentational and data-access kept independent from UI concerns.

## Step-By-Step Plan

### 1. Stabilize The Current Foundation

- Run and confirm the current app works:
  - `npx nx serve client`
  - `npx nx build client`
  - `npx nx test client`
  - `npx nx lint client`
- Fix any build, lint, or test errors before adding new features.
- Clean small inconsistencies:
  - `/` nav should go to `/home`, not a route that only redirects.
  - Add real `/services` and `/about` routes or remove those links.
  - Remove unused imports and console logs from production-facing services.

### 2. Learn And Enforce Nx Project Structure

- Add proper Nx tags to each project:
  - `client`: `type:app`, `scope:client`
  - `features/auth`: `type:feature`, `scope:auth`
  - `shared/ui`: `type:ui`, `scope:shared`
  - `shared/core`: `type:core`, `scope:shared`
  - `shared/data-access`: `type:data-access`, `scope:shared`
- Configure `@nx/enforce-module-boundaries` in ESLint.
- Enforce rules like:
  - Apps can depend on all libs.
  - Feature libs can depend on shared libs.
  - UI should not depend on data-access or feature libs.
  - Core can depend on data-access only if needed.
  - Data-access should not depend on UI or feature libs.

### 3. Make Shared UI More Reusable

- Keep `shared/ui` mostly presentational.
- Refactor `Header` so it receives auth state and logout behavior from the app/layout instead of directly injecting `AuthService`.
- Keep components reusable:
  - `Button`
  - `Input`
  - `Card`
  - `Header`
  - `Footer`
  - `Layout`
  - `Toast`
- Add basic variants and states:
  - Button: primary, secondary, danger, loading, disabled.
  - Input: error, hint, password visibility.
  - Card: default and compact.

### 4. Complete Authentication Properly

- Move all auth async behavior through `AuthService`.
- Replace local `setTimeout` logic in forgot password, OTP, and reset password pages with service calls.
- Improve auth navigation:
  - Login success should go to `/dashboard`.
  - Register success should go to `/auth/login` or auto-login, depending on chosen product behavior.
  - Forgot password should navigate to `/auth/otp`.
  - OTP success should navigate to `/auth/reset-password`.
  - Reset password success should navigate to `/auth/login`.
- Add typed auth models:
  - `LoginRequest`
  - `RegisterRequest`
  - `ForgotPasswordRequest`
  - `VerifyOtpRequest`
  - `ResetPasswordRequest`
  - `AuthResponse`
  - `User`
- Store access token and refresh token consistently.
- Add logout cleanup for all auth-related storage.

### 5. Add Environment-Based API Configuration

- Add Angular environment files for:
  - development
  - production
- Add an API base URL config, for example:
  - `apiBaseUrl`
  - `useMockApi`
- Update `AuthService` to support:
  - mock mode when no backend exists
  - HTTP mode when backend is available
- Keep endpoint paths centralized, not hardcoded across pages.

### 6. Prepare Real Backend Integration

- Replace mock auth methods with `HttpClient` calls behind the same public service API.
- Add proper error handling:
  - invalid credentials
  - duplicate email
  - expired OTP
  - weak password
  - network/server failure
- Update `authInterceptor`:
  - attach bearer token
  - skip auth endpoints if needed
  - handle `401` responses
- Add refresh token flow:
  - on access token expiry, call refresh endpoint
  - retry the failed request once
  - logout if refresh fails

### 7. Improve Route Protection And Access Control

- Keep `authGuard` for logged-in-only routes.
- Add a guest guard:
  - logged-in users should not visit login/register pages.
- Add role-based access if needed:
  - `admin`
  - `user`
  - future business roles
- Add route metadata for roles:
  - dashboard only for authenticated users
  - admin pages only for admin users if added later.

### 8. Complete Dashboard As A Feature

- Move dashboard into its own feature library:
  - `features/dashboard`
- Keep dashboard routes lazy-loaded.
- Create a dashboard data service in `shared/data-access`.
- Replace inline mock dashboard data with service-driven data.
- Add dashboard models:
  - summary cards
  - recent activity
  - yearly requests/orders
  - sales data
  - user growth data
- Add loading, empty, and error states.
- Add chart visualizations using a chart library or simple custom chart components.

### 9. Add More Business Pages To Cover Routing And Features

- Add `/about` page.
- Add `/services` page.
- Add one protected feature page, for example:
  - `/profile`
  - `/settings`
  - `/orders`
- Use this to practice:
  - lazy loading
  - feature boundaries
  - shared UI reuse
  - route guards
  - data-access services

### 10. Testing Plan

Add focused tests in each area:

- `shared/data-access`
  - auth login success
  - login failure
  - token storage
  - logout cleanup
  - refresh token behavior
- `shared/core`
  - auth guard redirects unauthenticated users
  - auth interceptor attaches token
  - interceptor handles missing token
- `features/auth`
  - form validation
  - disabled submit states
  - success navigation
  - error messages
- `shared/ui`
  - button variants
  - input error rendering
  - layout renders projected content
- `apps/client`
  - route configuration
  - shell layout integration

Run:

```bash
npx nx test client
npx nx test auth
npx nx test core
npx nx test data-access
npx nx test ui
```

### 11. CI And Quality Gates

- Add or complete `.github/workflows/ci.yml`.
- CI should run:
  - install dependencies
  - lint affected projects
  - test affected projects
  - build affected projects
- Use Nx affected commands:
  - `npx nx affected -t lint`
  - `npx nx affected -t test`
  - `npx nx affected -t build`
- Keep production build passing:
  - `npx nx build client`

### 12. Documentation

Update docs as the repo grows:

- `README.md`
  - how to install
  - how to serve
  - how to build
  - how to test
  - architecture overview
- `PROJECT_OVERVIEW.md`
  - update completed features
  - update current limitations
  - update next steps
- Add short README files for major libs:
  - `features/auth`
  - `features/dashboard`
  - `shared/ui`
  - `shared/core`
  - `shared/data-access`

## Important Interface Changes

- Add environment API config:
  - `apiBaseUrl`
  - `useMockApi`
- Add dashboard data-access service.
- Add guest guard.
- Add optional role guard if role-based pages are introduced.
- Refactor shared UI so reusable UI components avoid direct feature/data service coupling.

## Acceptance Criteria

The monorepo is complete for this milestone when:

- The app builds successfully.
- Auth flow works end to end using mock or real API mode.
- Dashboard data comes from a service, not inline page constants.
- Routes are lazy-loaded by feature.
- Nx module boundaries are enforced.
- Shared UI is reusable and mostly presentational.
- Guards, interceptor, auth service, forms, and key UI components have tests.
- CI runs lint, test, and build.
- Documentation explains the architecture clearly.

## Recommended Implementation Order

1. Fix current routes/nav and clean small issues.
2. Add Nx tags and enforce module boundaries.
3. Refactor shared UI coupling.
4. Complete auth flow through `AuthService`.
5. Add environment API config.
6. Add mock/real API-ready auth data layer.
7. Add refresh-token/session handling.
8. Move dashboard into a feature lib.
9. Add dashboard data service and charts.
10. Add missing public/protected pages.
11. Expand tests.
12. Add CI and update documentation.

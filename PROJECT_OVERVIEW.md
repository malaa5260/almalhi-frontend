# Almalhi Frontend Project Overview

## 1. Executive Summary

Almalhi Frontend is a modern Angular frontend application built inside an Nx monorepo. The project provides a scalable foundation for a business platform with authentication, protected dashboard access, reusable UI components, shared services, and a clean feature-based architecture.

The current product is focused on user access management and a starter dashboard experience. It includes public pages, authentication flows, a protected dashboard, reusable design components, and mock data/services that can later be connected to real backend APIs.

## 2. Project Purpose

The purpose of this project is to create a maintainable frontend platform that can grow into a larger business application. The codebase is organized to support:

- Fast development of new frontend features.
- Reusable UI components across the application.
- Shared authentication and data-access logic.
- Protected routes for authenticated users.
- Scalable application structure using Nx libraries.
- Consistent styling using Tailwind CSS and shared components.

## 3. Target Users

The application is intended for users who need to access the Almalhi platform through a secure web interface. The current user types include:

- Visitors who can view the home page.
- New users who can create an account.
- Existing users who can sign in.
- Users who forgot their password and need account recovery.
- Authenticated users who can access the dashboard.

## 4. Current Functional Scope

### Public Area

The application includes a home page that introduces the platform and highlights the frontend architecture, including reusable UI, Nx monorepo structure, Tailwind styling, and scalable design.

### Authentication

The authentication module includes the following flows:

- Login with email and password.
- Register a new account with full name, email, password, and password confirmation.
- Forgot password request using email.
- OTP verification using a 4-digit code.
- Reset password with password confirmation.
- Logout support through the authentication service.

Authentication currently uses mock service responses and stores a mock access token in local storage.

### Protected Dashboard

The dashboard is protected by an authentication guard. Users who are not authenticated are redirected to the login page.

The dashboard currently displays:

- User, order, and revenue summary cards.
- Recent activity list.
- Requests and orders grouped by year.
- Mock sales data.
- Mock user growth data.

### Shared UI Components

The project includes reusable components for:

- Buttons.
- Cards.
- Inputs.
- Header.
- Footer.
- Layout.
- Toast display.

These components provide a consistent design system for current and future features.

## 5. Application Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/home` | Public landing/home page | Public |
| `/auth/login` | User login | Public |
| `/auth/register` | User registration | Public |
| `/auth/forgot-password` | Start password recovery | Public |
| `/auth/otp` | OTP verification | Public |
| `/auth/reset-password` | Set new password | Public |
| `/dashboard` | Business dashboard | Authenticated users only |

Unknown routes redirect to `/home`.

## 6. Technical Architecture

The project uses an Nx monorepo structure with one main Angular application and multiple libraries.

### Main Application

- `apps/client`: The main Angular web application.
- Contains app routing, layout integration, home page, and dashboard page.

### Feature Libraries

- `features/auth`: Contains authentication pages and routes.
- Keeps auth screens separated from the main application shell.

### Shared Libraries

- `shared/ui`: Reusable UI components used across pages and features.
- `shared/data-access`: Shared data services and request/response types.
- `shared/core`: Core application services, route guards, interceptors, and utilities.

## 7. Technology Stack

| Area | Technology |
| --- | --- |
| Framework | Angular |
| Workspace | Nx |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Forms | Angular Reactive Forms |
| Routing | Angular Router |
| State | Angular signals |
| Async handling | RxJS |
| Testing setup | Vitest |
| Icons | Font Awesome |

## 8. Current Data and Backend Status

The current authentication and dashboard data are mocked in the frontend.

The authentication service simulates:

- Login.
- Registration.
- Forgot password.
- OTP verification.
- Password reset.

The login flow stores a mock access token in local storage and updates an authentication signal. The HTTP interceptor is already prepared to attach a bearer token to future API requests.

## 9. Business Value

The current implementation delivers value by establishing the foundation for a production frontend platform:

- Clear project structure for future development.
- Reusable UI components to reduce duplication.
- Ready authentication user journeys.
- Protected dashboard route.
- Prepared token-based API integration pattern.
- Modular architecture that supports team collaboration.

## 10. Current Limitations

The project is not yet connected to a real backend. Important limitations include:

- Authentication uses mock responses.
- Dashboard data is static mock data.
- There is no real user session refresh flow yet.
- Error handling is basic and should be expanded once APIs are integrated.
- Password recovery and OTP flows are frontend-only until backend endpoints are available.
- Dashboard charts are currently represented as simple data displays, not full chart visualizations.

## 11. Recommended Next Steps

The recommended next project milestones are:

1. Connect authentication flows to real backend APIs.
2. Add environment-based API configuration.
3. Implement refresh-token handling and session expiry behavior.
4. Replace mock dashboard data with live API data.
5. Add chart components for sales and user growth.
6. Expand unit tests for forms, guards, services, and dashboard behavior.
7. Add role-based access control if the platform will support multiple user roles.
8. Improve CI configuration for linting, testing, and production builds.

## 12. Summary

Almalhi Frontend is a scalable Angular Nx frontend platform currently focused on authentication, reusable UI, and dashboard foundations. The project is ready for backend integration and future business feature expansion while maintaining a clean modular architecture.

## 13. Source-Verified Architecture Analysis

This section documents the architecture as verified from the current source code.

### Workspace Structure

The project is an Nx Angular monorepo with one main application and several libraries:

- `apps/client`: Main Angular application and app shell.
- `features/auth`: Authentication feature library with auth routes and pages.
- `shared/ui`: Reusable standalone UI components.
- `shared/core`: Cross-cutting application services, guards, and interceptors.
- `shared/data-access`: Shared data services and request/response types.

Path aliases are configured in `tsconfig.base.json`:

- `@almalhi-frontend/ui`
- `@almalhi-frontend/core`
- `@almalhi-frontend/data-access`
- `@almalhi-frontend/auth`

### Angular Application Style

The application uses modern standalone Angular architecture rather than NgModules.

- `apps/client/src/main.ts` bootstraps the app with `bootstrapApplication`.
- `apps/client/src/app/app.config.ts` registers global providers.
- Components import dependencies directly through their `imports` arrays.
- Most components use `ChangeDetectionStrategy.OnPush`.
- Angular signals are used for UI state, authentication state, loading state, mobile menu state, and toast state.
- Templates use modern Angular control flow syntax such as `@if` and `@for`.

### Routing Architecture

Routing is lazy-loaded and centralized.

Top-level routes are defined in `apps/client/src/app/app.routes.ts`:

- `/home`: Lazy-loads the home page.
- `/dashboard`: Lazy-loads the dashboard page and is protected by `authGuard`.
- `/auth`: Lazy-loads authentication feature routes from `@almalhi-frontend/auth`.
- `/`: Redirects to `/home`.
- Unknown routes redirect to `/home`.

Authentication child routes are defined in `features/auth/src/lib/auth.routes.ts`:

- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/otp`
- `/auth/reset-password`

The dashboard route is currently the only protected route.

### Shared UI Architecture

The `shared/ui` library acts as the reusable component layer. It exports components through `shared/ui/src/index.ts`.

Current shared UI components include:

- `Button`
- `Card`
- `Input`
- `Header`
- `Footer`
- `Layout`

The root app renders all pages inside `almalhi-layout`, which contains:

- Header
- Main projected content
- Footer
- Toast display

The UI layer is mostly component-focused, but it is not fully presentational. For example:

- `Header` injects `AuthService` from `shared/data-access`.
- `Toast` injects `ToastService` from `shared/core`.

This is functional, but it creates direct coupling between the UI library and application/data services.

### Core Layer

The `shared/core` library contains application-wide infrastructure:

- `authGuard`: Protects authenticated routes.
- `authInterceptor`: Adds bearer tokens to outgoing HTTP requests.
- `ToastService`: Manages signal-based toast messages.

The guard checks `AuthService.isAuthenticated()` and redirects unauthenticated users to `/auth/login`.

The interceptor reads the current access token from `AuthService.getAccessToken()` and attaches it as:

```text
Authorization: Bearer <token>
```

### Data-Access and API Layer

The `shared/data-access` library contains the authentication data service and request/response types.

`AuthService` currently uses mocked responses instead of real backend APIs:

- `login()` returns delayed mock access and refresh tokens.
- The access token is stored in `localStorage` under `access_token`.
- `isAuthenticated` is a signal initialized from `localStorage`.
- `register()`, `forgotPassword()`, `verifyOtp()`, and `resetPassword()` return delayed mock responses.

The project already has the basic shape needed for backend integration:

- Central auth service.
- Typed request payloads.
- HTTP interceptor for bearer token injection.
- Route guard for protected pages.

### Feature Implementation Patterns

Authentication pages follow a consistent standalone component pattern:

- Dependencies are injected with `inject(...)`.
- Forms are built with `NonNullableFormBuilder`.
- Validation uses Angular reactive form validators.
- Error messages are exposed through getter methods.
- Loading state is handled with `signal(false)`.
- Async work uses RxJS in login/register and temporary `setTimeout` mocks in some password recovery pages.

The login page currently calls `AuthService.login()` and navigates to `/home` after success.

The register page calls `AuthService.register()` but currently logs success instead of navigating.

Forgot password, OTP verification, and reset password currently simulate async behavior with `setTimeout`, even though matching methods already exist in `AuthService`.

### Styling Pattern

The project uses Tailwind CSS as the primary styling approach.

Global styles are defined in `apps/client/src/styles.css`, which imports:

- Tailwind CSS
- Font Awesome CSS

Most styling is applied directly in component templates through Tailwind utility classes. The current visual identity uses teal-focused colors such as:

- `#2F959C`
- `#1C585C`
- `#247479`

### Architectural Observations

The current architecture is clean and suitable for a starter Angular platform, but a few areas should be considered before expanding the app:

- Nx project tags are currently empty, so strict library dependency boundaries are not yet enforced.
- The current module-boundary rule allows all libraries to depend on all libraries.
- `/services` and `/about` appear in shared navigation, but matching routes are not currently implemented.
- Some auth recovery pages bypass `AuthService` and use local `setTimeout` mocks.
- `shared/ui` has some service coupling through `Header` and `Toast`.
- Some unused imports exist in the source, such as unused form-signal imports.

### Recommended Architecture Direction

Before adding larger features, the project should ideally standardize the following:

1. Move all auth-related async behavior through `AuthService`.
2. Add environment-based API configuration.
3. Replace mock auth responses with real HTTP calls.
4. Add Nx tags such as `type:app`, `type:feature`, `type:ui`, `type:core`, and `type:data-access`.
5. Enforce dependency rules between app, feature, shared UI, core, and data-access libraries.
6. Decide whether `shared/ui` should remain allowed to inject services or become purely presentational.
7. Add missing routes or remove inactive nav links.
8. Expand tests around guards, auth service behavior, forms, and protected routing.

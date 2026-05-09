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

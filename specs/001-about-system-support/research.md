# Research: About System Support Page

## Decision: Implement the About page in the app shell

**Decision**: Place the route and page under `apps/client/src/app/pages/about/` and add a
lazy-loaded public route in `apps/client/src/app/app.routes.ts`.

**Rationale**: The feature is public, static, and app-level. It does not introduce a
business workflow with independent feature state, child routes, or backend integration.
The existing app already keeps similar public page ownership in `apps/client/src/app/pages/home/`.

**Alternatives considered**:

- `features/about`: rejected for now because the page has no feature-specific domain
  behavior and creating a library would add structure without reducing complexity.
- `shared/ui`: rejected because shared UI must remain reusable and presentational, while
  About page content is app-specific.

## Decision: Use lightweight presentation models

**Decision**: Represent About content with local readonly TypeScript interfaces or typed
constants inside the About page component, such as capability items, support items, and
navigation actions.

**Rationale**: The user requested clean architecture models. For this static page, clean
architecture means separating display data from markup without promoting static content
to data-access/domain services. Local presentation models make the template easier to
scan and test while preserving layer boundaries.

**Alternatives considered**:

- Data-access models: rejected because there is no API contract or backend data.
- Hard-coded repeated markup only: rejected because repeated content sections would be
  harder to maintain and test.

## Decision: Support/contact path without embedded form

**Decision**: Include a visible support/contact path as a link or action to an existing
or planned public contact destination, without collecting personal data on the About page.

**Rationale**: The clarified spec requires a contact path but also states that the About
page must not collect user input or personal data. A link/action satisfies support
discoverability while keeping the page static and low risk.

**Alternatives considered**:

- Embedded contact form: rejected because it would collect input, require validation,
  and introduce backend or submission behavior outside the current scope.
- Live chat or ticket submission: rejected by the spec assumptions.

## Decision: Validate with client tests, build/lint, and visual review

**Decision**: Plan validation with `npx nx test client`, `npx nx lint client`,
`npx nx build client`, and desktop/mobile visual review.

**Rationale**: The feature affects app routing and visible UI. Unit tests can verify the
standalone page renders key content and the route exists, while visual review confirms
readability and responsive layout.

**Alternatives considered**:

- Shared UI tests only: rejected because the change is app-shell page behavior.
- End-to-end automation: deferred because this repo currently uses Vitest/Nx unit tests
  and no e2e test project is established in the provided context.

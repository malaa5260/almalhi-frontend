# Quickstart: About System Support Page

## Prerequisites

- Run commands from the repository root.
- Dependencies are already installed in the workspace.

## Implementation Validation

1. Run unit tests for the client app:

   ```bash
   npx nx test client
   ```

   Expected outcome: client tests pass, including About page rendering and route coverage
   when implemented.

2. Run lint for the client app:

   ```bash
   npx nx lint client
   ```

   Expected outcome: lint passes without dependency-boundary or style violations.

3. Run a production build:

   ```bash
   npx nx build client
   ```

   Expected outcome: build completes successfully.

4. Serve the app locally:

   ```bash
   npx nx serve client
   ```

   Expected outcome: app starts locally and `/about` is reachable as a public route.

## Manual Acceptance Checks

Open `/about` and verify:

- The first visible content area explains what the Almalhi system is.
- The page identifies visitors, new users, existing users, and authenticated dashboard
  users.
- At least three capabilities or benefits are visible.
- The support section explains protected access, dashboard visibility, and support
  contact access.
- A support/contact path is visible and does not require submitting personal data on the
  About page.
- Next actions let users continue to public or account-related journeys.
- The page remains readable on desktop and mobile widths without horizontal scrolling.

## Related Design Artifacts

- [Data model](./data-model.md)
- [UI contract](./contracts/about-page-ui.md)

# UI Contract: About System Support Page

This contract defines externally visible page behavior for users and tests. It is not an
API contract.

## Route

- Path: `/about`
- Access: public
- Authentication: not required
- Guard behavior: no route guard
- Direct navigation: opening `/about` directly displays the page content

## Required Content Regions

1. **Purpose region**
   - Explains what the Almalhi system is.
   - Identifies the system purpose in the first visible content area.

2. **Audience region**
   - Describes visitors, new users, existing users, and authenticated dashboard users.

3. **Capabilities region**
   - Lists at least three capabilities or benefits.
   - Includes account access, protected dashboard access, reusable platform features, or
     future workflow support.

4. **System support region**
   - Explains how the system supports user workflows.
   - Includes protected access and dashboard visibility.
   - Provides a visible support/contact email action with
     `mailto:support@almalhi.com`.

5. **Next actions region**
   - Provides navigation to relevant public or account-related journeys.
   - Includes `/home`, `/auth/login`, `/auth/register`, and
     `mailto:support@almalhi.com`.
   - Does not require browser back navigation to continue.

## Non-Functional Requirements

- Page content remains readable at 375px mobile, 768px tablet, and 1280px desktop
  viewport widths.
- Page does not collect user input or personal data.
- Support/contact path is discoverable from the support section within 30 seconds.
- Page uses existing site navigation patterns and visual language.

## Test Expectations

- Route configuration includes a public `/about` route.
- Direct navigation to `/about` displays the page content without authentication.
- Signed-in users can read `/about` without being blocked or redirected away.
- Page renders the system purpose, at least three capabilities, support/contact path, and
  next actions.
- No form fields are present on the About page.
- Visual review verifies no horizontal scrolling at 375px, 768px, and 1280px widths.

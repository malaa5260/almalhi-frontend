# Data Model: About System Support Page

This feature uses presentation models only. There are no persisted domain entities, API
entities, or backend contracts.

## AboutPageContent

Represents the complete static content rendered by the About page.

**Fields**:

- `hero`: `AboutHero`
- `audiences`: `AudienceItem[]`
- `capabilities`: `CapabilityItem[]`
- `supportItems`: `SupportItem[]`
- `nextActions`: `ActionLink[]`

**Validation rules**:

- Must include a clear system purpose in the first visible content area.
- Must include at least three capability or benefit items.
- Must include a visible support/contact action.
- Must not include fields for user-entered personal information.

## AboutHero

Represents the first visible content area.

**Fields**:

- `title`: string
- `summary`: string
- `primaryAction`: `ActionLink`
- `secondaryAction`: `ActionLink`

**Validation rules**:

- `summary` must explain the system purpose in plain language.
- Actions must point to existing or planned public/account-related navigation paths.

## AudienceItem

Represents one user group served by the system.

**Fields**:

- `title`: string
- `description`: string

**Validation rules**:

- Must cover visitors, new users, existing users, and authenticated dashboard users.

## CapabilityItem

Represents a system capability or benefit.

**Fields**:

- `title`: string
- `description`: string

**Validation rules**:

- At least three capability items are required.
- Capabilities must map to spec requirements: account access, protected dashboard access,
  reusable platform features, or future business workflow support.

## SupportItem

Represents one way the system supports users or workflows.

**Fields**:

- `title`: string
- `description`: string

**Validation rules**:

- Must include account entry points, protected access, dashboard visibility, and support
  contact access.

## ActionLink

Represents a navigation or contact action displayed on the page.

**Fields**:

- `label`: string
- `href`: string
- `kind`: `primary | secondary | contact`

**Validation rules**:

- `label` must be clear without surrounding explanatory text.
- `href` must not require submitting personal data from the About page.
- At least one action must have `kind: contact`.

## State Transitions

No runtime state transitions are required. The page has a single static display state.
Navigation actions transfer users to existing public/account journeys or the configured
support/contact destination.

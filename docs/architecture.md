## Overview Of Directory Structure

```plaintext
.
├── app/                  // ROUTING: Next.js App Router, pages, and layouts.
│   └── .../_components/  // Page-specific "dumb" UI components.
│   └── .../_hooks/       // Page-specific logic hooks.
├── ui/                   // UI: Shared, generic, "dumb" React components.
├── hooks/                // LOGIC: Generic, reusable custom hooks (e.g., useDebounce).
├── features/             // FEATURES: Self-contained modules with UI and business logic.
│   └── {feature}/
│       ├── ...components.tsx
│       ├── use-{feature}.ts
│       └── {feature}.schemas.ts  // Feature-specific form validation schemas.
├── lib/                  // SERVER & DATA: Server Actions and Data Access Layer.
│   ├── actions/
│   └── data/
│   └── schemas/              // Server-side schemas derived from database tables.
├── db/                   // DATABASE: Drizzle ORM schema definitions.
│   └── schema/
├── public/               // STATIC ASSETS: Images, fonts, etc.
└── styles/               // GLOBAL STYLES: Global CSS and theme overrides.
```

## Core Directories Explained

### 🎨 ui/

- WHAT: Our in-house, generic UI kit. These are the most reusable "dumb" components.
- RULE: A component goes here if it is 100% presentational, has no business logic, and could be copied into a completely different project without modification.
- EXAMPLES:
- - A styled components:

```
<Button>, <Card>, <Input>, <Logo>, <Avatar>
```

- Ask this to determine if what you are about to create belongs here
- - Is this component 100% presentational (no business logic)?
- - Could this component be used in a completely different project?
- - Does it receive all its data and functions via props?

### ✨ features/

- WHAT: The heart of our application. We use a "Group by Feature" methodology, keeping all files related to a single domain (UI, logic, types) in one place.
- RULE: This is the default location for any code related to a business feature. A component or hook goes here if it's part of a specific domain and is (or could be) shared across multiple pages or routes.

#### 🫀Anatomy of a Feature

Each feature directory is a self-contained module that includes its own UI components and the business logic that powers them.

- UI Components (`features/{feature-name}/some-component.tsx`):
- - These are the building blocks of the feature's interface.
- - EXAMPLE:
- - - `features/authentication/login-form.tsx` is used on `/login`, but could also be used in a modal.
- Business Logic Hooks (`features/{feature-name}/use-{feature-name}.ts`):
- - This is the "brain" of the feature.
- - WHAT: A hook that manages the state, user interactions, or API calls for a specific feature. It is co-located with the components that use it.
- - RULE: This is the default location for business logic.
- - EXAMPLE:
- - - `features/authentication/use-authentication.ts` contains functions to log in/out, manage loading states, and handle errors. The login-form.tsx component calls this hook to get the logic it needs.
- Feature Schemas (features/{feature-name}/{feature-name}.schemas.ts):
- - Zod schemas for validating client-side form inputs related to the feature.
- - EXAMPLE:
- - - features/authentication/authentication.schemas.ts contains loginSchema and signUpSchema.

### 🗺️ app/

- WHAT: This directory contains routing, pages, and page-specific components and hooks using the Next.js App Router.
- RULE: Code goes here ONLY if it's used on a single page/route and will never be used anywhere else. The \_ prefix on \_components and \_hooks marks them as private implementation details of that route, preventing them from being part of the routing scheme.
- EXAMPLES:
- - A unique, decorative graphic on the dashboard would live in `app/dashboard/_components/welcome-graphic.tsx`.
- - A hook that manages the state of a complex, one-off onboarding tour would live in `app/welcome/_hooks/use-onboarding-tour.ts`.

### 🪝 hooks/

- WHAT: Generic, application-agnostic utility hooks.
- RULE: A hook goes here if it could be published as an open-source library. It has no knowledge of our business logic.
- EXAMPLES: useDebounce, useMediaQuery, useClickOutside.

### ⚙️ lib/

- WHAT: This is our "Backend-for-Frontend" (BFF). All interaction with the server and database is handled here using a strict, two-layer architecture.

#### 🥊lib/actions/ (The Action Layer)

- PURPOSE: The secure, public-facing API for our application, built with Next.js Server Actions. Client-side components will interact with this layer exclusively.
- RULES:
- 1. Every file must start with the 'use server' directive.
- 2. An action's job is to: Authorize (check permissions), Validate (check data with Zod), Orchestrate (call `lib/data` functions), and Respond.

#### 🗃️lib/data/ (The Data Access Layer)

- PURPOSE: To execute raw database queries using Drizzle ORM.
- RULES:
- - This layer performs NO validation or authorization. It trusts that the Action Layer has already sanitized the data and authorized the request.
- - Contains simple functions that perform one database operation (e.g., getUserById, createProductInDb).

#### 🛡️ lib/schemas/ (The Data Schema Layer)

- PURPOSE: To define server-side Zod schemas derived directly from our database tables using drizzle-zod.

- RULE:
- - This directory holds the source of truth for the shape of our data in the database. These schemas are used for type safety in our server-side logic.

- EXAMPLE: lib/schemas/users.schemas.ts contains insertUserDbSchema.

## 🛡️ Schemas & Validation: A Three-Tier Strategy

To ensure clarity and maintainability, we do not use a single top-level zod-schemas/ directory. Instead, we co-locate schemas with the code that consumes them, following a three-tier model.

| Tier | Schema Type     | Location & Purpose                                                                                                          | Example                                                   |
| ---- | --------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 1    | Feature Schemas | features/{name}/{name}.schemas.ts <br/> For validating client-side form inputs. Tightly coupled to the feature's UI.        | loginSchema, createProductSchema (for a form)             |
| 2    | Action Schemas  | Top of lib/actions/{name}.ts <br/> For validating the input of a specific Server Action. Defines the action's API contract. | A CreateCommentSchema defined inside createCommentAction. |
| 3    | Data Schemas    | lib/schemas/{table}.schemas.ts <br/> For server-side database type safety, generated with drizzle-zod.                      | insertUserDbSchema, selectProductDbSchema                 |

## 🏃QUICK REFERENCE: "WHERE DO I PUT THIS?

| If you are creating...                                | Put it here...                                          | And The Rule Is...                                              |
| ----------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| A generic, reusable `<Button>`                        | `ui/button.tsx`                                         | It's a dumb, application-agnostic UI primitive.                 |
| The form for creating a new product                   | `features/products/product-form.tsx`                    | It's a key part of the "Products" feature, and might be reused. |
| The logic/state to handle the product form submission | `features/products/use-product-form.ts`                 | It's the logic for a feature, co-located with its UI.           |
| A Zod schema for the product creation form            | `ffeatures/products/products.schemas.ts`                | It validates feature-specific form inputs on the client.        |
| A unique header graphic for the `/settings` page      | `app/(routes)/settings/_components/settings-header.tsx` | It's decorative UI for one single page and nowhere else.        |
| A hook to debounce search input (`use-debounce`)      | `hooks/use-debounce.ts`                                 | It's a generic utility with no business logic.                  |
| The Drizzle schema for the `comments` table           | `db/schema/comments.ts`                                 | It's a database table definition.                               |
| A drizzle-zod schema like createInsertSchema          | `lib/schemas/comments.schemas.ts`                       | It's a server-side representation of a database table.          |
| The Drizzle query to fetch all comments for a post    | `lib/data/comments.ts` (e.g., `getCommentsByPostId`)    | It's a raw database query.                                      |
| The Server Action that lets a user create a comment   | `lib/actions/comments.ts` (e.g., `createCommentAction`) | It's the secure entrypoint for a client-side mutation.          |

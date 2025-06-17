## Overview Of Directory Structure

```plaintext
.
├── app/                  // ROUTING: Next.js App Router, pages, layouts, and route-specific logic.
├── ui/                   // UI: Our shared React component library.
├── hooks/                // LOGIC: Generic, reusable custom hooks.
├── features/             // FEATURES: Self-contained feature modules (UI, hooks, types).
├──├──{feature name}
├── lib/                  // SERVER & DATA: The backend—database, queries, and server actions.
├── public/               // STATIC ASSETS: Images, fonts, etc.
└── styles/               // GLOBAL STYLES: Global CSS and Mantine theme overrides.
└── db/
├──├── schema             // drizzle db schema
├──├──├── {model name}.ts // ex: db/schema/profiles.ts,db/schema/tasks.ts,db/schema/resources.ts,
```

## Details Directory Structure

### ui

- Purpose: Our in-house, generic UI kit. These are the most reusable "dumb" components.
- RULE:
- - A component goes here if it is 100% presentational, has no business logic, and could be copied into a completely different project without modification.
- EXAMPLES:
- - A styled components:

```
<Button>, <Card>, <Input>, <Logo>, <Avatar>
```

- Ask this to determine if what you are about to create belongs here
- - Is this component 100% presentational (no business logic)?
- - Could this component be used in a completely different project?
- - Does it receive all its data and functions via props?

### features

- WHAT:
- - We organize our UI and feature logic using a "Group by Feature" methodology. This means we keep all files related to a single feature (UI, logic, types) in one place.
- - The heart of our application. These are self-contained "Feature Modules".
- RULE:
- - This is the default location for any code related to a business feature. A component goes here if it is part of a specific domain AND it is (or could logically be) shared across multiple pages or routes.
- - Direcoties under features directory must be domain/module name.
- EXAMPLES:
- - The "Authentication" feature is used on the /login page, the /sign-up page, and potentially in a pop-up modal from the main header. Therefore, login-form.tsx and social-login-buttons.tsx both belong in features/authentication/.

### features/{feature/module name}/use{FeatureName}.ts

- WHAT:
- - The "brain" of a feature. This is the default location for business logic.
- RULE:
- - A hook goes here if it manages the state, user interactions, or API calls for a specific feature. It is co-located with the components that use it.
- EXAMPLE:
- - components/features/authentication/use-authentication.ts will contain the functions to log in and log out, manage the loading state, and handle errors. login-form.tsx will then call this hook to get all the logic it needs.

### app/(routes)/path/to/page/\_components/

- WHAT:
- - Co-located components for a single, specific page.
- RULE:
- - A component goes here ONLY if it is used on one single page and has no logical reason to ever be used anywhere else. The \_ prefix marks the folder as a private implementation detail of that route.
- EXAMPLE:
- - A unique, decorative graphic that appears only on the welcome screen of the /dashboard would live in app/dashboard/\_components/welcome-graphic.tsx.

### app/(routes)/path/to/page/\_hooks/

- WHAT:
- -Page-specific logic hooks.
- RULE:
- - A hook goes here only if its logic is exclusively used by a single page component and will never be needed elsewhere. This is rare.
- EXAMPLE:
- - A hook that manages the complex multi-step state of a unique onboarding tour on the /welcome page.

### hooks

- WHAT:
- - Generic, application-agnostic utility hooks.
- RULE:
- -A hook goes here if it could be published as an open-source library. It has no knowledge of our business logic.
- EXAMPLES:
- - useDebounce, useMediaQuery, useClickOutside.

### lib/

- What
- - This is our "Backend-for-Frontend". All interaction with the database is handled here, using a strict, three-layer architecture.

#### lib/data/

- WHAT
- - The Data Access Layer
- PURPOSE
- - To execute raw database queries using Drizzle ORM.
- RULES
- - Organized by domain (e.g., products.ts, users.ts).
- - Contains simple functions that perform one database operation (e.g., getUserById, createProductInDb).
- - CRITICAL: This layer does NO validation or authorization. It trusts that the data it receives is clean and the request is authorized.

#### lib/actions/

- WHAT
- - The Action Layer.
- PURPOSE
- - The secure, public-facing API for our application, built with Next.js Server Actions. All client-side components will interact with this layer exclusively.
- RULES
- - Every file must contain the 'use server' directive.
- - An action is the "security guard" and "traffic controller". Its job is to:
- - 1. Authorize: Check if the user is logged in and has the correct permissions.
- - 2. Validate: Validate all incoming data using Zod against a schema.
- - 3. Orchestrate: Call one or more functions from the Data Access Layer (lib/data/) to perform the database work.
- - 4. Respond: Return a state object to the client and/or call revalidatePath to refresh the UI.

## QUICK REFERENCE: "WHERE DO I PUT THIS?

| If you are creating...                                | Put it here...                                                                                     | And The Rule Is...                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| A generic, reusable `<Button>`                        | `ui/button.tsx`                                                                                    | It's a dumb, application-agnostic UI primitive.                 |
| The form for creating a new product                   | `features/products/product-form.tsx`                                                               | It's a key part of the "Products" feature, and might be reused. |
| The logic/state to handle the product form submission | `features/products/use-product-form.ts`                                                            | It's the logic for a feature, co-located with its UI.           |
| A unique header graphic for the `/settings` page      | `app/(routes)/settings/_components/settings-header.tsx`                                            | It's decorative UI for one single page and nowhere else.        |
| A hook to debounce search input (`use-debounce`)      | `hooks/use-debounce.ts`                                                                            | It's a generic utility with no business logic.                  |
| The Drizzle schema for the `comments` table           | `db/schema/comments.ts` and import the db/schema/comments.ts and export it from db/schema/index.ts | It's a database table definition.                               |
| The Drizzle query to fetch all comments for a post    | `lib/data/comments.ts` (e.g., `getCommentsByPostId`)                                               | It's a raw database query.                                      |
| The Server Action that lets a user create a comment   | `lib/actions/comments.ts` (e.g., `createCommentAction`)                                            | It's the secure entrypoint for a client-side mutation.          |

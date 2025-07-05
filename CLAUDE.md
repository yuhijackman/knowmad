# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Philosophy

### UX First (Performance, Accessibility, Responsiveness)

The primary goal of this application is to deliver an exceptional User Experience (UX). Every technical decision should be weighed against its impact on the user. This means:

- Performance is paramount. We will aggressively optimize for speed by carefully choosing between Server and Client Components.

- Leverage Next.js features like Suspense to handle loading states gracefully, ensuring the user always has a quick and responsive interface.

- Accessibility is not an afterthought. All components and features must be built with accessibility in mind from the start.

### Cozy & Minimalist Vibe

The entire application should feel "cozy" — warm, inviting, and uncluttered. The design should be minimalist, focusing the user's attention on their content and tasks without unnecessary distractions.

## Development Commands

### Core Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run check` - Run Biome check and auto-fix issues

### Database Commands

- `npx drizzle-kit generate` - Generate database migrations
- `npx drizzle-kit migrate` - Run database migrations
- `npx drizzle-kit studio` - Open Drizzle Studio for database management

## Tech Stack

**Frontend:**

- Next.js 15 with App Router
- React 19
- TypeScript
- Mantine UI components
- CSS Modules for styling4
- Zod

**Backend:**

- Next.js Server Actions
- PostgreSQL database
- Drizzle ORM
- Supabase for authentication
- Drizzle-zod

**Tooling:**

- Biome for linting and formatting (configured with tab indentation)
- Zod for schema validation
- Drizzle Kit for database migrations

## Core Documentation (Source of Truth)

To ensure all generated code is accurate and uses the correct APIs for our specific versions, always refer to the following official documentation as the primary source of truth.

### Next.js (v15)

- **Version:** Next.js 15 with React 19
- **Key Concepts:** App Router, Server Actions, Client/Server Component architecture, `Suspense`. Avoid legacy Pages Router patterns.
- **Docs:** [https://nextjs.org/docs](https://nextjs.org/docs)

### Mantine UI (v8.x - Please verify in `package.json`)

- **Version:** We are using a modern version of Mantine (likely v8 or newer).
- **Key Concepts:** Uses CSS Modules, not `makeStyles` or other older styling methods. Components are imported from `@mantine/core`.
- **Docs:** [https://mantine.dev/getting-started/](https://mantine.dev/getting-started/)

### Biome (Check `package.json` for version)

- **Version:** We use Biome for all linting and formatting.
- **Key Concepts:** Adhere strictly to the rules defined in `biome.json`. Use `yarn check` to verify. The configuration favors Prettier-like formatting with tab indentation.
- **Docs:** [https://biomejs.dev/reference/](https://biomejs.dev/reference/)

### Drizzle ORM

- **Key Concepts:** Follow the schema definitions in `db/schema/*` and the query patterns used in `lib/data/`.
- **Docs:** [https://orm.drizzle.team/docs/overview](https://orm.drizzle.team/docs/overview)

### Zod: https://zod.dev/

## Architecture Overview

This project follows a "Group by Feature" methodology with a strict layered architecture:

### Directory Structure

- `app/` - Next.js App Router pages and layouts
- `features/` - Self-contained feature modules with UI and business logic
- `ui/` - Generic, reusable UI components
- `lib/` - Server Actions and Data Access Layer
- `db/` - Database schema definitions
- `utils/` - Utility functions and Supabase helpers

### Key Architectural Patterns

**Two-Layer Backend Architecture:**

1. **Action Layer** (`lib/actions/`) - Server Actions that handle authorization, validation, and orchestration
2. **Data Access Layer** (`lib/data/`) - Raw database queries using Drizzle ORM

**Feature Organization:**

- Features are self-contained modules in `features/`
- Each feature contains UI components and business logic hooks
- Example: `features/authentication/login-form.tsx` and `features/authentication/use-authentication.ts`

**Component Classification:**

- `ui/` - 100% presentational components with no business logic
- `features/` - Feature-specific components that may be reused across pages
- `app/.../_components/` - Page-specific components that won't be reused

## Visual Vibe & Color Palette

Based on our "cozy" core philosophy, the color palette is warm, muted, and easy on the eyes. It is derived from the provided screenshot to capture that specific feeling.

- Primary Background (Linen White): #FAF9F7 - A very light, warm off-white that serves as the main canvas.

- Secondary Background (Parchment): #F4F3F1 - A slightly darker, muted beige for sidebars, cards, and other UI surfaces.

- rimary Text (Charcoal): #3F3D3C - A soft, dark gray for body copy to be less harsh than pure black.

- Accent (Muted Salmon): #E58B78 - A warm, terracotta-like color for primary buttons, loading indicators, and interactive highlights.

- Muted UI Elements (Stone Gray): #7D7C7A - A muted, grayish-brown for icons and less important UI elements.

## Database Schema

The database uses Drizzle ORM with PostgreSQL. Key tables include:

- `users` - User accounts
- `profiles` - User profile information
- `realms` - Top-level organizational units
- `chambers` - Sub-units within realms
- `resources` - User-created content
- `tasks` - Task management
- `tags` - Tagging system

## Authentication & Authorization

- Uses Supabase for authentication
- Middleware handles session management
- Route protection implemented via layout components
- Auth state managed through Server Actions

## Form Handling

Uses a custom `validatedAction` helper that:

- Validates form data with Zod schemas
- Provides consistent error handling
- Handles Next.js redirect errors properly
- Returns structured responses with success/error states

## Styling

- Uses Mantine UI component library
- Custom theme with brand colors (mutedSalmon, successGreen, etc.)
- CSS Modules for component-specific styles
- Figtree font from Google Fonts
- Custom gray scale palette for consistent UI

## Code Quality

- Biome handles linting and formatting
- Strict TypeScript configuration
- Path aliases configured (`@/*` maps to project root)
- Organized imports and consistent code style enforced

## Environment Setup

Requires environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- Supabase configuration variables

## Development Workflow

1. Run `npm run dev` to start development server
2. Use `npm run check` to lint and format code
3. Generate database migrations with `npx drizzle-kit generate`
4. Follow the feature-based architecture when adding new functionality

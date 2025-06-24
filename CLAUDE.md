# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. It features a theme system, blog functionality, and various UI components.

## Commands

### Development

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the production version
- `pnpm start` - Start the production server

### Quality Assurance

- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run Trunk linting checks
- `pnpm format` - Run Trunk formatting checks
- `pnpm lint:fix` - Run Trunk linting checks with auto-fixing
- `pnpm format:fix` - Run Trunk formatting checks with auto-fixing
- `pnpm validate` - Run both linting checks and build

### Husky and Git

- The repo uses husky for git hooks
- The pre-commit hook runs `npm test`

## Architecture

### Overall Structure

- Next.js App Router structure
- TailwindCSS for styling
- Theme system with multiple customizable themes
- MDX-based blog system

### Key Directories

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable UI components organized by category
- `/src/lib` - Utility functions, theme definitions, and service integrations
- `/src/assets` - Static assets like fonts
- `/src/content/blog` - MDX blog posts

### Theme System

- Custom theme system with CSS variables
- Multiple themes with light/dark variants
- Theme variables control colors, shadows, and radiuses
- Dynamic theme switching via theme provider and switcher components

### UI Components

- Organized into several categories:
  - `ui`: Base UI components (buttons, cards, dialogs, etc.)
  - `common`: Common application components (forms, blog elements)
  - `theme`: Theme-related components
  - Multiple specialized component collections (`kokonutui`, `magicui`, etc.)

### API Routes

- `/api/download` - Downloads the resume PDF file
- `/api/contact` - Contact form handler

### Blog System

- MDX-based blog content in `/src/content/blog`
- Static site generation for blog pages
- Blog post retrieval using `gray-matter` for frontmatter parsing

## Best Practices

- Always maintain theme compatibility when creating new components
- Follow existing component patterns when creating new ones
- Use the utility functions in `/src/lib/utils.ts` for class name management
- Keep the component structure organized by category

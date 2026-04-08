# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open Ham Awards is an open-source platform for Amateur Radio contest and award management. See [ARCHITECTURE.md](ARCHITECTURE.md) for full architectural details, module boundaries, and critical logic patterns.

## Commands

```bash
pnpm install              # Install all dependencies
pnpm dev                  # Run all apps in parallel (web + api)
pnpm dev:web              # Run Next.js frontend only
pnpm dev:api              # Run NestJS backend only
pnpm build                # Build all packages recursively
pnpm build:contracts      # Build contracts package
pnpm lint                 # Lint all packages
pnpm test                 # Test all packages
```

## Monorepo Structure

pnpm workspace monorepo (v10.11.1). Workspaces: `apps/*` and `packages/*`.

- `apps/web` - Next.js frontend (not yet scaffolded)
- `apps/api` - NestJS backend API (not yet scaffolded)
- `packages/contracts` - Shared TypeScript type definitions (`@open-ham-awards/contracts`)

TypeScript path alias `@open-ham-awards/*` maps to `packages/*/src` (defined in `tsconfig.base.json`).

## Development Workflow

- **Domain First:** Implement business logic in the domain layer before creating API endpoints
- **Contract-Driven:** Update shared types in `packages/contracts` before implementing in `web` or `api`
- **Scoring tests:** 100% coverage on the ScoringEngine core is mandatory

## Version Control Protocol
- **No Blind Commits:** Never execute `git commit` without presenting the proposed commit message and staging list to the user for approval first.
- **Conventional Commits:** All commits must follow the conventional format (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`).
- **Atomic Commits:** If a task involved changing tooling/configs AND domain logic, split these into separate, logical commits. Do not create monolithic commits.
- **AI Attribution:** Every commit generated or heavily modified by the agent must include a standard GitHub co-author trailer at the very end of the commit message.
  Format strictly as: `Co-authored-by: Claude <[model-version]@anthropic.com>`
  *(Example: Co-authored-by: Claude <sonnet-3.7@anthropic.com>)*
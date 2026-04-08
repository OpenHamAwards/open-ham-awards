# @open-ham-awards/web

The Next.js frontend for Open Ham Awards. Currently serves the **waitlist MVP landing page** while the core platform is under development.

## Stack

- **Next.js 16** with App Router
- **Tailwind CSS v4** — dark brutalist theme with amber accents
- **TypeScript** — strict mode, shared types from `@open-ham-awards/contracts`

## Development

From the monorepo root:

```bash
pnpm dev:web        # Start dev server on http://localhost:3000
pnpm build:web      # Production build
```

Or from this directory:

```bash
pnpm dev
pnpm build
```

## Structure

```
src/
  app/
    layout.tsx       # Root layout — fonts, metadata, global styles
    globals.css      # Tailwind theme + custom utilities
    page.tsx         # Landing page
  components/
    hardware-panel.tsx      # Reusable dark card with inset shadow
    spectrum-analyzer.tsx   # Procedurally generated RF spectrum SVG
    waitlist-form.tsx       # Email capture form (posts to Formspree)
```

## Notes

- The waitlist form submits to Formspree. Update the endpoint in `waitlist-form.tsx` if migrating to the API.
- The spectrum analyzer generates its points with a seeded PRNG for deterministic SSR output.

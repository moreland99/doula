# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server (localhost:5173)
npm run build      # production bundle → dist/
npm run preview    # preview production build locally
npm run lint       # ESLint
```

No test suite is configured.

## Architecture

Single-page React 19 marketing site with two routes:

- `/` → [src/App.jsx](src/App.jsx) — landing page (hero, service showcases, quote carousel, booking CTA, contact form, FAQ)
- `/services/:serviceId` → [src/ServicePage.jsx](src/ServicePage.jsx) — per-service detail page
- `*` → redirects to `/`

[src/ScrollToTop.jsx](src/ScrollToTop.jsx) resets scroll on each navigation.

**Data layer:** [src/data/services.js](src/data/services.js) is the single source of truth for all three services (`postpartum-care`, `infant-care`, `lactation-support`) and FAQ content. Edit copy here before touching layout components.

**ServicePage content:** Per-service copy blocks (`servicePageContent`, `whyCardIconSets`) live at the top of [src/ServicePage.jsx](src/ServicePage.jsx), not in the data file.

**Forms:** Contact and booking forms are client-side only — no backend submission. Submitting sets a local success state. Future API integration should centralize handlers rather than duplicating in both `App.jsx` and `ServicePage.jsx`.

**Feature flag:** `showCommunitySection` in [src/App.jsx](src/App.jsx#L32) is `false`; the community sign-up section is hidden. The `showcaseOrder` array on the same line controls which services appear on the homepage and in what order.

## Design System

Tailwind with custom tokens in [tailwind.config.js](tailwind.config.js):

| Token | Value |
|---|---|
| `cream` | `#F4F1EC` (primary background) |
| `charcoal` | `#3A3A3A` (primary text) |
| `gold` | `#C6A75E` (CTA buttons) |
| `goldDeep` | `#D8C7A1` (eyebrow labels, hover) |
| `sand` / `beige` / `ivory` | `#EAE6DF` (section backgrounds, borders) |
| `font-heading` | sweet-gothic-serif → Cormorant Garamond |
| `font-body` | source-sans-pro → Manrope |

The floating header transitions between transparent-on-dark-hero and `bg-cream/90` backdrop once the user scrolls past a threshold; both `App.jsx` and `ServicePage.jsx` implement this independently with a `showFloatingHeader` scroll listener.

Hero uses `<picture>` with separate mobile/desktop assets (`mobileHero.png` / `desktopHero.png`).

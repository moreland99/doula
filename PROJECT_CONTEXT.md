# Project Context

## Overview
- `PremierDoula` is a React single-page marketing and lead-capture site for postpartum, infant, and lactation doula services.
- It uses client-side routing for a home page and service detail pages.
- Styling is built with Tailwind CSS plus a small set of custom base/utility rules in `src/index.css`.

## Tech Stack
- React 19 (`react`, `react-dom`)
- React Router (`react-router-dom`)
- Vite (build/dev tooling)
- Tailwind CSS + PostCSS + Autoprefixer
- `lucide-react` for iconography

## App Entry and Routing
- Entry point: `src/main.jsx`
- Routes:
  - `/` -> `src/App.jsx` (main landing page)
  - `/services/:serviceId` -> `src/ServicePage.jsx` (service detail page)
  - `*` -> redirects to `/`
- `src/ScrollToTop.jsx` resets scroll position on route/path changes.

## Core Frontend Structure
- `src/App.jsx`
  - Primary landing-page composition (hero, services, pricing, booking CTA, contact, FAQ, booking modal).
  - Uses local state for mobile nav, selected service, contact form, booking form, and UI toggles.
  - Pulls service and FAQ content from `src/data/services.js`.
- `src/ServicePage.jsx`
  - Dynamic detail page keyed by `serviceId`.
  - Uses shared service data (`services`) and per-service content maps defined in this file.
  - Includes a consultation-request modal flow and fallback UI for unknown service IDs.
- `src/data/services.js`
  - Source of truth for service cards/details and FAQ content.
  - Exposes:
    - `services` (id, name, pricing placeholder, short/long descriptions, image, included items, highlights)
    - `faqs`

## Design System Notes
- Tailwind theme extensions in `tailwind.config.js` define brand colors (`cream`, `charcoal`, `gold`, etc.), heading/body fonts, and utility tokens.
- Global styles in `src/index.css`:
  - Set smooth scrolling and base typography.
  - Apply a soft background gradient texture.
  - Define utility animation/keyframe scaffolding for stat ticker classes.

## Assets
- Images/logo are stored under `src/assets/`.
- Service data references three service imagery assets:
  - `Postpartum.png`
  - `Newborn.png`
  - `Lactation.png`

## Local Development
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

## Current Product Behavior (High Level)
- Landing page navigation links scroll to in-page sections (services/contact/etc.).
- Service cards link to dedicated detail pages with richer content blocks.
- Contact and consultation forms currently drive client-side success states (no backend submission logic in this code).
- Unknown routes are normalized back to `/`.

## Maintenance Guidance
- Prefer updating service/FAQ copy in `src/data/services.js` before editing layout components.
- Keep route consistency between links in `App.jsx`, `ServicePage.jsx`, and `main.jsx`.
- If forms are later connected to an API, centralize submission logic and validation rather than duplicating handlers in multiple components.

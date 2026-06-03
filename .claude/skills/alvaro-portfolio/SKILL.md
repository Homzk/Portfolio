---
name: alvaro-portfolio
description: >
  Build (or modify) Álvaro Flores Rocha's personal developer portfolio website,
  staying strictly faithful to an already-approved design and structure. Use this
  skill ANY time the work touches Álvaro's portfolio — scaffolding the Vite + React
  project, writing the SpecKit spec/plan/tasks for it, building or editing the Hero,
  Projects, About, Stack, Experience, Contact sections, building project case-study
  pages, adjusting the orange-orb/grain/arrow visual system, wiring the ES/EN toggle,
  or deploying to Vercel. Trigger this even when the request is phrased loosely
  ("my portfolio", "the landing page", "the projects section", "the case study",
  "the orb background") and even if the design is not re-explained — the approved
  design lives in this skill and MUST be preserved, not reinvented.
---

# Álvaro Flores — Portfolio

This skill encodes a **specific, already-approved design** for Álvaro Flores Rocha's
developer portfolio. The job is **faithful implementation**, not redesign. A full
reference implementation already exists (see `assets/`). Treat it as the source of
truth; reproduce its look, behavior, content, and structure.

## The golden rule: fidelity over creativity

The design was iterated and signed off by Álvaro. Do **not** "improve" the palette,
swap fonts, change the layout, or drop the orb/grain/arrow system unless he explicitly
asks. When in doubt, match `assets/App.reference.jsx` exactly. New work (e.g. a new
case-study page) must look like it came from the same hand.

## What we're building

A bilingual (ES/EN, single toggle) single-page portfolio plus per-project case-study
pages, in **React + Vite**, deployed to **Vercel**. Visual identity: a warm bone-gray
paper background, a single amber accent, an animated orange "orb" that follows the
mouse in the hero and drifts subtly elsewhere, a film-grain overlay, an editorial
serif (Fraunces) paired with a technical monospace (JetBrains Mono), and an
arrow-based info design (`label → value`).

Positioning to keep in mind: Álvaro is an **engineer who ships end-to-end**, not a
visual designer. The light editorial look leans "designer," so the engineering
substance (metrics, stack, technical decisions) is what keeps the balance. Don't
strip the substance to chase minimalism.

## Read these before building

Load the reference files as needed — don't try to hold everything at once:

- `references/design-system.md` — colors, fonts, the orb/grain/arrow conventions,
  motion rules, accessibility (`prefers-reduced-motion`). Read before any styling work.
- `references/structure.md` — page/section structure, the project-presentation matrix,
  and the case-study template. Read before building or reordering sections.
- `references/content.md` — Álvaro's real content: bio, projects, stack, experience,
  contact, and the bilingual strings. Read before writing any copy.
- `references/speckit-workflow.md` — how to drive the build with SpecKit
  (`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`) so
  the spec carries this design as a hard constraint. Read first when starting fresh.

The approved code lives in `assets/`:
- `assets/App.reference.jsx` — the entire single-page site (Hero + Projects + About +
  Stack + Experience + Contact), with the unified ES/EN toggle and the full stylesheet.
- `assets/CaseStudy.reference.jsx` — the case-study page template (example: Maderas
  Ponotro).

## Styling source of truth

The reference uses **one injected stylesheet of plain CSS with CSS custom properties**
(not Tailwind arbitrary values), because it was prototyped in an environment without a
Tailwind compiler. When porting to the real Vite project, **keep that CSS verbatim** as
a global stylesheet (or CSS modules) — it is the fidelity anchor. Tailwind is optional
and, if used, only for layout utilities; never re-derive the colors/typography in
Tailwind from scratch, as that invites drift. Copy the `:root` tokens and the keyframes
exactly.

## Non-negotiable conventions

These define the identity. Preserve all of them:

1. **Palette**: bone-gray paper `#E9E7E0`, ink text `#18160F`, single amber accent
   `#E8770E` (soft `#F2A23C`). No second accent color.
2. **Type**: Fraunces (display, headings, used italic for emphasis), Hanken Grotesk
   (body), JetBrains Mono (labels, metrics, status, the clock).
3. **The orb**: amber radial gradient, blurred. In the hero it follows the mouse via
   `requestAnimationFrame` + lerp (never React state per mousemove). In sections it
   drifts slowly and automatically. It reappears large in Contact as the page "close."
   On devices without hover, it drifts on a slow path. Always honor
   `prefers-reduced-motion`.
4. **Grain**: an inline SVG `feTurbulence` data-URI overlay, `mix-blend-mode: multiply`,
   subtle flicker. Cheap, no network requests.
5. **Arrows & glyphs**: `→` as the connective in `label → value` rows; `✦` for the
   status line. Live clock in the hero status bar.
6. **Bilingual**: a single ES/EN toggle controls the whole site (one `lang` state).
   Every string has both languages. Spanish is the default.
7. **Projects as editorial rows** with animated `webm` thumbnails (not static PNGs),
   precise status badges, metrics, stack chips, and per-project links. AirVision is
   visually featured. A generic "coming soon" row closes the list.
8. **Performance**: this portfolio's whole thesis is rigor — keep it fast. `webm` over
   GIF, lazy-load, no heavy libraries for effects, motion via `transform` only.

## Build order (when starting fresh)

1. Read `references/speckit-workflow.md` and run the SpecKit flow with this design as a
   constraint in the spec + constitution.
2. Scaffold Vite + React, add React Router for case-study routes.
3. Port the global stylesheet and the section components from `assets/App.reference.jsx`.
4. Add the case-study route using `assets/CaseStudy.reference.jsx` as the template,
   following the per-project matrix in `references/structure.md`.
5. Wire real assets: record short `webm` clips of the live sites (Maderas, AirVision),
   link the CV PDF, set the GitHub repo "About" fields for AirVision.
6. Deploy to Vercel.

## Known open items (carry these forward, don't silently invent)

- Álvaro's **origin story** paragraph in About is a placeholder marked as a draft —
  leave the marker until he writes it.
- AirVision's **coverage number** was inconsistent across sources; use one verified
  figure everywhere (re-run `npm run test:coverage` to confirm).
- The **"con distinción" / "with honors"** line was intentionally removed — do not
  re-add it.
- `webm` thumbnails and the CV PDF link are placeholders until real files exist.

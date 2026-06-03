# SpecKit Workflow — Álvaro Portfolio

This portfolio is built with **Spec-Driven Development** via SpecKit (the same way
AirVision was built). The point of pairing SpecKit with this skill: the spec carries
the approved design as a **hard constraint**, so the agent implements faithfully
instead of redesigning. This skill is the design authority; SpecKit is the process.

NOTE: SpecKit's slash commands are namespaced `/speckit.*`. Install it once per project
with `uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT>` (or
`uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`) and
select Claude Code as the agent.

## Order of operations

1. **Constitution** (`/speckit.constitution`): add fidelity + quality principles, e.g.:
   - "Fidelity to the approved design is non-negotiable. The reference implementation
     in the `alvaro-portfolio` skill (`assets/App.reference.jsx`,
     `assets/CaseStudy.reference.jsx`) and `references/design-system.md` are the source
     of truth. Do not alter palette, typography, the orb/grain/arrow system, structure,
     or content without explicit approval."
   - "Performance is a feature: fast loads, `webm` over GIF, transform-only motion,
     `prefers-reduced-motion` respected."
   - "Bilingual ES/EN parity for every string; Spanish default."
   - "Document technical decisions (this is the portfolio's whole thesis)."

2. **`/speckit.specify`** — write the feature spec for the portfolio. Reference this
   skill explicitly. Cover: the single-page structure and section order, the project matrix,
   the case-study template, the ES/EN toggle, the orb/grain/arrow system, accessibility,
   and the deploy target (Vercel). Pull section/behaviour detail from
   `references/structure.md` and visual detail from `references/design-system.md`.
   Keep content in `references/content.md` as the canonical copy.

3. **`/speckit.plan`** — technical plan: Vite + React + React Router; global stylesheet ported
   verbatim from the reference (the fidelity anchor); component tree mirroring
   `App.reference.jsx` (Hero, Projects, About, Stack, Experience, Contact) plus a
   `CaseStudy` route; an i18n layer holding the bilingual dictionaries; assets pipeline
   for `webm` thumbnails and the CV PDF; Vercel config.

4. **`/speckit.tasks`** — break down into ordered tasks. A sensible decomposition:
   - T1 Scaffold Vite + React + Router; global styles & tokens; fonts.
   - T2 Hero (orb mouse-follow, grain, status bar, clock, ES/EN toggle, entrance anim).
   - T3 Projects section (editorial rows, featured AirVision, animated thumbnails,
     matrix-correct links, coming-soon row).
   - T4 About + Stack + Experience.
   - T5 Contact + footer (closing orb).
   - T6 i18n wiring + ES/EN parity pass.
   - T7 Case-study route + Maderas case study (template), then LPR / AirVision / Eventos.
   - T8 Real assets: record `webm` clips, link CV, set AirVision repo "About".
   - T9 Accessibility + perf pass (Lighthouse, `prefers-reduced-motion`), then Vercel
     deploy.

5. **`/speckit.implement`** — implement task by task (phased for context). For each
   task, re-read the relevant skill reference and match `assets/` exactly. After each
   section, eyeball it against the reference. (`/speckit.clarify` and
   `/speckit.checklist` before implementing catch gaps cheaply.)

## Fidelity checklist (run before calling it done)

- Palette is exactly the tokens in `design-system.md`; one accent only.
- Fraunces / Hanken Grotesk / JetBrains Mono in the right roles.
- Orb: mouse-follow in hero (rAF + lerp, no per-frame setState), drift in sections,
  large close in contact, drift fallback on no-hover, `prefers-reduced-motion` honored.
- Grain present (SVG `feTurbulence`, multiply, subtle flicker).
- `label → value` arrow rows and `✦` status line present; live clock works.
- Single ES/EN toggle controls everything; full parity; Spanish default.
- Project order Maderas → LPR → AirVision → Eventos → coming-soon; AirVision featured;
  links match the matrix; case-study `→` opens the case study.
- Case study has the "Decisiones técnicas" section.
- "con distinción / with honors" NOT present. Origin-story paragraph still marked draft.
- Fast: `webm` not GIF, lazy-loading, transform-only motion.

## Recording the webm thumbnails (for T8)

Record the running site (screen capture), then convert to a small looping `webm`:

```bash
ffmpeg -i input.mov -t 5 -an -c:v libvpx-vp9 -b:v 0 -crf 34 -vf "scale=720:-2,fps=24" output.webm
```

Use `<video autoplay loop muted playsinline poster="...">` with a static poster frame.

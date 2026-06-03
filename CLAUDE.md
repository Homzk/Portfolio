<!-- SPECKIT START -->
## Active feature: 001-portfolio-site

Read the current implementation plan and design artifacts before coding:

- Plan: `specs/001-portfolio-site/plan.md`
- Spec: `specs/001-portfolio-site/spec.md`
- Research (technical decisions): `specs/001-portfolio-site/research.md`
- Data model: `specs/001-portfolio-site/data-model.md`
- Contracts: `specs/001-portfolio-site/contracts/` (routes, i18n, components)
- Quickstart / validation: `specs/001-portfolio-site/quickstart.md`

**Stack**: React 18 + Vite 7 + React Router v7 (library mode) → Vercel. Global stylesheet
ported verbatim from the `alvaro-portfolio` skill (`assets/App.reference.jsx`) as the
fidelity anchor. Custom ES/EN i18n layer with `localStorage` persistence (Spanish default).
No cookie analytics.

**Hard constraint**: the approved design lives in the `alvaro-portfolio` skill
(`SKILL.md`, `references/`, `assets/`) and MUST be preserved exactly — palette, typography,
orb/grain/arrow system, structure, order and content. Fidelity over creativity
(Constitution Principle I).
<!-- SPECKIT END -->

# Structure — Álvaro Portfolio

Source of truth: `assets/App.reference.jsx` (main page) and
`assets/CaseStudy.reference.jsx` (case-study template).

## Main page (single scroll)

Order is fixed:

1. **Hero** — nav (monogram left; section links + ES/EN toggle right), a status bar
   (`location → live clock` | `✦ Status → Available`) with a hairline rule, then the
   centered block: mono eyebrow ("Desarrollador Full Stack"), conversational H1
   ("Hola, soy *Álvaro*."), tagline, `label → value` facts, CTA row (Ver proyectos /
   Contacto / CV / GitHub / LinkedIn), and a bobbing scroll cue labeled "Proyectos"
   (ES) / "Work" (EN). The mouse-following orb lives here.
2. **Projects** (`id="work"`) — see the matrix below.
3. **About** (`id="about"`) — two columns: narrative (3 paragraphs; the 3rd is the
   origin-story placeholder, kept marked as draft) + a mono "glance" panel of
   `label → value` rows. Subtle drifting orb.
4. **Stack** (`id="stack"`) — six grouped cards: Languages, Frontend & Mobile,
   Backend & Data, Infra & DevOps, Vision & IoT, Other. Subtle drifting orb.
5. **Experience** — vertical timeline (3 roles) + an Education block (MSc + Computer
   Engineering, PUCV).
6. **Contact** (`id="contact"`) — centered close: big heading, `label → value` contact
   rows (Email / LinkedIn / GitHub / WhatsApp) that shift on hover, two buttons. The
   large closing orb sits here. Minimal footer below.

Nav links smooth-scroll to the section ids. One `lang` state at the App level is passed
to all sections; only the hero renders the toggle.

## Projects — presentation matrix

Order (decided by Álvaro, freelance-first): **Maderas → LPR → AirVision → Eventos →
Coming soon.** AirVision is visually **featured** (accent ring + glow + "Destacado/
Featured" tag) even though it sits third.

Each row: animated `webm` thumbnail (left), content (number, name, status badge,
italic tagline, mono metrics separated by amber dots, stack chips, links), and a
circular `→` button (right) that opens the **case study**.

The circular `→` always opens the case study. The inline text links go to specific
destinations per this matrix:

| Project | Status badge | Case study | Live link | Public repo |
|---|---|---|---|---|
| **Maderas Ponotro** | En producción · Cliente real | yes | `maderasponotro.cl` | no (private/client) |
| **Sistema LPR — Club Naval** | Desplegado en terreno | yes (the *only* way to view it) | none (hardware/internal) | no (internal) |
| **AirVision** | En vivo | optional | `air-vision-xi.vercel.app` | yes — `github.com/Homzk/AirVision` |
| **Eventos Culturales PUCV** | Proyecto de título | yes | none | optional |

Closing row: a generic, dateless "coming soon — el portafolio es un proyecto vivo /
this portfolio is a living project."

Animated thumbnails: short (3–4s) silent looping `webm` of each product. Live ones
(Maderas, AirVision) are screen recordings of the running site. LPR/Eventos (not
public) use field footage or a flow animation. Until recorded, use the animated
placeholder from the reference (sweep + pulsing dots + a mono caption naming the clip).

## Case-study template

Source: `assets/CaseStudy.reference.jsx`. Fixed section order:

Back link → **Title block** (name, status badge, italic lead, `Rol → / Cliente → /
Año →` meta, primary CTA + private-repo note) → **Cover** (large `webm` placeholder) →
**Contexto** → **El problema** → **Mi rol** → **La solución** → **Decisiones técnicas
(el porqué)** → **Resultados** (big stat tiles) → **Stack** (chips) → **Aprendizajes**
(marked draft for personal voice) → **Next project** nav (with the closing orb).

The "Decisiones técnicas" section is the differentiator — each decision is a bordered
block with a mono `¿Por qué X?` question and a short rationale. Always include it; it's
what separates this from a junior portfolio and answers the "AI-generated code without
judgment" risk.

Per-project adaptation:
- **Maderas**: primary CTA "Visitar maderasponotro.cl"; no code link. (Content already
  drafted from its README — reuse the "Decisiones técnicas".)
- **LPR**: no live/demo link; the case study carries the whole story (95% detection,
  Hikvision hardware, −40% access time, IoT).
- **AirVision**: primary CTAs "Ver demo en vivo" + "Código en GitHub"; metrics =
  coverage/tests/CI-CD; reuse its (excellent) README content.
- **Eventos**: capstone framing; QR + 3 roles + full cycle; no public links.

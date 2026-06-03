# Design System — Álvaro Portfolio

The single source of truth is `assets/App.reference.jsx`. This file summarizes the
tokens and conventions so they can be reproduced exactly. When anything here seems to
conflict with the reference code, the reference code wins.

## Color tokens (CSS custom properties, copy verbatim)

```css
:root{
  --paper:#E9E7E0;      /* page background — warm bone gray */
  --paper-2:#EFEDE7;    /* hover / subtle raised surface */
  --card:#F3F1EB;       /* cards, stat tiles, glance panel */
  --ink:#18160F;        /* primary text, primary buttons */
  --muted:#6f6a5d;      /* secondary text */
  --dim:#9b968a;        /* tertiary / mono labels */
  --line:#cfcabc;       /* hairlines, borders */
  --line-2:#bdb7a8;     /* stronger borders, circular buttons */
  --accent:#E8770E;     /* THE accent — amber/orange (text, arrows, orb core) */
  --accent-2:#F2A23C;   /* softer amber (orb highlight, status dot) */
  --accent-dim:rgba(232,119,14,.10); /* tints, featured-row glow */
}
```

There is exactly **one** accent color. Greens used only for "live" status dots
(`#4FB477`/`#5BCB8B`). Never introduce blue/purple/etc.

## Typography

Loaded from Google Fonts:
- **Fraunces** — display/headings. Use weight 500–600. Use *italic* for the emphasized
  word in headings (e.g. "Hola, soy *Álvaro*.") and for project taglines.
- **Hanken Grotesk** — body copy and buttons. 400–600.
- **JetBrains Mono** — labels, eyebrows, metrics, status bar, the live clock, stack
  chips, the `label → value` rows.

```
--display:'Fraunces',serif;
--body:'Hanken Grotesk',system-ui,sans-serif;
--mono:'JetBrains Mono',monospace;
```

Heading sizes use `clamp()` for fluid scaling (see reference). Hero H1:
`clamp(46px,9vw,104px)`, letter-spacing `-.03em`, line-height `.96`.

## The orb (signature element)

An amber radial gradient circle, blurred (`filter: blur(10px)`), pointer-events none,
sitting behind content (`z-index:0`) with grain over it.

Gradient (hero):
```css
background:radial-gradient(circle at center,
  rgba(242,162,60,.78) 0%, rgba(232,119,14,.5) 26%,
  rgba(232,119,14,.16) 50%, rgba(232,119,14,0) 70%);
```

Behavior by context (the "cohesion rule"):
- **Hero** → large (~720px), follows the mouse. Implemented with `requestAnimationFrame`
  + linear interpolation (lerp factor ~0.07). Track the target from `mousemove`
  relative to the section's bounding rect, and write `orb.style.transform` directly in
  the rAF loop. **Never** call `setState` on every mousemove.
- **No-hover devices** (`matchMedia('(hover: hover)')` false) → the orb drifts on a slow
  sine/cosine path instead of following a cursor.
- **Sections (intermediate)** → small (~300–380px), static position bleeding off an
  edge, with a slow `drift` keyframe (translate ~20px + scale ~1.06, 14–16s).
- **Contact (close)** → large (~560px), centered, slow `driftC` keyframe. Mirrors the
  hero orb to "close the loop" (like leedave's footer).
- A featured project row uses a soft radial orb glow from its right edge, not a flat
  gradient.

Always wrap orb/grain animations in:
```css
@media(prefers-reduced-motion:reduce){ .orb-animations{ animation:none!important } }
```

## Grain / film texture

An inline SVG `feTurbulence` noise as a `background-image` data-URI, overlaid with
`mix-blend-mode: multiply` on the light background, low opacity (~.30–.42), with a
subtle stepped flicker. No external image, near-zero weight.

```
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")
```

(For a colored/orange grain variant, tint via `feColorMatrix` — but the approved site
uses the neutral grain over the bone background.)

## Motion

Expressive but disciplined. Keyframes used: `flick` (grain), `up` (hero entrance,
staggered via `animation-delay`), `bob` (scroll cue), `drift` / `driftC` (orbs),
`sweep` + `pulse` (animated thumbnail placeholders). All motion via `transform` /
`opacity` only. Respect `prefers-reduced-motion` everywhere.

## Layout primitives

- `.container`: `max-width:1180px` (1080px for the Sections block), centered,
  `padding:0 36px` (22px on mobile).
- `.eyebrow`: mono, uppercase, `.13em` letter-spacing, amber, with a short leading rule.
- Buttons: `.btn-primary` (ink fill, paper text), `.btn-ghost` (outline). Pill-ish
  radius 10px.
- Hairline section dividers (`border-top:1px solid var(--line)`).

## Glyphs

`→` (arrow) is the connective for info rows and links. `✦` precedes the status line.
Keep them; they're part of the voice.

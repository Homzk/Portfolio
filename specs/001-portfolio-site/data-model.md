# Data Model — Portafolio Álvaro Flores Rocha (Fase 1)

No hay base de datos ni backend. El "modelo de datos" son estructuras de contenido
estáticas en el cliente (`src/data/`, `src/i18n/`). El copy canónico vive en
`references/content.md` del skill; aquí se describe la forma, no se reescribe el contenido.

## Entidad: Project

Conjunto fijo de 4 + 1 fila de cierre. Orden fijo: Maderas → LPR → AirVision → Eventos →
coming-soon.

| Campo | Tipo | Notas |
|---|---|---|
| `slug` | string | Identificador de ruta: `maderas`, `lpr`, `airvision`, `eventos`. |
| `order` | number | 1–4; controla el orden editorial. |
| `name` | string | Nombre del proyecto (no traducible). |
| `featured` | boolean | `true` solo para AirVision (anillo/glow + tag "Destacado/Featured"). |
| `statusBadge` | i18n key | Badge de estado por idioma (ver matriz). |
| `tagline` | i18n key | Lema en cursiva (ES/EN). |
| `description` | i18n key | Descripción corta (ES/EN). |
| `metrics` | i18n key[] | Métricas mono separadas por puntos ámbar. |
| `stack` | string[] | Chips de tecnología (no traducibles). |
| `thumb` | string | Ruta del `.webm` en `public/media/` (placeholder hasta grabar). |
| `poster` | string | Frame estático del video (CLS bajo). |
| `caseStudy` | boolean | `true` para los 4 en v1 → el `→` abre `/proyecto/:slug`. |
| `liveUrl` | string \| null | Demo en vivo según matriz. |
| `repoUrl` | string \| null | Repo público según matriz. |

### Matriz de presentación (reglas de enlaces — FR-013)

| slug | statusBadge | caseStudy | liveUrl | repoUrl |
|---|---|---|---|---|
| `maderas` | En producción · Cliente real | sí | `https://maderasponotro.cl` | null (privado) |
| `lpr` | Desplegado en terreno | sí (única vía) | null | null (interno) |
| `airvision` | En vivo | sí | `https://air-vision-xi.vercel.app` | `https://github.com/Homzk/AirVision` |
| `eventos` | Proyecto de título | sí | null | null |

Fila de cierre `coming-soon`: sin slug de ruta, sin enlaces; copy "el portafolio es un
proyecto vivo / this portfolio is a living project".

**Reglas de validación**:
- El botón circular `→` SIEMPRE navega a `/proyecto/:slug` (los 4 tienen `caseStudy:true`).
- `liveUrl`/`repoUrl` se renderizan solo si no son null.
- `featured` único en AirVision.

## Entidad: CaseStudy

Una por proyecto (`/proyecto/:slug`). Secciones en orden fijo (FR-011/FR-012).

| Campo | Tipo | Notas |
|---|---|---|
| `slug` | string | Coincide con `Project.slug`. |
| `meta` | { rol, cliente, año } (i18n) | Filas `Rol → / Cliente → / Año →`. |
| `lead` | i18n key | Entradilla en cursiva. |
| `primaryCta` | { label i18n, href } | CTA principal según proyecto (p. ej. Maderas → visitar sitio; AirVision → demo + GitHub). |
| `sections` | ordered list | Contexto → El problema → Mi rol → La solución → **Decisiones técnicas** → Resultados → Stack → Aprendizajes. |
| `decisions` | Decision[] | Bloques `¿Por qué X?` + justificación (sección diferenciadora). |
| `results` | Stat[] | Tiles de estadística grandes. |
| `learnings` | i18n key | **Marcado como borrador** hasta que Álvaro lo escriba. |
| `privateRepoNote` | boolean | Nota cuando el repo es privado/interno. |

### Sub-entidad: Decision
`{ question: i18n (¿Por qué X?), rationale: i18n }` — al menos una por caso de estudio;
es obligatoria (Constitución IV / diferenciador del skill).

### Sub-entidad: Stat
`{ value: string, label: i18n }` — p. ej. AirVision: cobertura ~97%, ~166 tests, CI/CD;
LPR: 95% detección, −40% tiempo de acceso.

## Entidad: BilingualString

Unidad atómica de texto con dos variantes. Forma: `{ es: string, en: string }`. El sitio
expone `string[lang]`. **Invariante (Constitución III)**: toda clave presente en `es` debe
existir en `en` y viceversa → cubierto por un test de paridad de claves.

## Entidad: ExperienceEntry

Línea de tiempo (3 roles) + bloque educación.

| Campo | Tipo | Notas |
|---|---|---|
| `period` | string | P. ej. "Feb 2026 – Actualidad". |
| `role` | i18n key | Cargo. |
| `org` | string | Organización. |

Conjunto: Maderas Ponotro (freelance), Club Naval Las Salinas, Slince Limitada. Educación:
Magíster en Informática (en curso) + Ing. en Informática, PUCV. **NO** incluir "con
distinción / with honors" (eliminado intencionalmente).

## Entidad: StackGroup

Seis grupos exactos.

| Campo | Tipo |
|---|---|
| `title` | i18n key |
| `items` | string[] |

Grupos: Lenguajes; Frontend & Móvil; Backend & Datos; Infra & DevOps; Visión & IoT; Otros.

## Estado de aplicación

| Estado | Tipo | Persistencia | Default |
|---|---|---|---|
| `lang` | `'es' \| 'en'` | `localStorage` (clave única) | `'es'` (primera visita) |

Sin otros estados persistidos. El reloj en vivo del Hero es estado efímero (intervalo),
no persistido.

# Estado del negocio de páginas web para pymes

> Bitácora de avance del proyecto descrito en [`brief-alvarofr-web-pymes.md`](./brief-alvarofr-web-pymes.md).
> Última actualización: **23 de septiembre de 2026**.

---

## 1. Resumen en una línea

La página de venta, ahora rebrandeada como **Moonit**, está publicada en `/web`
con rediseño completo (tema luna y estrellas + animaciones anime.js) y el
catálogo tiene **4 de 10 tarjetas activas** (2 clientes reales + 2 demos por
rubro en sus propios subdominios). Faltan **6 demos de rubro**, la compra de
`moonit.cl` y el split a su propio repo/proyecto.

---

## 2. Qué está hecho

### 2.1 Página `/web` (repo `Homzk/Portfolio`) — marca Moonit

Ruta nueva dentro del portfolio, separada del home porque el público es distinto
(dueños de pyme vs. reclutadores). Bilingüe ES/EN completo.

Secciones actuales: Header flotante (píldora al scrollear + barra de progreso)
→ Intro con la luna (solo primera visita de la sesión) → Hero → Sobre nosotros
→ Servicios → Trabajos/Sitios en línea → Planes y precios (con tabla
comparativa) → Cómo funciona → Contacto (formulario Formspree o WhatsApp) →
FAQ con pestañas → estrellas laterales con parallax en todo el scroll.

**Decisiones tomadas** (reemplazan las del brief original):

| Decisión | Resultado |
|---|---|
| Marca | Rebrandeada de "Álvaro Flores" a **Moonit** (2026-09-23): logo, intro y `<title>` dicen "Moonit"; copy en primera persona plural ("nosotros"), "Sobre mí" → "Sobre nosotros", Álvaro Flores presentado como **fundador**. Se quitaron todos los enlaces de `/web` de vuelta al portafolio (header, "Sobre nosotros") para que Moonit no arrastre referencias a `alvarofr.dev` cuando se mude a `moonit.cl` |
| Estilo | Ya **no** usa los tokens hueso+ámbar del portfolio. Tema propio oscuro: noche azul, acento crema lunar, estrellas cian. Símbolo propio: luna SVG con fases (`src/components/Moon.jsx`) en vez del asterisco del portfolio |
| Idioma | Bilingüe ES/EN desde el inicio, reusando el `LangProvider` existente |
| Catálogo de rubros | Se unió la lista del brief con los rubros que pidió Álvaro: 8 rubros + 2 clientes reales, todo en un solo grid |
| Planes y precios | Tabla comparativa estilo product-comparison (encabezado con la luna de cada plan en su fase); sin franja de inclusiones compartidas; dominio/hosting gratis el primer año pasa a ser beneficio de los 3 planes (se quitó el beneficio de referido de Gabriela Flores); nota de mantención reemplazada por aviso de precios referenciales |

**Detalles técnicos:**
- CSS en `src/styles/web.css`, acotado bajo `.web-root`; `.site` usa
  `overflow-x:clip` en `/web` para que funcionen los paneles sticky.
  `global.css` casi no se tocó.
- Secciones en `src/sections/web/`: `Header`, `Intro`, `Hero`, `Pillars`
  ("Sobre nosotros"), `Services`, `Showcase`, `Sites`, `Pricing`,
  `HowItWorks`, `Contact`, `Faq`, `SideStars`, más helpers `motion.js`,
  `scrollTo.js`, `introSignal.js`.
- Animaciones con **anime.js** (`src/hooks/useAnimeScope.js`): título
  partido en palabras, subrayado animado, scrambleText en Servicios,
  inclinación 3D con el mouse, timeline de proceso ligada al scroll,
  contador de precios, luna que recorre sus fases.
- Intro de marca (`Intro.jsx`): la luna pasa de nueva a llena con anillo
  animado y el nombre letra a letra; espera solo las fuentes (tope 1.6s),
  sale con cortina; solo primera visita de la sesión y nunca con
  `prefers-reduced-motion`.
- Datos en `src/data/webOffer.js`; copy en el namespace `WEB` de
  `src/i18n/strings.js`. Test de paridad ES/EN cubre el namespace `WEB`.
- WhatsApp con mensaje prellenado (helper `waLink()` en `src/data/site.js`);
  los mensajes ya no llevan el nombre de una persona (voz de equipo).
- Contacto también acepta formulario vía Formspree como alternativa a
  WhatsApp.
- SEO: canonical/OG/Twitter/Schema.org/sitemap corregidos para apuntar al
  dominio real `https://www.alvarofr.dev` (antes apuntaban al alias
  `alvaro-flores.vercel.app`); `/web` agregado al sitemap. Imagen Open
  Graph propia (`public/media/og-web-cover.jpg`, 1200×630, tema luna) —
  antes caía a la imagen del portafolio personal al compartirse.
- **Vercel Analytics** instalado (`@vercel/analytics`, sin cookies) — mide
  vistas por página (home y `/web`); solo activo en producción/Vercel.

### 2.2 Repo de demos: `Homzk/plantillas-rubro` (privado)

Un proyecto de Vercel por carpeta. Ver `README.md` del repo para las reglas completas.

| Demo | Carpeta | URL | Plan que representa |
|---|---|---|---|
| Barbería El Ancla | `barberia/` | https://barberia.alvarofr.dev | Sitio pyme |
| Taquería El Comal | `restaurante/` | https://restaurante.alvarofr.dev | Sitio pyme (con carta) |

Cada demo tiene **identidad visual propia** (la idea es mostrar rango, no una
plantilla recoloreada):

- **Barbería**: negro/blanco/dorado latón, Prata + Karla. Referencias que pidió
  Álvaro: bear-menstudio.cl (look) + chapsandco.com (cómo entrega la información).
- **Taquería**: papel picado y talavera (crema, rojo chile, amarillo, turquesa),
  Alfa Slab One + Poppins + Pacifico. Referencia: pecadodelinka.com, que resultó
  ser WordPress + Elementor; sus "efectos" se replicaron con código propio
  (animaciones de entrada con un `IntersectionObserver`, hover *shrink*, tira de
  papel picado en SVG, banda full-bleed con foto fija).

### 2.3 Commits relevantes

```
Portfolio          12c886e  enlaza la demo de restaurante en /web
                   0bec610  enlaza la demo de barbería en /web
                   e7468ee  crea la página /web
plantillas-rubro   6ed110c  restaurante pasa a ser mexicano (Taquería El Comal)
                   37e42a9  primera demo (Barbería El Ancla)
```

---

## 3. Qué falta

### 3.1 Demos de rubro pendientes (6)

| Rubro | Subdominio previsto | Plan |
|---|---|---|
| Dentista | `dentista.alvarofr.dev` | Landing |
| Contadora | `contadora.alvarofr.dev` | Landing |
| Corredora de Propiedades | `corredora.alvarofr.dev` | Sitio pyme |
| Limpieza | `limpieza.alvarofr.dev` | Landing |
| Tienda con Catálogo | `tienda.alvarofr.dev` | Tienda online |
| Ferretería / Taller | `taller.alvarofr.dev` | Sitio pyme |

**Sugerencia para la próxima**: hacer el **dentista o la contadora** como plan
*Landing* **de verdad** — bien acotada, sin galería ni reseñas. Hoy las dos demos
publicadas son "Sitio pyme" y se parecen mucho entre sí en alcance; una landing
real haría visible el contraste entre los tres niveles de precio (fue justo la
duda que surgió: *"el sitio de la barbería parece mucho a una landing"*).

### 3.2 Pendientes de `/web` / Moonit

- **Analítica de clics** sobre los botones de WhatsApp y las tarjetas de demo —
  **postergada a propósito** hasta la migración a `moonit.cl` (ver §3.3); no
  agregarla antes de eso.
- **Parámetro `?ref=gabriela`** en el link del flyer, para medir cuántos clientes
  llegan por ese canal (nota: el beneficio de referido de Gabriela Flores en los
  planes se quitó del pricing, pero el link de tracking en sí sigue pendiente).

### 3.3 Migración a Moonit / dominio propio

- Comprar el dominio **moonit.cl**.
- Cuando esté comprado: **split a repo y proyecto Vercel propios** (Opción A,
  ya decidida) — no reabrir la discusión Opción A vs B. Mover
  `src/sections/web/`, `src/components/Moon.jsx`, `src/styles/web.css`,
  `src/data/webOffer.js`, el namespace `WEB` de `strings.js`, más infraestructura
  genérica copiada (`LangContext`, `useDocumentMeta`, etc.). DNS/Vercel con el
  mismo patrón que los subdominios de `plantillas-rubro` (Cloudflare CNAME,
  DNS-only/nube gris).
- Recién ahí: activar analítica de clics en WhatsApp/demos.

### 3.4 Fuera del código (tareas de Álvaro)

- Actualizar **flyer y cotización** para que apunten a `alvarofr.dev/web` + QR.
- Confirmar si `profekarlis.cl` reemplaza a `profekarlis.vercel.app` como URL
  definitiva (hoy la tarjeta apunta al `.vercel.app`, que es el que funciona).

---

## 4. Receta para agregar una demo nueva

1. `plantillas-rubro/<rubro>/` — copiar la estructura de `restaurante/` (Vite +
   React, sin router, secciones en `src/sections/`).
2. Fotos: Unsplash, **revisando una por una** que no aparezcan marcas ni nombres
   de negocios reales (ver § 5).
3. Identidad visual distinta: paleta, tipografía y tono propios del rubro. Nunca
   el sistema del portfolio personal (orbe, grano, ámbar sobre hueso).
4. Obligatorio en toda demo: barra "Sitio de demostración", WhatsApp inválido
   (`+56 9 0000 0000`), reseñas marcadas como "de ejemplo", link al footer hacia
   `alvarofr.dev/web`.
5. Commit + push.
6. **Vercel**: New Project → importar `plantillas-rubro` → *Root Directory* = la
   carpeta del rubro → Deploy → Settings → Domains → `<rubro>.alvarofr.dev`.
7. **Cloudflare**: DNS → CNAME `<rubro>` → `cname.vercel-dns.com` → **nube gris
   (DNS only)**. Con la nube naranja Vercel nunca valida el dominio.
8. Portfolio: en `src/data/webOffer.js`, esa entrada pasa de
   `kind:"demo", comingSoon:true` a `kind:"external"` + `href` + `cover` (captura
   del sitio ya publicado, guardada en `public/media/cases/`).

---

## 5. Aprendizajes y trampas ya pisadas

- **`lsof` no sirve en este Windows/Git Bash**: los `lsof -ti:PORT | xargs kill`
  no mataban nada y se acumularon 7 servidores de Vite zombis. Usar
  `netstat -ano | grep LISTENING` + `taskkill //F //PID <pid>`.
- **Especificidad CSS en el nav**: `.nav-links a` (0,1,1) le gana a `.btn-*`
  (0,1,0) y pinta el texto del botón de gris. Siempre `\.nav-links a:not(.btn)`.
- **`padding: X 0` en un hijo de `.wrap`** anula el padding lateral del
  contenedor; en desktop lo disimula el centrado, en móvil el texto queda pegado
  al borde. Usar `padding-top`/`padding-bottom`.
- **Contraste**: el gris `--muted` del portfolio queda bajo 4.5:1 sobre el fondo
  de `/web`. Por eso existe `--w-muted` (más oscuro) en `web.css`.
- **Fotos de stock**: ya se descartaron varias por marcas reales visibles
  (Chaps & Co, Coca-Cola, Apothecary87, "IRON…DRINKS") o por contexto equivocado.
  Vale la pena mirar cada foto completa antes de usarla.
- **`background-attachment: fixed`** no se lleva bien con iOS: desactivarlo bajo
  860px (ya está así en la taquería).
- **Nombres de clase de estado chocan con reglas globales**: `.open` y `.soon`
  en `/web` colisionaban con reglas globales del portafolio (`.open`, `.soon`)
  y rompían el FAQ y las tarjetas "Próximamente". Se renombraron a `is-open` /
  `is-soon`. Al reusar componentes/estilos entre el portfolio y `/web`,
  preferir nombres de clase con prefijo o namespace propio, no genéricos.
- **Animación por mouse en táctil**: seguir el cursor con `createAnimatable`
  (anime.js) para la luz del hero saltaba al hacer tap/scroll en dispositivos
  táctiles. Fix: solo seguir el mouse con puntero fino (`matchMedia
  '(pointer: fine)'`); en táctil, deriva lenta automática — mismo patrón que
  el fallback sin-hover del orbe del portfolio.
- **`overflow-x` en el layout compartido**: los paneles `sticky` de `/web`
  (Servicios) necesitan que `.site` tenga `overflow-x: clip` en esa ruta —
  si el layout raíz usa `overflow: hidden`/auto en un ancestro, los sticky
  dejan de fijarse.

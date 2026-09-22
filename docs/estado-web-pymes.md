# Estado del negocio de páginas web para pymes

> Bitácora de avance del proyecto descrito en [`brief-alvarofr-web-pymes.md`](./brief-alvarofr-web-pymes.md).
> Última actualización: **22 de septiembre de 2026**.

---

## 1. Resumen en una línea

La página de venta `/web` está publicada y el catálogo ya tiene **4 de 10 tarjetas
activas** (2 clientes reales + 2 demos por rubro en sus propios subdominios).
Faltan **6 demos de rubro** y los pendientes de marketing/medición.

---

## 2. Qué está hecho

### 2.1 Página `/web` (repo `Homzk/Portfolio`)

Ruta nueva dentro del portfolio, separada del home porque el público es distinto
(dueños de pyme vs. reclutadores). Bilingüe ES/EN completo.

Secciones: Hero → Catálogo (clientes reales + demos combinados) → Planes y precios
→ Cómo funciona → Quién soy → FAQ → Cierre, más botón flotante de WhatsApp.

**Decisiones tomadas** (estaban pendientes en el brief):

| Decisión | Resultado |
|---|---|
| Estilo | Tokens del portfolio (hueso + ámbar, Fraunces/Hanken/JetBrains Mono). Del flyer se tomó **solo** la cinta negra con "Yo te la hago." |
| Idioma | Bilingüe ES/EN desde el inicio, reusando el `LangProvider` existente |
| Catálogo de rubros | Se unió la lista del brief con los rubros que pidió Álvaro: 8 rubros + 2 clientes reales, todo en un solo grid |

**Detalles técnicos:**
- Todo el CSS nuevo vive en `src/styles/web.css`, acotado bajo `.web-root` — mismo
  patrón que `case-study.css`. `global.css` casi no se tocó (solo el link discreto
  hacia `/web` desde Contacto).
- Datos en `src/data/webOffer.js`; copy en el namespace `WEB` de `src/i18n/strings.js`.
- El test de paridad ES/EN cubre el namespace `WEB` (15 tests en verde).
- WhatsApp con mensaje prellenado en los 3 CTA de `/web` (helper `waLink()` en `src/data/site.js`).

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

### 3.2 Pendientes de `/web`

- **Imagen Open Graph propia** para `/web` (hoy cae a la del portfolio; funciona,
  pero no es dedicada).
- **Analítica de clics** (Vercel Analytics) sobre los botones de WhatsApp y las
  tarjetas de demo.
- **Parámetro `?ref=gabriela`** en el link del flyer, para medir cuántos clientes
  llegan por ese canal.

### 3.3 Fuera del código (tareas de Álvaro)

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

# Feature Specification: Portafolio personal de Álvaro Flores Rocha

**Feature Branch**: `001-portfolio-site`

**Created**: 2026-06-03

**Status**: Draft

**Input**: User description: "Construir el sitio de portafolio personal de Álvaro Flores Rocha. El diseño, la estructura, las convenciones visuales y el contenido YA ESTÁN DEFINIDOS y aprobados en el skill `alvaro-portfolio` (fuente de verdad: `SKILL.md`, `references/`, `assets/`). Sitio de una sola página con scroll (Hero → Proyectos → Sobre mí → Stack → Experiencia → Contacto) más páginas dedicadas de caso de estudio por proyecto. Bilingüe ES/EN con un único toggle; español por defecto; paridad total. Firma visual de orbe naranjo + grano respetando `prefers-reduced-motion`. Accesible y rápido."

> **Restricción de fidelidad (Constitución, Principio I — NO NEGOCIABLE)**: el diseño,
> la paleta, la tipografía, el sistema orbe/grano/flechas, la estructura, el orden de
> secciones y el contenido ya están aprobados y viven en el skill `alvaro-portfolio`.
> Esta especificación describe el **qué** y el **porqué**; NO redefine el diseño. Ante
> cualquier ambigüedad, la implementación de referencia (`assets/App.reference.jsx`,
> `assets/CaseStudy.reference.jsx`) y `references/design-system.md` son la verdad y se
> replican exactamente.

## Clarifications

### Session 2026-06-03

- Q: Al recargar o volver en otra visita, ¿qué idioma se muestra? → A: Recordar la
  elección del visitante mediante almacenamiento local del navegador; la primera visita
  usa español por defecto.
- Q: ¿Cuántas páginas de caso de estudio entran en la v1? → A: Las cuatro (Maderas, LPR,
  AirVision y Eventos); cada tarjeta abre su caso de estudio.
- Q: ¿El sitio incluirá analítica/seguimiento? → A: No; sin analítica basada en cookies ni
  datos personales, por lo que no se requiere banner de consentimiento.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recorrer el portafolio y conocer a Álvaro (Priority: P1)

Un visitante (reclutador, cliente potencial o colega) llega al sitio y, en una sola
página con scroll, recorre en orden fijo Hero → Proyectos → Sobre mí → Stack →
Experiencia → Contacto. Por defecto todo está en español. Obtiene una visión completa
de quién es Álvaro, qué construye y con qué calidad, con la sustancia de ingeniería
(métricas, stack, decisiones) visible, no diluida.

**Why this priority**: Es el núcleo del portafolio. Sin el recorrido de una página con
el contenido real, no hay producto que mostrar. Entrega valor por sí solo: alguien puede
evaluar a Álvaro de principio a fin aunque no exista nada más.

**Independent Test**: Cargar la página principal sin cambiar idioma y verificar que las
seis secciones aparecen en el orden correcto, con el contenido real del skill, y que la
navegación superior hace smooth-scroll a cada sección.

**Acceptance Scenarios**:

1. **Given** un visitante que abre la URL raíz, **When** la página carga, **Then** ve el
   Hero en español con eyebrow "Desarrollador Full Stack", el titular "Hola, soy
   *Álvaro*.", la barra de estado con ubicación (Viña del Mar, Chile) + reloj en vivo y
   "✦ Estado → Disponible para proyectos", las filas `etiqueta → valor`, la fila de CTAs
   y el indicador de scroll.
2. **Given** la página principal cargada, **When** el visitante hace scroll, **Then**
   encuentra Proyectos, Sobre mí, Stack, Experiencia y Contacto en ese orden exacto.
3. **Given** la navegación superior, **When** el visitante hace clic en un enlace de
   sección, **Then** la página se desplaza suavemente hasta esa sección.
4. **Given** la sección Proyectos, **When** el visitante la observa, **Then** ve cuatro
   piezas en orden Maderas Ponotro → Sistema LPR → AirVision → Eventos Culturales PUCV,
   con AirVision destacado visualmente, más una fila final "próximamente".
5. **Given** Sobre mí, Stack y Experiencia, **When** el visitante las lee, **Then** el
   contenido coincide con el del skill (bio, seis grupos de stack, tres roles + educación
   PUCV), incluyendo el párrafo de origen marcado como borrador.

---

### User Story 2 - Cambiar el idioma de todo el sitio con un solo toggle (Priority: P2)

Un visitante anglófono activa un único toggle ES/EN y todo el sitio —cada texto, en la
página principal y en los casos de estudio— cambia de idioma de forma consistente, sin
recargar ni dejar fragmentos en el idioma anterior.

**Why this priority**: La audiencia es internacional. Es la segunda capa de valor: amplía
el alcance del portafolio sin la cual el contenido solo sirve a hispanohablantes. Depende
de que el contenido (US1) exista.

**Independent Test**: Con la página cargada en español, activar el toggle a EN y
recorrer todas las secciones verificando que el 100% de los textos visibles están en
inglés; volver a ES y verificar paridad inversa.

**Acceptance Scenarios**:

1. **Given** el sitio en español (por defecto), **When** el visitante activa el toggle a
   EN, **Then** todos los textos visibles del sitio cambian a inglés.
2. **Given** el sitio en inglés, **When** el visitante navega a otra sección o a un caso
   de estudio, **Then** el idioma se mantiene en inglés en todo el contenido.
3. **Given** cualquier texto en español, **When** se compara con su contrapartida en
   inglés, **Then** existe paridad total (no hay cadenas sin traducir en ninguno de los
   dos idiomas).

---

### User Story 3 - Explorar el caso de estudio de un proyecto (Priority: P2)

Desde la sección Proyectos, el visitante abre el caso de estudio de un proyecto mediante
el botón circular `→` de su tarjeta y lee la historia técnica completa con la plantilla
fija (Contexto → El problema → Mi rol → La solución → Decisiones técnicas → Resultados →
Stack → Aprendizajes), volviendo luego al portafolio.

**Why this priority**: Las decisiones técnicas son el diferenciador de Álvaro frente a un
portafolio junior y la prueba de su criterio. Aporta profundidad, pero la página
principal ya entrega un MVP sin ello.

**Independent Test**: Abrir cada caso de estudio disponible desde su tarjeta, verificar
que aparecen todas las secciones de la plantilla en orden (incluida "Decisiones técnicas")
y que el enlace de retorno regresa al portafolio.

**Acceptance Scenarios**:

1. **Given** una tarjeta de proyecto, **When** el visitante pulsa su botón circular `→`,
   **Then** se abre la página de caso de estudio de ese proyecto.
2. **Given** una página de caso de estudio, **When** el visitante la recorre, **Then** ve
   las secciones en el orden fijo de la plantilla, incluyendo la sección "Decisiones
   técnicas (el porqué)" con bloques `¿Por qué X?` y su justificación.
3. **Given** un caso de estudio, **When** el visitante usa el enlace de retorno, **Then**
   vuelve a la página principal.
4. **Given** los enlaces específicos de cada proyecto, **When** el visitante los usa,
   **Then** se comportan según la matriz de presentación (Maderas → demo en vivo, sin
   código; LPR → solo caso de estudio; AirVision → demo en vivo + repo público; Eventos →
   solo caso de estudio).

---

### User Story 4 - Contactar a Álvaro y acceder a sus recursos (Priority: P3)

El visitante interesado usa las CTAs y la sección Contacto para llegar a Álvaro o a sus
recursos: ver proyectos, escribir por contacto, descargar el CV, abrir GitHub, LinkedIn o
WhatsApp, y visitar las demos en vivo de los proyectos que las tienen.

**Why this priority**: Es la conversión del portafolio. Importa, pero solo tiene sentido
una vez que el contenido y la navegación existen.

**Independent Test**: Desde el Hero y desde Contacto, activar cada CTA/enlace y verificar
que apunta al destino correcto del skill (email, LinkedIn, GitHub, WhatsApp, CV, demos).

**Acceptance Scenarios**:

1. **Given** la fila de CTAs del Hero, **When** el visitante las usa, **Then** acceden a
   proyectos, contacto, CV, GitHub y LinkedIn respectivamente.
2. **Given** la sección Contacto, **When** el visitante revisa las filas `etiqueta →
   valor`, **Then** ve Email, LinkedIn, GitHub y WhatsApp con los datos reales del skill,
   y las filas reaccionan al hover.
3. **Given** un proyecto con demo en vivo (Maderas, AirVision), **When** el visitante usa
   su enlace en vivo, **Then** se abre el sitio correspondiente.

---

### User Story 5 - Firma visual viva pero accesible (Priority: P3)

El visitante percibe la identidad visual del sitio —el orbe naranjo que sigue el mouse en
el Hero, deriva sutil en las secciones intermedias y reaparece grande en Contacto para
"cerrar" la página, sobre un grano de fondo— y, si ha pedido movimiento reducido o usa un
dispositivo sin hover, la experiencia se adapta sin perder elegancia ni accesibilidad.

**Why this priority**: La firma visual es parte de la identidad aprobada, pero la
propuesta de valor sobrevive sin ella; por eso va después del contenido, la traducción y
los casos de estudio.

**Independent Test**: En un dispositivo con hover y sin `prefers-reduced-motion`,
verificar que el orbe sigue el mouse en el Hero, deriva en secciones y aparece centrado y
grande en Contacto; luego activar `prefers-reduced-motion` y verificar que el movimiento
se detiene; en un dispositivo sin hover, verificar que el orbe deriva por una trayectoria
lenta en vez de seguir un cursor.

**Acceptance Scenarios**:

1. **Given** un dispositivo con hover y movimiento permitido, **When** el visitante mueve
   el mouse en el Hero, **Then** el orbe sigue el cursor con desplazamiento suave.
2. **Given** las secciones intermedias y Contacto, **When** el visitante las observa,
   **Then** el orbe deriva sutilmente en las secciones y reaparece grande y centrado en
   Contacto, con grano de fondo presente en todo el sitio.
3. **Given** un visitante con `prefers-reduced-motion: reduce`, **When** carga el sitio,
   **Then** las animaciones de orbe y grano no se reproducen.
4. **Given** un dispositivo sin capacidad de hover, **When** el visitante ve el Hero,
   **Then** el orbe deriva por una trayectoria automática en lugar de seguir un cursor.

---

### Edge Cases

- **Movimiento reducido**: con `prefers-reduced-motion: reduce`, todas las animaciones
  (orbe, grano, entradas, scroll cue) deben desactivarse manteniendo el sitio legible.
- **Dispositivos sin hover** (táctiles): el orbe del Hero no puede depender del cursor;
  debe derivar automáticamente.
- **Recursos placeholder ausentes**: mientras no existan los `webm` de miniatura ni el
  PDF del CV, deben mostrarse marcadores acordados (animación de placeholder; enlace de CV
  pendiente) sin romper la página ni los enlaces.
- **Persistencia/coherencia de idioma**: al navegar entre la página principal y un caso de
  estudio, el idioma elegido no debe revertirse ni mezclarse; tras recargar o volver en
  otra visita, el sitio debe recuperar el último idioma elegido desde el almacenamiento
  local (primera visita = español).
- **Navegación por teclado**: toda CTA, enlace, toggle y botón `→` debe ser alcanzable y
  operable solo con teclado, con foco visible.
- **Contenido marcado como borrador**: el párrafo de "origin story" en Sobre mí y la
  sección "Aprendizajes" de los casos de estudio permanecen con su marca de borrador hasta
  que Álvaro escriba el texto final; no se inventan.

## Requirements *(mandatory)*

### Functional Requirements

**Estructura y contenido (US1)**

- **FR-001**: El sitio principal MUST ser una sola página con scroll y presentar las
  secciones en el orden fijo: Hero → Proyectos → Sobre mí → Stack → Experiencia →
  Contacto.
- **FR-002**: El Hero MUST incluir: navegación (monograma a la izquierda; enlaces de
  sección + toggle ES/EN a la derecha), barra de estado con ubicación y reloj en vivo y la
  línea "✦ Estado → Disponible", eyebrow mono, titular conversacional con énfasis en el
  nombre, tagline, filas de datos en formato `etiqueta → valor`, fila de CTAs y un
  indicador de scroll.
- **FR-003**: La sección Proyectos MUST mostrar cuatro proyectos en orden Maderas Ponotro
  → Sistema LPR → AirVision → Eventos Culturales PUCV, con AirVision destacado
  visualmente, seguidos de una fila final "próximamente".
- **FR-004**: Cada tarjeta de proyecto MUST presentar miniatura animada, badge de estado,
  descripción/tagline, métricas, chips de stack y enlaces, con un botón circular `→` que
  abre su caso de estudio.
- **FR-005**: Las secciones Sobre mí, Stack, Experiencia y Contacto MUST usar el contenido
  real definido en el skill (bio en tres párrafos con el tercero marcado como borrador;
  seis grupos de stack; tres roles + bloque de educación PUCV; datos de contacto reales).
- **FR-006**: La navegación superior MUST hacer smooth-scroll a las secciones
  correspondientes.

**Bilingüe (US2)**

- **FR-007**: El sitio MUST ofrecer un único toggle ES/EN que controla el idioma de todo
  el sitio de forma consistente.
- **FR-008**: El español MUST ser el idioma por defecto en la primera visita.
- **FR-009**: Cada texto visible MUST existir en español e inglés con paridad total; no se
  permiten cadenas presentes en un solo idioma.
- **FR-010**: El idioma seleccionado MUST mantenerse coherente al navegar entre la página
  principal y las páginas de caso de estudio.
- **FR-010a**: El idioma seleccionado MUST persistir entre recargas y visitas posteriores
  mediante almacenamiento local del navegador (sin cookies de terceros); un visitante que
  cambió a inglés vuelve a ver el sitio en inglés.

**Casos de estudio (US3)**

- **FR-011**: Los cuatro proyectos (Maderas Ponotro, Sistema LPR, AirVision y Eventos
  Culturales PUCV) MUST tener en la v1 una página de caso de estudio dedicada que siga la
  plantilla fija: Contexto → El problema → Mi rol → La solución → Decisiones técnicas (el
  porqué) → Resultados → Stack → Aprendizajes. El botón circular `→` de cada tarjeta abre
  su caso de estudio.
- **FR-012**: La sección "Decisiones técnicas" MUST presentar cada decisión como un bloque
  con una pregunta `¿Por qué X?` y su justificación breve.
- **FR-013**: Los enlaces y CTAs de cada proyecto MUST seguir la matriz de presentación
  del skill: Maderas (demo en vivo, sin repo), LPR (solo caso de estudio), AirVision (demo
  en vivo + repo público), Eventos (solo caso de estudio).
- **FR-014**: Cada caso de estudio MUST ofrecer un enlace de retorno a la página
  principal.

**Contacto y recursos (US4)**

- **FR-015**: Las CTAs del Hero MUST enlazar a proyectos, contacto, CV, GitHub y LinkedIn.
- **FR-016**: La sección Contacto MUST mostrar filas `etiqueta → valor` para Email,
  LinkedIn, GitHub y WhatsApp con los datos reales del skill, con reacción al hover.
- **FR-017**: Los proyectos con demo en vivo (Maderas, AirVision) MUST exponer enlaces a
  sus sitios en vivo.

**Firma visual y movimiento (US5)**

- **FR-018**: El sistema visual MUST replicar la firma aprobada: orbe ámbar que sigue el
  mouse en el Hero, deriva sutil en secciones intermedias y reaparición grande y centrada
  en Contacto, sobre un grano de fondo presente en todo el sitio.
- **FR-019**: Todas las animaciones MUST realizarse únicamente mediante transformaciones de
  posición/escala y opacidad (sin propiedades que disparen reflujo de layout).
- **FR-020**: El sitio MUST respetar `prefers-reduced-motion: reduce` desactivando las
  animaciones de orbe, grano y entradas.
- **FR-021**: En dispositivos sin capacidad de hover, el orbe del Hero MUST derivar por una
  trayectoria automática en lugar de seguir el cursor.

**Fidelidad, accesibilidad y rendimiento (transversales)**

- **FR-022**: La implementación MUST mantener fidelidad exacta a la paleta, tipografía,
  estructura, orden y convenciones (orbe/grano/flechas `etiqueta → valor`, glifo `✦`)
  definidas en el skill; cualquier desviación requiere aprobación explícita previa.
- **FR-023**: El marcado MUST ser HTML semántico; toda funcionalidad interactiva MUST ser
  operable por teclado con foco visible y orden de tabulación lógico.
- **FR-024**: El contraste de color MUST cumplir como mínimo WCAG 2.1 AA.
- **FR-025**: Los medios de video MUST entregarse en formato `webm` (no GIF) y cargarse de
  forma diferida para no penalizar la carga inicial.
- **FR-026**: Los recursos aún no disponibles (miniaturas `webm`, PDF del CV) MUST mostrar
  marcadores acordados sin romper la página, hasta que existan los archivos reales.
- **FR-027**: El sitio MUST NOT incluir analítica basada en cookies ni seguimiento de datos
  personales; en consecuencia, no MUST mostrar banner de consentimiento de cookies. Si se
  usara medición de tráfico, MUST ser agregada y sin cookies ni datos personales.

### Key Entities *(include if feature involves data)*

- **Proyecto**: una pieza del portafolio. Atributos: nombre, número de orden, badge de
  estado, tagline, descripción, métricas, grupos/chips de stack, recurso de miniatura
  animada, destino del botón de caso de estudio, enlaces específicos (demo en vivo / repo
  público / solo caso de estudio según la matriz) y marca de "destacado". Conjunto fijo:
  Maderas Ponotro, Sistema LPR, AirVision, Eventos Culturales PUCV, más la fila
  "próximamente".
- **Caso de estudio**: la historia de un proyecto. Secciones en orden fijo (Contexto,
  Problema, Rol, Solución, Decisiones técnicas, Resultados, Stack, Aprendizajes), meta
  (`Rol → / Cliente → / Año →`), CTA primaria por proyecto y nota de repo privado cuando
  aplica.
- **Cadena bilingüe**: una unidad de texto con sus dos variantes (ES/EN); el sitio expone
  una sola versión según el estado de idioma global.
- **Entrada de experiencia**: un rol en la línea de tiempo. Atributos: periodo, cargo,
  organización. Conjunto: Maderas Ponotro (freelance), Club Naval Las Salinas, Slince
  Limitada; más el bloque de educación PUCV.
- **Grupo de stack**: una categoría tecnológica con su lista. Seis grupos: Lenguajes;
  Frontend & Móvil; Backend & Datos; Infra & DevOps; Visión & IoT; Otros.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitante puede recorrer las seis secciones y comprender quién es Álvaro,
  qué construye y con qué calidad sin necesidad de instrucciones, en una sola página.
- **SC-002**: El 100% de los textos visibles tienen paridad ES/EN; una auditoría de
  cadenas no encuentra ningún texto presente en un solo idioma.
- **SC-003**: Activar el toggle de idioma cambia todo el sitio de forma percibida como
  instantánea (sin recarga de página y sin fragmentos en el idioma anterior).
- **SC-004**: El 100% de las funciones interactivas (navegación, toggle, CTAs, enlaces,
  botones `→` de caso de estudio) son alcanzables y operables solo con teclado, con foco
  visible.
- **SC-005**: Todo el texto cumple un contraste mínimo WCAG 2.1 AA frente a su fondo.
- **SC-006**: Con `prefers-reduced-motion: reduce` activo, ninguna animación de orbe,
  grano o entrada se reproduce, y el sitio permanece completamente legible y usable.
- **SC-007**: La página principal resulta interactiva en menos de 3 segundos en una
  conexión de banda ancha típica y se percibe fluida (sin saltos de contenido perceptibles
  al cargar).
- **SC-008**: Cada proyecto definido tiene su caso de estudio accesible desde su tarjeta, y
  cada enlace por proyecto lleva al destino correcto según la matriz de presentación.
- **SC-009**: El sitio alcanza puntuaciones Lighthouse altas (objetivo ≥ 90 en
  Performance, Accesibilidad, Best Practices y SEO), como verificación de la tesis de rigor
  del portafolio.

## Assumptions

- La fuente de verdad del diseño, contenido y comportamiento es el skill `alvaro-portfolio`
  (`SKILL.md`, `references/design-system.md`, `references/structure.md`,
  `references/content.md`, `assets/App.reference.jsx`, `assets/CaseStudy.reference.jsx`).
  Esta spec no lo redefine.
- El sitio se publica como aplicación web pública de una sola página con rutas adicionales
  para los casos de estudio; el alcance no incluye backend ni autenticación.
- Las miniaturas `webm` reales y el PDF del CV pueden no existir al inicio; se usan
  marcadores acordados hasta que Álvaro provea los archivos finales.
- El párrafo de "origin story" (Sobre mí) y las secciones "Aprendizajes" de los casos de
  estudio permanecen como borrador marcado hasta que Álvaro escriba el texto definitivo; no
  se inventa contenido.
- La línea "con distinción / with honors" fue eliminada intencionalmente y no se reincorpora.
- La cifra de cobertura de AirVision debe verificarse y usarse de forma consistente en todo
  el sitio.
- El conjunto de proyectos del grid es fijo (cuatro + "próximamente"); Slince Limitada vive
  solo en la línea de tiempo de experiencia, no en el grid.
- La v1 incluye los cuatro casos de estudio (Maderas, LPR, AirVision, Eventos).
- El idioma elegido se recuerda en el almacenamiento local del navegador; la primera visita
  arranca en español.
- La v1 no incorpora analítica con cookies ni seguimiento de datos personales, por lo que no
  requiere banner de consentimiento.

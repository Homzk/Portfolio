# Brief: página `/web` para clientes pyme en alvarofr.dev

> Documento de trabajo para continuar en Claude Code. Resume lo decidido para el negocio de venta de páginas web y define la nueva página dentro del portafolio.

---

## 0. Antes de empezar (setup en este PC)

```bash
# 1. Clonar el repo del portafolio (reemplaza <repo> por el nombre real en GitHub)
git clone https://github.com/Homzk/<repo>.git
cd <repo>

# 2. Instalar y levantar
npm install
npm run dev

# 3. Crear una rama para este trabajo
git checkout -b feat/pagina-web-pymes
```

Primer mensaje sugerido para Claude Code, una vez dentro del repo:

> Lee `BRIEF-WEB-PYMES.md` (este archivo) y explora la estructura del proyecto. Antes de escribir código, dime cómo están organizadas las rutas, los estilos globales y el toggle ES/EN, y propón un plan para agregar la ruta `/web` según el brief.

Copia este archivo a la raíz del repo como `BRIEF-WEB-PYMES.md`.

---

## 1. Contexto del negocio

- **Qué es:** negocio propio de Álvaro Flores (sin socios ni marca aparte). Vende páginas web a pymes, comercios locales, profesionales independientes y emprendedores de la Región de Valparaíso.
- **Canal principal hoy:** referidos de su contadora, **Gabriela Flores**, que reenvía un flyer a sus clientes que no tienen página web.
- **Beneficio para clientes de Gabriela:** dominio y hosting **gratis el primer año**.
- **Problema a evitar:** que la publicidad parezca hecha por IA. La página debe verse hecha a mano, con decisiones de diseño reales, sin plantillas genéricas.

### Datos de contacto (usar exactamente estos)

| Campo | Valor |
|---|---|
| Nombre | Álvaro Flores |
| Rol | Desarrollador web · Región de Valparaíso |
| WhatsApp | +56 9 6350 5529 → `https://wa.me/56963505529` |
| Web | alvarofr.dev |
| Correo | f.alvaro.ro@gmail.com |

---

## 2. Planes, precios y condiciones (ya decididos)

| Plan | Precio (bruto) | Plazo | Incluye |
|---|---|---|---|
| **Landing** | $150.000 | 5 días hábiles | Una página para presentar un servicio o producto: quiénes son, qué ofrecen, contacto. Ideal para partir o para una campaña. |
| **Sitio pyme** ⭐ Recomendado | $250.000 | 10 días hábiles | Hasta 5 secciones (inicio, servicios, nosotros, galería, contacto) y formulario de contacto. |
| **Tienda online** | $350.000 | 15 días hábiles | Todo lo del sitio pyme, más catálogo y carrito, hasta 30 productos cargados y pagos con Mercado Pago o Webpay a nombre del cliente. |

**Todos los planes incluyen:** diseño pensado para el celular · botón de WhatsApp · ficha de Google Business y SEO básico · sitio seguro (https) · tres rondas de cambios · el sitio y el dominio quedan a nombre del cliente.

**Condiciones:**
- 50% al empezar y 50% al entregar.
- Valores brutos, con boleta de honorarios (retención 2026: 15,25%).
- Los plazos corren desde que el cliente entrega textos, fotos y logo.
- Una "ronda de cambios" = una lista con todos los cambios juntos.
- Desde el 2º año, el cliente renueva dominio (.cl ≈ $9.990/año en NIC Chile) y hosting.
- Precios válidos por 30 días desde la fecha de la cotización.

---

## 3. Objetivo de la página `/web`

Que un dueño de negocio que llega desde el flyer (o por un QR) entienda en menos de un minuto:
1. qué haces por él,
2. cómo quedaría **su** página (demos por rubro),
3. cuánto cuesta,
4. cómo te escribe (WhatsApp).

**Por qué una ruta aparte y no una sección del portafolio:** el portafolio le habla a reclutadores y equipos técnicos (stack, métricas, experiencia). Al dueño de una peluquería eso no le sirve. `/web` es para clientes y el home sigue siendo para empleadores. Cada público ve lo suyo.

Después de lanzarla, **actualizar el flyer y la cotización** para que apunten a `alvarofr.dev/web` en vez de solo `alvarofr.dev`, y agregar un QR.

---

## 4. Estructura de la página `/web`

En este orden:

1. **Hero:** el mismo mensaje del flyer, para que el cliente reconozca que llegó al lugar correcto.
   - Titular: **"¿Tu negocio no tiene página web?"**
   - Remate: **"Yo te la hago."**
   - CTA principal: botón de WhatsApp. CTA secundario: "Ver ejemplos" (baja a las demos).
2. **Demos por rubro:** el corazón de la página (ver sección 5). Cada tarjeta muestra una miniatura animada, el nombre del rubro y el botón "Ver demo", que abre el sitio real.
3. **Trabajos reales:** clientes de verdad, con nombre y rubro. Pesan más que las demos.
   - Maderas Ponotro (ya tiene case study en el portafolio, así que se puede enlazar).
   - profekarlis.cl (plataforma para una profesora de matemáticas).
4. **Planes y precios:** las tres tarjetas de la sección 2, con "Sitio pyme" destacado como recomendado.
5. **Cómo funciona:** 3 o 4 pasos simples. Por ejemplo: me escribes → me mandas textos y fotos → en X días revisas tu página → la publicamos.
6. **Quién soy:** foto real, dos líneas ("Hablas directo conmigo, desde la primera idea hasta que tu página está online") y link al portafolio principal.
7. **Preguntas frecuentes (opcional):** ¿qué pasa el segundo año? ¿puedo editarla yo? ¿qué necesito entregarte?
8. **Cierre:** botón grande de WhatsApp, correo y teléfono.

Extra recomendado: **botón flotante de WhatsApp** visible en móvil en toda la página.

---

## 5. Demos por rubro

**Idea clave:** que sean **sitios navegables de verdad**, no capturas. Probarlos en el celular convence mucho más que ver una imagen. Además, cada demo sirve después como **plantilla base** para ese rubro: cuando llega un cliente, se parte de la demo y se cambian textos, fotos y colores.

### Rubros iniciales (4–5, los más comunes entre clientes de una contadora)

| Rubro | Subdominio sugerido | Plan que demuestra |
|---|---|---|
| Restaurante / café | `restaurante.alvarofr.dev` | Sitio pyme (menú, horario, mapa) |
| Barbería / peluquería | `barberia.alvarofr.dev` | Sitio pyme (servicios, precios, reserva por WhatsApp) |
| Profesional (salud, abogado, contador) | `profesional.alvarofr.dev` | Landing |
| Tienda con catálogo | `tienda.alvarofr.dev` | Tienda online |
| Ferretería / taller | `taller.alvarofr.dev` | Sitio pyme |

### Reglas para las demos
- Negocios **ficticios pero creíbles**, con nombres inventados de la zona (evitar nombres de negocios reales). Una etiqueta discreta de "Sitio de demostración" en cada una.
- Cada demo con **identidad visual distinta** (paleta, tipografía, tono), para mostrar rango y no una sola plantilla con otro color.
- Fotos: propias o de bancos con licencia libre. Nada que parezca generado por IA.
- Rápidas y livianas, porque su trabajo es convencer en un celular con 4G.
- **Organización técnica sugerida:** un repo aparte (por ejemplo `plantillas-rubro`) con una app por rubro, cada una como proyecto separado en Vercel, apuntado a su subdominio. Así no se infla el repo del portafolio.
- Miniaturas en `/web`: clips `webm` cortos grabados de cada demo, igual que en los proyectos del portafolio.

---

## 6. Restricciones del portafolio existente (respetar)

El portafolio tiene un diseño ya aprobado. La página `/web` debe verse **hecha por la misma mano**:

- **Stack:** React + Vite + React Router, deploy en Vercel.
- **Estilos:** una hoja CSS global con variables en `:root`. Reutilizar esos tokens y **no redefinir** colores ni tipografías.
- **Paleta:** papel gris hueso `#E9E7E0`, tinta `#18160F`, un solo acento ámbar `#E8770E` (suave `#F2A23C`). No agregar un segundo color de acento.
- **Tipografías:** Fraunces (títulos, cursiva para énfasis), Hanken Grotesk (texto), JetBrains Mono (etiquetas y datos).
- **Sistema visual:** orb ámbar con blur, grano de papel en SVG, flechas `label → value`.
- **Movimiento:** solo con `transform` y respetando `prefers-reduced-motion`.
- **Rendimiento:** `webm` en vez de GIF, lazy-load y nada de librerías pesadas.

### ⚠️ Decisión pendiente: ¿estilo del portafolio o estilo del flyer?
El flyer usa amarillo `#F2CF3A`, negro, Anton en mayúsculas para el titular, una franja negra inclinada con Instrument Serif cursiva y una tarjeta pegada con cinta. El portafolio usa gris hueso y ámbar.

- **Opción A (recomendada):** usar el sistema del portafolio (tokens, fuentes, orb) y llevar del flyer **el mensaje** ("¿Tu negocio no tiene página web? Yo te la hago.") y, si calza, la franja inclinada como elemento gráfico. Mantiene la coherencia del sitio.
- **Opción B:** que `/web` adopte el look amarillo del flyer, como una "sub-marca". Da más continuidad con el flyer, pero rompe la regla de un solo acento del portafolio.

Decidir antes de diseñar.

### ⚠️ Decisión pendiente: idioma
El portafolio es bilingüe (toggle ES/EN, todo string en ambos idiomas). Los clientes de `/web` son locales, así que se puede lanzar **solo en español** y dejar EN como pendiente, o mantener la regla bilingüe desde el inicio.

---

## 7. SEO y medición

- `<title>` y meta description en español orientados a búsqueda local, por ejemplo: "Páginas web para negocios en Viña del Mar y Valparaíso | Álvaro Flores".
- Open Graph con una imagen propia, para que el link se vea bien al compartirlo por WhatsApp.
- Datos estructurados `LocalBusiness` o `ProfessionalService` (zona: Región de Valparaíso).
- Medir clics en los botones de WhatsApp y "Ver demo". Vercel Analytics basta.
- Agregar un parámetro al link del flyer (`/web?ref=gabriela`) para saber cuántos clientes llegan por ese canal.

---

## 8. Orden de trabajo sugerido

1. Clonar el repo, levantarlo y revisar su estructura (sección 0).
2. Resolver las dos decisiones pendientes (estilo e idioma).
3. Crear la ruta `/web` con las secciones 1, 4, 6 y 8 (hero, precios, quién soy, cierre) y el botón flotante de WhatsApp. **Con eso ya se puede publicar.**
4. Agregar "Trabajos reales" enlazando el case study de Maderas Ponotro.
5. Construir la primera demo (sugerido: barbería o restaurante) en el repo de plantillas, publicarla en su subdominio y enlazarla.
6. Sumar las demás demos de a una.
7. SEO, Open Graph y analítica.
8. Actualizar el flyer y la cotización con `alvarofr.dev/web` y un QR.

---

## 9. Checklist de lanzamiento

- [ ] `/web` se ve bien en un celular de gama media con 4G.
- [ ] Todos los botones de WhatsApp abren `wa.me/56963505529`, idealmente con un mensaje prellenado ("Hola Álvaro, vi tu página y me interesa una web para mi negocio").
- [ ] Precios, plazos y condiciones coinciden con la cotización PDF.
- [ ] Mención del beneficio para clientes de Gabriela Flores (dominio y hosting gratis el primer año).
- [ ] Al menos 1 demo publicada y 1 trabajo real enlazado.
- [ ] Imagen de Open Graph probada compartiendo el link por WhatsApp.
- [ ] Link en el home del portafolio hacia `/web` (discreto, por ejemplo en el footer o en Contacto: "¿Tienes un negocio? → Páginas web").

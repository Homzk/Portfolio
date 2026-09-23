/* ---------------- webOffer ----------------
   Datos estructurados de /web: sitios (clientes reales + demos por
   rubro, combinados en una sola lista/grid a pedido del usuario) y
   planes/precios. Bilingüe por campo ({es,en}), igual que CASES en
   src/data/caseStudies.js. El copy de sección vive en WEB dentro de
   src/i18n/strings.js — aquí solo van los registros de datos.

   SITES: los 2 primeros son clientes reales (pesan más, van primero);
   los 8 siguientes son demos por rubro. Las que aún no existen quedan
   con comingSoon:true — Sites.jsx las renderiza en estado
   "Próximamente" (botón deshabilitado, subdominio como texto plano,
   nunca un link funcional a *.alvarofr.dev). Una demo publicada
   (comingSoon:false, kind:"external", href real) se ve y se comporta
   como cualquier link externo — ver "barberia" más abajo. */

export const SITES = [
  { id:"maderas", kind:"case", slug:"maderas",
    name:{ es:"Maderas Ponotro", en:"Maderas Ponotro" },
    planTag:{ es:"Cliente real", en:"Real client" },
    desc:{ es:"Sitio corporativo y cotizaciones, en producción.", en:"Corporate site and quoting, in production." },
    cover:"/media/cases/maderas-cover.jpg" },
  { id:"profekarlis", kind:"external", href:"https://profekarlis.vercel.app/",
    name:{ es:"Profe Karlis", en:"Profe Karlis" },
    planTag:{ es:"Cliente real", en:"Real client" },
    desc:{ es:"Plataforma educativa de matemáticas.", en:"Math learning platform." },
    cover:"/media/cases/profekarlis-cover.png" },

  { id:"restaurante", kind:"external", href:"https://restaurante.alvarofr.dev/", subdomain:"restaurante.alvarofr.dev",
    name:{ es:"Restaurante / Café", en:"Restaurant / Café" },
    planTag:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Carta por categorías, horario y pedidos por WhatsApp.", en:"Menu by category, hours and WhatsApp orders." },
    cover:"/media/cases/restaurante-cover.jpg" },
  { id:"barberia", kind:"external", href:"https://barberia.alvarofr.dev/", subdomain:"barberia.alvarofr.dev",
    name:{ es:"Barbería / Peluquería", en:"Barbershop / Hair Salon" },
    planTag:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Servicios, precios y reserva de hora por WhatsApp.", en:"Services, prices and WhatsApp booking." },
    cover:"/media/cases/barberia-cover.jpg" },
  { id:"dentista", kind:"demo", subdomain:"dentista.alvarofr.dev",
    name:{ es:"Dentista", en:"Dentist" },
    planTag:{ es:"Landing", en:"Landing" },
    desc:{ es:"Especialidades, horarios de atención y reserva de hora.", en:"Specialties, opening hours and appointment booking." },
    comingSoon:true },
  { id:"contadora", kind:"demo", subdomain:"contadora.alvarofr.dev",
    name:{ es:"Contadora", en:"Accountant" },
    planTag:{ es:"Landing", en:"Landing" },
    desc:{ es:"Servicios contables, zona de cobertura y contacto directo.", en:"Accounting services, coverage area and direct contact." },
    comingSoon:true },
  { id:"corredora", kind:"demo", subdomain:"corredora.alvarofr.dev",
    name:{ es:"Corredora de Propiedades", en:"Real Estate Broker" },
    planTag:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Catálogo de propiedades con fichas y contacto por WhatsApp.", en:"Property catalog with listing pages and WhatsApp contact." },
    comingSoon:true },
  { id:"limpieza", kind:"demo", subdomain:"limpieza.alvarofr.dev",
    name:{ es:"Limpieza", en:"Cleaning Services" },
    planTag:{ es:"Landing", en:"Landing" },
    desc:{ es:"Tipos de servicio, zonas de cobertura y cotización rápida.", en:"Service types, coverage areas and a quick quote request." },
    comingSoon:true },
  { id:"tienda", kind:"demo", subdomain:"tienda.alvarofr.dev",
    name:{ es:"Tienda con Catálogo", en:"Store with Catalog" },
    planTag:{ es:"Tienda online", en:"Online store" },
    desc:{ es:"Catálogo, carrito y pago con Mercado Pago o Webpay.", en:"Catalog, cart and payments with Mercado Pago or Webpay." },
    comingSoon:true },
  { id:"ferreteria", kind:"demo", subdomain:"taller.alvarofr.dev",
    name:{ es:"Ferretería / Taller", en:"Hardware Store / Workshop" },
    planTag:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Productos, servicios técnicos y ubicación con mapa.", en:"Products, technical services and location with map." },
    comingSoon:true },
];

/* SERVICES: lista del panel sticky de Services.jsx. `img` es una
   captura real de un sitio del catálogo; los que no tienen captura
   usan `mock` (maqueta dibujada en CSS dentro de Services.jsx, copy en
   WEB.services.mocks). */
export const SERVICES = [
  { id:"landing", img:"/media/cases/barberia-cover.jpg",
    name:{ es:"Landing page", en:"Landing page" },
    desc:{ es:"Una página enfocada en un solo objetivo: que te escriban. Ideal para partir o para una campaña puntual.",
      en:"One page focused on a single goal: getting you messages. Ideal to get started or for a specific campaign." },
    tags:{ es:["1 página","Botón de WhatsApp","Desde 5 días"], en:["1 page","WhatsApp button","From 5 days"] } },
  { id:"pyme", img:"/media/cases/restaurante-cover.jpg",
    name:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Hasta 5 secciones —inicio, servicios, nosotros, galería y contacto— para mostrar tu negocio completo.",
      en:"Up to 5 sections —home, services, about, gallery and contact— to present your whole business." },
    tags:{ es:["Hasta 5 secciones","Reservas en línea","Galería"], en:["Up to 5 sections","Online bookings","Gallery"] } },
  { id:"tienda", img:"/media/cases/maderas-producto.jpg",
    name:{ es:"Tienda online", en:"Online store" },
    desc:{ es:"Catálogo con carrito y pagos con Mercado Pago o Webpay, con hasta 30 productos cargados.",
      en:"Catalog with cart and Mercado Pago or Webpay payments, with up to 30 products loaded." },
    tags:{ es:["Carrito","Mercado Pago · Webpay","30 productos"], en:["Cart","Mercado Pago · Webpay","30 products"] } },
  { id:"seo", mock:"seo",
    name:{ es:"Google Business y SEO", en:"Google Business & SEO" },
    desc:{ es:"Tu ficha de Google Maps configurada y el sitio optimizado para que te encuentren cuando te buscan en tu comuna.",
      en:"Your Google Maps listing set up and the site optimized so people find you when they search in your area." },
    tags:{ es:["Google Maps","SEO básico","En todos los planes"], en:["Google Maps","Basic SEO","In every plan"] } },
  { id:"mantencion", mock:"care",
    name:{ es:"Mantención mensual", en:"Monthly maintenance" },
    desc:{ es:"Cambios de precios, fotos, horarios o promociones sin que tengas que tocar código. Se cotiza según lo que necesites.",
      en:"Price, photo, hours or promo updates without touching code. Quoted based on what you need." },
    tags:{ es:["Plan mensual","Cambios rápidos","A cotizar"], en:["Monthly plan","Quick changes","Quoted"] } },
  { id:"hosting", mock:"domain",
    name:{ es:"Dominio y hosting", en:"Domain & hosting" },
    desc:{ es:"Tu dominio .cl y el hosting configurados con https. Todo queda a tu nombre, no amarrado a una plataforma.",
      en:"Your .cl domain and hosting set up with https. Everything stays in your name, not locked into a platform." },
    tags:{ es:["Dominio .cl","https","A tu nombre"], en:[".cl domain","https","In your name"] } },
];

/* TOOLS: tira que se desplaza sola en "Sobre mí". Solo herramientas que
   de verdad se usan en los sitios (stack, deploy, DNS, pagos, canales). */
export const TOOLS = ["React", "Vite", "Vercel", "Cloudflare", "Google Business", "Google Maps", "WhatsApp", "Mercado Pago", "Webpay"];

export const PRICING_TIERS = [
  { id:"landing", priceCLP:150000, days:5, recommended:false,
    name:{ es:"Landing", en:"Landing" },
    desc:{ es:"Una página para presentar un servicio o producto: quiénes son, qué ofrecen, y un formulario de contacto. Ideal para partir o para una campaña.",
      en:"One page to present a service or product: who you are, what you offer, and a contact form. Ideal to get started or for a campaign." } },
  { id:"pyme", priceCLP:250000, days:10, recommended:true,
    name:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Hasta 5 secciones (inicio, servicios, nosotros, galería, contacto), formulario de contacto, reservas en línea y mapa con horario.",
      en:"Up to 5 sections (home, services, about, gallery, contact), contact form, online bookings and a map with opening hours." } },
  { id:"tienda", priceCLP:350000, days:15, recommended:false,
    name:{ es:"Tienda online", en:"Online store" },
    desc:{ es:"Todo lo del sitio pyme, más catálogo y carrito, hasta 30 productos cargados y pagos con Mercado Pago o Webpay.",
      en:"Everything in the business site plan, plus catalog and cart, up to 30 products loaded, with Mercado Pago or Webpay payments." } },
];

/* Comparación de planes (Pricing.jsx): una sola tabla, sin franja de
   inclusiones compartidas — a pedido del usuario, lo que antes eran
   chips arriba (celular, WhatsApp, SEO, https, dominio a tu nombre,
   capacitación, QR, reseñas) se quitó de la vista; lo que sí importa
   destacar (dominio/hosting gratis, formulario, rondas de cambio) pasó
   a ser fila propia, aunque valga true en los tres planes. Una columna
   por plan en el orden de PRICING_TIERS. Valor: true (incluido), false
   (no incluido) o texto bilingüe. Cada plan incluye todo lo del anterior. */
export const COMPARISON = [
  { id:"alcance", label:{ es:"Alcance", en:"Scope" },
    values:[{ es:"1 página", en:"1 page" }, { es:"Hasta 5 secciones", en:"Up to 5 sections" }, { es:"Sitio pyme + tienda", en:"Business site + store" }] },
  { id:"entrega", label:{ es:"Entrega", en:"Delivery" },
    values:PRICING_TIERS.map((t) => ({ es:`${t.days} días hábiles`, en:`${t.days} business days` })) },
  { id:"dominio", label:{ es:"Dominio y hosting gratis el primer año", en:"Free domain and hosting for the first year" }, values:[true, true, true] },
  { id:"formulario", label:{ es:"Formulario de contacto", en:"Contact form" }, values:[true, true, true] },
  { id:"cambios", label:{ es:"3 rondas de cambios", en:"3 rounds of changes" }, values:[true, true, true] },
  { id:"galeria", label:{ es:"Galería de fotos", en:"Photo gallery" }, values:[false, true, true] },
  { id:"reservas", label:{ es:"Reservas u horas en línea", en:"Online bookings" }, values:[false, true, true] },
  { id:"mapa", label:{ es:"Mapa y horario de atención", en:"Map and opening hours" }, values:[false, true, true] },
  { id:"catalogo", label:{ es:"Catálogo y carrito de compras", en:"Catalog and shopping cart" }, values:[false, false, true] },
  { id:"pagos", label:{ es:"Pagos con Mercado Pago o Webpay", en:"Mercado Pago or Webpay payments" }, values:[false, false, true] },
  { id:"productos", label:{ es:"Productos cargados", en:"Products loaded" },
    values:[false, false, { es:"Hasta 30", en:"Up to 30" }] },
];

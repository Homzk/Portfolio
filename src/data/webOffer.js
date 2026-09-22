/* ---------------- webOffer ----------------
   Datos estructurados de /web: sitios (clientes reales + demos por
   rubro, combinados en una sola lista/grid a pedido del usuario) y
   planes/precios. Bilingüe por campo ({es,en}), igual que CASES en
   src/data/caseStudies.js. El copy de sección vive en WEB dentro de
   src/i18n/strings.js — aquí solo van los registros de datos.

   SITES: los 2 primeros son clientes reales (pesan más, van primero);
   los 8 siguientes son demos por rubro — ninguno de esos subdominios
   existe todavía, así que Sites.jsx debe renderizarlos en estado
   "Próximamente" (botón deshabilitado, subdominio como texto plano,
   nunca un link funcional a *.alvarofr.dev). */

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

  { id:"restaurante", kind:"demo", subdomain:"restaurante.alvarofr.dev",
    name:{ es:"Restaurante / Café", en:"Restaurant / Café" },
    planTag:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Menú, horario y mapa, listo para pedidos por WhatsApp.", en:"Menu, hours and map, ready for WhatsApp orders." },
    comingSoon:true },
  { id:"barberia", kind:"demo", subdomain:"barberia.alvarofr.dev",
    name:{ es:"Barbería / Peluquería", en:"Barbershop / Hair Salon" },
    planTag:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Servicios, precios y reserva de hora por WhatsApp.", en:"Services, prices and WhatsApp booking." },
    comingSoon:true },
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

export const PRICING_TIERS = [
  { id:"landing", priceCLP:150000, days:5, recommended:false,
    name:{ es:"Landing", en:"Landing" },
    desc:{ es:"Una página para presentar un servicio o producto: quiénes son, qué ofrecen, contacto. Ideal para partir o para una campaña.",
      en:"One page to present a service or product: who you are, what you offer, contact. Ideal to get started or for a campaign." } },
  { id:"pyme", priceCLP:250000, days:10, recommended:true,
    name:{ es:"Sitio pyme", en:"Business site" },
    desc:{ es:"Hasta 5 secciones (inicio, servicios, nosotros, galería, contacto) y formulario de contacto.",
      en:"Up to 5 sections (home, services, about, gallery, contact) and a contact form." } },
  { id:"tienda", priceCLP:350000, days:15, recommended:false,
    name:{ es:"Tienda online", en:"Online store" },
    desc:{ es:"Todo lo del sitio pyme, más catálogo y carrito, hasta 30 productos cargados y pagos con Mercado Pago o Webpay.",
      en:"Everything in the business site plan, plus catalog and cart, up to 30 products loaded, with Mercado Pago or Webpay payments." } },
];

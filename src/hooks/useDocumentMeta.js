/* ---------------- useDocumentMeta ----------------
   SEO para una SPA: actualiza <title>, meta description, canonical y las
   etiquetas Open Graph/Twitter en el cliente al cambiar de ruta. El
   index.html cubre el render inicial (lo que leen la mayoría de los
   crawlers de redes sociales en la home); este hook cubre la navegación
   interna y el título por pestaña en cada caso de estudio. */

import { useEffect } from "react";

const SITE_URL = "https://alvaro-flores.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/media/og-cover.jpg`;

function setMeta(selector, attr, value) {
  if (!value) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useDocumentMeta({ title, description, path = "/", image } = {}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const img = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

    if (title) document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setCanonical(url);

    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", img);

    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", img);
  }, [title, description, path, image]);
}

/* ---------------- WhatsAppFloat ----------------
   Botón flotante fijo, solo para /web. Debe renderizarse como hijo
   directo de .web-root (no anidado en ninguna sección) — .web-root usa
   position:relative + overflow:hidden pero SIN transform/filter/
   will-change, así que no crea un containing block nuevo y este botón
   fixed sigue resolviendo contra el viewport (ver comentario en
   web.css). */

import { MessageCircle } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { WEB } from "../i18n/strings";
import { waLink } from "../data/site";

export default function WhatsAppFloat() {
  const { lang } = useLang();
  const t = WEB[lang];
  return (
    <a className="wa-float" href={waLink(t.waMessage)} target="_blank" rel="noreferrer" aria-label={t.whatsappFloat.ariaLabel}>
      <MessageCircle size={24} />
    </a>
  );
}

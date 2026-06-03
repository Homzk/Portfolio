/* ---------------- FOOTER ----------------
   Portado verbatim. Año dinámico + ubicación. */

import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="foot"><div className="container foot-in">
      <span>© {new Date().getFullYear()} Álvaro Flores Rocha</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MapPin size={13} /> Viña del Mar, Chile</span>
    </div></footer>
  );
}

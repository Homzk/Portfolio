/* Enlaces de sitio centralizados.

   CV: para poner el real, REEMPLAZA el archivo
   `public/cv/Alvaro-Flores-Rocha-CV.pdf` por tu PDF (mismo nombre) —
   no hay que tocar código. Si lo nombras distinto, actualiza CV_URL y
   CV_FILENAME aquí. Hoy es un placeholder (FR-026). */

export const CV_URL = "/cv/Alvaro-Flores-Rocha-CV.pdf";
export const CV_FILENAME = "Alvaro-Flores-Rocha-CV.pdf";
export const GITHUB_URL = "https://github.com/Homzk";
export const LINKEDIN_URL = "https://linkedin.com/in/alvaro-flores-rocha";
export const EMAIL = "f.alvaro.ro@gmail.com";
export const WHATSAPP_URL = "https://wa.me/56963505529";
export const WHATSAPP_DISPLAY = "+56 9 6350 5529";

/* Formulario de contacto de /web (Formspree). Pega aquí la URL de tu
   formulario, p.ej. "https://formspree.io/f/abcdwxyz". Mientras esté
   vacío, el formulario abre WhatsApp con los datos ya escritos. */
export const FORM_ENDPOINT = "";

/* Link de WhatsApp con mensaje prellenado (checklist del brief de
   /web). Uso opcional: WHATSAPP_URL solo (sin mensaje, como en el
   portfolio principal) o waLink(mensaje) cuando conviene prellenar. */
export function waLink(message) {
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
}

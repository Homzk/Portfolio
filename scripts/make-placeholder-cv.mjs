/* Genera un PDF mínimo y válido como placeholder del CV, hasta que Álvaro
   entregue el archivo real (FR-026). Reproducible: `node scripts/make-placeholder-cv.mjs`. */
import { writeFileSync, mkdirSync } from "node:fs";

const objs = [
  "<</Type/Catalog/Pages 2 0 R>>",
  "<</Type/Pages/Kids[3 0 R]/Count 1>>",
  "<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>",
  "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>",
];
const text =
  "BT /F1 22 Tf 70 770 Td (Alvaro Flores Rocha) Tj " +
  "0 -30 Td /F1 13 Tf (CV - documento placeholder / placeholder document) Tj " +
  "0 -24 Td (Reemplazar por el CV real en public/cv/) Tj ET";
const stream = `<</Length ${text.length}>>\nstream\n${text}\nendstream`;

const all = [...objs, stream];
let pdf = "%PDF-1.4\n";
const offsets = [];
all.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
const size = all.length + 1;
pdf += `xref\n0 ${size}\n0000000000 65535 f \n`;
offsets.forEach((o) => {
  pdf += String(o).padStart(10, "0") + " 00000 n \n";
});
pdf += `trailer\n<</Size ${size}/Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF`;

mkdirSync("public/cv", { recursive: true });
writeFileSync("public/cv/Alvaro-Flores-Rocha-CV.pdf", pdf, "latin1");
console.log("CV placeholder escrito en public/cv/Alvaro-Flores-Rocha-CV.pdf");

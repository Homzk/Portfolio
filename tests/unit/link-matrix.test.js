/* Puerta US3 — matriz de presentación de proyectos (FR-013).
   Verifica orden, destacado, slugs y que cada proyecto exponga
   exactamente los enlaces de la matriz; y que los 4 tengan caso de
   estudio (el botón circular → enruta a /proyecto/:slug). */

import { describe, it, expect } from "vitest";
import { projData } from "../../src/data/projects";
import { CASES, CASE_ORDER } from "../../src/data/caseStudies";

const EXPECTED = {
  maderas:   { order: 0, feat: false, live: true,  links: [{ k: "live", href: "https://maderasponotro.cl" }, { k: "priv" }] },
  lpr:       { order: 1, feat: false, live: true,  links: [{ k: "case" }, { k: "intern" }] },
  airvision: { order: 2, feat: true,  live: true,  links: [{ k: "demo", href: "https://air-vision-xi.vercel.app/" }, { k: "code", href: "https://github.com/Homzk/AirVision" }] },
  eventos:   { order: 3, feat: false, live: false, links: [{ k: "case" }] },
};

describe("matriz de proyectos", () => {
  const rows = projData("es");

  it("hay 4 proyectos en el orden Maderas → LPR → AirVision → Eventos", () => {
    expect(rows.map((p) => p.slug)).toEqual(["maderas", "lpr", "airvision", "eventos"]);
  });

  it("solo AirVision está destacado", () => {
    expect(rows.filter((p) => p.feat).map((p) => p.slug)).toEqual(["airvision"]);
  });

  for (const [slug, exp] of Object.entries(EXPECTED)) {
    it(`${slug}: enlaces y flags coinciden con la matriz`, () => {
      const p = rows[exp.order];
      expect(p.slug).toBe(slug);
      expect(Boolean(p.feat)).toBe(exp.feat);
      expect(p.live).toBe(exp.live);
      expect(p.links).toEqual(exp.links);
    });

    it(`${slug}: tiene caso de estudio enrutable`, () => {
      expect(CASE_ORDER).toContain(slug);
      expect(CASES[slug]).toBeTruthy();
      expect(CASES[slug].name).toBeTruthy();
    });
  }

  it("la paridad ES/EN no cambia la estructura de enlaces", () => {
    const es = projData("es"), en = projData("en");
    es.forEach((p, i) => expect(p.links).toEqual(en[i].links));
  });
});

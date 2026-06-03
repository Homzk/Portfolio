/* Puerta constitucional III — paridad total ES/EN.
   Verifica que cada diccionario tenga exactamente la misma estructura de
   claves (y longitudes de arrays) en español e inglés. Falla si alguna
   cadena existe en un solo idioma. */

import { describe, it, expect } from "vitest";
import { HERO, PROJ, SEC } from "../../src/i18n/strings";

function assertParallel(a, b, path) {
  const aArr = Array.isArray(a), bArr = Array.isArray(b);
  expect(aArr, `array mismatch at ${path}`).toBe(bArr);

  if (aArr) {
    expect(a.length, `array length mismatch at ${path}`).toBe(b.length);
    a.forEach((_, i) => assertParallel(a[i], b[i], `${path}[${i}]`));
    return;
  }

  const aObj = a && typeof a === "object";
  const bObj = b && typeof b === "object";
  expect(aObj, `object mismatch at ${path}`).toBe(bObj);

  if (aObj) {
    expect(Object.keys(a).sort(), `keys mismatch at ${path}`).toEqual(Object.keys(b).sort());
    for (const k of Object.keys(a)) assertParallel(a[k], b[k], `${path}.${k}`);
    return;
  }

  // hoja: ambos deben ser cadenas no vacías (el contenido difiere por idioma)
  expect(typeof a, `leaf type at ${path}`).toBe("string");
  expect(typeof b, `leaf type at ${path}`).toBe("string");
  expect(a.length, `empty string (es) at ${path}`).toBeGreaterThan(0);
  expect(b.length, `empty string (en) at ${path}`).toBeGreaterThan(0);
}

describe("i18n parity ES/EN", () => {
  it("HERO tiene paridad total", () => assertParallel(HERO.es, HERO.en, "HERO"));
  it("PROJ tiene paridad total", () => assertParallel(PROJ.es, PROJ.en, "PROJ"));
  it("SEC tiene paridad total", () => assertParallel(SEC.es, SEC.en, "SEC"));
});

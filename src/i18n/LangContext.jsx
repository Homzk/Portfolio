/* ---------------- LangContext ----------------
   Estado global de idioma (es | en) con persistencia en localStorage.
   Primera visita = español (FR-008). Cambio persistido (FR-010a).
   Un solo proveedor por encima del router → coherencia al navegar. */

import { createContext, useContext, useState } from "react";

const KEY = "afr-lang";
const LangContext = createContext(null);

function readInitial() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === "en" || saved === "es" ? saved : "es";
  } catch {
    return "es"; // localStorage no disponible → default es en memoria
  }
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readInitial);

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* sin persistencia, no rompe */
    }
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}

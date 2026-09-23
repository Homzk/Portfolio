import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { Analytics } from "@vercel/analytics/react";
import { LangProvider } from "./i18n/LangContext";
import { router } from "./router";
import "./styles/global.css";

/* Vercel Analytics: cuenta visitas por página y clics en enlaces salientes
   (WhatsApp, demos externas) sin cookies. Solo envía datos en producción
   (en Vercel); en local o en otros hosts no hace nada. */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
    <Analytics />
  </React.StrictMode>
);

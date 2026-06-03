import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { LangProvider } from "./i18n/LangContext";
import { router } from "./router";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  </React.StrictMode>
);

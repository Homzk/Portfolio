/* ---------------- Router (React Router v7, modo librería) ----------------
   "/" → Home; "/proyecto/:slug" → CaseStudy. ScrollRestoration lleva el
   scroll al tope al cambiar de ruta. El layout raíz aplica la clase
   .site (fondo, color, fuente) a todas las páginas. */

import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";

function Root() {
  return (
    <div className="site">
      <ScrollRestoration />
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "proyecto/:slug", element: <CaseStudy /> },
    ],
  },
]);

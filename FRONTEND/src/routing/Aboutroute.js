import { rootRoute } from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";

import AboutPage from "../pages/AboutPage.jsx";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',  // Note the leading slash
  component: AboutPage

});
import { rootRoute } from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import About from "../components/About.jsx";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',  // Note the leading slash
  component: About
});
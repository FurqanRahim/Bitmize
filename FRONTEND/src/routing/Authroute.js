import { rootRoute } from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import Authpage from "../pages/Authpage.jsx";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',  // Note the leading slash
  component: Authpage
});
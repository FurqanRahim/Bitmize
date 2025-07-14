import {rootRoute} from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import Homepage from "../pages/Homepage.jsx";

const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Homepage
})

export default HomeRoute;
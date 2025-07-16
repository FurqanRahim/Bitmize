import {rootRoute} from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import WITHOUTUSER from "../components/WithOUTUSER.jsx";

const withoutuserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/withoutuser',
  component: WITHOUTUSER
})

export default withoutuserRoute;
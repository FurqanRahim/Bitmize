import { createRootRoute } from "@tanstack/react-router";
import App from "../App.jsx";
import { authRoute }  from "./Authroute.js";
import  dashboardRoute  from "./dashboardroute.js";
import HomeRoute from "./Homepage.js";
import registerRoute from "./registerroute.js";
import loginRoute from "./loginRoute.js";

export const rootRoute = createRootRoute({
  component: App,
});

export const routeTree = rootRoute.addChildren([
  authRoute,
  dashboardRoute,
  HomeRoute,
  registerRoute,
  loginRoute,
]);
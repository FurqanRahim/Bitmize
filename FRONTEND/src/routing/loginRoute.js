import {rootRoute} from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm.jsx";

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginForm
})

export default loginRoute;
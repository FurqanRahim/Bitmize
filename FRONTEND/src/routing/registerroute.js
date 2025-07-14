import {rootRoute} from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import RegisterForm from "../components/RegisterForm.jsx";

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterForm
})

export default registerRoute;
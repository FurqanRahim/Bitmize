import { rootRoute } from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import Contact from "../components/Contact.jsx";

export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',  // Note the leading slash
  component: Contact
});
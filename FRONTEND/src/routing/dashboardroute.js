import {rootRoute} from "./routerTree.js";
import { createRoute } from "@tanstack/react-router";
import Dashboard from "../pages/Dashboard.jsx";
import { getCurrentUser } from "../api/auth.instance.js";
import { redirect } from '@tanstack/react-router'; 


const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
  beforeLoad: async () => {
    const response = await getCurrentUser();
    console.log("RESPONSE OF CURRENT USER ========================================>",response)
    if (!response) {
      throw redirect({
        to: '/auth',
      });
    }
    // If there is a response, the route will continue loading and show /dashboard
  },
});



export default dashboardRoute;
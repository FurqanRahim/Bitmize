import { rootRoute } from "./routerTree.js";
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
    console.log("THE STATUS OF RESPONSE ++++++++++++++++++", response)

    if (!response.data) {
      throw redirect({
        to: '/auth',
      });

    }

    // Check if response is undefined, null, or empty object
    if (response === undefined || response === null ||
      (typeof response === 'object' && Object.keys(response).length === 0)) {
      throw redirect({
        to: '/auth',
      });
    }
  },
});



export default dashboardRoute;
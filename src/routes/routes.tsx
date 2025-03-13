import { RouteObject, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import StorePage from "../pages/Store";
import SKUPage from "../pages/SKU";
import PlanningPage from "../pages/Planning";
import ChartsPage from "../pages/Chart";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";

const routes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="store" replace /> }, // Redirect root to /store
          { path: "planning", element: <PlanningPage /> },
          { path: "store", element: <StorePage /> },
          { path: "sku", element: <SKUPage /> },
          { path: "charts", element: <ChartsPage /> },
        ],
      },
    ],
  },
];

export default routes;

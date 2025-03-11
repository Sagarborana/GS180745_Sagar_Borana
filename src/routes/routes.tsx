import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import StorePage from "../pages/Store";
import SKUPage from "../pages/SKU";
import PlanningPage from "../pages/Planning";
import ChartsPage from "../pages/Chart";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "store", element: <StorePage /> },
      { path: "sku", element: <SKUPage /> },
      { path: "planning", element: <PlanningPage /> },
      { path: "charts", element: <ChartsPage /> },
    ],
  },
];

export default routes;

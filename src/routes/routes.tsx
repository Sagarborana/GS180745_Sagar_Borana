import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import StorePage from "../pages/Store";
import SKUPage from "../pages/SKU";
import PlanningPage from "../pages/Planning";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "store", element: <StorePage /> },
      { path: "sku", element: <SKUPage /> },
      { path: "planning", element: <PlanningPage /> },
    ],
  },
];

export default routes;

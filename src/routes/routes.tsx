import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import StorePage from "../pages/Store";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "store", element: <StorePage /> },
    ],
  },
];

export default routes;

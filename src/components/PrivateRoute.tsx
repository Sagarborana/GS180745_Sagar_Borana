import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");


  return isAuthenticated == "auth" + user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

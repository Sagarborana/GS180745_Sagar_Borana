import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("authToken"); // Replace with actual auth logic
  const user = localStorage.getItem("user"); // Replace with actual auth logic

  return isAuthenticated == "auth" + user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

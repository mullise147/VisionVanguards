import { Outlet, useLocation, Navigate } from "react-router-dom";
import { auth } from "../firebase";

const PrivateRoute = () => {
  const location = useLocation();

  return auth.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/account" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

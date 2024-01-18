import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const isUserloggedIn = useAuth();

  return isUserloggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;

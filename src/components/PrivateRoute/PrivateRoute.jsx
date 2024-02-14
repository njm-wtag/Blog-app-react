import { Navigate, Outlet } from "react-router-dom";
import useLocalStorageAuth from "../../hooks/useLocalStorageAuth";

const PrivateRoute = () => {
  const isUserloggedIn = useLocalStorageAuth();

  return isUserloggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;

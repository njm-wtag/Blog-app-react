import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { loggedOutUser } from "rtk/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { authUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(loggedOutUser());
    navigate("/login");
  };

  return (
    <div>
      <h1>header</h1>
      {authUser && <button onClick={handleLogout}>Logout</button>}
      {/* <main>
        <Outlet />
      </main> */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;

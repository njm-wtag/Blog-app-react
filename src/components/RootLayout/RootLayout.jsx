import { Outlet, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../rtk/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const RootLayout = () => {
  const { authUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
    navigate("/login");
  };

  return (
    <div>
      <h1>header</h1>
      {authUser && <button onClick={handleLogout}>Logout</button>}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

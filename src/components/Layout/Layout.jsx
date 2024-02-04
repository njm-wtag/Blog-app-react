import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { loggedOutUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hook/useAuth";

const Layout = ({ children }) => {
  const { authUser } = useAuth();

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
      <div>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

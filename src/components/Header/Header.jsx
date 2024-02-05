import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Header.scss";
import SearchIcon from "../icons/SearchIcon";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { loggedOutUser } from "features/auth/authSlice";
import LogoutIcon from "components/icons/LogoutIcon";

const Header = () => {
  const { authUser } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggedOutUser());
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar__title">
          WellBlog
        </Link>
        <div className="navbar__search">
          <input type="search" placeholder="Search" />
          <SearchIcon />
        </div>
        {authUser ? (
          <div className="navbar__auth-access">
            <div>
              Welcome <Link to={`/me`}>{authUser.username}!</Link>
            </div>
            <Link to="/login" onClick={handleLogout}>
              <LogoutIcon />
            </Link>
          </div>
        ) : (
          <div className="navbar__auth-access">
            <Link to="/login">Login</Link> <span> / </span>
            <Link to="/register">Signup</Link>
          </div>
        )}
      </nav>
      <main>
        {" "}
        <Outlet />
      </main>
    </div>
  );
};

export default Header;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import useSearch from "hooks/useSearch";
import { loggedOutUser } from "features/auth/authSlice";
import LogoutIcon from "components/icons/LogoutIcon";
import SearchIcon from "components/icons/SearchIcon";
import {
  updateHomeQuery,
  updateProfileQuery,
} from "features/search/searchSlice";
import "./header.scss";

const Header = () => {
  const { authUser } = useAuth();
  const { homeQuery, profileQuery } = useSearch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = location.pathname === "/me";

  const handleLogout = () => {
    dispatch(loggedOutUser());
    navigate("/login");
  };

  const handleSearch = (event) => {
    if (profile) {
      dispatch(updateProfileQuery(event.target.value));
      return;
    }
    dispatch(updateHomeQuery(event.target.value));
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__title">
        WellBlog
      </Link>
      <div className="navbar__search">
        <input
          type="search"
          placeholder="Search"
          value={profile ? profileQuery : homeQuery}
          onChange={handleSearch}
        />
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
  );
};

export default Header;

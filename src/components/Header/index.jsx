import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { loggedOutUser } from "features/auth/authSlice";
import LogoutIcon from "components/icons/LogoutIcon";

import {
  updateHomeQuery,
  updateProfileQuery,
} from "features/search/searchSlice";
import useSearch from "hooks/useSearch";
import { useLocation } from "react-router-dom";
import "./header.scss";
import SearchIcon from "components/icons/SearchIcon";

const Header = () => {
  const { authUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(loggedOutUser());
    navigate("/login");
  };

  const { homeQuery, profileQuery } = useSearch();
  const location = useLocation();
  const profile = location.pathname === "/me";

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
            <span>Welcome </span>
            <Link to={`/me`}>{authUser.username}!</Link>
          </div>
          <Link aria-label="logout-button" to="/login" onClick={handleLogout}>
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

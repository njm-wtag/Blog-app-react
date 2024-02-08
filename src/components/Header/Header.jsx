import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "hooks/useAuth";
import { loggedOutUser } from "features/auth/authSlice";
import LogoutIcon from "components/icons/LogoutIcon";
import SearchIcon from "components/icons/SearchIcon";
import "./Header.scss";
import { updateQuery } from "features/search/searchSlice";
import useSearch from "hooks/useSearch";

const Header = () => {
  const { authUser } = useAuth();
  const { query } = useSearch();
  console.log(query);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggedOutUser());
    navigate("/login");
  };

  const handleSearch = (e) => {
    dispatch(updateQuery(e.target.value));
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
          value={query}
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

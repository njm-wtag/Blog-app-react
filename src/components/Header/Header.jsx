import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import "./Header.scss";
import SearchIcon from "../icons/SearchIcon";

const Header = () => {
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const handleLogout = () => {
    localStorage.removeItem("authUser");
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
              Welcome <Link to="/me">{authUser.username}!</Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
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

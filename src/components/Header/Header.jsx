import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Header.scss";
import SearchIcon from "../icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../rtk/features/auth/authSlice";

const Header = () => {
  // const navigate = useNavigate();
  // const authUser = JSON.parse(localStorage.getItem("authUser"));
  // const handleLogout = () => {
  //   localStorage.removeItem("authUser");
  //   navigate("/login");
  // };
  const { authUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
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
              Welcome{" "}
              <Link to={`/${authUser.username}`}>{authUser.username}!</Link>
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

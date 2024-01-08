import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };
  return (
    <div>
      <h1> Home </h1>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

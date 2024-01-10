import BlogList from "../components/BlogList/BlogList";
import Header from "../components/Header/Header";
import HomeBanner from "../components/HomeBanner/HomeBanner";

import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };
  return (
    <div>
      <h1> Home </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

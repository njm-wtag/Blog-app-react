import BlogList from "../components/BlogList/BlogList";
import Header from "../components/Header/Header";
import HomeBanner from "../components/HomeBanner/HomeBanner";

const Home = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    // window.location.href = "/login";
  };
  return (
    <div>
      <Header authUser={authUser} handleLogout={handleLogout} />
      <HomeBanner />
      <BlogList />
    </div>
  );
};

export default Home;

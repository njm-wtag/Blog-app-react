import Header from "../components/Header/Header";

const Home = () => {
  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("authUser");
    window.location.href = "/login";
  };
  return (
    <div>
      <Header />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

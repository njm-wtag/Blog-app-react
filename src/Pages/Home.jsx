const Home = () => {
  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("authUser");
    window.location.href = "/login";
  };
  return (
    <div>
      <h1> Home </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

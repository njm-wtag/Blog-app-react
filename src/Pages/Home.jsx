import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";

const Home = () => {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <Layout>
      <h1> Home </h1>
      {authUser && <Link to={`/${authUser?.username}`}>Profile</Link>}
    </Layout>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <h1> Home </h1>
      <Link to="/profile">Profile</Link>
    </Layout>
  );
};

export default Home;

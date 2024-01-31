import React from "react";
import Layout from "../components/Layout/Layout";

import { useSelector } from "react-redux";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <Layout className="profile-page">
      <AuthorAbout authUser={authUser} />
      <BlogList />
    </Layout>
  );
};

export default Profile;

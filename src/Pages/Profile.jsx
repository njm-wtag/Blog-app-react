import React from "react";
import Layout from "components/Layout/Layout";
import { useSelector } from "react-redux";
import AuthorDeatls from "components/AuthorDeatls/AuthorDeatls";
import BlogList from "components/BlogList/BlogList";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <Layout className="profile-page">
      <AuthorDeatls authUser={authUser} />
      <BlogList />
    </Layout>
  );
};

export default Profile;

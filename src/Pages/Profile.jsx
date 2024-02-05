import Layout from "components/Layout/Layout";
import BlogList from "components/BlogList/BlogList";
import AuthorDetails from "components/AuthorDetails/AuthorDetails";

const Profile = () => {
  return (
    <Layout className="profile-page">
      <AuthorDetails />
      <BlogList />
    </Layout>
  );
};

export default Profile;

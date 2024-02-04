import Layout from "components/Layout/Layout";
import AuthorDeatls from "components/AuthorDeatls/AuthorDeatls";
import BlogList from "components/BlogList/BlogList";
import useAuth from "src/hook/useAuth";

const Profile = () => {
  const { authUser } = useAuth();
  console.log();
  return (
    <Layout className="profile-page">
      <AuthorDeatls authUser={authUser} />
      <BlogList />
    </Layout>
  );
};

export default Profile;

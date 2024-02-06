import Layout from "components/Layout/Layout";
import BlogList from "components/BlogList/BlogList";
import AuthorDetails from "components/AuthorDetails/AuthorDetails";
import { useState } from "react";
import AddBlogForm from "components/AddBlogForm/AddBlogForm";
import ButtonContainer from "components/ButtonContainer/ButtonContainer";
import useAuth from "hooks/useAuth";

const Profile = () => {
  const { authUser } = useAuth();

  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);

  return (
    <Layout className="profile-page">
      <ButtonContainer
        isAddBlogFormOpen={isAddBlogFormOpen}
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
      />
      {authUser && <AuthorDetails />}
      {isAddBlogFormOpen && (
        <AddBlogForm setIsAddBlogFormOpen={setIsAddBlogFormOpen} />
      )}
      <h3>My published posts</h3>
      <BlogList />
    </Layout>
  );
};

export default Profile;

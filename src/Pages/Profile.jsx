import Layout from "components/Layout/Layout";
import BlogList from "components/BlogList/BlogList";
import AuthorDetails from "components/AuthorDetails/AuthorDetails";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddBlogForm from "components/AddBlogForm/AddBlogForm";
import ButtonContainer from "components/AddBlogEditProfileButtonsContainer/ButtonContainer";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  console.log(blogs);
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
      <BlogList blogs={blogs} />
    </Layout>
  );
};

export default Profile;

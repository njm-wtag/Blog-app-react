import Layout from "components/Layout/Layout";
import BlogList from "components/BlogList/BlogList";
import AuthorDetails from "components/AuthorDetails/AuthorDetails";
import { useState } from "react";
import AddBlogForm from "components/AddBlogForm/AddBlogForm";
import ButtonContainer from "components/ButtonContainer/ButtonContainer";
import useAuth from "hooks/useAuth";
import useBlogs from "hooks/useBlogs";

const Profile = () => {
  const { authUser } = useAuth();
  const reversedBlog = useBlogs();
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const blogByAuthor = [...reversedBlog].filter(
    ({ authorId }) => authorId === authUser.id
  );

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
      <BlogList blogs={blogByAuthor} />
    </Layout>
  );
};

export default Profile;

import Layout from "components/Layout/Layout";
import { v4 as uuidv4 } from "uuid";
import AuthorDetails from "components/AuthorDetails/AuthorDetails";
import { useState } from "react";
import BlogList from "components/BlogList/BlogList";
import EditProfileForm from "components/EditProfileForm/EditProfileForm";
import { postBlog } from "features/blogs/blogsSlice";
import BlogForm from "components/BlogForm/BlogForm";
import useAuth from "hooks/useAuth";
import useBlogs from "hooks/useBlogs";
import ButtonContainer from "components/ButtonContainer/ButtonContainer";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const { authUser } = useAuth();
  const blogs = useBlogs();
  const dispatch = useDispatch();

  const blogByAuthor = blogs?.filter((blog) => blog.authorId === authUser.id);

  const onSubmit = async (blog) => {
    blog.id = uuidv4();
    blog.authorId = authUser.id;
    blog.createdAt = new Date().toISOString();
    dispatch(postBlog(blog));
    setIsAddBlogFormOpen && setIsAddBlogFormOpen(false);
  };

  return (
    <Layout className="profile-page">
      <ButtonContainer
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
        setIsEditProfileFormOpen={setIsEditProfileFormOpen}
      />

      {authUser && <AuthorDetails authUser={authUser} />}
      {isEditProfileFormOpen && (
        <EditProfileForm setIsEditProfileFormOpen={setIsEditProfileFormOpen} />
      )}
      {isAddBlogFormOpen && (
        <BlogForm
          setIsAddBlogFormOpen={setIsAddBlogFormOpen}
          onSubmit={onSubmit}
        />
      )}
      <h3>My published posts</h3>
      <BlogList blogs={blogByAuthor} />
    </Layout>
  );
};

export default Profile;

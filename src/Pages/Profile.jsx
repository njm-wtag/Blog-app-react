import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";
import ButtonContainer from "../components/AddBlogEditProfileButtonsContainer/ButtonContainer";
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";
import { postBlog } from "../rtk/features/blogs/blogsSlice";
import BlogForm from "../components/BlogForm/BlogForm";

const Profile = () => {
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const blogByAuthor = blogs.filter(({ author }) => author.id === authUser.id);
  const dispatch = useDispatch();

  const onSubmit = async (blog) => {
    blog.id = Date.now();
    blog.author = authUser;
    blog.createdAt = new Date().toISOString();
    dispatch(postBlog(blog));
    setIsAddBlogFormOpen && setIsAddBlogFormOpen(false);
  };

  return (
    <div className="profile-page">
      <ButtonContainer
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
        setIsEditProfileFormOpen={setIsEditProfileFormOpen}
      />

      {authUser && <AuthorAbout authUser={authUser} />}
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
    </div>
  );
};

export default Profile;

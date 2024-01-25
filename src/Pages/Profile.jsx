import { useSelector } from "react-redux";
import { useState } from "react";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";
import AddBlogForm from "../components/AddBlogForm/AddBlogForm";
import ButtonContainer from "../components/AddBlogEditProfileButtonsContainer/ButtonContainer";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const reversedBlog = [...blogs].reverse();
  const authBlogs = reversedBlog.filter(
    (blog) => blog.author.id === authUser.id
  );

  return (
    <div className="profile-page">
      <ButtonContainer
        isAddBlogFormOpen={isAddBlogFormOpen}
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
      />
      {authUser && <AuthorAbout authUser={authUser} />}
      {isAddBlogFormOpen && (
        <AddBlogForm setIsAddBlogFormOpen={setIsAddBlogFormOpen} />
      )}
      <h3>My published posts</h3>
      <BlogList blogs={authBlogs} />
    </div>
  );
};

export default Profile;

import { useSelector } from "react-redux";
import { useState } from "react";
import AddBlogEditProfileButtonsContainer from "../components/AddBlogEditProfileButtonsContainer/AddBlogEditProfileButtonsContainer";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";
import AddBlogForm from "../components/AddBlogForm/AddBlogForm";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);

  return (
    <div className="profile-page">
      <AddBlogEditProfileButtonsContainer
        isAddBlogFormOpen={isAddBlogFormOpen}
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
      />
      {authUser && <AuthorAbout authUser={authUser} />}
      {isAddBlogFormOpen && (
        <AddBlogForm setIsAddBlogFormOpen={setIsAddBlogFormOpen} />
      )}
      <h3>My published posts</h3>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Profile;

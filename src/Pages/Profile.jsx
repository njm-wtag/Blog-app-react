import { useState } from "react";
import AddBlogEditProfileButtonsContainer from "../components/AddBlogEditProfileButtonsContainer/AddBlogEditProfileButtonsContainer";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";
import AddBlogForm from "../components/AddBlogForm/AddBlogForm";

const Profile = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const blogs = JSON.parse(localStorage.getItem("blogs"));
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);

  return (
    <div className="profile-page">
      <AddBlogEditProfileButtonsContainer
        isAddBlogFormOpen={isAddBlogFormOpen}
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
      />
      {authUser && <AuthorAbout authUser={authUser} />}
      {isAddBlogFormOpen && <AddBlogForm />}
      <BlogList blogs={blogs} />
      {blogs?.map((blog) => console.log(blog.imagePreview))}
    </div>
  );
};

export default Profile;

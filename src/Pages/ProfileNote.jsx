import { useState } from "react";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";
import EditProfile from "../components/EditProfile/EditProfile";
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";

const Profile = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  return (
    <div className="profile-page">
      <EditProfile
        isEditProfileFormOpen={isEditProfileFormOpen}
        setIsEditProfileFormOpen={setIsEditProfileFormOpen}
      />
      <AuthorAbout authUser={authUser} />
      {isEditProfileFormOpen && <EditProfileForm />}
      <BlogList />
    </div>
  );
};

export default Profile;

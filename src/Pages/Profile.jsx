import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";

const Profile = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  return (
    <div className="profile-page">
      <AuthorAbout authUser={authUser} />
      <BlogList />
    </div>
  );
};

export default Profile;

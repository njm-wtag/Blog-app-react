import { useSelector } from "react-redux";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <div className="profile-page">
      <AuthorAbout authUser={authUser} />
      <BlogList />
    </div>
  );
};

export default Profile;

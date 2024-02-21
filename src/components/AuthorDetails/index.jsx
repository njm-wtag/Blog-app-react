import defaultProfileIcon from "assets/images/default-profile-icon.svg";
import facebook from "assets/images/fb.png";
import useAuth from "hooks/useAuth";
import twitter from "assets/images/twitter.png";
import instagram from "assets/images/insta.png";
import youtube from "assets/images/youtube.png";
import "./authorDetails.scss";

const AuthorDetails = () => {
  const { authUser } = useAuth();
  return (
    <div className="author-about">
      <div className="author-about__details">
        <img
          className="author-about__details--image"
          src={
            authUser.profileImage ? authUser.profileImage : defaultProfileIcon
          }
          alt="Profile"
        />
        <div className="author-about__details--info">
          <h2 className="author-about__details--info-fullname">
            {authUser?.firstname} {authUser?.lastname}
          </h2>
          <p className="author-about__details--info-subtitle">
            {authUser?.subtitle}
          </p>
        </div>
      </div>
      <p className="author-about__about">{authUser?.about}</p>
      <div className="author-about__social-links">
        <div className="author-about__social-links-link">
          <img src={facebook} alt="Facebook" />
        </div>
        <div>
          <img
            src={twitter}
            alt="Twitter"
            className="author-about__social-links-link"
          />
        </div>
        <div className="author-about__social-links-link">
          <img src={instagram} alt="Instagram" />
        </div>
        <div className="author-about__social-links-link">
          <img src={youtube} alt="Youtube" />
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;

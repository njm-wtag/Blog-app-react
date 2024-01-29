import PropTypes from "prop-types";
import "./AuthorAbout.scss";
import defaultProfileIcon from "../../assets/images/default-profile-icon.svg";
import fb from "../../assets/images/fb.png";
import twitter from "../../assets/images/twitter.png";
import insta from "../../assets/images/insta.png";
import youtube from "../../assets/images/youtube.png";

const AuthorAbout = ({ authUser }) => {
  return (
    <div className="author-about">
      <div className="author-about__details">
        <img
          className="author-about__details__image"
          src={
            authUser.profileImage ? authUser.profileImage : defaultProfileIcon
          }
          alt="Profile"
        />
        <div className="author-about__details__info">
          <h2 className="author-about__details__info__fullname">
            {" "}
            {authUser.firstname} {authUser.lastname}
          </h2>
          <p className="author-about__details__info__subtitle">
            {authUser?.subtitle}
          </p>
        </div>
      </div>
      <p className="author-about__about">{authUser?.about}</p>
      <div className="author-about__social-links">
        <div className="author-about__social-links_link">
          <img src={fb} alt="fb-link" />
        </div>
        <div>
          <img
            src={twitter}
            alt="fb-link"
            className="author-about__social-links_link"
          />
        </div>
        <div className="author-about__social-links_link">
          <img src={insta} alt="fb-link" />
        </div>
        <div className="author-about__social-links_link">
          <img src={youtube} alt="fb-link" />
        </div>
      </div>
    </div>
  );
};
AuthorAbout.propTypes = {
  authUser: PropTypes.object,
};
export default AuthorAbout;

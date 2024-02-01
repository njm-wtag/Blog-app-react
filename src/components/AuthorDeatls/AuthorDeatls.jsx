import PropTypes from "prop-types";
import defaultProfileIcon from "assets/images/default-profile-icon.svg";
import facebook from "assets/images/fb.png";
import twitter from "assets/images/twitter.png";
import instagram from "assets/images/insta.png";
import youtube from "assets/images/youtube.png";
import "./AuthorDeatls.scss";

const AuthorDeatls = ({ authUser }) => {
  return (
    <div className="author-about">
      <div className="author-about__details">
        <img
          className="author-about__details--image"
          src={defaultProfileIcon}
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
          <img src={facebook} alt="fb-link" />
        </div>
        <div>
          <img
            src={twitter}
            alt="fb-link"
            className="author-about__social-links_link"
          />
        </div>
        <div className="author-about__social-links_link">
          <img src={instagram} alt="fb-link" />
        </div>
        <div className="author-about__social-links_link">
          <img src={youtube} alt="fb-link" />
        </div>
      </div>
    </div>
  );
};

AuthorDeatls.defaultProps = { authUser: null };

AuthorDeatls.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    about: PropTypes.string,
    subtitle: PropTypes.string,
  }),
};

export default AuthorDeatls;

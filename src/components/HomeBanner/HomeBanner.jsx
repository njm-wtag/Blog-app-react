import PropTypes from "prop-types";
import "./HomeBanner.scss";

const HomeBanner = ({ authUser, blogs }) => {
  console.log(blogs);
  return (
    <div className="home-banner">
      <div className="home-banner__background-image"></div>
      {authUser ? (
        <h2 className="home-banner__blog-title">{blogs[0].title}</h2>
      ) : (
        <div className="home-banner__card">
          <h2 className="home-banner__card_blog-title">{blogs[0].title}</h2>
          <p className="home-banner__card_category-name">
            {blogs[0].tags[0].label}
          </p>
        </div>
      )}
    </div>
  );
};

HomeBanner.propTypes = {
  authUser: PropTypes.object,
  blogs: PropTypes.array,
};

export default HomeBanner;

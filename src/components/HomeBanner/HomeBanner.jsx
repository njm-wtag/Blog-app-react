import PropTypes from "prop-types";
import "./HomeBanner.scss";

const HomeBanner = ({ authUser, blog }) => {
  return (
    <div
      className="home-banner"
      style={{ backgroundImage: `url(${blog?.bannerImage})` }}
    >
      <div
        className={authUser ? "home-banner__auth-card" : "home-banner__card"}
      >
        <p
          className={
            authUser
              ? "home-banner__auth-card__category-name"
              : "home-banner__card__category-name"
          }
        >
          {blog?.tags && blog.tags[0].label}
        </p>
        <h2
          className={
            authUser
              ? "home-banner__auth-card__blog-title"
              : "home-banner__card__blog-title"
          }
        >
          {blog?.title}
        </h2>

        <div
          className={
            authUser
              ? "home-banner__auth-card__author-info"
              : "blog-details__author-info"
          }
        >
          <img
            src={blog?.author?.profileImage}
            alt={blog?.author?.usernamename}
            className={
              authUser
                ? "home-banner__auth-card__author-info__author-image"
                : "blog-details__author-info__author-image"
            }
          />

          <p
            className={
              authUser
                ? "home-banner__auth-card__author-info__author-name"
                : "blog-details__author-info__author-name"
            }
          >
            {blog?.author?.username}
          </p>
          <p
            className={
              authUser ? "" : "blog-details__author-info__blog-createdAt"
            }
          >
            {blog?.createdAt?.substring(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
};

HomeBanner.propTypes = {
  authUser: PropTypes.object,
  blog: PropTypes.object,
};

export default HomeBanner;

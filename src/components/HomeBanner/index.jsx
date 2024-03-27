import PropTypes from "prop-types";
import useAuth from "hooks/useAuth";
import useRegister from "hooks/useRegister";
import "./homeBanner.scss";

const HomeBanner = ({ blog }) => {
  const { authUser } = useAuth();
  const { users } = useRegister();
  const authorDetails = users?.find((user) => user.id === blog.authorId);

  return (
    <div
      className="home-banner"
      data-testid="background"
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
              ? "home-banner__auth-card--blog-title"
              : "home-banner__card--blog-title"
          }
        >
          {blog?.title}
        </h2>

        <div
          className={
            authUser
              ? "home-banner__auth-card--author-info"
              : "home-banner__card--author-info"
          }
        >
          <img
            src={authorDetails?.profileImage}
            alt={authorDetails?.username}
            className={
              authUser
                ? "home-banner__auth-card--author-info---author-image"
                : "home-banner__card--author-info---author-image"
            }
          />

          <p
            className={
              authUser
                ? "home-banner__auth-card--author-info---author-name"
                : "home-banner__card--author-info---author-name"
            }
          >
            {authorDetails?.firstname} {authorDetails?.lastname}
          </p>
          <p
            className={
              authUser
                ? "home-banner__auth-card--author-info---blog-createdAt"
                : "home-banner__card--author-info---blog-createdAt"
            }
          >
            {blog?.createdAt?.substring(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
};

HomeBanner.defaultProps = {
  blog: {
    bannerImage: "",
    createdAt: "",
    tags: [],
  },
};

HomeBanner.propTypes = {
  blog: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
    bannerImage: PropTypes.string,
    createdAt: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string.isRequired,
  }),
};

export default HomeBanner;

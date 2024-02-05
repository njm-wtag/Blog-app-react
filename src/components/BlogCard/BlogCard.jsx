import PropTypes from "prop-types";
import "./BlogCard.scss";
import defaultProfileIcon from "assets/images/default-profile-icon.svg";

const BlogCard = ({ blog }) => {
  const { imagePreview, title, tags, createdAt, author } = blog;
  console.log({ blog });
  return (
    <div className="blog-card">
      <img src={imagePreview} alt={title} className="blog-card__banner" />
      <div className="blog-card__category-badge">
        {tags ? tags[0].value : "Unknown Category"}
      </div>
      <h3 className="blog-card__blog-title">{title}</h3>
      <div className="blog-card__author-info">
        <img
          src={author?.profileImage ? author.profileImage : defaultProfileIcon}
          alt={author?.username}
          className="blog-card__author-info--author-image"
        />
        <p className="blog-card__author-info--author-name">
          {author?.firstname} {author?.lastname}
        </p>
        <p className="blog-card__author-info--blog-createdAt">
          {createdAt?.substring(0, 10)}
        </p>
      </div>
    </div>
  );
};

BlogCard.defaultProps = { blog: null };

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;

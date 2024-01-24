import PropTypes from "prop-types";
import "./BlogCard.scss";
import defaultProfileIcon from "../../assets/images/default-profile-icon.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { imagePreview, title, tags, createdAt } = blog;
  const { authUser } = useSelector((state) => state.auth);
  return (
    <div className="blog-card">
      <Link to={`/blog/${blog.id}`}>
        <img src={imagePreview} alt={title} className="blog-card__banner" />
        <div className="blog-card__category-badge">
          {tags ? tags[0].value : "Unknown Category"}
        </div>
        <h3 className="blog-card__blog-title">{title}</h3>
        <div className="blog-card__author-info">
          <img
            src={
              authUser?.profileImage
                ? authUser.profileImage
                : defaultProfileIcon
            }
            alt={authUser?.usernamename}
            className="blog-card__author-info__author-image"
          />

          <p className="blog-card__author-info__author-name">
            {authUser.username}
          </p>
          <p className="blog-card__author-info__blog-createdAt">
            {createdAt?.substring(0, 10)}
          </p>
        </div>
      </Link>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;

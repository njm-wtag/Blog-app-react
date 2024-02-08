import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useRegister from "hooks/useRegister";
import defaultProfileIcon from "assets/images/default-profile-icon.svg";
import "./BlogCard.scss";

const BlogCard = ({ blog }) => {
  const { bannerImage, title, tags, createdAt, authorId } = blog;
  const { users } = useRegister();
  const author = users.find((user) => user.id === authorId);

  // console.log("from blogCard:", users);
  return (
    <div className="blog-card">
      <Link to={`/blog/${blog.id}`}>
        <img src={bannerImage} alt={title} className="blog-card__banner" />
      </Link>
      <div className="blog-card__category-badge">
        {tags ? tags[0].label : "Unknown Category"}
      </div>
      <Link to={`/blog/${blog.id}`}>
        <h3 className="blog-card__blog-title">{title}</h3>
      </Link>
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

BlogCard.defaultProps = {
  blog: {
    bannerImage: "",
    createdAt: "",
    tags: [],
  },
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
    bannerImage: PropTypes.string,
    createdAt: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string.isRequired,
  }),
};

export default BlogCard;

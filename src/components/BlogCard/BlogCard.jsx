import PropTypes from "prop-types";
import { getAuthorById, getCategoryById } from "../../utils/helpers";
import "./BlogCard.scss";
import defaultProfileIcon from "../../assets/images/default-profile-icon.svg";

const BlogCard = ({ blog }) => {
  const { bannerImage, categoryId, title, authorId, createdAt } = blog;
  const category = getCategoryById(categoryId);
  const author = getAuthorById(authorId);
  return (
    <div className="blog-card">
      <img src={bannerImage} alt={title} className="blog-card__banner" />
      <div className="blog-card__category-badge">
        {category ? category.name : "Unknown Category"}
      </div>
      <h3 className="blog-card__blog-title">{title}</h3>
      <div className="blog-card__author-info">
        <img
          src={author ? author.profileImage : defaultProfileIcon}
          alt={author.name}
          className="blog-card__author-info__author-image"
        />

        <p className="blog-card__author-infoauthor-name">{author.name}</p>
        <p className="blog-card__author-info__blog-createdAt">{createdAt}</p>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  authorId: PropTypes.number,
  bannerImage: PropTypes.string,
  categoryId: PropTypes.number,
  createdAt: PropTypes.string,
  title: PropTypes.string,
};

export default BlogCard;

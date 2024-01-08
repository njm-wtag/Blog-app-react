import PropTypes from "prop-types";
import { getAuthorById, getCategoryById } from "../../utils/helperData";
import "./BlogCard.scss";

const BlogCard = (blog) => {
  const { bannerImage, categoryId, title, authorId, createdAt } = blog.blog;
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
          src={author ? author.profileImage : ""}
          alt={`${author ? author.name : "Unknown Author"}'s profile`}
          className="blog-card__author-info__author-image"
        />

        <p className="blog-card__author-infoauthor-name">
          {author ? author.name : "Unknown Author"}
        </p>
        <p className="blog-card__author-info__blog-createdAt">{createdAt}</p>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  authorId: PropTypes.number.isRequired,
  bannerImage: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BlogCard;

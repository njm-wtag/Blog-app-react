import PropTypes from "prop-types";
import useRegister from "hooks/useRegister";
import defaultProfileIcon from "assets/images/default-profile-icon.svg";
import "./BlogCard.scss";

const BlogCard = ({ blog }) => {
  const { bannerImage, imagePreview, title, tags, createdAt, authorId } = blog;
  const { users } = useRegister();
  const author = users?.find((user) => user.id === authorId);
  return (
    <div className="blog-card">
      <img
        src={imagePreview ? imagePreview : bannerImage}
        alt={title}
        className="blog-card__banner"
      />
      <div className="blog-card__category-badge">
        {tags ? tags[0].label : "Unknown Category"}
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

BlogCard.defaultProps = {
  blog: {
    bannerImage: "",
    imagePreview: "",
    tags: [],
    createdAt: "",
  },
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    bannerImage: PropTypes.string,
    imagePreview: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array,
    createdAt: PropTypes.string,
    authorId: PropTypes.number.isRequired,
  }),
};

export default BlogCard;

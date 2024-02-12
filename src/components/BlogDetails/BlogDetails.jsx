import PropTypes from "prop-types";
import useRegister from "hooks/useRegister";
import defaultProfileIcon from "assets/images/default-profile-icon.svg";
import "./BlogDetails.scss";

const BlogDetails = ({ blogDetails }) => {
  const { users } = useRegister();
  const author = users?.find((user) => user.id === blogDetails.authorId);
  return (
    <div className="blog-details">
      <div className="blog-details__category-badge">
        {blogDetails.tags ? blogDetails.tags[0].label : "Unknown Category"}
      </div>
      <h1 className="blog-details__blog-title">{blogDetails?.title}</h1>
      <div className="blog-details__author-info">
        <img
          src={author?.profileImage ? author.profileImage : defaultProfileIcon}
          alt={author?.username}
          className="blog-details__author-info--author-image"
        />

        <p className="blog-details__author-info--author-name">
          {author?.username}
        </p>
        <p className="blog-details__author-info--blog-createdAt">
          {blogDetails?.createdAt?.substring(0, 10)}
        </p>
      </div>
      <img
        src={blogDetails?.imagePreview}
        alt="Banner Image"
        className="blog-details__banner"
      />
      <p className="blog-details__blog-body">{blogDetails?.body}</p>
    </div>
  );
};

BlogDetails.defaultProps = {
  blogDetails: {
    blog: {
      bannerImage: [],
      createdAt: "",
      imagePreview: "",
      tags: [],
    },
  },
};

BlogDetails.propTypes = {
  blogDetails: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
    bannerImage: PropTypes.array,
    createdAt: PropTypes.string,
    imagePreview: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string.isRequired,
  }),
};

export default BlogDetails;

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "hooks/useAuth";
import useRegister from "hooks/useRegister";
import EditIcon from "components/icons/EditIcon";
import defaultProfileIcon from "assets/images/default-profile-icon.svg";
import "./BlogDetails.scss";

const BlogDetails = ({ blogDetails }) => {
  const { users } = useRegister();
  const author = users?.find((user) => user.id === blogDetails.authorId);
  const { authUser } = useAuth();
  const isEditable = blogDetails?.authorId === authUser?.id;

  return (
    <div className="blog-details">
      {isEditable && (
        <div className="blog-details__edit button-container">
          <Link to={`/edit/${blogDetails.id}`}>
            <EditIcon />
          </Link>
        </div>
      )}
      <div className="blog-details__category-badge blog-card__category-badge">
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
    bannerImage: [],
    createdAt: "",
    tags: [],
  },
};

BlogDetails.propTypes = {
  blogDetails: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
    bannerImage: PropTypes.string,
    createdAt: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string.isRequired,
  }),
};

export default BlogDetails;

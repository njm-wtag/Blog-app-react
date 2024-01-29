import { useSelector } from "react-redux";
import defaultProfileIcon from "../../assets/images/default-profile-icon.svg";
import "./BlogDetails.scss";
import EditIcon from "../icons/EditIcon";
import { Link } from "react-router-dom";
const BlogDetails = ({ blogDetails }) => {
  const { authUser } = useSelector((state) => state.auth);
  const isEditable = blogDetails.author.id === authUser.id;
  return (
    <div className="blog-details">
      {isEditable && (
        <div className="blog-details__edit button-container">
          <Link to={`/edit-blog/${blogDetails.id}`}>
            <EditIcon />
          </Link>
        </div>
      )}
      <div className="blog-details__category-badge blog-card__category-badge">
        {blogDetails.tags ? blogDetails.tags[0].value : "Unknown Category"}
      </div>
      <h1 className="blog-details__blog-title">{blogDetails.title}</h1>
      <div className="blog-details__author-info">
        <img
          src={
            blogDetails.author?.profileImage
              ? blogDetails.author.profileImage
              : defaultProfileIcon
          }
          alt={blogDetails.author?.usernamename}
          className="blog-details__author-info__author-image"
        />

        <p className="blog-details__author-info__author-name">
          {blogDetails.author.username}
        </p>
        <p className="blog-details__author-info__blog-createdAt">
          {blogDetails.createdAt?.substring(0, 10)}
        </p>
      </div>

      <img
        src={blogDetails.bannerImage}
        alt=""
        className="blog-details__banner"
      />
      <p className="blog-details__blog-body">{blogDetails.body}</p>
    </div>
  );
};

export default BlogDetails;

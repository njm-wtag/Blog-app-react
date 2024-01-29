import PropTypes from "prop-types";
import BlogCard from "../BlogCard/BlogCard";
import "./BlogList.scss";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {[...blogs].reverse().map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array,
};

export default BlogList;

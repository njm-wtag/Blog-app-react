import PropTypes from "prop-types";
import BlogCard from "../BlogCard/BlogCard";
import "./BlogList.scss";

const BlogList = ({ blogs }) => {
  const reversedBlog = [...blogs].reverse();
  return (
    <div className="blog-list">
      {reversedBlog?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array,
};

export default BlogList;

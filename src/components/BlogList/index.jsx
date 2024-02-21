import PropTypes from "prop-types";
import BlogCard from "components/BlogCard";
import "./blogList.scss";

const BlogList = ({ blogs, query }) => {
  const searchedBlogs = (blogs, query) => {
    return blogs?.filter((blog) =>
      blog?.title?.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredBlogs = searchedBlogs(blogs, query);

  return (
    <div className="blog-list">
      {filteredBlogs.length
        ? filteredBlogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        : "Blog Not found"}
    </div>
  );
};

BlogList.defaultProps = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: "",
      authorId: "",
      bannerImage: "",
      createdAt: "",
      tags: [],
      title: "",
    })
  ),
  query: "",
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      bannerImage: PropTypes.string,
      createdAt: PropTypes.string,
      tags: PropTypes.array,
      title: PropTypes.string.isRequired,
    })
  ),
  query: PropTypes.string,
};

export default BlogList;

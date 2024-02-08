import PropTypes from "prop-types";
import BlogCard from "components/BlogCard/BlogCard";
import "./BlogList.scss";
import useSearch from "hooks/useSearch";

const BlogList = ({ blogs }) => {
  const { query } = useSearch();

  const filterBlogs = (blogs, query) => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredBlogs = filterBlogs(blogs, query);

  return (
    <div className="blog-list">
      {filteredBlogs?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

BlogList.defaultProps = {
  blogs: [],
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
};

export default BlogList;

import PropTypes from "prop-types";
import useSearch from "hooks/useSearch";
import BlogCard from "components/BlogCard/BlogCard";
import "./blogList.scss";

const BlogList = ({ blogs, query }) => {
  // const { query } = useSearch();

  const searchedBlogs = (blogs, query) => {
    return blogs?.filter((blog) =>
      blog?.title.toLowerCase().includes(query.toLowerCase())
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
      bannerImage: "",
      createdAt: "",
      tags: [],
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

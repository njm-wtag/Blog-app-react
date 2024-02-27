import PropTypes from "prop-types";
import BlogCard from "components/BlogCard";
import Button from "components/Button";
import { tags } from "components/SelectBox";
import "./blogList.scss";

const BlogList = ({
  blogs,
  query,
  handleSelect,
  toggleSelected,
  filteredTags,
  blogsPerPage,
  handleLoadMore,
  handleShowLess,
  currentPage,
}) => {
  const searchedBlogs = (blogs, query) => {
    return blogs?.filter((blog) =>
      blog?.title?.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredBlogsByTitle = searchedBlogs(blogs, query);
  const filteredBlogsByTags = filteredBlogsByTitle.filter(({ tags }) => {
    if (filteredTags.length === 0) {
      return true;
    }
    return tags?.some(({ value }) => filteredTags.includes(value));
  });

  const totalBlogs = filteredBlogsByTags?.length;
  const currentBlogs = filteredBlogsByTags?.slice(0, blogsPerPage);

  return (
    <div className="wrapper">
      <div className="tag-list">
        {tags?.map((tag) => (
          <Button
            type="button"
            key={tag.value}
            className={
              toggleSelected(tag.value)
                ? "tag-list--selected-tag"
                : "tag-list--not-selected-tag"
            }
            onClickHandler={() => handleSelect(tag.value)}
          >
            {tag.label}
          </Button>
        ))}
      </div>
      <div className="blog-list">
        {currentBlogs?.length
          ? currentBlogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          : "Blog not found"}
      </div>

      {currentBlogs.length < totalBlogs && (
        <div className="button-wrapper">
          <Button
            type="button"
            onClickHandler={handleLoadMore}
            className="load-more-button"
          >
            Load More
          </Button>
        </div>
      )}
      {currentBlogs.length >= totalBlogs && currentPage > 1 && (
        <div className="button-wrapper">
          <Button
            type="button"
            onClickHandler={handleShowLess}
            className="load-more-button"
          >
            Show Less
          </Button>
        </div>
      )}
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
  handleSelect: () => {},
  toggleSelected: () => {},
  filteredTags: [],
  handleLoadMore: () => {},
  handleShowLess: () => {},
  blogsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      authorId: PropTypes.string,
      bannerImage: PropTypes.string,
      createdAt: PropTypes.string,
      tags: PropTypes.array,
      title: PropTypes.string,
    })
  ),
  query: PropTypes.string,
  handleSelect: PropTypes.func,
  toggleSelected: PropTypes.func,
  filteredTags: PropTypes.array,
  handleLoadMore: PropTypes.func,
  handleShowLess: PropTypes.func,
  blogsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
};

export default BlogList;

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
  handleLoadMore,
  handleShowLess,
  blogsPerPage,
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
      {(blogsPerPage < totalBlogs || blogsPerPage > totalBlogs) && (
        <div className="button-wrapper">
          <Button
            type={"button"}
            onClickHandler={
              (blogsPerPage < totalBlogs && handleLoadMore) ||
              (blogsPerPage > totalBlogs && handleShowLess)
            }
            className="load-more-button"
          >
            {blogsPerPage < totalBlogs && "Load More"}
            {blogsPerPage > totalBlogs && "Show Less"}
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
};

export default BlogList;
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "hooks/useSearch";
import { tagRemoved, tagselected } from "features/search/searchSlice";
import { incrementPage } from "features/pagination/paginationSlice";
import BlogCard from "components/BlogCard/BlogCard";
import Button from "components/Button/Button";
import { tags } from "components/SelectBox/SelectBox";
import "./blogList.scss";

const BlogList = ({ blogs }) => {
  const { query } = useSearch();
  const dispatch = useDispatch();
  const { filteredTags } = useSelector((state) => state.search);

  const { currentPage, blogsPerPage } = useSelector(
    (state) => state.pagination
  );

  const handleSelect = (tag) => {
    const isSelected = filteredTags.includes(tag);
    if (isSelected) {
      dispatch(tagRemoved(tag));
    } else {
      dispatch(tagselected(tag));
    }
  };

  const toggleSelected = (tag) => filteredTags.includes(tag);

  const searchedBlogs = (blogs, query) => {
    return blogs?.filter((blog) =>
      blog?.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredBlogsByTitle = searchedBlogs(blogs, query);

  const filteredBlogsByTags = filteredBlogsByTitle.filter(({ tags }) => {
    if (filteredTags.length === 0) {
      return true;
    }

    return tags.some(({ value }) => filteredTags.includes(value));
  });

  const totalBlogs = filteredBlogsByTags.length;
  const currentBlogs = filteredBlogsByTags.slice(0, blogsPerPage);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div className="wrapper">
      <div className="tag-list">
        {tags?.map((tag) => (
          <Button
            type={"button"}
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
        {currentBlogs.length
          ? currentBlogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          : "Blog not found"}
      </div>
      {blogsPerPage < totalBlogs && (
        <div className="button-wrapper">
          <Button
            type={"button"}
            onClickHandler={() => handleLoadMore()}
            className="load-more-button"
          >
            Load More
          </Button>
        </div>
      )}
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

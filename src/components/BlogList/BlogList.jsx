import BlogCard from "../BlogCard/BlogCard";
import "./BlogList.scss";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

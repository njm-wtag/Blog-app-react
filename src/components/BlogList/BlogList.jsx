import useBlogs from "hooks/useBlogs";
import BlogCard from "components/BlogCard/BlogCard";
import "./BlogList.scss";

const BlogList = () => {
  const { blogs } = useBlogs();

  return (
    <div className="blog-list">
      {blogs?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

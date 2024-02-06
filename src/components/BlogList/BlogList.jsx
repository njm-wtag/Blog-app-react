import useBlogs from "hooks/useBlogs";
import BlogCard from "components/BlogCard/BlogCard";
import "./BlogList.scss";

const BlogList = () => {
  const reversedBlog = useBlogs();

  return (
    <div className="blog-list">
      {reversedBlog?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
